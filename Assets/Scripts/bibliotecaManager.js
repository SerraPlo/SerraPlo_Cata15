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

//CREATE SHADER; BY ALEIX - ACCIO

var book:GameObject;
private var bookMat:Material;

var leftDoor:GameObject;
var rightDoor:GameObject;

var blackImage:Texture2D;
var atrezzoIntro:Transform;

var GS_Shop1:GUIStyle;
var GS_Shop2:GUIStyle;
var GS_Shop3:GUIStyle;
var GS_Money:GUIStyle;
var GS_Back:GUIStyle;
var GS_Buy:GUIStyle;
var GS_Characters:GUIStyle;
var GS_Rubriques:GUIStyle;
private var shop1:Texture;
private var shop2:Texture;
private var shop3:Texture;
private var shop4:Texture;
private var shop5:Texture;
var locked:Texture;
var equipped:Texture;
var redCircle:Texture;
private var eRect:Rect;
var shopLvl:int;
private var rubArray:Texture[];
private var rubN:int;

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
		    		if (GUI.Button(Rect (Screen.width - Screen.height/20*3,Screen.height/20+Screen.height/12,Screen.height/10,Screen.height/10), "", GS_Back)){
			    		shopping = false;
			    		SwapInMenu();
			    	}else if (GUI.Button(Rect((2.26*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1)) shopLvl = 1;
			    	GUI.Button(Rect((15*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1);
			    	GUI.Button(Rect((27.77*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1);
			    	GUI.Button(Rect((40.46*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1);
			    	GUI.Button(Rect((53.24*Screen.width)/67.73,(12.6*Screen.height)/38.1,(11.99*Screen.width)/67.73,(16.36*Screen.height)/38.1),"",GS_Shop1);
			    	GS_Money.fontSize = Screen.height/15;
			    }else if(shopLvl == 1){
		    		GUI.DrawTexture(Rect (0,0,Screen.width,Screen.height),shop2);
		    		if (GUI.Button(Rect (Screen.width - Screen.height/20*3,Screen.height/20+Screen.height/12,Screen.height/10,Screen.height/10), "", GS_Back)) shopLvl = 0;
		    		if (GUI.Button(Rect (Screen.width/2 - Screen.width/4,Screen.height/2+Screen.height/16,Screen.width/5,Screen.height/10), "", GS_Characters)) shopLvl = 2;
		    		if (GUI.Button(Rect (Screen.width/2 + Screen.width/20,Screen.height/2+Screen.height/16,Screen.width/5,Screen.height/10), "", GS_Rubriques)) shopLvl = 3;
		    	}else if(shopLvl == 2){
		    		GUI.DrawTexture(Rect (0,0,Screen.width,Screen.height),shop3);
		    		if (GUI.Button(Rect (Screen.width - Screen.height/20*3,Screen.height/20+Screen.height/12,Screen.height/10,Screen.height/10), "", GS_Back)) shopLvl = 1;
					GUI.Label (new Rect (Screen.width - Screen.height/20, Screen.height/6+Screen.height/14, 1, 1), ""+PlayerPrefs.GetInt("money"), GS_Money);
					if(!PlayerPrefs.GetInt("C1")) GUI.DrawTexture(Rect((147.8*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),locked);
					if(!PlayerPrefs.GetInt("C2")) GUI.DrawTexture(Rect((271.7*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),locked);
					if(!PlayerPrefs.GetInt("C3")) GUI.DrawTexture(Rect((396.2*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),locked);
					if(!PlayerPrefs.GetInt("C4")) GUI.DrawTexture(Rect((521.4*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),locked);
					if(!PlayerPrefs.GetInt("C5")) GUI.DrawTexture(Rect((23.3*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),locked);
					if(!PlayerPrefs.GetInt("C6")) GUI.DrawTexture(Rect((147.8*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),locked);
					if(!PlayerPrefs.GetInt("C7")) GUI.DrawTexture(Rect((271.7*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),locked);
					if(!PlayerPrefs.GetInt("C8")) GUI.DrawTexture(Rect((396.2*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),locked);
					if(!PlayerPrefs.GetInt("C9")) GUI.DrawTexture(Rect((521.4*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),locked);
					GUI.DrawTexture(eRect,equipped);
					
			    	if (GUI.Button(Rect((23.3*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"",GS_Shop2)) {
			    		eRect = new Rect((23.3*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
				    	PlayerPrefs.SetInt("Character", 0);
			    	}else if (GUI.Button(Rect((147.8*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"",GS_Shop2)) {
			    		if(!PlayerPrefs.GetInt("C1") && PlayerPrefs.GetInt("money")>=preus[1]){
			    			PlayerPrefs.SetInt("C1", 1);
			    			PlayerPrefs.SetInt("Character", 1);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[1]));
			    		}else if (PlayerPrefs.GetInt("C1")) {
			    			eRect = new Rect((147.8*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
			    			PlayerPrefs.SetInt("Character", 1);
			    		}
			    	}else if (GUI.Button(Rect((271.7*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"",GS_Shop2)) {
			    		if(!PlayerPrefs.GetInt("C2") && PlayerPrefs.GetInt("money")>=preus[2]){
			    			PlayerPrefs.SetInt("C2", 1);
			    			PlayerPrefs.SetInt("Character", 2);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[2]));
			    		}else if (PlayerPrefs.GetInt("C2")) {
				    		eRect = new Rect((271.7*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
				    		PlayerPrefs.SetInt("Character", 2);
				    	}
			    	}else if (GUI.Button(Rect((396.2*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"",GS_Shop2)) {
			    		if(!PlayerPrefs.GetInt("C3") && PlayerPrefs.GetInt("money")>=preus[3]){
			    			PlayerPrefs.SetInt("C3", 1);
			    			PlayerPrefs.SetInt("Character", 3);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[3]));
			    		}else if (PlayerPrefs.GetInt("C3")) {
				    		eRect = new Rect((396.2*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
				    		PlayerPrefs.SetInt("Character", 3);
				    	}
			    	}else if (GUI.Button(Rect((521.4*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"",GS_Shop2)) {
			    		if(!PlayerPrefs.GetInt("C4") && PlayerPrefs.GetInt("money")>=preus[4]){
			    			PlayerPrefs.SetInt("C4", 1);
			    			PlayerPrefs.SetInt("Character", 4);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[4]));
			    		}else if (PlayerPrefs.GetInt("C4")) {
				    		eRect = new Rect((521.4*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
				    		PlayerPrefs.SetInt("Character", 4);
				    	}
			    	}
			    	//---
			    	if (GUI.Button(Rect((23.3*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"",GS_Shop2)) {
			    		if(!PlayerPrefs.GetInt("C5") && PlayerPrefs.GetInt("money")>=preus[5]){
			    			PlayerPrefs.SetInt("C5", 1);
			    			PlayerPrefs.SetInt("Character", 5);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[5]));
			    		}else if (PlayerPrefs.GetInt("C5")) {
				    		eRect = new Rect((521.4*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
				    		PlayerPrefs.SetInt("Character", 5);
				    	}
			    	}else if (GUI.Button(Rect((147.8*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"",GS_Shop2)) {
			    		if(!PlayerPrefs.GetInt("C6") && PlayerPrefs.GetInt("money")>=preus[6]){
			    			PlayerPrefs.SetInt("C6", 1);
			    			PlayerPrefs.SetInt("Character", 6);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[6]));
			    		}else if (PlayerPrefs.GetInt("C6")) {
				    		eRect = new Rect((147.8*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
				    		PlayerPrefs.SetInt("Character", 6);
				    	}
			    	}else if (GUI.Button(Rect((271.7*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"",GS_Shop2)) {
			    		if(!PlayerPrefs.GetInt("C7") && PlayerPrefs.GetInt("money")>=preus[7]){
			    			PlayerPrefs.SetInt("C7", 1);
			    			PlayerPrefs.SetInt("Character", 7);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[7]));
			    		}else if (PlayerPrefs.GetInt("C7")) {
				    		eRect = new Rect((271.7*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
				    		PlayerPrefs.SetInt("Character", 7);
				    	}
			    	}else if (GUI.Button(Rect((396.2*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"",GS_Shop2)) {
			    		if(!PlayerPrefs.GetInt("C8") && PlayerPrefs.GetInt("money")>=preus[8]){
			    			PlayerPrefs.SetInt("C8", 1);
			    			PlayerPrefs.SetInt("Character", 8);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[8]));
			    		}else if (PlayerPrefs.GetInt("C8")) {
				    		eRect = new Rect((396.2*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
				    		PlayerPrefs.SetInt("Character", 8);
				    	}
			    	}else if (GUI.Button(Rect((521.4*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381),"",GS_Shop2)) {
			    		if(!PlayerPrefs.GetInt("C9") && PlayerPrefs.GetInt("money")>=preus[9]){
			    			PlayerPrefs.SetInt("C9", 1);
			    			PlayerPrefs.SetInt("Character", 9);
			    			PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money")-preus[9]));
			    		}else if (PlayerPrefs.GetInt("C9")) {
				    		eRect = new Rect((521.4*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
				    		PlayerPrefs.SetInt("Character", 9);
				    	}
			    	}		    	
		    	}
		    	else if(shopLvl == 3){
		    		GUI.DrawTexture(Rect (0,0,Screen.width,Screen.height),shop4);
		    		if (GUI.Button(Rect (Screen.width - Screen.height/20*3,Screen.height/20+Screen.height/12,Screen.height/10,Screen.height/10), "", GS_Back)) shopLvl = 1;
		    		for (var k:int = 0; k< PlayerPrefs.GetInt("Rubriques"); k++) {
		    			if (k < 7) GUI.DrawTexture(Rect (Screen.width/3 + Screen.width/2.98,Screen.height/10+Screen.height/4.5*3.58-(Screen.height*0.0956)*k,Screen.width/18.8,Screen.height/11.8),redCircle);
		    			else if (k < 14) GUI.DrawTexture(Rect (Screen.width/3 + Screen.width/50.7,Screen.height/10+Screen.height/4.5*3.58-(Screen.height*0.0956)*(k-7),Screen.width/18.8,Screen.height/11.8),redCircle);
		    			else if (k < 21) GUI.DrawTexture(Rect (Screen.width/3 - Screen.width/3.35,Screen.height/10+Screen.height/4.5*3.58-(Screen.height*0.0956)*(k-14),Screen.width/18.8,Screen.height/11.8),redCircle);
		    		}
		    		for (var j:int = 0; j< 21-PlayerPrefs.GetInt("Rubriques"); j++) {
		    			if (j < 7) {
		    				if(GUI.Button(Rect (Screen.width/3 - Screen.width/4,Screen.height/10+Screen.height/4.1+(Screen.height*0.0956)*j,Screen.width/4.22,Screen.height/22.5), "", GS_Shop3)) {
			    				rubN = j;
			    				shopLvl = 4;
			    				break;
		    				}
		    			}else if (j< 14) {
		    				if(GUI.Button(Rect (Screen.width/3 + Screen.width/14.4,Screen.height/10+Screen.height/4.1+(Screen.height*0.0956)*(j-7),Screen.width/4.22,Screen.height/22.5), "", GS_Shop3)) {
			    				rubN = j;
			    				shopLvl = 4;
			    				break;
		    				}
		    			}else if (j < 21) {
			    			if (GUI.Button(Rect (Screen.width/3 + Screen.width/2.6, Screen.height/10+Screen.height/4.1+(Screen.height*0.0956)*(j-14),Screen.width/4.22,Screen.height/22.5), "", GS_Shop3)) {
			    				rubN = j;
			    				shopLvl = 4;
			    				break;
			    			}
		    			}
		    		}
		    	}
		    	else if(shopLvl == 4){
		    		GUI.DrawTexture(Rect (0,0,Screen.width,Screen.height),shop5);
		    		if (GUI.Button(Rect (Screen.width - Screen.height/20*3,Screen.height/20+Screen.height/12,Screen.height/10,Screen.height/10), "", GS_Back)) shopLvl = 3;
		    		for (var i:int = 0; i< 21; i++) {
		    			if (rubN == i) GUI.DrawTexture(Rect (Screen.width/2 - Screen.width/5.4,Screen.height/2-Screen.height/2.4,Screen.width/2.6,Screen.height/1.2),rubArray[i]);
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
	if (!PlayerPrefs.HasKey("Rubriques")) PlayerPrefs.SetInt("Rubriques", 21);
	// inicialitzar rubriques textures
	rubArray = new Texture [21];
	for (var n:int=0; n<21; n++) rubArray[n] = Resources.Load("Rubriques/rub"+(n+1).ToString()) as Texture;
	// inicialitzar preus
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
	// inicialitzar characters comprats
	PlayerPrefs.SetInt("C0", 1);
	for (var i:int=1; i<10; i++) {
		if (!PlayerPrefs.HasKey("C"+i.ToString())) PlayerPrefs.SetInt("C"+i.ToString(), 0);
	}
	// inicialitzar equipped rect
	eRect = new Rect(0,0,0,0);
	if (PlayerPrefs.GetInt("Character") == 0) eRect = new Rect((23.3*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
	else if  (PlayerPrefs.GetInt("Character") == 1) eRect =new Rect((147.8*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
	else if  (PlayerPrefs.GetInt("Character") == 2)eRect = new Rect((271.7*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
	else if  (PlayerPrefs.GetInt("Character") == 3)eRect = new Rect((396.2*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
	else if  (PlayerPrefs.GetInt("Character") == 4)eRect = new Rect((521.4*Screen.width)/677.3,(126*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
	else if  (PlayerPrefs.GetInt("Character") == 5)eRect = new Rect((23.3*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
	else if  (PlayerPrefs.GetInt("Character") == 6)eRect = new Rect((147.8*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
	else if  (PlayerPrefs.GetInt("Character") == 7)eRect = new Rect((271.7*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
	else if  (PlayerPrefs.GetInt("Character") == 8)eRect = new Rect((396.2*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
	else if  (PlayerPrefs.GetInt("Character") == 9)eRect = new Rect((521.4*Screen.width)/677.3,(245.6*Screen.height)/381,(103.7*Screen.width)/677.3,(102*Screen.height)/381);
	// inicialitzar shop textures
	shop1 = Resources.Load("eBuy_start") as Texture;
	shop2 = Resources.Load("eBuy_empty") as Texture;
	shop3 = Resources.Load("eBuy_besties") as Texture;
	shop4 = Resources.Load("eBuy_rubriques") as Texture;
	shop5 = Resources.Load("pc_viewer") as Texture;
	// inicialitzar others
	mainCameraScript = mainCamera.GetComponent("bibliotecaCameraBehaviour") as bibliotecaCameraBehaviour;
	leftDoor.GetComponent(Animation).enabled = false;
	rightDoor.GetComponent(Animation).enabled = false;
	bookMat = book.GetComponent(Renderer).material as Material;
}

function PlayIntro(videoPath:String) {
 	Handheld.PlayFullScreenMovie(videoPath, Color.black, FullScreenMovieControlMode.CancelOnInput);  
 	yield WaitForEndOfFrame();
 	alpha = 1.0f;
 	Debug.Log("Video playback completed.");
 	endVideo = true;
}

function Update() {
	if (Input.GetKeyDown('h')){
		PlayerPrefs.DeleteAll();
		Debug.Log("h pressed, PlayerPrefs deleted");
	}
	if (Input.GetKeyDown('r')){
		PlayerPrefs.SetInt("Rubriques", (PlayerPrefs.GetInt("Rubriques"))-1);
		Debug.Log("r pressed, rubrica substracted");
	}
	if (Input.GetKeyDown('d')){
		PlayerPrefs.SetInt("Rubriques", 21);
		Debug.Log("d pressed, 21 rubriques");
	}
	if (Input.GetKeyDown('m')){
		PlayerPrefs.SetInt("money", (PlayerPrefs.GetInt("money"))+10);
		Debug.Log("m pressed, 10 money added");
	}
	if (endVideo) {
		if (alpha <= 0.0f)  {
			endVideo = false;
			if(!restart) EnterMainMenu();
		}
		else alpha -= Time.deltaTime*0.6f;
	}
	else if (!shopping) {
		if ((Input.touchCount == 1 && Input.GetTouch(0).phase == TouchPhase.Began)) {
				var touchPosition: Vector2 = Input.GetTouch(0).position;
				if (touchPosition.y<(Screen.height/2)){
					if (touchPosition.x>Screen.width/8 && touchPosition.x<(Screen.width/8)*3){	
						Application.LoadLevel(1);
					}
				}
			}
		var shine : double = Mathf.PingPong(Time.time*1.3f, 1.0f);
		bookMat.SetColor("_Color",  Color(0.6+shine*0.325,0.6+shine*0.325,0.6+shine*0.325,0.6+shine*0.325));
		
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