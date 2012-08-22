
var watermelons =[];
var score = 0;
function onwatermelonClick(event)
{
	var watermelon = event.target;
	var rand = Math.round(Math.random()*10);
	if(rand < 4 || rand > 6 || watermelon.scaleX > 0.8)
	{
		rand = 0;
		watermelon.falling = true;
	}
	else
	{
		watermelon.falling = false;
	}
	updateScore(rand);
	
	watermelon.gotoAndStop(rand);
}
function tick()
{
	var r = Math.random();
	if (r < 0.4 && r >0.3) 
	{
		var watermelon = new lib.watermelon;
		watermelon.falling = false;
		var scale = Math.random();
		if(scale < 0.3)
		{
			scale = 0.3;
		}
		watermelon.scaleX = scale;
		watermelon.scaleY = scale;
		watermelon.y = 10;
		watermelon.x = 400 + Math.random()*(700-watermelon.scaleY*watermelon.nominalBounds.height);

		var velocity = (1+watermelon.scaleX)* 2
		watermelon.velY = velocity;
		watermelon.velX = 0;
		watermelon.onClick = onwatermelonClick;
		exportRoot.addChild(watermelon);
		watermelons.push(watermelon);
	}

	for(var i = watermelons.length-1; i>=0; i-- )
	{
		watermelon = watermelons[i];
		if(watermelon.falling)
		{
			watermelon.velY+=5;
		}
		watermelon.x += watermelon.velX;
		watermelon.y += watermelon.velY;
		
		if (watermelon.y > 600) {
			watermelons.splice(i,1);
			exportRoot.removeChild(watermelon);
		}
	}
	stage.update();
}
function updateScore(rand)
{

	if(rand == 2)
	{
		score += 100;
	}
	else if(rand == 7 || rand == 6)
	{
		score += 1000;
	}
	else if(rand == 5)
	{
		score += 10000;
	}
	else
	{
		score += 50;
	}
	exportRoot.score_txt.text = score;
}