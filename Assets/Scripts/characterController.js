#pragma strict

private var speedX:float;					//velocitat del player en x
private var constSpeedX:float = 2.0f;		//velocitat inicial constant del player en x
private var impulseX:float = 10.0f;			//impuls del player en x en fer charge
private var friction:float = 0.2f;			//friccio del player en x

private var speedY:float;					//velocitat del player en y
private var impulseY:float = 7.0f;			//impuls del player en y en saltar
private var gravity:float = 9.8f;			//gravetat del player en y

//private var waitCharge:double = 0.3;		//temps a esperar durant el charge
private var waitSwap:double = 0.8;			//temps a esperar durant el swap
private var initTimeRotation:double;		//temps inicial del contador en la rotacio de l'sprite

private var speedRotating:float = 700.0f;	//velocitat de rotacio positiva de l'sprite
private var speedReversing:float = 600.0f;	//velocitat de rotacio negativa (reversio) de l'sprite

private var canJump:boolean = false;		//condicio de si el player pot saltar
private var charging:boolean = false;		//condicio de si el player esta fent charge
private var rotating:boolean = false;		//condicio de si l'sprite esta rotant positivament
private var reversing:boolean = false;		//condicio de si l'sprite esta rotant negativament

private var bJump:boolean = false;
private var bCharge:boolean = false;

private var stepUpLimit:float = 0.08f;		//distancia llindar entre la posicio del player i el terra

private var floor:float;					//posicio del jugador respecte el terra
private var stamina:int;					//quantitat de cargues a fer
private var playerSprite:Transform;			//sprite del jugador
private var script:theChosen;				//script del manager

var Manager:GameObject;						//sprite del jugador

//---------markers----------
var markerJump:GameObject;
var markerCharge:GameObject;
//--------------------------

//---------GUIstyles---------
var controlsGuiStyle:GUIStyle;
//---------GUI---------
function OnGUI (){
    //controls
    if (GUI.Button(Rect (0,0,Screen.width/2,Screen.height), "", controlsGuiStyle)){
    	if(canJump) bJump = true;
    }
    if (GUI.Button(Rect (Screen.width/2,0,Screen.width/2,Screen.height), "", controlsGuiStyle)){
    	if(!charging) bCharge = true;
    }
}

function Start () {
	script = Manager.GetComponent("theChosen") as theChosen;
	playerSprite = transform.FindChild("PlayerSprite");
	speedX = constSpeedX;
	speedY = 0.0f;
}

function Update () {
	//updatejar posicio en x i en y del player
	transform.position.x += speedX*Time.deltaTime;
	transform.position.y += speedY*Time.deltaTime;
	
	//send actualitza variable floor al manager i floor el recull
	Manager.SendMessage("returnFloor", transform.position.x);
	floor = script.realFloor;
	stamina = script.stamina;
	
	//friccio en x
	if (speedX > constSpeedX) speedX -= friction;
	else {
		speedX = constSpeedX;
		charging = false;
	}
	
	//gravetat en y
	if (transform.position.y > floor) speedY -= gravity*Time.deltaTime;
	else {
		canJump = true;
		//impuls per pujar esglaons
		if (Mathf.Abs(floor - transform.position.y) > stepUpLimit) speedY = impulseY*Mathf.Abs(floor - transform.position.y);
		else {
			speedY = 0.0f;
			transform.position.y = floor;
		}
	}
	
	//jump
	if (canJump && (Input.GetKeyDown('z')||bJump)){
		bJump=false;
		transform.position.y = floor;
		speedY = impulseY;
		canJump= false;
	}
		//marker canJump
		var rendJump = markerJump.GetComponent.<Renderer>();
		if (canJump) rendJump.material.color = Color.green;
		else  rendJump.material.color = Color.red;
	
	//charge
	if (!charging && !rotating && !reversing && stamina > 0 && (Input.GetKeyDown('x')||bCharge)){
		bCharge=false;
		charging = true;
		rotating = true;
		initTimeRotation = Time.time;
		Charge();
	}
		//marker Charge
		var rendCharge = markerCharge.GetComponent.<Renderer>();
		if (charging) rendCharge.material.color = Color.green;
		else rendCharge.material.color = Color.red;
	
	//canvi d'sprite
	SwapSprite();
			
	//rotacio del player en z (trontoll)
	transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.1f;
}

function Charge(){
	speedX = impulseX;	speedY -= 1.0f;
	Manager.SendMessage("Stamina", -1);
	//yield WaitForSeconds(waitCharge);
	//charging = false;
	//Debug.Log("charge done, stamina:" + stamina);
}

function SwapSprite(){
	//assignar el valor actual al contador
	if (rotating || reversing) var curTimeRotation = Time.time;
	//rotar sprite 180 graus en y
	if (rotating) {
		if (playerSprite.localEulerAngles.y >= 180.0) {
			playerSprite.localEulerAngles = new Vector3(0.0,180.0,0.0);
			rotating = false;
			reversing = true;
		}
		else playerSprite.RotateAround(transform.position, transform.up, Time.deltaTime * speedRotating);
		Debug.Log("rotating");
	}
	//revertir la rotacio anterior 180 graus en y despres d'un temps determinat pel contador
	if (reversing && curTimeRotation - initTimeRotation >= waitSwap) {
		if (playerSprite.localEulerAngles.y <= 20.0 && playerSprite.localEulerAngles.y >= 0.0) {
			playerSprite.localEulerAngles = new Vector3(0.0,0.0,0.0);
			rotating = false;
			reversing = false;
		}
		else playerSprite.RotateAround(transform.position, transform.up, Time.deltaTime * -speedReversing);
		Debug.Log("reversing");
	}
}