var reostatCoords = {left: 480, top: 100, right: 520, bottom: 220};
var minR = 0;
var maxR = 100;
var stepR = 10;
var R = minR;
var rY = 110;
var muarr = new Array(((maxR - minR) / stepR) + 1);

var inpKpd = new Array(((maxR - minR) / stepR) + 1);
inpKpd[0] = 0;
Number.prototype.round = function(places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
};

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
    if (x > reostatCoords.left && x < reostatCoords.right
            && y > reostatCoords.top && y < reostatCoords.bottom) {
        // user clicks reostat rectangle, change R
        changeR(context);
    }
}

function changeR(ctx) {
    if (R <= maxR) {
        var ERS = parseInt(document.getElementById("ers").value);
        var Rsmall = parseInt(document.getElementById("internalRes").value);
        var Reo = R;
        var I = ERS / (R + Rsmall);
        I = I.round(2);
        var U = I * Reo;
        U = U.round(2);
        var mucalc = R / (R + Rsmall);
        muarr[R / stepR] = mucalc;

        var inputR = document.getElementById("reostatRes");
        inputR.value = R;
        if (R > 0) {
            // redraw reostat
            ctx.strokeStyle = "#FFFFFF";
            line(ctx, 460, 80, 460, rY);
            line(ctx, 460, rY, 480, rY);

            rY += 10;
            ctx.strokeStyle = "black";
            line(ctx, 460, 80, 460, rY);
            line(ctx, 460, rY, 480, rY);

            addrow(Reo, I, U);
        }
        R += stepR;
    }
}

function btnChart_onclick() {
    ChartKpd();
}

function addrow(reo, I, U) {

    var table = document.getElementById("tablekpd"); 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount); 
    var cell1 = row.insertCell(0);    
    cell1.innerHTML = reo;
    var cell2 = row.insertCell(1);       
    cell2.innerHTML = I;
    var cell3 = row.insertCell(2);
    cell3.innerHTML = U;
    var cell4 = row.insertCell(3);
    var inp = document.createElement("input");
    inp.type = "text";
    inp.size = "4";
    inp.maxLength = "4";
    inp.name = "kpd_" + reo;
    inp.id = "kpd_" + reo;
    //inp.value = "" + muc;
    cell4.appendChild(inp);
}

function ChartKpd() {
    var len = (maxR - minR) / stepR;
    var xlabs = new Array(len + 1);
    for (var i = 0; i <= len; i++) {
        xlabs[i] = i * stepR;
    }
    var inputs = document.getElementsByTagName("input");
    var j = 1;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].id.substr(0, 4) == "kpd_") {
            inpKpd[j] = inputs[i].value;
            j++;
        }
    }
    var data = {
        labels: xlabs,
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: muarr
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: inpKpd
            }
        ]
    };
    var ctx = document.getElementById("myChart").getContext("2d");
    var myNewChart = new Chart(ctx).Line(data, {bezierCurve: true});
}

function drawScheme(ctx) {
    // blue line with round ends
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#FFFFFF";

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
    ctx.strokeText('A', 150, 60);
    line(ctx, 290, 225, 290, 330);
    rectangle(ctx, reostatCoords.left, reostatCoords.top,
            reostatCoords.right, reostatCoords.bottom);
    ctx.strokeText('R', 490, 160);
    line(ctx, 460, 80, 500, 80)
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
