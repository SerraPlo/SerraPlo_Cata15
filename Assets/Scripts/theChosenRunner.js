#pragma strict

private var stamina:int = 3;
private var score:int = 0;
private var pause:boolean = false;

//---------GUIstyles---------
var pauseGuiStyle:GUIStyle;
var scoreGuiStyle:GUIStyle;
var staminaGuiStyle:GUIStyle;
var pauseBGGuiStyle:GUIStyle;
var pauseBoxGuiStyle:GUIStyle;
var continueGuiStyle:GUIStyle;
var restartGuiStyle:GUIStyle;
var menuGuiStyle:GUIStyle;

//---------GUI---------
function OnGUI (){
	if(pause){
		GUI.Box(Rect(0,0,Screen.width,Screen.height), "", pauseBGGuiStyle);
		GUI.Box(Rect(Screen.width/2-Screen.width/6,Screen.height/2-Screen.height/8,Screen.width/3,Screen.height/4), "", pauseBoxGuiStyle);
		if (GUI.Button(Rect (Screen.width/2-((Screen.height/16)*3.5),Screen.height/2-(Screen.height/16),Screen.height/8,Screen.height/8), "", continueGuiStyle)) {
    		Time.timeScale = 1.0;
    		pause = false;
    	}
    	if (GUI.Button(Rect (Screen.width/2-(Screen.height/16),Screen.height/2-(Screen.height/16),Screen.height/8,Screen.height/8), "", restartGuiStyle)) {
    		Time.timeScale = 1.0;
    		Application.LoadLevel(1);
    	}
    	if (GUI.Button(Rect (Screen.width/2+((Screen.height/16)*1.5),Screen.height/2-(Screen.height/16),Screen.height/8,Screen.height/8), "", menuGuiStyle)) {
    		Time.timeScale = 1.0;
    		Application.LoadLevel(0);
    	}
	}
    scoreGuiStyle.fontSize = Screen.height/15;
    GUI.Label (new Rect (Screen.width/2, Screen.height/15, 1, 1), ""+score, scoreGuiStyle);
    for(var s = 1; s<=stamina;s++){
    	GUI.Box(Rect (Screen.width/20*(15+s)+(Screen.width/80*s)-Screen.height/20,Screen.height/20,Screen.height/10,Screen.height/10), "", staminaGuiStyle);
    }
    //stamina = GUI.HorizontalSlider (Rect (Screen.width/20, (Screen.height/20)*19, Screen.width/5, Screen.height/20), stamina, 0.0, 3.0);

	//pause
    if (GUI.Button(Rect (Screen.height/20,Screen.height/20,Screen.height/10,Screen.height/10), "", pauseGuiStyle)) {
    	if(!pause){
    		Time.timeScale = 0.0;
    		pause = true;
    	}else{
    		Time.timeScale = 1.0;
    		pause = false;
    	}
    }
}

function GetStamina(){
	return stamina;
}

function GetPause(){
	return pause;
}

function SetScore(pos:float){
	score=pos;
}

function SetStamina(ammount:int){
	stamina+=ammount;
}

function Start () {
	
}



function Update () {
	
}

