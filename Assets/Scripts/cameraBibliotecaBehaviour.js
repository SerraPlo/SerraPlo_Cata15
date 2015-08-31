#pragma strict

private var enterBiblioteca:Animation;
private var animLength:float;

function Start () {
	enterBiblioteca = this.GetComponent(Animation);
	enterBiblioteca.enabled = false;
	
	/*titleSprite.transform.position.x = this.transform.position.x - 4;
	titleSprite.transform.position.y = this.transform.position.y + 1;
	titleSprite.transform.position.z = this.transform.position.z + 5;
	
	titleSprite.transform.localScale.x = 6.0 / 15.0 * Screen.width / Screen.height;
	titleSprite.transform.localScale.y = 6.0 / 15.0 * Screen.width / Screen.height;*/
}

function Update () {
	
}

function GetAnimLength () {
	return animLength;
}

function PlayAnimation () {
	enterBiblioteca.enabled = true;
	enterBiblioteca.Play("EnterBiblioteca");
	animLength = enterBiblioteca["EnterBiblioteca"].length;
}