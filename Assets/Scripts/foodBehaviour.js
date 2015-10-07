#pragma strict

private var PlayerScript:characterController;
private var Manager:GameObject;
private var ManagerScript:theChosenRunner;

private var sT:float;

private var marker1:Transform;
private var marker2:Transform;
private var marker3:Transform;
private var marker4:Transform;
private var marker5:Transform;
private var markerCount:int=0;

private var foodTransform:Transform;
private var pPosX:float;
private var pPosY:float;
private var pWidth:float = 1.1f;
private var pHeight:float = 1.1f;
private var stamina:int;
//private var randomMove:float;

function Start () {
	foodTransform = transform;
	marker1 = transform.FindChild("m1");
	marker2 = transform.FindChild("m2");
	marker3 = transform.FindChild("m3");
	marker4 = transform.FindChild("m4");
	marker5 = transform.FindChild("m5");
	PlayerScript = GameObject.Find("Player").GetComponent(characterController) as characterController;
	Manager = GameObject.Find("Manager");
	ManagerScript = Manager.GetComponent("theChosenRunner") as theChosenRunner;
	pPosX = PlayerScript.GetPosX();
	pPosY = PlayerScript.GetPosY();
	//randomMove = Random.Range(0.1f, 0.5f);
}

function Update () {
	//markersUpdate();
	//foodTransform.position.y += Mathf.Sin(Time.time*2.5)*0.001f*Time.deltaTime;
	//foodTransform.position.y = Mathf.Sin(Time.time*2.5)*randomMove;
	foodTransform.position.y += Mathf.Sin(Time.time*2.0)*0.1f*Time.deltaTime;
	foodTransform.rotation.z = Mathf.Sin(Time.time*2.5)*0.02f;
	stamina=ManagerScript.GetStamina();
	pPosX = PlayerScript.GetPosX();
	pPosY = PlayerScript.GetPosY();
	if((foodTransform.position.x - 0.4f) < (pPosX-pWidth/2) + (pWidth) && (foodTransform.position.x - 0.4f) + (0.8f) > (pPosX-pWidth/2) && (foodTransform.position.y + 0.3f) < (0.1f + pPosY) + (pHeight) && (0.7f) + (foodTransform.position.y + 0.3f) > (0.1f + pPosY)) {
		Destroy(gameObject);
		if(stamina < 5){
			if ((stamina <3 && PlayerPrefs.GetInt("Character") !=9) || PlayerPrefs.GetInt("Character") == 9){
				if (stamina <1 || PlayerPrefs.GetInt("Character") !=8) Manager.SendMessage("SetStamina", 1);
			}
		}
	}
}

function markersUpdate(){
	marker1.transform.position.x = transform.position.x - 0.4f;
	marker2.transform.position.x = transform.position.x + 0.4f;
	marker3.transform.position.x = transform.position.x + 0.4f;
	marker4.transform.position.x = transform.position.x - 0.4f;
	marker1.transform.position.y = transform.position.y + 1;
	marker2.transform.position.y = transform.position.y + 1;
	marker3.transform.position.y = transform.position.y + 0.3f;
	marker4.transform.position.y = transform.position.y + 0.3f;
	if (Time.time> sT +0.01f){
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
	}
}