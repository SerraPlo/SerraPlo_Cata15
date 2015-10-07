#pragma strict

private var PlayerScript:characterController;
private var Manager:GameObject;
private var ManagerScript:theChosenRunner;

private var serp:boolean;

private var sT:float;
private var markers:Transform;
private var marker1:Transform;
private var marker2:Transform;
private var marker3:Transform;
private var marker4:Transform;

private var markerTest1:Transform;
private var markerTest2:Transform;
private var markerTest3:Transform;
private var markerTest4:Transform;

//private var marker5:Transform;
private var markerCount:int=0;

private var meTransform:Transform;
private var meMeTransform:Transform;
private var pPosX:float;
private var pPosY:float;
private var pWidth:float = 1.1f;
private var pHeight:float = 1.1f;
//private var randomMove:float;

function Start () {
	if (PlayerPrefs.GetInt("Character")==3) serp=true;
	else serp=false;
	meTransform = transform.FindChild("SPRITE");
	meMeTransform = transform.FindChild("SPRITE/New sprite");
	markers = transform.FindChild("Markers");
	marker1 = transform.FindChild("Markers/M1");
	marker2 = transform.FindChild("Markers/M2");
	marker3 = transform.FindChild("Markers/M3");
	marker4 = transform.FindChild("Markers/M4");

	markerTest1 = transform.FindChild("M1");
	markerTest2 = transform.FindChild("M2");
	markerTest3 = transform.FindChild("M3");
	markerTest4 = transform.FindChild("M4");
	PlayerScript = GameObject.Find("Player").GetComponent(characterController) as characterController;
	Manager = GameObject.Find("Manager");
	ManagerScript = Manager.GetComponent("theChosenRunner") as theChosenRunner;
	pPosX = PlayerScript.GetPosX();
	pPosY = PlayerScript.GetPosY();
}

function Update () {
	markersUpdate();
	//meTransform.position.y += Mathf.Sin(Time.time*2.0)*0.1f*Time.deltaTime;
	meTransform.rotation.z = Mathf.Sin(Time.time*3.0)*0.33f;
	
	//detect collision with player
	//if(rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
	//	rect1.y < rect2.y + rect2.height &&	rect1.height + rect1.y > rect2.y)
	pPosX = PlayerScript.GetPosX();
	pPosY = PlayerScript.GetPosY();
		if((markerTest1.position.x) < (pPosX-pWidth/2) + (pWidth) && (marker1.position.x) + (Mathf.Abs(marker1.position.x-marker4.position.x)) > (pPosX-pWidth/2) &&
			 (markerTest1.position.y) < (0.1f + pPosY) + (pHeight) && (Mathf.Abs(markerTest2.position.y-marker1.position.y)) + (marker1.position.y) > (0.1f + pPosY)) {
				if(PlayerScript.GetCharging()){
					Destroy(gameObject);
					PlayerScript.GainStamina();
				}else Manager.SendMessage("Die");
				//Destroy(gameObject);
	}
	//1 -x -y
	//2 +x +y
	if(marker1.position.x<marker2.position.x) markerTest1.transform.position.x = marker1.position.x;
	else markerTest1.transform.position.x = marker2.position.x;
	
	if(marker2.position.y<marker3.position.y) markerTest1.transform.position.y = marker2.position.y;
	else markerTest1.transform.position.y = marker3.position.y;
	
	if(marker4.position.x>marker3.position.x) markerTest2.transform.position.x = marker4.position.x;
	else markerTest2.transform.position.x = marker3.position.x;
	
	if(marker1.position.y>marker4.position.y) markerTest2.transform.position.y = marker1.position.y;
	else markerTest2.transform.position.y = marker4.position.y;
	
	if(serp){
		pPosX = PlayerScript.getPosBalaX();
		pPosY = PlayerScript.getPosBalaY();
		//Debug.Log(pPosX + ", " + pPosY);
		//if(rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
		//rect1.y < rect2.y + rect2.height &&	rect1.height + rect1.y > rect2.y)
		if((marker1.position.x) < (pPosX-pWidth/2) + (pWidth) && (marker1.position.x) + (Mathf.Abs(marker1.position.x-marker4.position.x)) > (pPosX-pWidth/2) &&
			 (marker2.position.y) < (0.1f + pPosY) + (pHeight) && (Mathf.Abs(marker2.position.y-marker1.position.y)) + (marker2.position.y) > (0.1f + pPosY)) {
					Destroy(gameObject);
					PlayerScript.GainStamina();
		}
	}
}

function markersUpdate(){
	markers.transform.position = meTransform.position;
	markers.transform.position.x += Mathf.Sin(meTransform.rotation.z*2)*1.5;
	markers.transform.position.y += -Mathf.Cos(meTransform.rotation.z*2)*1.5;
	markers.transform.rotation = meTransform.rotation;
	
	/*markerTest1.transform.position.x = marker1.position.x;
	markerTest1.transform.position.y = marker1.position.y;
	markerTest2.transform.position.x = marker2.position.x;
	markerTest2.transform.position.y = marker2.position.y;*/
	
	//marker3.transform.position.x = meTransform.position.x + 0.5f;
	//marker4.transform.position.x = meTransform.position.x - 0.5f;
	//marker1.transform.position.y = meTransform.position.y - 2.0f;
	//marker2.transform.position.y = meTransform.position.y - 2.0f;
	//marker3.transform.position.y = meTransform.position.y - 1.3f;
	//marker4.transform.position.y = meTransform.position.y - 1.3f;*/
	/*if (Time.time> sT +0.01f){
		sT = Time.time;
		if(markerCount == 0 || markerCount==4){
			marker5.transform.position.x = pPosX-pWidth/2;
			marker5.transform.position.y = 0.1f + pPosY+pHeight;
			markerCount=1;
		}else if(markerCount == 1){
			marker5.transform.position.x = pPosX+pWidth/2;
			marker5.transform.position.y = 0.1f + pPosY+pHeight;
			markerCount++;
		}else if(markerCount == 2){
			marker5.transform.position.x = pPosX+pWidth/2;
			marker5.transform.position.y = 0.1f + pPosY;
			markerCount++;
		}else if(markerCount == 3){
			marker5.transform.position.x = pPosX-pWidth/2;
			marker5.transform.position.y = 0.1f + pPosY;
			markerCount++;
		}
	}*/
}