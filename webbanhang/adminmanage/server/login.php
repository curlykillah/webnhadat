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
$password=md5(mysqli_real_escape_string($con,$_POST['password']));

$query ="SELECT * FROM `user` WHERE username='$username' AND password='$password'";
$result = mysqli_query($con,$query);

if(mysqli_num_rows($result)>0){
    // $response['status']= 'loggedin';
    //     $response['user']=$username;
    //     $response['id']=md5(uniqid());
    //     $_SESSION['id']=$response['id'];
    //     $_SESSION['user']=$username;
    $response['status']= 'loggedin';
    while($row = mysqli_fetch_assoc($result)){
        $response['user']=$row['username'];
        $response['authority']=$row['authority'];
        $response['id']=$row['ID'];
    }

}else{
    $response['status']='error';
}


echo json_encode($response);
// print_r($_POST);
?>