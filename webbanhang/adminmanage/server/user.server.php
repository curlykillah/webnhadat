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
$delete = mysqli_real_escape_string($con,$_POST['delete']);
$active = mysqli_real_escape_string($con,$_POST['active']);

$query ="SELECT * FROM users WHERE user_isdelete=$delete AND user_isactive=$active";
$result = mysqli_query($con,$query);

if(mysqli_num_rows($result)>0){
    while($row = mysqli_fetch_assoc($result)){
        $response[]=$row;
    }
}else{
    $response['status']='error';
}


echo json_encode($response);
// print_r($_POST);
?>