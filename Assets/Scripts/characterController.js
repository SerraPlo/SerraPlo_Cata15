 #pragma strict

private var Character:int=0;
private var Rubriques:int=0;

private var speedX:float;					//velocitat del player en x
private var constSpeedX:float = 3.0f;		//velocitat inicial constant del player en x
private var impulseX:float = 20.0f;			//impuls del player en x en fer charge
private var friction:float = 0.2f;			//friccio del player en x

private var speedY:float;					//velocitat del player en y
private var impulseY:float = 7.0f;			//impuls del player en y en saltar
private var gravity:float = 9.8f;			//gravetat del player en y

//private var waitCharge:double = 0.3;		//temps a esperar durant el charge
private var waitSwap:double = 0.8;			//temps a esperar durant el swap
private var initTimeRotation:double;		//temps inicial del contador en la rotacio de l'sprite

private var speedRotating:float = 900.0f;	//velocitat de rotacio positiva de l'sprite
private var speedReversing:float = 900.0f;	//velocitat de rotacio negativa (reversio) de l'sprite

private var pause:boolean;
private var dead:boolean;
private var tuto:boolean;
private var hScore:int;
private var fScore:int = 0;
private var rMult:int = 1;

private var canJump:boolean = false;		//condicio de si el player pot saltar
private var can2Jump:boolean = false;       //jump gall
private var charging:boolean = false;		//condicio de si el player esta fent charge
private var rotating:boolean = false;		//condicio de si l'sprite esta rotant positivament
private var reversing:boolean = false;		//condicio de si l'sprite esta rotant negativament

private var bJump:boolean = false;			//condicio de clic en pantalla per saltar
private var bCharge:boolean = false;		//condicio de clic en pantalla per fer charge

private var floor:float;					//posicio del jugador respecte el terra
private var stamina:int;					//quantitat de cargues a fer
private var playerSprite:Transform;			//sprite del jugador
private var playerTransform:Transform;		//sprite del jugador

private var ManagerScript:theChosenRunner;
private var TerrainGeneratorScript:terrainGenerator;

var Manager:GameObject;

//---------markers----------
var markerJump:GameObject;
var markerCharge:GameObject;

//---------GUIstyles---------
var controlsGuiStyle:GUIStyle;

//---------GUI---------
/*function OnGUI (){
    //controls
    if(!pause && !dead){
		if (GUI.Button(Rect (0,(Screen.height/20)*3,Screen.width/2,Screen.height-((Screen.height/20)*3)), "", controlsGuiStyle)){
     		if(canJump) bJump = true;
		}
		if (GUI.Button(Rect (Screen.width/2,(Screen.height/20)*3,Screen.width/2,Screen.height-((Screen.height/20)*3)), "", controlsGuiStyle)){
    		if(!charging && stamina > 0) bCharge = true;
    	}
	}
}
*/
function GetPosX () {
	return playerTransform.position.x;
}

function GetPosY () {
	return playerTransform.position.y;
}

function GetConstSpeedX () {
	return constSpeedX;
}
function GetCharging(){
	return charging;
}

