﻿#pragma strict

private var lvl:int = 0;			//nivell del terra
private var dist:float = 0.5f;		//distancia en x entre terra i terra
private var height:float = 0.25f;	//distancia en y entre terra i terra
private var i:int = -20;			//posicio del nou terra a colocar

var stepU:GameObject;				//prefab de l'esglao cap amunt
var stepD:GameObject;				//prefab de l'esglao cap avall
var stepG:GameObject;				//prefab de l'esglao pla

var realFloor:float;
private var realFloorR:float;
private var realFloorL:float;

private var width:float = 0.8f; //<------------------------ aqui ta lamplada del jugador
private var stepArray:GameObject[];
private var prevArray:int[];
private var playerStep:int;
private var pPlayerStep:int;
private var playerPos:float;
private var stepsInScene:int = 50;

var stamina:int = 3;
private var score:int = 0;

//---------markers----------
var marker1:GameObject;
var marker2:GameObject;
//--------------------------

function OnGUI (){
    if (GUI.Button(Rect (20,40,80,20), "::")) {
    	Debug.Log("sd");
    }
    /*GUI.Box (Rect (0,0,100,50), "Top-left");
    GUI.Box (Rect (Screen.width - 100,0,100,50), "Top-right");
    GUI.Box (Rect (0,Screen.height - 50,100,50), "Bottom-left");
    GUI.Box (Rect (Screen.width - 100,Screen.height - 50,100,50), "Bottom-right");*/
    //GUIStyle(GUI.skin.label).alignment = TextAnchor.UpperCenter;
    GUI.Label (new Rect (Screen.width/2, 25, 100, 30), ""+score);
    stamina = GUI.HorizontalSlider (Rect (Screen.width - 100, 25, 100, 30), stamina, 0.0, 3.0);
}


/*
0_ forat
1_ Pla
2_ +
3_ -
*/

function returnFloor(pos:float) {
	score = pos;
	var posR:float = pos+width/2.0f;
	marker1.transform.position.x = posR;
	var posL:float = pos-width/2.0f;
	marker2.transform.position.x = posL;
	for (var k=0; k<stepsInScene; k++) {
		if (pos >= stepArray[k].transform.position.x && pos < stepArray[k].transform.position.x + 0.5f) {
			playerStep = k;
			playerPos = pos;
		}
		if (posR >= stepArray[k].transform.position.x && posR < stepArray[k].transform.position.x + 0.5f) {
			if (stepArray[k].tag == "GroundG") realFloorR = stepArray[k].transform.position.y;
			else if (stepArray[k].tag == "GroundU") realFloorR = stepArray[k].transform.position.y + 0.25f;
			else if (stepArray[k].tag == "GroundD") realFloorR = stepArray[k].transform.position.y - 0.25f;
		}
		if (posL >= stepArray[k].transform.position.x && posL < stepArray[k].transform.position.x + 0.5f) {
			if (stepArray[k].tag == "GroundG") realFloorL = stepArray[k].transform.position.y;
			else if (stepArray[k].tag == "GroundU") realFloorL = stepArray[k].transform.position.y + 0.25f;
			else if (stepArray[k].tag == "GroundD") realFloorL = stepArray[k].transform.position.y - 0.25f;
		}
	}
	realFloor = (realFloorL >= realFloorR) ? realFloorL:realFloorR;
	return realFloor;
}

function Stamina(ammount:int){
	stamina+=ammount;
}

function randomGenerator(g:int) {
	var rand:int = Random.Range(0, 100);
	var up:boolean;
	var down:boolean;
	prevArray = new int[3];
	if (i<10) {
		down = true;
		up = true;
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
		//Debug.Log(down);
	}
	Destroy(stepArray[g]);
	if (lvl == 0) {
		if (rand < 80) stepArray[g] = Instantiate(stepG,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
		else if (!down && rand < 90)  { 
			stepArray[g] = Instantiate(stepU,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
			lvl++;
		}
		else if (!up) {
			stepArray[g] = Instantiate(stepD,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
			lvl--;
		}
		else stepArray[g] = Instantiate(stepG,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
	}
	else if (lvl > 0) {
		if (rand < 80) stepArray[g] = Instantiate(stepG,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
		else if (!down && rand < 90-lvl*5) {
			stepArray[g] = Instantiate(stepU,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
			lvl++;
		}
		else if (!up) {
			stepArray[g] = Instantiate(stepD,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
			lvl--;
		}
		else stepArray[g] = Instantiate(stepG,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
	}
	else {
		if (rand < 80) stepArray[g] = Instantiate(stepG,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
		else if (!up && rand < 90+lvl*5)  {
			stepArray[g] = Instantiate(stepD,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
			lvl--;
		}
		else if(!down) {
			stepArray[g] = Instantiate(stepU,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
			lvl++;
		}
		else stepArray[g] = Instantiate(stepG,new Vector3(i * dist, height*lvl, 0), Quaternion.identity);
	}
	i++;
}

function Start () {
	stepArray = new GameObject[stepsInScene];
	for (var g = 0; g<stepsInScene; g++){
		randomGenerator(g);
	}
	pPlayerStep=0;
}

function Update () {
	if (pPlayerStep!=playerStep){
		pPlayerStep=playerStep;
		var r:int = (playerStep ==0)? stepsInScene-1 : playerStep-1;
		var backSteps:int = 0;
		for(var g = r; g!=playerStep; g--){
			if(g ==-1) g=stepsInScene-1;
			if(stepArray[g].transform.position.x < playerPos) backSteps++;
			if(backSteps>25){
				randomGenerator(g);
				break;
			}			
		}
	}
	//Debug.Log(lvl);
}

