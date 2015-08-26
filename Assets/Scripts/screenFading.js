#pragma strict

var fadeImage:Texture2D;
private var fadeSpeed:float = 0.8f;
private var fadeDepth:int = -1000;
private var fadeDir:float = 1.0f;
private var alpha:int = -1;

function OnGUI() {
	alpha += fadeDir * fadeSpeed * Time.deltaTime;
	alpha = Mathf.Clamp01(alpha);
	
	GUI.color = new Color(GUI.color.r, GUI.color.g, GUI.color.b, alpha);
	GUI.depth = fadeDepth;
	GUI.DrawTexture(new Rect(0,0,Screen.width, Screen.height), fadeImage);
}

function Fade(dir:int){
    fadeDir = dir;
    return (fadeSpeed);
}


function OnLevelWasLoaded(){
    Fade(-1);
}