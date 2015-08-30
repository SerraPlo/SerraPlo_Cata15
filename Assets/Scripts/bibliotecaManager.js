#pragma strict

private var alpha:float = 1.0f;
private var fadeTitle:boolean = false;

private var cameraScript:cameraBibliotecaBehaviour;
var cameraObject:GameObject;

var leftDoor:GameObject;
var rightDoor:GameObject;

var brokenPaper:Texture2D;
var title:Texture2D;

function OnGUI() {
	GUI.DrawTexture(new Rect(0,0,Screen.width, Screen.height), brokenPaper);
	GUI.color.a = alpha;
	GUI.DrawTexture(new Rect(20,30,Screen.width/2, Screen.width/4), title);
}

function Start() {
	cameraScript = cameraObject.GetComponent("cameraBibliotecaBehaviour") as cameraBibliotecaBehaviour;
	leftDoor.GetComponent(Animation).enabled = false;
	rightDoor.GetComponent(Animation).enabled = false;
}

function Update() {

	if (fadeTitle) alpha -= Time.deltaTime;
	
	if (Input.touchCount > 0 || Input.GetMouseButtonDown(0)){
		fadeTitle = true;
		leftDoor.GetComponent(Animation).enabled = true;
		leftDoor.GetComponent(Animation).Play("OpenLeftDoor");
		rightDoor.GetComponent(Animation).enabled = true;
		rightDoor.GetComponent(Animation).Play("OpenRightDoor");
		cameraObject.SendMessage("PlayAnimation");
		//Application.LoadLevel ("Main");
	}
}

















































/*private var xWords:double[];
private var yWords:double[];
private var nWords:int = 5;

private var sxPlay:double = 100;
private var syPlay:double = 100;
private var sdPlay:int = 1;

//---------textures---------
var background:Texture;
var movingWords:Texture; //video
var play:Texture;

//---------GUIstyles---------
var titleGuiStyle:GUIStyle;

function Start () {
	xWords = new double[nWords];
	yWords = new double[nWords];
}

function OnGUI() {
    if(!movingWords) Debug.LogError("Assign a Texture in the inspector.");
	else {
		 for(var i : int = 0; i< nWords; i++) {
			GUI.DrawTexture(Rect(xWords[i],yWords[i],Screen.width,Screen.height), movingWords, ScaleMode.StretchToFill, true, 0.0f);
		}
	}
    
	if(!background) Debug.LogError("Assign a Texture in the inspector.");
	else GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), background, ScaleMode.StretchToFill, true, 0.0f);
	
	if(!titleGuiStyle) Debug.LogError("Assign a GUIStyle in the inspector.");
    else GUI.Label (new Rect (Screen.width/2, Screen.height/3, 5, 5), "SERRAPLO_CATA15", titleGuiStyle);
    
    if(!play) Debug.LogError("Assign a Texture in the inspector.");
	else GUI.DrawTexture(Rect(Screen.width/2-sxPlay/2,Screen.height/1.6-syPlay/2,sxPlay,syPlay), play, ScaleMode.ScaleToFit, true, 0.0f);
	
	if (Input.touchCount > 0 || Input.GetMouseButtonDown(0)){
		Application.LoadLevel ("Main");
	}
}

function Update () {
	
	for (var i : int = 0; i< nWords; i++) {
		if (xWords[i] < -800) xWords[i] = 800;
		if (yWords[i] > 800) yWords[i] = -800;
		xWords[i] -= Time.deltaTime*i*20.0;
		yWords[i] += Time.deltaTime*i*20.0;
	}
	
	if (sxPlay > 120) sdPlay = -1;
	else if (sxPlay < 100) sdPlay = 1;
	
	sxPlay += Time.deltaTime*30.0*sdPlay;
	syPlay += Time.deltaTime*30.0*sdPlay;
	

}*/