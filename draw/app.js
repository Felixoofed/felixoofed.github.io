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
			canvasX = e.pageX - canvas.offsetLeft/1;
			canvasY = e.pageY - canvas.offsetTop/1;
			context.moveTo(canvasX, canvasY);
		})
		.mousemove(function(e){
			if(isDown !== false) {
				canvasX = e.pageX - canvas.offsetLeft/1;
				canvasY = e.pageY - canvas.offsetTop/1;
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
				e.touches[0].pageX/0.5,
				e.touches[0].pageY*0.5
			);

			this.started = true;

		},
		move: function(e) {

			if (this.started) {
				context.lineTo(
					e.touches[0].pageX/0.5,
					e.touches[0].pageY*0.5
				);

				context.strokeStyle = document.getElementById('colorpicker').value;
				context.lineWidth = 5;
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