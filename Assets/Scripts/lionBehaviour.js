#pragma strict

private var head:Transform;
private var armL:Transform;
private var armR:Transform;
private var body:Transform;
private var legL:Transform;
private var legR:Transform;
private var tail:Transform;

var player:GameObject;

function Start () {
	head = transform.FindChild("Lleo_Head");
	armL = transform.FindChild("Lleo_ArmL");
	armR = transform.FindChild("Lleo_ArmR");
	body = transform.FindChild("Lleo_Body");
	legL = transform.FindChild("Lleo_LegL");
	legR = transform.FindChild("Lleo_LegR");
	tail = transform.FindChild("Lleo_Tail");
}

function Update () {
	transform.position.x = player.transform.position.x-5;
	head.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.1f;
	armL.transform.rotation.z = -Mathf.Sin(Time.time*2.5)*0.25f;
	armR.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.25f;
	legL.transform.rotation.z = -Mathf.Sin(Time.time*2.5)*0.2f;
	legR.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.2f;
	tail.transform.rotation.z = Mathf.Sin(Time.time*2.5)*0.2f;
}