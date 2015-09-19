#pragma strict

//PlayerPrefs - Aqui es crea hS_1 que es el record del runner

private var stamina:int = 3;
private var score:int = 0;
private var hScore:int = 0;
private var pause:boolean = false;
private var dead:boolean = false;
private var improving:boolean = false;
private var added:boolean = false;

private var showRate = 0.4;
private var lastShow = 0.0;
private var show:boolean = false;

//---------GUIstyles---------
var pauseGuiStyle:GUIStyle;
var scoreGuiStyle:GUIStyle;
var hScoreGuiStyle:GUIStyle;
var staminaGuiStyle:GUIStyle;
var pauseBGGuiStyle:GUIStyle;
var pauseBoxGuiStyle:GUIStyle;
var continueGuiStyle:GUIStyle;
var restartGuiStyle:GUIStyle;
var menuGuiStyle:GUIStyle;
var pHStyle:GUIStyle;

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
	//dead
	if (dead){
		if (!added){
			PlayerPrefs.SetInt("money", PlayerPrefs.GetInt("money") + score);
			added = true;
		}
		if (PlayerPrefs.HasKey("hS_1")){
			if(hScore>PlayerPrefs.GetInt("hS_1")) PlayerPrefs.SetInt("hS_1", hScore);
		}else PlayerPrefs.SetInt("hS_1", score);
		GUI.Box(Rect(0,0,Screen.width,Screen.height), "", pauseBGGuiStyle);
		GUI.Box(Rect(Screen.width/2-Screen.width/6,Screen.height/2-Screen.height/8,Screen.width/3,Screen.height/4), "", pauseBoxGuiStyle);
		GUI.Label(Rect(Screen.width/2-Screen.width/6,Screen.height/2-Screen.height/8,Screen.width/3,Screen.height/4), "U DIED N00b",pauseBGGuiStyle);
    	if (GUI.Button(Rect (Screen.width/2-(Screen.height/16),Screen.height/2-(Screen.height/16),Screen.height/8,Screen.height/8), "", restartGuiStyle)) {
    		Time.timeScale = 1.0;
    		dead=false;
    		Application.LoadLevel(1);
    	}
    	if (GUI.Button(Rect (Screen.width/2+((Screen.height/16)*1.5),Screen.height/2-(Screen.height/16),Screen.height/8,Screen.height/8), "", menuGuiStyle)) {
    		Time.timeScale = 1.0;
    		dead=false;
    		Application.LoadLevel(0);
    	}
    	if (GUI.Button(Rect (Screen.width/2+((Screen.height/16)*5.5),Screen.height/2-(Screen.height/16),Screen.height/8,Screen.height/8), "", pHStyle)) {
    	
    	}
	}
	//
    scoreGuiStyle.fontSize = Screen.height/15;
    hScoreGuiStyle.fontSize = Screen.height/17;
    GUI.Label (new Rect (Screen.width/2, Screen.height/15, 1, 1), ""+score, scoreGuiStyle);
    
    if(hScore<score) {
    	improving = true;
    	hScore=score;
    }
    if(improving){
    	if (Time.time >= lastShow+showRate){
    		show = !show;
    		lastShow = Time.time;
    	}
    	if (show){
    		showRate = 0.7;
    		GUI.Label (new Rect (Screen.height/20,(Screen.height/20)*18, 1, 1), "Rècord: "+hScore, hScoreGuiStyle);
    	}
    	else {
    		showRate = 0.3;
    		GUI.Label (new Rect (Screen.height/20,(Screen.height/20)*18, 1, 1), "Rècord: ", hScoreGuiStyle);
    	}
    }else GUI.Label (new Rect (Screen.height/20,(Screen.height/20)*18, 1, 1), "Rècord: "+hScore, hScoreGuiStyle);
      
    for(var s = 1; s<=stamina;s++){
    	GUI.Box(Rect (Screen.width/20*(15+s)+(Screen.width/80*s)-Screen.height/20,Screen.height/20,Screen.height/10,Screen.height/10), "", staminaGuiStyle);
    }
    //stamina = GUI.HorizontalSlider (Rect (Screen.width/20, (Screen.height/20)*19, Screen.width/5, Screen.height/20), stamina, 0.0, 3.0);

	//pause
    if (GUI.Button(Rect (Screen.height/20,Screen.height/20,Screen.height/10,Screen.height/10), "", pauseGuiStyle) && !dead ) {
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

function GetDead(){
	return dead;
}

function SetScore(pos:float){
	score=pos;
}

function SetStamina(ammount:int){
	stamina+=ammount;
}
function Die(){
	dead=true;
}

function Start () {
	
	improving = false;
	added = false;
	hScore= PlayerPrefs.GetInt("hS_1");
	//Debug.Log("High score = " + PlayerPrefs.GetInt("hS_1"));
}



function Update () {
	if (Input.GetKeyDown('e')){
		dead = true;
		//Time.timeScale = 0.0;
	}
	if (Input.GetKeyDown('h')){
		PlayerPrefs.DeleteAll();
		Debug.Log("h pressed, PlayerPrefs deleted");
	}
	if (Input.GetKeyDown('m')){
		Debug.Log("money="+PlayerPrefs.GetInt("money"));
	}
}

