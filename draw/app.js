window.onload = function() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
    canvas.width = 800;
	canvas.height = 600;
	
	// Set Background Color
    context.fillStyle="#fff";
    context.fillRect(0,0,canvas.width,canvas.height);
	
    // Mouse Event Handlers
	if(canvas){
		var isDown = false;
		var canvasX, canvasY;
		context.lineWidth = 3;
		
		$(canvas)
		.mousedown(function(e){
			isDown = true;
			context.beginPath();
			canvasX = e.pageX - canvas.offsetLeft;
			canvasY = e.pageY - canvas.offsetTop;
			context.moveTo(canvasX, canvasY);
		})
		.mousemove(function(e){
			if(isDown !== false) {
				canvasX = e.pageX - canvas.offsetLeft;
				canvasY = e.pageY - canvas.offsetTop;
				context.lineTo(canvasX, canvasY);
				context.strokeStyle = document.getElementById('colorpicker').value;
				context.stroke();
			}
		})
		.mouseup(function(e){
			isDown = false;
			context.closePath();
		});
	}
	
	// Touch Events Handlers
	draw = {
		started: false,
		start: function(e) {

			context.beginPath();
			context.moveTo(
				e.touches[0].pageX - canvas.offsetLeft,
				e.touches[0].pageY - canvas.offsetTop
			);

			this.started = true;

		},
		move: function(e) {

			if (this.started) {
				context.lineTo(
					e.touches[0].pageX - canvas.offsetLeft,
					e.touches[0].pageY - canvas.offsetTop
				);

				context.strokeStyle = document.getElementById('colorpicker').value;
				context.lineWidth = 3;
				context.stroke();
			}

		},
		end: function(e) {
			this.started = false;
		}
	};
	
	// Touch Events
	canvas.addEventListener('touchstart', draw.start, false);
	canvas.addEventListener('touchend', draw.end, false);
	canvas.addEventListener('touchmove', draw.move, false);
	
	// Disable Page Move
	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); }, { passive: false });
};