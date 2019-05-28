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
$email = mysqli_real_escape_string($con,$_POST['email']);
$status = mysqli_real_escape_string($con,$_POST['status']);
switch($status){
    case "check":
        $query ="SELECT * FROM users WHERE email='$email' AND user_isdelete=0";
        $result = mysqli_query($con,$query);
        if(mysqli_num_rows($result)>0){
            $response['status']='success';
            $response['email']=$email;
        }else{
            $response['status']='error';
        }
        break;
    case "changePass":
        $newpassword = md5(mysqli_real_escape_string($con,$_POST['newpassword']));
        $query ="UPDATE users set password='$newpassword' WHERE email='$email' ";
        $result = mysqli_query($con,$query);
        if($result==true){
            $response['status']='success';
        }else{
            $response['status']='error';
        }
        break; 
}
echo json_encode($response);
// print_r($_POST);
?>