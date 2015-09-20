#pragma strict

private var head:Transform;
private var armL:Transform;
private var armR:Transform;
private var body:Transform;
private var legL:Transform;
private var legR:Transform;
private var tail:Transform;
private var speedX:float;
private var playerDead:boolean;
private var playerPosX:float;
private var lionTransform:Transform;

private var PlayerScript:characterController;
private var ManagerScript:theChosenRunner;

function Start () {
	ManagerScript = GameObject.Find("Manager").GetComponent("theChosenRunner") as theChosenRunner;
	PlayerScript = GameObject.Find("Player").GetComponent("characterController") as characterController;
	
	head = transform.FindChild("Head");
	armL = transform.FindChild("ArmL");
	armR = transform.FindChild("ArmR");
	body = transform.FindChild("Body");
	legL = transform.FindChild("LegL");
	legR = transform.FindChild("LegR");
	tail = transform.FindChild("Tail");
	lionTransform = transform;
	lionTransform.position.x = PlayerScript.GetPosX()-5;
	speedX = 2.0f; // <-------------- a falta de pillarla de manager per velocitats variables
}

function Update () {
	playerDead = ManagerScript.GetDead();
	playerPosX = PlayerScript.GetPosX();

	if(playerDead && lionTransform.position.x<playerPosX - 1) lionTransform.position.x += speedX*Time.deltaTime;
	else if (!playerDead) lionTransform.position.x = playerPosX-5;
	
	head.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.1f;
	armL.transform.rotation.z = -Mathf.Sin(Time.time*2.5)*0.25f;
	armR.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.25f;
	legL.transform.rotation.z = -Mathf.Sin(Time.time*2.5)*0.2f;
	legR.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.2f;
	tail.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.2f;
}