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

$query ="SELECT * FROM users WHERE id='$userid' ";
$result = mysqli_query($con,$query);

if(mysqli_num_rows($result)>0){
    
    while($row = mysqli_fetch_assoc($result)){
        $response[]=$row;
    }

}else{
    $response['status']='error';
}


echo json_encode($response);
?>