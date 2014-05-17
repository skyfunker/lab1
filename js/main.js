var reostatCoords = {left:480, top:100, right:520, bottom: 220};
var minR = 10;
var maxR = 100;
var stepR = 10;
var R = minR;
var rY = 110;

window.onload = function() {
    canvas = document.getElementById("scheme");
    context = canvas.getContext("2d");
    drawScheme(context);
    canvas.addEventListener("mousedown", canvas_OnMouseDown, false);
    document.getElementById("reostatRes").value = minR; 
    
};

function canvas_OnMouseDown(event) {
  var x = event.clientX;
  var y = event.clientY;
  var canvas = document.getElementById("scheme");
  var context = canvas.getContext("2d");

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  if(x > reostatCoords.left && x < reostatCoords.right
        && y > reostatCoords.top && y < reostatCoords.bottom) {
    // user clicks reostat rectangle, change R
    changeR(context);
  }
}

function changeR(ctx) {
    if(R < maxR) {
        R += stepR;
        var inputR = document.getElementById("reostatRes");
        inputR.value = R;
        // redraw reostat
        ctx.strokeStyle = "#FFFFFF"; 
        line(ctx, 460, 80, 460, rY);
		line(ctx, 460, rY, 480, rY);
        
        rY += 10;
        ctx.strokeStyle = "black"; 
        line(ctx, 460, 80, 460, rY);
		line(ctx, 460, rY, 480, rY);
    }
}


function drawScheme(ctx) {
	// blue line with round ends
	ctx.beginPath();
	ctx.strokeStyle = "#000000"; 
	ctx.fillStyle="#FFFFFF";

	ctx.strokeRect(50, 50, 450, 280);
	rectangle(ctx, 30, 70, 70, 160);
	ctx.fillRect(30, 220, 40, 30);
	line(ctx, 20, 220, 80, 220);
	ctx.font = "14px Verdana";
	ctx.strokeText('+', 30, 210);
	ctx.strokeText('—', 30, 265);

	line(ctx, 30, 250, 70, 250);
	ctx.fillRect(120, 49, 80, 2);
	circle(ctx, 160, 50, 40);
	line(ctx, 290, 50, 290, 145);
	circle(ctx, 290, 185, 40);
	ctx.font = "24px Verdana";
	ctx.strokeText('V', 280, 195);
	ctx.strokeText( 'A', 150, 60);
	line(ctx, 290, 225, 290, 330);
	rectangle(ctx, reostatCoords.left, reostatCoords.top, 
                    reostatCoords.right, reostatCoords.bottom);

	line(ctx, 460, 80, 500, 80);
        line(ctx, 460, 80, 460, rY);
	line(ctx, 460, rY, 460, rY);
	line(ctx, 460, rY, 480, rY);
	

}

function circle(ctx, x, y, rad) {
    var startingAngle = 0;
    var endingAngle = 2 * Math.PI;
    var counterclockwise = false;
 
    ctx.beginPath();
	ctx.arc(x, y, rad, 0, 2 * Math.PI, false);
 
    // ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
	ctx.closePath();
    ctx.stroke();
	
}
 
function rectangle(ctx, left, top, right, bottom) {
	//ctx.beginPath();
	ctx.fillRect(left, top, right - left, bottom - top);
	ctx.strokeRect(left, top, right - left, bottom - top);
	
}

function line(ctx, left, top, right, bottom) {
	ctx.beginPath();
	ctx.moveTo(left, top); 
	ctx.lineTo(right, bottom);
	ctx.closePath();
	ctx.stroke();
}
