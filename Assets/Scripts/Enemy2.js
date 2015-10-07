#pragma strict

private var PlayerScript:characterController;
private var Manager:GameObject;
private var ManagerScript:theChosenRunner;

private var serp:boolean;

private var sT:float;

private var marker1:Transform;
private var marker2:Transform;
private var marker3:Transform;
private var marker4:Transform;
//private var marker5:Transform;
private var markerCount:int=0;

private var meTransform:Transform;
private var pPosX:float;
private var pPosY:float;
private var pWidth:float = 1.1f;
private var pHeight:float = 1.1f;
//private var randomMove:float;

function Start () {
	if (PlayerPrefs.GetInt("Character")==3) serp=true;
	else serp=false;
	meTransform = transform.FindChild("SPRITE");
	marker1 = meTransform.FindChild("Marker1");
	marker2 = meTransform.FindChild("Marker2");
	marker3 = meTransform.FindChild("Marker3");
	marker4 = meTransform.FindChild("Marker4");
	PlayerScript = GameObject.Find("Player").GetComponent(characterController) as characterController;
	Manager = GameObject.Find("Manager");
	ManagerScript = Manager.GetComponent("theChosenRunner") as theChosenRunner;
	pPosX = PlayerScript.GetPosX();
	pPosY = PlayerScript.GetPosY();
}

function Update () {
	//markersUpdate();
	//meTransform.position.y += Mathf.Sin(Time.time*2.0)*0.1f*Time.deltaTime;
	meTransform.rotation.z = Mathf.Sin(Time.time*3.0)*0.33f;
	
	//detect collision with player
	//if(rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
	//	rect1.y < rect2.y + rect2.height &&	rect1.height + rect1.y > rect2.y)
	pPosX = PlayerScript.GetPosX();
	pPosY = PlayerScript.GetPosY();
		if((meTransform.position.x - 0.5f) < (pPosX-pWidth/2) + (pWidth) && (meTransform.position.x - 0.5f) + (1.0f) > (pPosX-pWidth/2) &&
			 (meTransform.position.y - 2.0f) < (0.1f + pPosY) + (pHeight) && (0.8f) + (meTransform.position.y - 2.0f) > (0.1f + pPosY)) {
				if(PlayerScript.GetCharging()){
					Destroy(gameObject);
					PlayerScript.GainStamina();
				}else Manager.SendMessage("Die");
				//Destroy(gameObject);
	}
	
	if(serp){
		pPosX = PlayerScript.getPosBalaX();
		pPosY = PlayerScript.getPosBalaY();
		//Debug.Log(pPosX + ", " + pPosY);
		if((meTransform.position.x - 0.5f) < (pPosX-pWidth/2) + (pWidth) && (meTransform.position.x - 0.5f) + (1.0f) > (pPosX-pWidth/2) &&
			 (meTransform.position.y - 2.0f) < (0.1f + pPosY) + (pHeight) && (0.8f) + (meTransform.position.y - 2.0f) > (0.1f + pPosY)) {
					Destroy(gameObject);
					PlayerScript.GainStamina();
		}
	}
}

function markersUpdate(){
	marker1.transform.position.x = meTransform.position.x - 0.5f;
	marker2.transform.position.x = meTransform.position.x + 0.5f;
	marker3.transform.position.x = meTransform.position.x + 0.5f;
	marker4.transform.position.x = meTransform.position.x - 0.5f;
	marker1.transform.position.y = meTransform.position.y - 2.0f;
	marker2.transform.position.y = meTransform.position.y - 2.0f;
	marker3.transform.position.y = meTransform.position.y - 1.3f;
	marker4.transform.position.y = meTransform.position.y - 1.3f;
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