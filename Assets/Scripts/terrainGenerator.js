#pragma strict

var stepU:GameObject;				//prefab de l'esglao cap amunt
var stepD:GameObject;				//prefab de l'esglao cap avall
var stepG:GameObject;				//prefab de l'esglao pla
var empty:GameObject;
var foodSprite:GameObject;	
var fragmentSprite:GameObject;	
var enemy1:GameObject;
var enemy2:GameObject;
var cartell:GameObject;
private var chanceFood = 10;     //% food appear over 1000

private var lvl:int = 0;			//nivell del terra
private var dist:float = 0.5f;		//distancia en x entre terra i terra
private var height:float = 0.25f;	//distancia en y entre terra i terra
private var curPos:int = -20;		//posicio del nou terra a colocar

private var realFloor:float;
private var realFloorR:float;
private	var realFloorL:float;

private var width:float = 0.8f; //<------------------------ aqui ta lamplada del jugador

private var stepUA:GameObject[];
private var stepDA:GameObject[];
private var stepGA:GameObject[];

private var iStepU:int;
private var iStepD:int;
private var iStepG:int;

private var stepArray:GameObject[];
private var stepArrayPos:Vector3[];

private var foodArray:GameObject[];
private var fragmentObj:GameObject;
private var enemiesArray:GameObject[];
private var playerStep:int;
private var pPlayerStep:int;
private var playerPos:float;
private var stepsInScene:int = 50;

private var fragment:boolean = false;

private var lastEnemies = 0.1;
private var desiredTime = 5.4;
private var numEnemics:int;
private var descans:boolean;
private var descans1:boolean;
var foodInArray:int = 0;
var enemyInArray:int = 0;

//---------markers----------
var marker1:GameObject;
var marker2:GameObject;

function Awake() {
	stepArray = new GameObject[stepsInScene];
	stepArrayPos = new Vector3[stepsInScene];
	stepUA = new GameObject[stepsInScene];
	stepDA = new GameObject[stepsInScene];
	stepGA = new GameObject[stepsInScene];
	iStepG = stepsInScene-1;
	iStepU = stepsInScene-1;
	iStepD = stepsInScene-1;
	var countI:int;
	for (countI = 0;countI<stepsInScene;countI++){
		stepUA[countI] = Instantiate(stepU,new Vector3(0, 0, 0), Quaternion.identity);
		stepUA[countI].SetActive (false);
		stepDA[countI] = Instantiate(stepD,new Vector3(0, 0, 0), Quaternion.identity);
		stepDA[countI].SetActive (false);
		stepGA[countI] = Instantiate(stepG,new Vector3(0, 0, 0), Quaternion.identity);
		stepGA[countI].SetActive (false);
		stepArray[countI]=Instantiate(empty,new Vector3(0, 0, 0), Quaternion.identity);
	}
	foodArray = new GameObject[10];
	enemiesArray = new GameObject[10];
	for (var g = 0; g<stepsInScene; g++) randomGenerator(g);
	pPlayerStep=0;
}

function Update() {
	if (pPlayerStep!=playerStep){
		pPlayerStep=playerStep;
		var r:int = (playerStep == 0)? stepsInScene-1 : playerStep-1;
		var backSteps:int = 0;
		for(var g = r; g!=playerStep; g--){
			if(g ==-1) g=stepsInScene-1;
			if(stepArrayPos[g].x < playerPos) backSteps++;
			if(backSteps>20){
				randomGenerator(g);
				break;	
			}
		}
	}
}

function GetRealFloor() {
	return realFloor;
}

function Start(){
	Random.seed = System.DateTime.Now.Ticks;
	cartell = Instantiate(cartell,new Vector3(PlayerPrefs.GetInt("hS_1"), 1, 2), Quaternion.identity);
}

