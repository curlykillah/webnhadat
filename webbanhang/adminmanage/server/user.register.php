<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

session_start();

$response=[];

include 'config.php';
$host=HOST;
$username=USERNAME;
$userpassword=USERPASSWORD;
$sqldb=SQL;
$con = mysqli_connect($host,$username,$userpassword,$sqldb);

$name=mysqli_real_escape_string($con,$_POST['name']);
$password=mysqli_real_escape_string($con,$_POST['password']);
$email=mysqli_real_escape_string($con,$_POST['email']);
$vip=mysqli_real_escape_string($con,$_POST['vip']);
$image=mysqli_real_escape_string($con,$_POST['file']);
$query ="INSERT INTO users (name,password,email,vip,image) VALUES('$name','$password','$email','$vip','$image')";
$result =mysqli_query($con,$query);
echo json_encode($result);
?>