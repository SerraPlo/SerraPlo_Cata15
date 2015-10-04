#pragma strict

private var Player:GameObject;
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

private var fragmentTransform:Transform;
private var pPosX:float;
private var pPosY:float;
private var pWidth:float = 1.1f;
private var pHeight:float = 1.1f;
private var stamina:int;

function Start () {
	fragmentTransform = transform;
	marker1 = transform.FindChild("m1");
	marker2 = transform.FindChild("m2");
	marker3 = transform.FindChild("m3");
	marker4 = transform.FindChild("m4");
	marker5 = transform.FindChild("m5");
	Player = GameObject.Find("Player");
	PlayerScript = Player.GetComponent(characterController) as characterController;
	Manager = GameObject.Find("Manager");
	ManagerScript = Manager.GetComponent("theChosenRunner") as theChosenRunner;
	pPosX = PlayerScript.GetPosX();
	pPosY = PlayerScript.GetPosY();
	//randomMove = Random.Range(0.1f, 0.5f);
}

function Update () {
	fragmentTransform.position.y += Mathf.Sin(Time.time*2.0)*0.1f*Time.deltaTime;
	fragmentTransform.rotation.z = Mathf.Sin(Time.time*2.5)*0.02f;
	pPosX = PlayerScript.GetPosX();
	pPosY = PlayerScript.GetPosY();
	if((fragmentTransform.position.x - 0.4f) < (pPosX-pWidth/2) + (pWidth) && (fragmentTransform.position.x - 0.4f) + (0.8f) > (pPosX-pWidth/2) &&
		 (fragmentTransform.position.y + 0.3f) < (0.1f + pPosY) + (pHeight) && (0.7f) + (fragmentTransform.position.y + 0.3f) > (0.1f + pPosY)) {
			Player.SendMessage("SubstractRubrica");
			Debug.Log("Fragment collected");
			Destroy(gameObject);
	}
}