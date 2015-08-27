#pragma strict

public class FadeTransition extends MonoBehaviour {

	public var fadeImage:Texture2D;

	public var xFrame:double = 0.8;
	public var yFrame:double = 0.0;
	
	public var timer:double = 0.0;
	public var frameWait:double = 0.01;
	public var curCol:int = 0;

	public function Start() {
		timer = Time.time;
	}
	
	public function SetImage(img:Texture2D) {
		fadeImage = img;
	}

	public function UpdateTransition() {
		while(true) {
			GUI.DrawTextureWithTexCoords(new Rect(0,0,Screen.width, Screen.height), fadeImage, new Rect(xFrame,yFrame,0.2, 0.2), true);
			if(Time.time - timer >= frameWait) {
		        if (xFrame <= 0.0) {
		       		xFrame = 0.8;
		       		if (curCol > 3) break;
		       		else curCol++;
					yFrame = 0.2*curCol;
		        }
				else xFrame -= 0.2;
				timer = Time.time;
		    }
		}
	}
}