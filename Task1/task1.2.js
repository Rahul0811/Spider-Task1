var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
var span = document.getElementById("score");
var t = 0;
var dt = 0.01;
var r = 70;
var dy = 5;
var xl = x - r;
var xr = x + r;
var yl = y;
var yr = y;
var deg = 0;
var x = window.innerWidth/2;
var y = window.innerHeight - 150;
var h = undefined;
var w = undefined;
var cw = document.getElementById("cw");
var acw = document.getElementById("acw");

function rect(xrect,yrect,h,w)
{
	this.xrect = xrect;
	this.yrect = yrect;
	this.h = h;
	this.w = w;
	this.dy = dy;
    this.x = x;
    this.y = y;
    this.t = t;
    this.dt = dt;
	this.draw = function()
	{
		c.beginPath();
		c.fillRect(xrect,yrect,w,h);
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

    if(((xl+15)>xrect)&&(xl-xrect<(w+15))&&((yl+15)>yrect)&&(yl-yrect<(h+15)))
    {
        alert("Game Ended.Score is "+Math.round(t)+".Refresh to rebegin the game");
        clearInterval(run);
    }
    else if(((xr+15)>xrect)&&(xr-xrect<(w+15))&&((yr+15)>yrect)&&(yr-yrect<(h+15)))
    {
        alert("Game Ended.Score is "+Math.round(t)+".Refresh to rebegin the game");
        clearInterval(run);
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
        c.arc(xl,yl,15,0,Math.PI*2,true);
        c.stroke();
        c.fillStyle = "red";
        c.fill();
        c.beginPath();
        c.arc(xr,yr,15,0,Math.PI*2,true);
        c.stroke();
        c.fillStyle = "blue";
        c.fill();
        xl = x + r*Math.cos(deg);
        yl = y + r*Math.sin(deg);
        xr = x - r*Math.cos(deg);
        yr = y - r*Math.sin(deg); 
    }
}

var circle = new circles();

var rectArray = [];
function c1()
{
	cw.onclick = function() {deg = deg + (Math.PI/20);}
	acw.onclick = function() {deg = deg - (Math.PI/20);}
    circle.draw();
    for(var i = 0;i<9;i++)
    {
        var h = Math.random()*50+20;
        var w = Math.random()*100+20;
        var yrect = Math.random()*(window.innerHeight/2);
        var xrect = Math.random()*(window.innerWidth);
        rectArray.push(new rect(xrect,yrect,h,w));
        rectArray[i].update();
    }
    window.addEventListener("keydown",event=>
		{
			if((event.key=="d")||(event.keyCode==39))
			{
				deg = deg + (Math.PI/20);
			}
			else if((event.key=="a")||(event.keyCode==37))
			{
				deg = deg - (Math.PI/20);
			} 
		})
}    
var run = setInterval(c1,20);
