#pragma strict

private var cameraAnim:Animation;
private var anim0Length:float; //EnterBiblioteca
private var anim1Length:float;
private var anim2Length:float;

function Start () {
	cameraAnim = this.GetComponent(Animation);
	cameraAnim.enabled = false;
	anim0Length=0;
	anim1Length=0;
	anim2Length=0;
	
	/*titleSprite.transform.position.x = this.transform.position.x - 4;
	titleSprite.transform.position.y = this.transform.position.y + 1;
	titleSprite.transform.position.z = this.transform.position.z + 5;
	
	titleSprite.transform.localScale.x = 6.0 / 15.0 * Screen.width / Screen.height;
	titleSprite.transform.localScale.y = 6.0 / 15.0 * Screen.width / Screen.height;*/
}

function Update () {
	
}

function GetAnimLength (i:int) {
	if (i == 0) return anim0Length;
	else if (i == 1)return anim1Length;
	else if (i == 2)return anim2Length;
}

function PlayEnterBiblioteca () {
	cameraAnim.enabled = true;
	cameraAnim.Play("EnterBiblioteca");
	anim0Length = cameraAnim["EnterBiblioteca"].length;
}

function PlayChangeToShop () {
	cameraAnim.enabled = true;
	cameraAnim.Play("ChangeToShop");
	anim1Length = cameraAnim["ChangeToShop"].length;
}

function PlayChangeToMenu () {
	cameraAnim.enabled = true;
	cameraAnim.Play("ChangeToMenu");
	anim2Length = cameraAnim["ChangeToMenu"].length;
}