#pragma strict

private var head:Transform;
private var armL:Transform;
private var armR:Transform;
private var body:Transform;
private var legL:Transform;
private var legR:Transform;
private var tail:Transform;
private var speedX:float;
var player:GameObject;
private var playerDead:boolean;

var Manager:GameObject;
private var ManagerScript:theChosenRunner;

function Start () {
	ManagerScript = Manager.GetComponent("theChosenRunner") as theChosenRunner;
	
	head = transform.FindChild("Lleo_Head");
	armL = transform.FindChild("Lleo_ArmL");
	armR = transform.FindChild("Lleo_ArmR");
	body = transform.FindChild("Lleo_Body");
	legL = transform.FindChild("Lleo_LegL");
	legR = transform.FindChild("Lleo_LegR");
	tail = transform.FindChild("Lleo_Tail");
	transform.position.x = player.transform.position.x-5;
	speedX = 2.0f; // <-------------- a falta de pillarla de manager per velocitats variables
}

function Update () {
	playerDead = ManagerScript.GetDead();

	if(playerDead && transform.position.x<player.transform.position.x - 1) transform.position.x += speedX*Time.deltaTime;
	else if (!playerDead) transform.position.x = player.transform.position.x-5;
	
	head.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.1f;
	armL.transform.rotation.z = -Mathf.Sin(Time.time*2.5)*0.25f;
	armR.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.25f;
	legL.transform.rotation.z = -Mathf.Sin(Time.time*2.5)*0.2f;
	legR.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.2f;
	tail.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.2f;
}