#pragma strict

private var bg1:Transform;	
private var bg2:Transform;
var player:GameObject;

function Start () {
	bg1 = transform.FindChild("p1");
	bg2 = transform.FindChild("p2");
}

function Update () {
	if (player.transform.position.x>bg1.position.x+30){
		bg1.position.x+=60;
	}
	if (player.transform.position.x>bg2.position.x+30){
		bg2.position.x+=60;
	}
}