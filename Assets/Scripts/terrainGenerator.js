﻿#pragma strict

var stepU:GameObject;				//prefab de l'esglao cap amunt
var stepD:GameObject;				//prefab de l'esglao cap avall
var stepG:GameObject;				//prefab de l'esglao pla
var foodSprite:GameObject;	
var enemy1:GameObject;
var chanceFood:int = 5;     //% food appear over 1000

private var lvl:int = 0;			//nivell del terra
private var dist:float = 0.5f;		//distancia en x entre terra i terra
private var height:float = 0.25f;	//distancia en y entre terra i terra
private var curPos:int = -20;		//posicio del nou terra a colocar

private var realFloor:float;
private var realFloorR:float;
private	var realFloorL:float;

private var width:float = 0.8f; //<------------------------ aqui ta lamplada del jugador
private var stepArray:GameObject[];
private var stepArrayPos:Vector3[];
private var foodArray:GameObject[];
private var enemiesArray:GameObject[];
private var playerStep:int;
private var pPlayerStep:int;
private var playerPos:float;
private var stepsInScene:int = 50;

var foodInArray:int = 0;
var enemyInArray:int = 0;

//---------markers----------
var marker1:GameObject;
var marker2:GameObject;

function Awake() {
	stepArray = new GameObject[stepsInScene];
	stepArrayPos = new Vector3[stepsInScene];
	foodArray = new GameObject[10];
	enemiesArray = new GameObject[10];
	for (var g = 0; g<stepsInScene; g++) {
		randomGenerator(g);
	}
	pPlayerStep=0;
}

function Update() {
	if (pPlayerStep!=playerStep){
		pPlayerStep=playerStep;
		var r:int = (playerStep ==0)? stepsInScene-1 : playerStep-1;
		var backSteps:int = 0;
		for(var g = r; g!=playerStep; g--){
			if(g ==-1) g=stepsInScene-1;
			if(stepArrayPos[g].x < playerPos) backSteps++;
			if(backSteps>25){
				randomGenerator(g);
				break;
			}			
		}
	}
}

function GetRealFloor() {
	return realFloor;
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
}

function randomGenerator(g:int) {
	var rand:int = Random.Range(0, 100);
	var rand2:int = Random.Range(0, 1000);
	var up:boolean;
	var down:boolean;
	var food:boolean;
	var enemies:boolean;
	var prevArray:int[] = new int[3];
	if (curPos<10) {
		down = true;
		up = true;
		food = false;
		enemies = false;
	} 
	else {
		for (var y:int = 1; y < 4;y++){
			prevArray[y-1] = g-y;
			if (prevArray[y-1] < 0) prevArray[y-1] =stepsInScene+prevArray[y-1];
		}
		if (stepArray[prevArray[0]].tag == "GroundD" || stepArray[prevArray[1]].tag == "GroundD" || stepArray[prevArray[2]].tag == "GroundD") down = true;
		else down = false;
		if (stepArray[prevArray[0]].tag == "GroundU" || stepArray[prevArray[1]].tag == "GroundU" || stepArray[prevArray[2]].tag == "GroundU") up = true;
		else up = false;
		if (rand2<chanceFood)food = true;
		else food = false;
		if (rand2>950) enemies = true;
		else enemies = false;
		//Debug.Log(down);
	}
	Destroy(stepArray[g]);
	if (lvl == 0) {
		if (rand < 80) stepArray[g] = Instantiate(stepG,new Vector3(curPos * dist, height*lvl, 0), Quaternion.identity);
		else if (!down && rand < 90)  { 
			stepArray[g] = Instantiate(stepU,new Vector3(curPos * dist, height*lvl, 0), Quaternion.identity);
			lvl++;
		}
		else if (!up) {
			stepArray[g] = Instantiate(stepD,new Vector3(curPos* dist, height*lvl, 0), Quaternion.identity);
			lvl--;
		}
		else stepArray[g] = Instantiate(stepG,new Vector3(curPos * dist, height*lvl, 0), Quaternion.identity);
	}
	else if (lvl > 0) {
		if (rand < 80) stepArray[g] = Instantiate(stepG,new Vector3(curPos* dist, height*lvl, 0), Quaternion.identity);
		else if (!down && rand < 90-lvl*5) {
			stepArray[g] = Instantiate(stepU,new Vector3(curPos * dist, height*lvl, 0), Quaternion.identity);
			lvl++;
		}
		else if (!up) {
			stepArray[g] = Instantiate(stepD,new Vector3(curPos * dist, height*lvl, 0), Quaternion.identity);
			lvl--;
		}
		else stepArray[g] = Instantiate(stepG,new Vector3(curPos* dist, height*lvl, 0), Quaternion.identity);
	}
	else {
		if (rand < 80) stepArray[g] = Instantiate(stepG,new Vector3(curPos * dist, height*lvl, 0), Quaternion.identity);
		else if (!up && rand < 90+lvl*5)  {
			stepArray[g] = Instantiate(stepD,new Vector3(curPos * dist, height*lvl, 0), Quaternion.identity);
			lvl--;
		}
		else if(!down) {
			stepArray[g] = Instantiate(stepU,new Vector3(curPos * dist, height*lvl, 0), Quaternion.identity);
			lvl++;
		}
		else stepArray[g] = Instantiate(stepG,new Vector3(curPos * dist, height*lvl, 0), Quaternion.identity);
	}
	if (food){
		Destroy(foodArray[foodInArray]);
		var alturaF:int;
		if (rand%2==0) alturaF = 0;
		else alturaF = 2; 
		foodArray[foodInArray] = Instantiate(foodSprite,new Vector3(curPos* dist, height*lvl + alturaF, 0.1), Quaternion.identity);
		foodInArray = (foodInArray < 9)? foodInArray+1 : 0; //uoooooooooo has posat un operador ternari :)
	}
	if (enemies){
		Destroy(enemiesArray[enemyInArray]);
		var alturaE:int;
		if (rand%2==0) alturaE = 0;
		else alturaE = 2; 
		enemiesArray[enemyInArray] = Instantiate(enemy1,new Vector3(curPos* dist, height*lvl + alturaE, 0.1), Quaternion.identity);
		enemyInArray = (enemyInArray < 9)? enemyInArray+1 : 0; //uoooooooooo has posat un operador ternari :)
	}
	stepArrayPos[g] = (stepArray[g] as GameObject).GetComponent(Transform).position;
	curPos++;
}