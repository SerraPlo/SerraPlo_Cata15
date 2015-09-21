#pragma strict

private var bg:Transform[];
private var use:boolean[];	
var Player:GameObject;
var lastPos:int;
var dist:float;

function Start () {
	bg = new Transform[14];
	use = new boolean[14];
	dist = 0;
	for (var j = 0; j<14;j++) use[j] = true;
	bg[0] = transform.FindChild("cloud1_0");
	bg[1] = transform.FindChild("cloud1_1");
	bg[2] = transform.FindChild("cloud1_2");
	bg[3] = transform.FindChild("cloud1_3");
	bg[4] = transform.FindChild("cloud1_4");
	bg[5] = transform.FindChild("cloud2_0");
	bg[6] = transform.FindChild("cloud2_1");
	bg[7] = transform.FindChild("cloud2_2");
	bg[8] = transform.FindChild("cloud2_3");
	bg[9] = transform.FindChild("cloud2_4");
	bg[10] = transform.FindChild("cloud3_0");
	bg[11] = transform.FindChild("cloud3_1");
	bg[12] = transform.FindChild("cloud3_3");
	bg[13] = transform.FindChild("cloud3_4");
}

function Update () {
	for (var i = 0; i<14;i++){
		if (Player.transform.position.x - bg[i].position.x >= 25){
			use[i] = false;
		}
	}
	if (Player.transform.position.x - lastPos >= dist){
		var rand:int;
		rand = Random.Range(0,14);
		if (use[rand] == false){
			use[rand] = true;
			dist = Random.Range(5.5,20.0);
			
			bg[rand].position.x = Player.transform.position.x + 25;
			lastPos = Player.transform.position.x;
			bg[rand].position.y = Random.Range(3.0f,7.5f);
			//Debug.Log(TerrainGeneratorScript.ReturnRequestFloor(lastPos+15));
			//Instantiate(Marker,new Vector3(lastPos+15, TerrainGeneratorScript.ReturnRequestFloor(lastPos+15), 2), Quaternion.identity);
		}
	}	
}