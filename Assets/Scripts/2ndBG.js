#pragma strict

private var tree:Transform[];	
var Player:GameObject;
var lastPos:int;
var lastIndex:int;

function Start () {
	tree = new Transform[10];
	lastPos = 0;
	lastIndex = 0;
	/*for (var i = 0; i < 10; i++){
		var name:String = "tree ("+ i+1 + ")";
		tree[i] = transform.FindChild(name);
	}*/
	tree[0] = transform.FindChild("tree (1)");
	tree[1] = transform.FindChild("tree (2)");
	tree[2] = transform.FindChild("tree (3)");
	tree[3] = transform.FindChild("tree (4)");
	tree[4] = transform.FindChild("tree (5)");
	tree[5] = transform.FindChild("tree (6)");
	tree[6] = transform.FindChild("tree (7)");
	tree[7] = transform.FindChild("tree (8)");
	tree[8] = transform.FindChild("tree (9)");
	tree[9] = transform.FindChild("tree (10)");
}

function Update () {
	if (Player.transform.position.x >= lastPos+3){
		lastPos = Player.transform.position.x;
		tree[lastIndex].position.x +=30;
		var randomDesfase:int = Random.Range(0.5, 2);
		tree[lastIndex].position.y = 0 + randomDesfase;
		lastIndex = (lastIndex+1 < 10)? lastIndex+1 : 0;
	}
}