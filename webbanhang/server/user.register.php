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
$password=md5(mysqli_real_escape_string($con,$_POST['password']));
$email=mysqli_real_escape_string($con,$_POST['email']);
$phone=mysqli_real_escape_string($con,$_POST['phone']);
$active=mysqli_real_escape_string($con,$_POST['active']);

$query ="INSERT INTO users (name,password,email,users_phone,user_isactive) VALUES('$name','$password','$email','$phone',$active)";
$result =mysqli_query($con,$query);

echo json_encode($result);
?>