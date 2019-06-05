var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 150;

var c = canvas.getContext("2d");
var span = document.getElementById("score");
var t = 0;
var dt = 0.01;
var r = 25;
var dy = 5;
var xl = x - r;
var xr = x + r;
var yl = y;
var yr = y;
var deg = 0;
var x = window.innerWidth/2;
var y = window.innerHeight - 175;
var up = document.getElementById("up");
var down = document.getElementById("down");
var left = document.getElementById("left");
var right = document.getElementById("right");

function rect(xrect,yrect)
{
	this.xrect = xrect;
	this.yrect = yrect;
	this.dy = dy;
    this.x = x;
    this.y = y;
    this.t = t;
    this.dt = dt;
	this.draw = function()
	{
		c.beginPath();
		c.fillRect(xrect,yrect,100,20);
		c.fillStyle = "skyblue";
		c.fill();
		yrect = yrect + dy;
		dy = dy + 0.0005;
	}
	this.update = function()
	{
		if (yrect > window.innerHeight) 
			{
				yrect= 0;
				xrect=Math.random()*window.innerWidth;
			}

    if(((xl+5)>xrect)&&((xl-105)<xrect)&&((yl+5)>yrect)&&((yl-25)<yrect))
    {
        clearInterval(run);
        alert("Game Ended.Score is "+Math.round(t)+".Refresh to rebegin the game");
    }
    else if(((xr+5)>xrect)&&((xr-105)<xrect)&&((yr+5)>yrect)&&((yr-25)<yrect))
    {
        clearInterval(run);
        alert("Game Ended.Score is "+Math.round(t)+".Refresh to rebegin the game");
    }
        
        t = t + dt; 
        span.innerHTML = Math.round(t);
		this.draw();
	}
}

function circles()
{
    this.x = x;
    this.y = y;
    this.xl = xl;
    this.yl = yl;
    this.xr = xr;
    this.yr = yr;
    this.deg = deg;
    this.draw = function()
    {
        c.clearRect(0,0,window.innerWidth,window.innerHeight);
        c.beginPath();
        c.arc(xl,yl,5,0,Math.PI*2,true);
        c.stroke();
        c.fillStyle = "red";
        c.fill();
        c.beginPath();
        c.arc(xr,yr,5,0,Math.PI*2,true);
        c.stroke();
        c.fillStyle = "blue";
        c.fill();
        deg = deg + (Math.PI/12);
        deg = deg + (Math.PI/12);
        xl = x + r*Math.cos(deg);
        yl = y + r*Math.sin(deg);
        xr = x - r*Math.cos(deg);
        yr = y - r*Math.sin(deg); 
    }
}

var circle = new circles();

var rectArray = [];
for(var i = 0; i < 10 ; i++)
{
    var yrect = Math.random()*window.innerHeight/2;
    var xrect = Math.random()*window.innerWidth;
    rectArray.push(new rect(xrect,yrect));
}

function c1()
{
    up.onclick = function() {y = y - 25;}
    down.onclick = function() {y = y + 25;}
    left.onclick = function() {x = x - 25;}
    right.onclick = function() {x = x + 25;}
    circle.draw();
    for(var i = 0; i < 10; i++)
    {
    	rectArray[i].update();
    }
}    
var run = setInterval(c1,100);
