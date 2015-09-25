#pragma strict

private var bg1:Transform;	
private var bg2:Transform;
private var bg3:Transform;
var player:GameObject;

function Start () {
	bg1 = transform.FindChild("p1");
	bg2 = transform.FindChild("p2");
	bg3 = transform.FindChild("p3");
}

function Update () {
	if (player.transform.position.x>bg1.position.x+30){
		bg1.position.x+=25.62*3;
	}
	if (player.transform.position.x>bg2.position.x+30){
		bg2.position.x+=25.62*3;
	}
	if (player.transform.position.x>bg3.position.x+30){
		bg3.position.x+=25.62*3;
	}
}