function Start () {
	Character = (PlayerPrefs.HasKey("Character")) ? PlayerPrefs.GetInt("Character"):0;
	if (PlayerPrefs.HasKey("Rubriques")) Rubriques = PlayerPrefs.GetInt("Rubriques");
	else {
		Rubriques = 21;
		PlayerPrefs.SetInt("Rubriques", Rubriques);
	}
	if (PlayerPrefs.HasKey("hS_1")) hScore = PlayerPrefs.GetInt("hS_1");
	else hScore = 0;
	fScore = hScore;
	
	if (Character == 0){//
		constSpeedX = 4.0f;
		impulseX    = 15.0f;
		impulseY    = 7.0f;
		Debug.Log("bou");
	}
	else if (Character == 1){//cavall
		constSpeedX = 6.0f;
		impulseX    = 13.0f;
		impulseY    = 7.0f;
		Debug.Log("cavall");
	}
	else if (Character == 2){//senglar
		constSpeedX = 6.0f;
		impulseX    = 15.0f;
		impulseY    = 7.0f;
		Debug.Log("senglar");
	}
	else if (Character == 3){//serp
		constSpeedX = 4.0f;
		impulseX    = 0.0f; // disparar
		impulseY    = 7.0f;
		Debug.Log("serp");
	}
	else if (Character == 4){//linx
		constSpeedX = 6.0f;
		impulseX    = 13.0f;
		impulseY    = 8.0f;
		Debug.Log("linx");
	}
	else if (Character == 5){//lleopard
		constSpeedX = 8.0f;
		impulseX    = 15.0f;
		impulseY    = 8.0f;
		Debug.Log("lleopard");
	}
	else if (Character == 6){//os
		constSpeedX = 6.0f;
		impulseX    = 20.0f;
		impulseY    = 5.0f;
		Debug.Log("os");
	}
	else if (Character == 7){//gall
		constSpeedX = 4.0f;
		impulseX    = 13.0f;
		impulseY    = 7.0f; //x2
		Debug.Log("gall");
	}
	else if (Character == 8){//llop
		constSpeedX = 8.0f;
		impulseX    = 13.0f; //kill = reload 
		impulseY    = 8.0f;
		Debug.Log("llop");	
	}
	else if (Character == 9){//elefant
		constSpeedX = 4.0f;
		impulseX    = 20.0f;
		impulseY    = 3.0f;
		Debug.Log("elefant");
	}
	dead = false;
	playerTransform = transform;
	var sprite:GameObject;
	for (var lop=0;lop<10;lop++){
		if(lop != Character){
			sprite = playerTransform.FindChild("PlayerSprite/PlaneFront"+lop).gameObject;
			sprite.SetActive(false);
			sprite = playerTransform.FindChild("PlayerSprite/PlaneBack"+lop).gameObject;
			sprite.SetActive(false);
		}
	}
	ManagerScript = Manager.GetComponent("theChosenRunner") as theChosenRunner;
	TerrainGeneratorScript = Manager.GetComponent("terrainGenerator") as terrainGenerator;
	playerSprite = playerTransform.FindChild("PlayerSprite");
	speedX = constSpeedX;
	speedY = 0.0f;
}

function SubstractRubrica(){
	if (Rubriques > 0) PlayerPrefs.SetInt("Rubriques", --Rubriques);
}

