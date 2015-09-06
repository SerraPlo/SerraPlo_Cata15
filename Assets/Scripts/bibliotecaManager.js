#pragma strict

private var endVideo:boolean = false;
private var alpha:float = 1.0f;
static var restart:boolean = false;

private var mainCameraScript:bibliotecaCameraBehaviour;
//private var mainCameraMovie:MovieTexture;
var mainCamera:GameObject;

var leftDoor:GameObject;
var rightDoor:GameObject;

var blackImage:Texture2D;
var atrezzo:Transform;

//------fade transition---------
/*var fadeImage:Texture2D;
private var xFrame:double = 0.8;
private var yFrame:double = 0.0;
private var timer:double = 0.0;
private var frameWait:double = 0.02;
private var curCol:int = 0;*/

function OnGUI() {
	GUI.color.a = alpha;
	GUI.DrawTexture(new Rect(0,0,Screen.width, Screen.height), blackImage);
	//GUI.DrawTextureWithTexCoords(new Rect(0,0,Screen.width, Screen.height), fadeImage, new Rect(xFrame,yFrame,0.2, 0.2), true);
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
	
	if (alpha <= 0.0f && endVideo)  {
		endVideo = false;
		PlayGame();
	}
	else if (endVideo) alpha -= Time.deltaTime*0.4f;
	
	//if (Input.touchCount > 0 || Input.GetMouseButtonDown(0)){}
}

function PlayGame() {
	yield WaitForSeconds(0.5);
	
	leftDoor.GetComponent(Animation).enabled = true;
	leftDoor.GetComponent(Animation).Play("OpenLeftDoor");
	rightDoor.GetComponent(Animation).enabled = true;
	rightDoor.GetComponent(Animation).Play("OpenRightDoor");
	mainCamera.SendMessage("PlayAnimation");
	yield WaitForSeconds(mainCameraScript.GetAnimLength());
	
	for (var child:Transform in atrezzo) Destroy(child.gameObject);
	Destroy(leftDoor);
	Destroy(rightDoor);
	Application.LoadLevel (1);
}

/*function FadeOut() {
	GUI.DrawTextureWithTexCoords(new Rect(0,0,Screen.width, Screen.height), fadeImage, new Rect(xFrame,yFrame,0.2, 0.2), true);
	if(Time.time - timer >= frameWait) {
        if (xFrame <= 0.0) {
       		xFrame = 0.8;
       		if (curCol > 3) fadingIn = false;
       		else curCol++;
			yFrame = 0.2*curCol;
        }
		else xFrame -= 0.2;
		timer = Time.time;
    }
}*/