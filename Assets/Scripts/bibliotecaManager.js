#pragma strict

private var shopping:boolean = false;
private var endAnimIntro:boolean = false;
private var endVideo:boolean = false;
private var alpha:float = 1.0f;
static var restart:boolean = false; //provisional, millor player prefs

private var mainCameraScript:bibliotecaCameraBehaviour;
//private var mainCameraMovie:MovieTexture;
var mainCamera:GameObject;

var leftDoor:GameObject;
var rightDoor:GameObject;

var blackImage:Texture2D;
var atrezzoOutside:Transform;

function OnGUI() {
	GUI.color.a = alpha;
	GUI.DrawTexture(new Rect(0,0,Screen.width, Screen.height), blackImage);
	GUI.color.a = 1.0f;
	if(endAnimIntro){
		if (!shopping) {
			if (GUI.Button(Rect (Screen.width/2-((Screen.height/10)),Screen.height/2-(Screen.height/16),Screen.height/8,Screen.height/8), "PLAY")) {
	    		Application.LoadLevel(1);
	    	}
	    	if (GUI.Button(Rect (Screen.width/2+((Screen.height/10)),Screen.height/2-(Screen.height/16),Screen.height/8,Screen.height/8), "TENDA")) {
	    		shopping = true;
	    		SwapInMenu();
	    	}
    	}
    	else {
    		if (GUI.Button(Rect (Screen.width/2,Screen.height/2,Screen.height/8,Screen.height/8), "MENU")) {
	    		shopping = false;
	    		SwapInMenu();
	    	}
    	}
	}
}

function SwapInMenu() {
	if (shopping) {
		mainCamera.SendMessage("PlayChangeToShop");
    	yield WaitForSeconds(mainCameraScript.GetAnimLength(1));
	} else {
		mainCamera.SendMessage("PlayChangeToMenu");
    	yield WaitForSeconds(mainCameraScript.GetAnimLength(2));
    }
}
	
function Awake() {
	if (!restart) PlayIntro("IntroPageFlip4.mp4");
	else endVideo = true;
}

function Start() {
	mainCameraScript = mainCamera.GetComponent("bibliotecaCameraBehaviour") as bibliotecaCameraBehaviour;
	//mainCameraMovie = mainCamera.GetComponent(Renderer).material.mainTexture as MovieTexture;
	leftDoor.GetComponent(Animation).enabled = false;
	rightDoor.GetComponent(Animation).enabled = false;
}

function PlayIntro(videoPath:String) {
 	Handheld.PlayFullScreenMovie(videoPath, Color.black, FullScreenMovieControlMode.CancelOnInput);  
 	yield WaitForEndOfFrame();
 	alpha = 1.0f;
 	Debug.Log("Video playback completed.");
 	endVideo = true;
 	restart = true;
}

function Update() {
	if (endVideo) {
		if (alpha <= 0.0f)  {
			endVideo = false;
			EnterMainMenu();
		}
		else alpha -= Time.deltaTime*0.4f;
	}
}

function EnterMainMenu() {
	yield WaitForSeconds(0.1);
	
	leftDoor.GetComponent(Animation).enabled = true;
	leftDoor.GetComponent(Animation).Play("OpenLeftDoor");
	rightDoor.GetComponent(Animation).enabled = true;
	rightDoor.GetComponent(Animation).Play("OpenRightDoor");
	mainCamera.SendMessage("PlayEnterBiblioteca");
	yield WaitForSeconds(mainCameraScript.GetAnimLength(0));
	
	for (var child:Transform in atrezzoOutside) (child.gameObject).SetActive(false);
	leftDoor.SetActive(false);
	rightDoor.SetActive(false);
	endAnimIntro = true;
}