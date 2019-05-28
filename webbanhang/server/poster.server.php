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

$state=mysqli_real_escape_string($con,$_POST['state']);

switch($state){
    case 'all':
        $delete = mysqli_real_escape_string($con,$_POST['delete']);
        $query ="SELECT * FROM user WHERE isdelete=$delete";
        break;
    case 'id':
        $userid = mysqli_real_escape_string($con,$_POST['userid']);
        $query ="SELECT * FROM user WHERE ID=$userid";
        break;
}

$result = mysqli_query($con,$query);

if(mysqli_num_rows($result)>0){
    while($row = mysqli_fetch_assoc($result)){
        $response[]=$row;
    }
}else{
    
}


echo json_encode($response);
// print_r($_POST);
?>