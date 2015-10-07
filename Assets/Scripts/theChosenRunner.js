#pragma strict

//PlayerPrefs - Aqui es crea hS_1 que es el record del runner
private var Character:int=0;

private var stamina:int;
private var score:int = 0;
private var hScore:int = 0;
private var pause:boolean = false;
private var dead:boolean = false;
private var dead1:boolean = false;
private var dead2:boolean = false;
private var improving:boolean = false;
private var added:boolean = false;

private var monsters:int;

private var showRate = 0.4;
private var lastShow = 0.0;
private var show:boolean = false;

private var tuto1:Texture;
private var tuto2:Texture;
private var tutoLvl:int;

var deadLion:Texture;

//---------GUIstyles---------
var pauseGuiStyle:GUIStyle;
var scoreGuiStyle:GUIStyle;
var hScoreGuiStyle:GUIStyle;
var staminaGuiStyle:GUIStyle;
var pauseBGGuiStyle:GUIStyle;
var pauseBoxGuiStyle:GUIStyle;
var continueGuiStyle:GUIStyle;
var backGuiStyle:GUIStyle;
var restartGuiStyle:GUIStyle;
var menuGuiStyle:GUIStyle;
var pHStyle:GUIStyle;
var deadTGuiStyle:GUIStyle;
//---------GUI---------
function OnGUI (){
// tuto
	if (tutoLvl==1){
		Time.timeScale = 0.0;
		GUI.DrawTexture(Rect (0,0,Screen.width,Screen.height),tuto1);
		if (GUI.Button(Rect (Screen.width/20*(19)-(Screen.height/20)*2,Screen.height-(Screen.height/6),Screen.height/8,Screen.height/8), "", continueGuiStyle)) {
    		tutoLvl++;
    	}
    	
	}
	else if (tutoLvl == 2){
		Time.timeScale = 0.0;
		GUI.DrawTexture(Rect (0,0,Screen.width,Screen.height),tuto2);
		if (GUI.Button(Rect (Screen.width/20*(18)-(Screen.height/20)*3,Screen.height-(Screen.height/6),Screen.height/8,Screen.height/8), "", backGuiStyle)) {
    		tutoLvl--;
    	}
		if (GUI.Button(Rect (Screen.width/20*(19)-(Screen.height/20)*2,Screen.height-(Screen.height/6),Screen.height/8,Screen.height/8), "", continueGuiStyle)) {
    		tutoLvl++;
    		Time.timeScale = 1.0;
    	}
	}
// /tuto	

	if(pause){
		Debug.Log(monsters);
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
			PlayerPrefs.SetInt("money", PlayerPrefs.GetInt("money") + score + monsters*10);
			added = true;
		}
		if (PlayerPrefs.HasKey("hS_1")){
			if(hScore>PlayerPrefs.GetInt("hS_1")) PlayerPrefs.SetInt("hS_1", hScore);
		}else PlayerPrefs.SetInt("hS_1", score);
		GUI.Box(Rect(0,0,Screen.width,Screen.height), "", pauseBGGuiStyle);
		GUI.Box(Rect(Screen.width/2-Screen.width/6,Screen.height/2-Screen.height/16,Screen.width/3,Screen.height/4), "", pauseBoxGuiStyle);
		GUI.DrawTexture(Rect(Screen.width/2-Screen.width/9,Screen.height/2-Screen.height/3.32,Screen.width/4.5,Screen.height/3.6), deadLion);
		if(improving){
			if (show)GUI.Box(Rect(Screen.width/2+Screen.width/5,Screen.height/2,Screen.width/10,Screen.height/8), "Nou\nrècord", pauseBoxGuiStyle);                                        //NEWRECORD
			else GUI.Box(Rect(Screen.width/2+Screen.width/5,Screen.height/2,Screen.width/10,Screen.height/8), "", pauseBoxGuiStyle);
		}GUI.Label (Rect (Screen.width/2-Screen.width/6.5,Screen.height/2+(Screen.height/23)*-0.5,Screen.height/4,Screen.height/10), "Distància: "+score, deadTGuiStyle);
		GUI.Label (Rect (Screen.width/2-Screen.width/6.5,Screen.height/2+(Screen.height/23)*0.5,Screen.height/4,Screen.height/10), "Derrotats: "+monsters, deadTGuiStyle);
		GUI.Label (Rect (Screen.width/2-Screen.width/6.5,Screen.height/2+(Screen.height/23)*1.5,Screen.height/4,Screen.height/10), "Total: "+(monsters*10+score) + "€", deadTGuiStyle);
		GUI.Label (Rect (Screen.width/2-Screen.width/6.5,Screen.height/2+(Screen.height/23)*3,Screen.height/4,Screen.height/10), "Compte: "+PlayerPrefs.GetInt("money") + "€", deadTGuiStyle);

    	if (GUI.Button(Rect (Screen.width/2/*-(Screen.height/16)*/,Screen.height/2,Screen.height/8,Screen.height/8), "", restartGuiStyle)) {  //restart
    		Time.timeScale = 1.0;
    		dead=false;
    		Application.LoadLevel(1);
    	}
    	if (GUI.Button(Rect (Screen.width/2+((Screen.height/16)*2.1),Screen.height/2,Screen.height/8,Screen.height/8), "", menuGuiStyle)) {//menu
    		Time.timeScale = 1.0;
    		dead=false;
    		Application.LoadLevel(0);
    	}
	}
	//
    scoreGuiStyle.fontSize = Screen.height/15;
    hScoreGuiStyle.fontSize = Screen.height/17;
    deadTGuiStyle.fontSize = Screen.height/25;
    pauseBoxGuiStyle.fontSize = Screen.height/25;
    GUI.Label (Rect (Screen.width/2-Screen.width/14,Screen.height/20,Screen.height/4,Screen.height/10), ""+score, scoreGuiStyle);
    
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
    		GUI.Label (new Rect (Screen.height/20,(Screen.height/20)*17.2, Screen.height/2.5,Screen.height/10), "  Rècord: "+hScore, hScoreGuiStyle);
    	}
    	else {
    		showRate = 0.3;
    		GUI.Label (new Rect (Screen.height/20,(Screen.height/20)*17.2, Screen.height/2.5,Screen.height/10), "  Rècord: ", hScoreGuiStyle);
    	}
    }else GUI.Label (new Rect (Screen.height/20,(Screen.height/20)*17.2, Screen.height/2.5,Screen.height/10), "  Rècord: "+hScore, hScoreGuiStyle);
      
    for(var s = 1; s<=stamina;s++){
    	GUI.Box(Rect (Screen.width/20*(20-s)-(Screen.width/60*(s-1))-Screen.height/20,Screen.height/20,Screen.height/10,Screen.height/10), "", staminaGuiStyle);
    }
    if(!dead1 && !dead2 && Character == 6) GUI.Box(Rect(Screen.width/20*(20-5)-(Screen.width/60*(5-1))-Screen.height/20,Screen.height/20,Screen.height/10,Screen.height/10), "", pHStyle);
    else if(dead1 && !dead2 && Character == 6){
    	if (Time.time >= lastShow+0.1){
    		show = !show;
    		lastShow = Time.time;
    	}if (show) GUI.Box(Rect(Screen.width/20*(20-5)-(Screen.width/60*(5-1))-Screen.height/20,Screen.height/20,Screen.height/10,Screen.height/10), "", pHStyle);
    }
    //stamina = GUI.HorizontalSlider (Rect (Screen.width/20, (Screen.height/20)*19, Screen.width/5, Screen.height/20), stamina, 0.0, 3.0);

	//pause
    if (GUI.Button(Rect (Screen.height/20,Screen.height/20,Screen.height/10,Screen.height/10), "", pauseGuiStyle) && !dead && tutoLvl!=1 &&  tutoLvl!=2) {
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

function GetTuto(){
	var tuto:boolean;
	if (tutoLvl>0&& tutoLvl<3) tuto = true;
	else tuto = false;
	return tuto;
}

function GetDead(){
	return dead;
}

function GetHScore(){
	return hScore;
}

function SetScore(pos:float){
	score=pos;
}

function SetMonsters(pos:int){
	monsters=pos;
	//Debug.Log("done");
}

function SetStamina(ammount:int){
	stamina+=ammount;
}
function Die(){
	if(PlayerPrefs.GetInt("Character") == 6){  //2 vides de l'os
		if(!dead2){
			dead1 = true;
			yield WaitForSeconds(1);
			dead2 = true;
		}else dead=true;
	}
	else dead=true;
}

function Awake () {
	if (PlayerPrefs.GetInt("Character")==9) stamina = 5;
	else if (PlayerPrefs.GetInt("Character")==8) stamina = 1;
	else stamina = 3;
	hScore= PlayerPrefs.GetInt("hS_1");
	if(hScore==0) {
		tutoLvl=1;
		tuto1 = Resources.Load("tuto1") as Texture;
		tuto2 = Resources.Load("tuto2") as Texture;
	}
	else tutoLvl=0;
	
}

function Start () {
	if(PlayerPrefs.HasKey("Character"))Character = PlayerPrefs.GetInt("Character");
	else Character = 0;
	improving = false;
	added = false;
	monsters=0;
	//Debug.Log("High score = " + PlayerPrefs.GetInt("hS_1"));
}



function Update () {
if (Input.GetKeyDown('m')){
		PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money"))+10);
		Debug.Log("m pressed, 10 money added");
	}
	if (Input.GetKeyDown('e')){
		Die();
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

