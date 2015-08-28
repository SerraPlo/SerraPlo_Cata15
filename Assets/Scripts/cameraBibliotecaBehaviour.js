#pragma strict

//private var animationTime:double;

var titleSprite:GameObject;

function Start () {
	this.GetComponent(Animator).enabled = false;
	titleSprite.transform.position.x = this.transform.position.x - 4;
	titleSprite.transform.position.y = this.transform.position.y + 1;
	titleSprite.transform.position.z = this.transform.position.z + 5;
	
	titleSprite.transform.localScale.x = 6.0 / 15.0 * Screen.width / Screen.height;
	titleSprite.transform.localScale.y = 6.0 / 15.0 * Screen.width / Screen.height;
}

function Update () {
	
}

function PlayAnimation () {
	this.GetComponent(Animator).enabled = true;
	
}