<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

if(!isset($_POST)) die();

session_start();
$response =[];

include 'config.php';
$host=HOST;
$username=USERNAME;
$userpassword=USERPASSWORD;
$sqldb=SQL;


$con = mysqli_connect($host,$username,$userpassword,$sqldb);
$userid = mysqli_real_escape_string($con,$_POST['userid']);
$email = mysqli_real_escape_string($con,$_POST['email']);
$firstName = mysqli_real_escape_string($con,$_POST['firstName']);
$lastName = mysqli_real_escape_string($con,$_POST['lastName']);
$adress = mysqli_real_escape_string($con,$_POST['adress']);

$query ="UPDATE users set email='$email',user_firstname='$firstName',user_lastname='$lastName',user_adress='$adress' WHERE id=$userid ";
$result = mysqli_query($con,$query);

if($result==true){
    $response['status']='success';
}else{
    $response['status']='error';
}


echo json_encode($response);
// print_r($_POST);
?>