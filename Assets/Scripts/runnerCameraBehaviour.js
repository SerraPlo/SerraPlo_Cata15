#pragma strict

private var PlayerScript:characterController;
private var CameraTransform:Transform;

function Start () {
	PlayerScript = GameObject.Find("Player").GetComponent(characterController) as characterController;
	CameraTransform = transform;
}

function Update () {
	CameraTransform.position.x = PlayerScript.GetPosX();
	//transform.LookAt(player.transform);
}