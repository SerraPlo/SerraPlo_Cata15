#pragma strict

private var speedX:float = 2.0f;
private var speedY:float = 0.0f;
private var grounded:boolean = false;
private var canJump:boolean = false;
private var charging:boolean = false;
var Manager:GameObject;
private var script:theChosen;
private var floor:float;
var stamina:int;
var markerJump:GameObject;

function Start () {
	script = Manager.GetComponent("theChosen");
}

function Update () {

	transform.position.x += speedX*Time.deltaTime;
	transform.position.y += speedY*Time.deltaTime;
	
	//send actualitza variable floor al manager i floor el recull
	Manager.SendMessage("returnFloor", transform.position.x);
	floor = script.realFloor;
	stamina = script.stamina;
	//"gravetat"
	if(transform.position.y > floor)speedY -= 9.8f*Time.deltaTime;
	else {
		canJump=true;
		if (Mathf.Abs(floor - transform.position.y) > 0.1f) speedY = 5.0f*Mathf.Abs(floor - transform.position.y);
		else {
			speedY = 0.0f;
			transform.position.y = floor;
		}
	}
	
	//jump
	if (canJump && Input.GetKeyDown("z")){
		transform.position.y = floor;
		speedY = 5.0f;
		canJump= false;
	}
		//marker canJump
		var rend = markerJump.GetComponent.<Renderer>();
		if (canJump) rend.material.color = Color.green;
		else  rend.material.color = Color.red;
	
	//charge
	if (!charging && stamina > 0 && Input.GetKeyDown("x")){
		charging = true;
		Charge();
	}
		//visual Charge
		if (charging) transform.FindChild("Plane").gameObject.GetComponent.<Renderer>().material.color = Color.red;
		else transform.FindChild("Plane").gameObject.GetComponent.<Renderer>().material.color = Color.white;
		
	//rotacio
	transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.1f;
}

function Charge(){
	speedX = 10.0f;	speedY = 0.0f;
	Manager.SendMessage("Stamina", -1);
	yield WaitForSeconds(0.3);
	speedX = 2.0f;
	charging = false;
	Debug.Log("charge done, stamina:" + stamina);
}

