#pragma strict

var player:GameObject;

function Start () {

}

function Update () {
	transform.position.x = player.transform.position.x;
	//transform.LookAt(player.transform);
}