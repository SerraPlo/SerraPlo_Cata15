#pragma strict

private var shopping:boolean = false;
private var endAnimIntro:boolean = false;
private var endVideo:boolean = false;
private var alpha:float = 1.0f;
static var restart:boolean = false; //provisional, millor player prefs
var posCamMain:GameObject;

private var mainCameraScript:bibliotecaCameraBehaviour;
//private var mainCameraMovie:MovieTexture;
var mainCamera:GameObject;

var leftDoor:GameObject;
var rightDoor:GameObject;

var blackImage:Texture2D;
var atrezzoOutside:Transform;

var GS_Shop1:GUIStyle;
var GS_Money:GUIStyle;
var GS_Back:GUIStyle;
var shop1:Texture;
var shop2:Texture;
var shopLvl:int;

function OnGUI() {
	GUI.color.a = alpha;
	GUI.DrawTexture(new Rect(0,0,Screen.width, Screen.height), blackImage);
	GUI.color.a = 1.0f;
	if(endAnimIntro){
		if (!shopping) {
			if (GUI.Button(Rect (Screen.width/2-((Screen.height/10)),Screen.height/2-(Screen.height/16),Screen.height/8,Screen.height/8), "PLAY")) {
	    		Application.LoadLevel(1);
	    	}if (GUI.Button(Rect (Screen.width/2+((Screen.height/10)),Screen.height/2-(Screen.height/16),Screen.height/8,Screen.height/8), "TENDA")) {
	    		shopping = true;
	    		SwapInMenu();
	    	}
    	}
    	else {
    		if (alpha <= 0.0f)  {
				alpha = 0.0f;
	    		if(shopLvl == 0){
		    		GUI.DrawTexture(Rect (0,0,Screen.width,Screen.height),shop1);
    				GUI.Label (new Rect (Screen.width - Screen.height/20, Screen.height/6, 1, 1), ""+PlayerPrefs.GetInt("money"), GS_Money);
		    		if (GUI.Button(Rect (Screen.width - Screen.height/20*3,Screen.height/20,Screen.height/10,Screen.height/10), "", GS_Back)){
			    		shopping = false;
			    		SwapInMenu();
			    	}else if (GUI.Button(Rect((2.26*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1)) {
			    		shopLvl = 1;
			    		Debug.Log("1");
			    	}else if (GUI.Button(Rect((15*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1)) {
			    		Debug.Log("2");
			    	}else if (GUI.Button(Rect((27.77*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1)) {
			    		Debug.Log("3");
			    	}else if (GUI.Button(Rect((40.46*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1)) {
			    		Debug.Log("4");
			    	}else if (GUI.Button(Rect((53.24*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1)) {
			    		Debug.Log("5");
			    	}
			    	GS_Money.fontSize = Screen.height/15;
		    	}else if(shopLvl == 1){
		    		GUI.DrawTexture(Rect (0,0,Screen.width,Screen.height),shop2);
		    		if (GUI.Button(Rect (Screen.width - Screen.height/20*3,Screen.height/20,Screen.height/10,Screen.height/10), "", GS_Back)) shopLvl = 0;
					GUI.Label (new Rect (Screen.width - Screen.height/20, Screen.height/6, 1, 1), ""+PlayerPrefs.GetInt("money"), GS_Money);

			    	/*if (GUI.Button(Rect((2.26*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1)) {
			    		Debug.Log("LLibreB");
			    	}if (GUI.Button(Rect((15*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1)) {
			    		Debug.Log("2");
			    	}if (GUI.Button(Rect((27.77*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1)) {
			    		Debug.Log("3");
			    	}if (GUI.Button(Rect((40.46*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1)) {
			    		Debug.Log("4");
			    	}if (GUI.Button(Rect((53.24*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1)) {
			    		Debug.Log("5");
			    	}*/
			    	
		    	}
	    	}
			else{
				GUI.color.a = 1.0f;
				GUI.DrawTexture(Rect (0,0,Screen.width,Screen.height),shop1);
				GUI.color.a = alpha;
				GUI.DrawTexture(new Rect(0,0,Screen.width, Screen.height), blackImage);
				alpha -= Time.deltaTime;
			}
    	}
	}
}

function SwapInMenu() {
	endAnimIntro = false;
	if (shopping) {
		mainCamera.SendMessage("PlayChangeToShop");
    	yield WaitForSeconds(mainCameraScript.GetAnimLength(1));
    	alpha = 1.0f;
	} else {
		mainCamera.SendMessage("PlayChangeToMenu");
    	yield WaitForSeconds(mainCameraScript.GetAnimLength(2));
    }
    endAnimIntro = true;
}
	
function Awake() {
	shopLvl = 0;
	if (!restart) PlayIntro("IntroPageFlip4.mp4");
	else{
		for (var child:Transform in atrezzoOutside) (child.gameObject).SetActive(false);
		mainCamera.transform.position = posCamMain.transform.position;
		mainCamera.transform.rotation = posCamMain.transform.rotation;
		endVideo = true;
		endAnimIntro = true;
	}
	
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
}

function Update() {
	if (endVideo) {
		if (alpha <= 0.0f)  {
			endVideo = false;
			if(!restart) EnterMainMenu();
		}
		else alpha -= Time.deltaTime*0.4f;
	}
}

function EnterMainMenu() {
	yield WaitForSeconds(0.1);
	
	leftDoor.GetComponent(Animation).enabled = true;
	leftDoor.GetComponent(Animation).Play("OpenDoorLeft");
	rightDoor.GetComponent(Animation).enabled = true;
	rightDoor.GetComponent(Animation).Play("OpenDoorRight");
	mainCamera.SendMessage("PlayEnterBiblioteca");
	yield WaitForSeconds(mainCameraScript.GetAnimLength(0));
	
	for (var child:Transform in atrezzoOutside) (child.gameObject).SetActive(false);
	leftDoor.SetActive(false);
	rightDoor.SetActive(false);
	endAnimIntro = true;
	restart = true;
}