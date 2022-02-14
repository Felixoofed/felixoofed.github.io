var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var radius = 5;
var start = 0;
var end = Math.PI * 2;
var dragging = false;

canvas.width = 800;
canvas.height = 600;

context.lineWidth = radius * 2;

var putPoint = function(e){
	if(dragging){
		context.lineTo(e.offsetX, e.offsetY);
		context.strokeStyle = document.getElementById('colorpicker').value;
		context.fillStyle = document.getElementById('colorpicker').value;
		context.stroke();
		context.beginPath();
		context.arc(e.offsetX, e.offsetY, radius, start, end);
		context.fill();
		context.beginPath();
		context.moveTo(e.offsetX, e.offsetY);
	}
}

var focused = function(e){
	dragging = true;
	putPoint(e);
}

var unfocused = function(){
	dragging = false;
	context.beginPath();
}

canvas.addEventListener('mousedown', focused);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', unfocused);