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
$username = mysqli_real_escape_string($con,$_POST['username']);
$password = md5(mysqli_real_escape_string($con,$_POST['password']));

$query ="SELECT * FROM users WHERE name='$username' AND password='$password' AND user_isdelete=0 AND user_isactive=1";
$result = mysqli_query($con,$query);

if(mysqli_num_rows($result)>0){
    $response['status']= 'loggedin';
    while($row = mysqli_fetch_assoc($result)){
        $response[]=$row;
    }

}else{
    $response['status']='error';

}


echo json_encode($response);
// print_r($_POST);
?>