function Update () {
	if(!pause && !dead && !tuto){
		if (Input.touchCount == 1 && Input.GetTouch(0).phase == TouchPhase.Began) {
			// Get movement of the finger since last frame
			var touchPosition: Vector2 = Input.GetTouch(0).position;
			// Move object across XY plane
			if (touchPosition.y<(Screen.height/20)*17){	
				if (touchPosition.x<Screen.width/2){
					if(canJump) bJump = true;
				}else {
					if(!charging && stamina > 0) bCharge = true;
				}
			}
		}
	}
	if (Input.GetKeyDown('0'))	PlayerPrefs.SetInt("Character", 0);//bou      || 2 2 2 (speed / carrega / salt)
	if (Input.GetKeyDown('1'))	PlayerPrefs.SetInt("Character", 1);//cavall   || 3 1 2
	if (Input.GetKeyDown('2'))	PlayerPrefs.SetInt("Character", 2);//senglar  || 3 2 2
	if (Input.GetKeyDown('3'))	PlayerPrefs.SetInt("Character", 3);//serp     || 2 * 2
	if (Input.GetKeyDown('4'))	PlayerPrefs.SetInt("Character", 4);//linx     || 3 1 3
	if (Input.GetKeyDown('5'))	PlayerPrefs.SetInt("Character", 5);//lleopard || 4 2 3
	if (Input.GetKeyDown('6'))	PlayerPrefs.SetInt("Character", 6);//os       || 3 4 1 (2vides)
	if (Input.GetKeyDown('7'))	PlayerPrefs.SetInt("Character", 7);//gall     || 2 1 2 x2 
	if (Input.GetKeyDown('8'))	PlayerPrefs.SetInt("Character", 8);//llop     || 4 1 3 (recarrega xkill)
	if (Input.GetKeyDown('9'))	PlayerPrefs.SetInt("Character", 9);//elefant  || 2 5 0
	
	
	//updatejar posicio en x i en y del player
	//rotacio del player en z (trontoll)
	if(!dead){
		playerTransform.position.x += speedX*Time.deltaTime;
		playerTransform.position.y += speedY*Time.deltaTime;
		playerTransform.rotation.z = Mathf.Sin(Time.time*2.5)*0.1f;
	}
	//send actualitza variable floor al manager i floor el recull
	Manager.SendMessage("SetRealFloor", playerTransform.position.x);
	Manager.SendMessage("SetScore", playerTransform.position.x);
	floor = TerrainGeneratorScript.GetRealFloor();
	hScore = ManagerScript.GetHScore();
	stamina = ManagerScript.GetStamina();
	pause = ManagerScript.GetPause();
	dead = ManagerScript.GetDead();
	tuto = ManagerScript.GetTuto();
	
	//fragment generator
	if (playerTransform.position.x >= fScore && hScore >= 50 && Rubriques > 0) {
		rMult++;
		fScore = hScore+ Random.Range(20,80)*rMult;
		Debug.Log("Fragment respawn: " +fScore.ToString());
		TerrainGeneratorScript.SetFragment(true);
	} else if(hScore < 50) fScore = hScore;
	
	//resetButton
	if (Input.GetKeyDown('r')){
		Time.timeScale = 1.0;
		Application.LoadLevel(1);	
	}
	//dead
	/*if (Input.GetKeyDown('e')){
		dead = true;
	}*/
	//friccio en x
	if (speedX > constSpeedX) speedX -= friction;
	else {
		speedX = constSpeedX;
		charging = false;
	}
	
	//gravetat en y
	if (playerTransform.position.y > floor) speedY -= gravity*Time.deltaTime;
	else {
		canJump = true;
		can2Jump = true;
		//impuls per pujar esglaons
		if (Mathf.Abs(floor - playerTransform.position.y) > 0.08f) speedY = impulseY*Mathf.Abs(floor - playerTransform.position.y);
		else {
			speedY = 0.0f;
			playerTransform.position.y = floor;
		}
	}
	
	//jump
	if (canJump && (Input.GetKeyDown('z')||bJump)&& !pause && !dead && !tuto ){
		bJump=false;
		playerTransform.position.y = floor;
		speedY = impulseY;
		canJump= false;
	}else if (Character == 7 && !canJump && can2Jump && (Input.GetKeyDown('z')||bJump)&& !pause && !dead && !tuto ){
		speedY = impulseY;
		can2Jump= false;
	}
	
		//marker canJump
		/*var rendJump = markerJump.GetComponent.<Renderer>();
		if (canJump) rendJump.material.color = Color.green;
		else  rendJump.material.color = Color.red;*/
	
	//charge
	if (!charging && !rotating && !reversing && !tuto && stamina > 0 && !pause && !dead && (Input.GetKeyDown('x')||bCharge)){
		bCharge=false;
		charging = true;
		rotating = true;
		//initTimeRotation = Time.time;
		Charge();
	}
		//marker Charge
		var rendCharge = markerCharge.GetComponent.<Renderer>();
		if (charging) rendCharge.material.color = Color.green;
		else rendCharge.material.color = Color.red;
	
	//canvi d'sprite
	SwapSprite();
			
	
}

function GainStamina(){
	if(stamina<3 && Character == 8){
		stamina++;
		Manager.SendMessage("SetStamina", 1);
	}
}

function Charge(){
	speedX = impulseX;	speedY -= 0.5f;
	Manager.SendMessage("SetStamina", -1);
	//yield WaitForSeconds(waitCharge);
	//charging = false;
	//Debug.Log("charge done, stamina:" + stamina);
}

function SwapSprite(){
	//assignar el valor actual al contador
	//if (rotating || reversing) var curTimeRotation = Time.time;
	//rotar sprite 180 graus en y
	if (rotating) {
		if (playerSprite.localEulerAngles.y >= 180.0) {
			playerSprite.localEulerAngles = new Vector3(0.0,180.0,0.0);
			rotating = false;
			reversing = true;
		}
		else playerSprite.RotateAround(playerTransform.position, playerTransform.up, Time.deltaTime * speedRotating);
		//Debug.Log("rotating");
	}
	//revertir la rotacio anterior 180 graus en y despres d'un temps determinat pel contador
	if (reversing &&/* curTimeRotation - initTimeRotation >= waitSwap*/ speedX == constSpeedX) {
		if (playerSprite.localEulerAngles.y <= 20.0 && playerSprite.localEulerAngles.y >= 0.0) {
			playerSprite.localEulerAngles = new Vector3(0.0,0.0,0.0);
			rotating = false;
			reversing = false;
		}
		else playerSprite.RotateAround(playerTransform.position, playerTransform.up, Time.deltaTime * -speedReversing);
		//Debug.Log("reversing");
	}
}