function SetRealFloor(pos:float) {
	var posR:float = pos+width/2.0f;
	marker1.transform.position.x = posR;
	var posL:float = pos-width/2.0f;
	marker2.transform.position.x = posL;
	for (var k=0; k<stepsInScene; k++) {
		if (pos >= stepArrayPos[k].x && pos < stepArrayPos[k].x + 0.5f) {
			playerStep = k;
			playerPos = pos;
		}
		if (posR >= stepArrayPos[k].x && posR < stepArrayPos[k].x + 0.5f) {
			if (stepArray[k].tag == "GroundG") realFloorR = stepArrayPos[k].y;
			else if (stepArray[k].tag == "GroundU") realFloorR = stepArrayPos[k].y + 0.25f;
			else if (stepArray[k].tag == "GroundD") realFloorR = stepArrayPos[k].y - 0.25f;
		}
		if (posL >= stepArrayPos[k].x && posL < stepArrayPos[k].x + 0.5f) {
			if (stepArray[k].tag == "GroundG") realFloorL = stepArrayPos[k].y;
			else if (stepArray[k].tag == "GroundU") realFloorL = stepArrayPos[k].y + 0.25f;
			else if (stepArray[k].tag == "GroundD") realFloorL = stepArrayPos[k].y - 0.25f;
		}
	}
	realFloor = (realFloorL >= realFloorR) ? realFloorL:realFloorR;
//	Debug.Log(realFloor);
}
function ReturnRequestFloor(pos:float) {
	var posR:float = pos+width/2.0f;
	//marker1.transform.position.x = posR;
	var posL:float = pos-width/2.0f;
	//marker2.transform.position.x = posL;
	for (var k=0; k<stepsInScene; k++) {
		if (pos >= stepArrayPos[k].x && pos < stepArrayPos[k].x + 0.5f) {
			playerStep = k;
			playerPos = pos;
		}
		if (posR >= stepArrayPos[k].x && posR < stepArrayPos[k].x + 0.5f) {
			if (stepArray[k].tag == "GroundG") realFloorR = stepArrayPos[k].y;
			else if (stepArray[k].tag == "GroundU") realFloorR = stepArrayPos[k].y + 0.25f;
			else if (stepArray[k].tag == "GroundD") realFloorR = stepArrayPos[k].y - 0.25f;
		}
		if (posL >= stepArrayPos[k].x && posL < stepArrayPos[k].x + 0.5f) {
			if (stepArray[k].tag == "GroundG") realFloorL = stepArrayPos[k].y;
			else if (stepArray[k].tag == "GroundU") realFloorL = stepArrayPos[k].y + 0.25f;
			else if (stepArray[k].tag == "GroundD") realFloorL = stepArrayPos[k].y - 0.25f;
		}
	}
	var requestFloor:float;
	requestFloor = (realFloorL >= realFloorR) ? realFloorL:realFloorR;
	return requestFloor;
}

function TakeF(type:int, pos:Vector3){
	if (type==0){
		stepGA[iStepG].transform.position = pos;
		stepGA[iStepG].SetActive (true);
		/*for (var destG = 0; destG<stepsInScene;destG++){
			if(destG>40 && iStepG-destG>=0) stepGA[iStepG-destG].SetActive(false);
			else if (destG>40) stepGA[stepsInScene-(destG-iStepG)].SetActive(false);
		}*/
		if (iStepG + 1 >= stepsInScene) iStepG = 0;
		else iStepG++;
	}
	else if (type==1){
		stepUA[iStepU].transform.position = pos;
		stepUA[iStepU].SetActive (true);
		for (var destU = 0; destU<stepsInScene;destU++){
			if(destU>8 && iStepU-destU>=0) stepUA[iStepU-destU].SetActive(false);
			else if (destU>8) stepUA[stepsInScene-(destU-iStepU)].SetActive(false);
		}
		if (iStepU + 1 >= stepsInScene) iStepU = 0;
		else iStepU++;
	}
	else{
		stepDA[iStepD].transform.position = pos;
		stepDA[iStepD].SetActive (true);
		for (var destD = 0; destD<stepsInScene;destD++){
			if(destD>8 && iStepD-destD>=0) stepDA[iStepD-destD].SetActive(false);
			else if (destD>8) stepDA[stepsInScene-(destD-iStepD)].SetActive(false);
		}
		if (iStepD + 1 >= stepsInScene) iStepD = 0;
		else iStepD++;
	}
}

function SetFragment(val:boolean){
	fragment = val;
}

