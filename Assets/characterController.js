#pragma strict

private var speedX:float = 2.0f;
private var speedY:float = 0.0f;
private var grounded:boolean = false;
var Manager:GameObject;
private var script:theChosen;
var floor:float;

function Start () {
	script = Manager.GetComponent("theChosen");
}

function Update () {

	transform.position.x += speedX*Time.deltaTime;
	transform.position.y += speedY*Time.deltaTime;
	Manager.SendMessage("returnFloor", transform.position.x);
	floor = script.realFloor;
	
	if (transform.position.y > floor) speedY -= 9.8f*Time.deltaTime;
	else {
		if (Mathf.Abs(floor - transform.position.y) > 0.1f) speedY = 5.0f*Mathf.Abs(floor - transform.position.y);
		else {
			speedY = 0.0f;
			transform.position.y = floor;
		}
	}
	if (Mathf.Abs(floor - transform.position.y) < 0.1f && Input.GetKeyDown("z")) speedY = 5.0f;
	
	transform.rotation.z = Mathf.Sin(transform.position.x)*0.15f;
	
	//Debug.Log(transform.position.y);
	

/*
	if (grounded && Input.GetKeyDown("z")) {
		grounded = false;
		speedY = 5.0f;
		Debug.Log("jump");
	}
	if (!grounded) speedY -= 9.8f*Time.deltaTime;
	else speedY = 0.0f;
	transform.position.y += speedY*Time.deltaTime;
	transform.position.x += speedX*Time.deltaTime;
	Debug.Log(grounded);
}

function OnCollisionEnter(collision: Collision) {
   if (collision.gameObject.tag == "Ground") {
     grounded = true;
     speedY = 0.0f;
   }
}

function OnTriggerEnter(collision: Collider) {
   if (collision.gameObject.tag == "Ceil") {
     grounded = false;
   }*/
   
}

