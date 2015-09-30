#pragma strict

private var bg:Transform[];
private var use:boolean[];	
var Player:GameObject;
var lastPos:int;
var dist:float;
var Marker:GameObject;
var Manager:GameObject;
private var TerrainGeneratorScript:terrainGenerator;

function Start () {
	TerrainGeneratorScript = Manager.GetComponent("terrainGenerator") as terrainGenerator;
	bg = new Transform[10];
	use = new boolean[10];
	dist = 3.0;
	/*for (var i = 0; i < 10; i++){
		var name:String = "tree ("+ i+1 + ")";
		tree[i] = transform.FindChild(name);
	}*/
	bg[0] = transform.FindChild("arb1");
	bg[1] = transform.FindChild("arb2");
	bg[2] = transform.FindChild("arb3");
	bg[3] = transform.FindChild("arb4");
	bg[4] = transform.FindChild("arb5");
	bg[5] = transform.FindChild("fenc1");
	bg[6] = transform.FindChild("fenc2");
	bg[7] = transform.FindChild("fenc3");
	bg[8] = transform.FindChild("fenc4");
	bg[9] = transform.FindChild("fenc5");
	for (var j = 0; j<10;j++) use[j] = true;
}

function Update () {
	for (var i = 0; i<10;i++){
		if (Player.transform.position.x - bg[i].position.x >= 10){
			use[i] = false;
		}
	}
	if (Player.transform.position.x - lastPos >= dist){
		var rand:int;
		rand = Random.Range(0,10);
		if (use[rand] == false){
			use[rand] = true;
			dist = Random.Range(2.0,4.0);
			bg[rand].position.x = Player.transform.position.x + 11;
			lastPos = Player.transform.position.x;
			bg[rand].position.y = (TerrainGeneratorScript.ReturnRequestFloor(lastPos+11));
			//Debug.Log(TerrainGeneratorScript.ReturnRequestFloor(lastPos+15));
			//Instantiate(Marker,new Vector3(lastPos+15, TerrainGeneratorScript.ReturnRequestFloor(lastPos+15), 2), Quaternion.identity);
		}
	}	
}