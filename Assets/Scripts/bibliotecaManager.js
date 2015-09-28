#pragma strict

private var shopping:boolean = false;
private var endAnimIntro:boolean = false;
private var endVideo:boolean = false;
private var alpha:float = 1.0f;
static var restart:boolean = false; //provisional, millor player prefs
var posCamMain:GameObject;

private var preus:int[];

private var mainCameraScript:bibliotecaCameraBehaviour;
//private var mainCameraMovie:MovieTexture;
var mainCamera:GameObject;

//CREATE SHADER; BY ALEIX - ASCCIO

var specShader:Shader;

var book:GameObject;
private var bookMat:Material;

var leftDoor:GameObject;
var rightDoor:GameObject;

var blackImage:Texture2D;
var atrezzoIntro:Transform;

var GS_Shop1:GUIStyle;
var GS_Shop2:GUIStyle;
var GS_Money:GUIStyle;
var GS_Back:GUIStyle;
var GS_Buy:GUIStyle;
var shop1:Texture;
var shop2:Texture;
var shopLvl:int;

function OnGUI() {
	GUI.color.a = alpha;
	GUI.DrawTexture(new Rect(0,0,Screen.width, Screen.height), blackImage);
	GUI.color.a = 1.0f;
	if(endAnimIntro){
		if (!shopping) {
			/*if (GUI.Button(Rect (Screen.width*0.5-Screen.height*0.16,Screen.height*0.5+Screen.height*0.26,Screen.width*0.2,Screen.height*0.25), "")) {
	    		Application.LoadLevel(1);
	    	}*/if (GUI.Button(Rect (Screen.width*0.5+Screen.height*0.65,Screen.height*0.5-Screen.height*0.45,Screen.height*0.15,Screen.height*0.15), "", GS_Buy)) {
	    		shopping = true;
	    		SwapInMenu();
	    	}
    	}
    	else {
    		if (alpha <= 0.0f)  {
				alpha = 0.0f;
	    		if(shopLvl == 0){
		    		GUI.DrawTexture(Rect (0,0,Screen.width,Screen.height),shop1);
    				GUI.Label (new Rect (Screen.width - Screen.height/20, Screen.height/6+Screen.height/14, 1, 1), ""+PlayerPrefs.GetInt("money"), GS_Money);
		    		if (GUI.Button(Rect (Screen.width - Screen.height/20*3,Screen.height/20+Screen.height/14,Screen.height/10,Screen.height/10), "", GS_Back)){
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
		    		if (GUI.Button(Rect (Screen.width - Screen.height/20*3,Screen.height/20+Screen.height/14,Screen.height/10,Screen.height/10), "", GS_Back)) shopLvl = 0;
					GUI.Label (new Rect (Screen.width - Screen.height/20, Screen.height/6+Screen.height/14, 1, 1), ""+PlayerPrefs.GetInt("money"), GS_Money);

			    	if (GUI.Button(Rect((23.3*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"Bou",GS_Shop2)) {
			    		Debug.Log("Bou");
			    		if(PlayerPrefs.GetInt("money")>=preus[0]){
			    			PlayerPrefs.SetInt("Character", 0);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[0]));
			    		}
			    	}if (GUI.Button(Rect((147.8*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"Cavall",GS_Shop2)) {
			    		Debug.Log("Cavall");
			    		if(PlayerPrefs.GetInt("money")>=preus[1]){
			    			PlayerPrefs.SetInt("Character", 1);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[1]));
			    		}
			    	}if (GUI.Button(Rect((271.7*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"Senglar",GS_Shop2)) {
			    		Debug.Log("Senglar");
			    		if(PlayerPrefs.GetInt("money")>=preus[2]){
			    			PlayerPrefs.SetInt("Character", 2);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[2]));
			    		}
			    	}if (GUI.Button(Rect((396.2*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"Serp",GS_Shop2)) {
			    		Debug.Log("Serp");
			    		if(PlayerPrefs.GetInt("money")>=preus[3]){
			    			PlayerPrefs.SetInt("Character", 3);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[3]));
			    		}
			    	}if (GUI.Button(Rect((521.4*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"4",GS_Shop2)) {
			    		Debug.Log("4");
			    		if(PlayerPrefs.GetInt("money")>=preus[4]){
			    			PlayerPrefs.SetInt("Character", 4);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[4]));
			    		}
			    	}
			    	//---
			    	if (GUI.Button(Rect((23.3*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"5",GS_Shop2)) {
			    		Debug.Log("5");
			    		if(PlayerPrefs.GetInt("money")>=preus[5]){
			    			PlayerPrefs.SetInt("Character", 5);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[5]));
			    		}
			    	}if (GUI.Button(Rect((147.8*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"6",GS_Shop2)) {
			    		Debug.Log("6");
			    		if(PlayerPrefs.GetInt("money")>=preus[6]){
			    			PlayerPrefs.SetInt("Character", 6);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[6]));
			    		}
			    	}if (GUI.Button(Rect((271.7*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"7",GS_Shop2)) {
			    		Debug.Log("7");
			    		if(PlayerPrefs.GetInt("money")>=preus[7]){
			    			PlayerPrefs.SetInt("Character", 7);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[7]));
			    		}
			    	}if (GUI.Button(Rect((396.2*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"8",GS_Shop2)) {
			    		Debug.Log("8");
			    		if(PlayerPrefs.GetInt("money")>=preus[8]){
			    			PlayerPrefs.SetInt("Character", 8);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[8]));
			    		}
			    	}if (GUI.Button(Rect((521.4*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"9",GS_Shop2)) {
			    		Debug.Log("9");
			    		if(PlayerPrefs.GetInt("money")>=preus[9]){
			    			PlayerPrefs.SetInt("Character", 9);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[9]));
			    		}
			    	}		    	
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
		for (var child:Transform in atrezzoIntro) (child.gameObject).SetActive(false);
		mainCamera.transform.position = posCamMain.transform.position;
		mainCamera.transform.rotation = posCamMain.transform.rotation;
		endVideo = true;
		endAnimIntro = true;
	}
}

function Start() {
	preus = new int [10];
	preus[0]=1;
	preus[1]=2;
	preus[2]=3;
	preus[3]=4;
	preus[4]=5;
	preus[5]=6;
	preus[6]=7;
	preus[7]=8;
	preus[8]=9;
	preus[9]=10;	
	mainCameraScript = mainCamera.GetComponent("bibliotecaCameraBehaviour") as bibliotecaCameraBehaviour;
	//mainCameraMovie = mainCamera.GetComponent(Renderer).material.mainTexture as MovieTexture;
	leftDoor.GetComponent(Animation).enabled = false;
	rightDoor.GetComponent(Animation).enabled = false;
	bookMat = book.GetComponent(Renderer).material as Material;
	//bookMat.shader = Shader.Find ("Specular");
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
	else if (!shopping) {
		if ((Input.touchCount == 1 && Input.GetTouch(0).phase == TouchPhase.Began)) {
				var touchPosition: Vector2 = Input.GetTouch(0).position;
				if (touchPosition.x>Screen.width*0.5-Screen.height*0.5 && touchPosition.y>Screen.height*0.5+Screen.height*0.02 && touchPosition.x<Screen.width*0.5-Screen.height*0.16 && touchPosition.y<Screen.height*0.5+Screen.height*0.26){	
					Application.LoadLevel(1);
				}
			}
		var shine : double = Mathf.PingPong(Time.time*1.5f, 1.0);
		bookMat.SetColor("_Color",  Color(0.6+shine*0.125,0.6+shine*0.125,0.6+shine*0.125,0.6+shine*0.125));
		
		if (Input.GetKeyDown('p')) Application.LoadLevel(1);
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
	
	for (var child:Transform in atrezzoIntro) (child.gameObject).SetActive(false);
	leftDoor.SetActive(false);
	rightDoor.SetActive(false);
	endAnimIntro = true;
	restart = true;
}