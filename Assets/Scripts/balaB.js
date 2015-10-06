#pragma strict

private var PlayerScript:characterController;
private var Manager:GameObject;
private var ManagerScript:theChosenRunner;

function Start () {
	PlayerScript = GameObject.Find("Player").GetComponent(characterController) as characterController;
	Manager = GameObject.Find("Manager");
	ManagerScript = Manager.GetComponent("theChosenRunner") as theChosenRunner;
	Ddestroy();
}

function Update () {
	PlayerScript.setPosBalaX(transform.position.x);
	PlayerScript.setPosBalaY(transform.position.y);
	transform.position.x += 15*Time.deltaTime;
}

function Ddestroy(){
	yield WaitForSeconds(0.7);
	Destroy (gameObject);
	Debug.Log("destroyed");
}