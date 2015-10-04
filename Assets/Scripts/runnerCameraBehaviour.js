#pragma strict

private var PlayerScript:characterController;
private var CameraTransform:Transform;
var bgImg:GameObject;

function Start () {
	PlayerScript = GameObject.Find("Player").GetComponent(characterController) as characterController;
	CameraTransform = transform;
}

function Update () {
	CameraTransform.position.x = PlayerScript.GetPosX();
	bgImg.transform.position.x = CameraTransform.position.x;
	//transform.LookAt(player.transform);
}