function randomGenerator(g:int) {
	var rand:int = Random.Range(0, 100);
	var rand2:int = Random.Range(0, 1000);
	
	var up:boolean;
	var down:boolean;
	var food:boolean;
	var enemies1:boolean;
	var enemies2:boolean;
	var incr:float = Mathf.Sqrt(curPos);
	if (incr >=40) incr = 40;
	var prevArray:int[] = new int[3];
	if (curPos<30) {
		food = false;
	}
	else {
		for (var tit:int = 1; tit < 4;tit++){
			prevArray[tit-1] = g-tit;
			if (prevArray[tit-1] < 0) prevArray[tit-1] =  stepsInScene+prevArray[tit-1];
		}
		if (stepArray[prevArray[0]].tag == "GroundD" ||
			stepArray[prevArray[1]].tag == "GroundD" /*||
			stepArray[prevArray[2]].tag == "GroundD"*/ ) down = true;
		else down = false;
		
		if (stepArray[prevArray[0]].tag == "GroundU" ||
			stepArray[prevArray[1]].tag == "GroundU" /*||
			stepArray[prevArray[2]].tag == "GroundU"*/ ) up = true;
		else up = false;
		
		
		if (curPos<10) food = false;
		else if (rand2<chanceFood+(10-incr/4))food = true;
		else food = false;
		
		if (Time.time >= desiredTime+lastEnemies){
			enemies1 = true;
			//numEnemics = Random.Range(1, 2+Mathf.Sqrt(curPos)/20);
			desiredTime = Random.Range(0.5,2.5-(incr * 0.05));
			Debug.Log(desiredTime);
			lastEnemies = Time.time;
			descans = false;
			descans1 = false;
		}
		else enemies1 = false;
	}
	
	stepArray[g].transform.position = new Vector3(curPos * dist, height*lvl, 0);
	var queToca:int;
	if (curPos<10) queToca=0;
	else if (lvl == 0) {
		if (!up && rand > 90){ lvl--; queToca=2; }                                     //stepD
		else if (!down && rand > 80){ lvl++; queToca=1;}                               //stepU
		else queToca=0;                                                                //stepG
	}else if (lvl > 0) {	
		if (!down && rand < 90-lvl*5 && rand > 80){ lvl++; queToca=1;}                 //stepU
		else if (!up && rand > 80){ lvl--; queToca=2;}                                 //stepD
		else queToca=0;                                                                //stepG
	}else {
		if (!up && rand < 90+lvl*5 && rand > 80){ lvl--; queToca=2;}                   //stepD
		else if(!down && rand > 80){ lvl++; queToca=1;}                                //stepU
		else queToca=0;                                                                //stepG
	}
	TakeF(queToca,(stepArray[g] as GameObject).GetComponent(Transform).position); //terra que toca
	
	if (queToca == 0) stepArray[g].tag = "GroundG";
	else if (queToca == 1) stepArray[g].tag = "GroundU";
	else stepArray[g].tag = "GroundD";
	
	if (food){
		Destroy(foodArray[foodInArray]);
		var alturaF:int = (rand%2==0) ? 0:2;
		foodArray[foodInArray] = Instantiate(foodSprite,new Vector3(curPos* dist, height*lvl + alturaF, 0.1), Quaternion.identity);
		foodInArray = (foodInArray < 9)? foodInArray+1 : 0; //uoooooooooo has posat un operador ternari :)
	}
	if (fragment){
		fragment = false;
		Destroy(fragmentObj);
		var alturaR:int = (rand%2==0) ? 0:2;
		fragmentObj = Instantiate(fragmentSprite,new Vector3(curPos* dist*1.2, height*lvl + alturaR, 0.1), Quaternion.identity);
	}
	
	if (enemies1){
		Destroy(enemiesArray[enemyInArray]);
		var alturaE:int = (rand%3<2) ? 0:2;
		var sumaAltura:float = Mathf.Sqrt(curPos);
		if (sumaAltura >=40) sumaAltura = 40;
		desiredTime = Random.Range(0.5,2.5-(incr * 0.05));
		if (alturaE == 2)enemiesArray[enemyInArray] = Instantiate(enemy2,new Vector3(curPos* dist, height*lvl + (0.4 - sumaAltura/100), 0.1), Quaternion.identity);
		else enemiesArray[enemyInArray] = Instantiate(enemy1,new Vector3(curPos* dist, height*lvl, 0.1), Quaternion.identity);
		enemyInArray = (enemyInArray < 9)? enemyInArray+1 : 0;
	}
	/*if (enemies2){
		Destroy(enemiesArray[enemyInArray]);
		var alturaE:int = (rand%2==0) ? 0:2;
		if (alturaE == 2)enemiesArray[enemyInArray] = Instantiate(enemy2,new Vector3(curPos* dist, height*lvl, 0.1), Quaternion.identity);
		else enemiesArray[enemyInArray] = Instantiate(enemy1,new Vector3(curPos* dist, height*lvl, 0.1), Quaternion.identity);
		enemyInArray = (enemyInArray < 9)? enemyInArray+1 : 0;
	}*/
	
	stepArrayPos[g] = (stepArray[g] as GameObject).GetComponent(Transform).position;
	curPos++;
}