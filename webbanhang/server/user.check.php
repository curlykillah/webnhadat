<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

$response =[];

include 'config.php';
$host=HOST;
$username=USERNAME;
$userpassword=USERPASSWORD;
$sqldb=SQL;


$con = mysqli_connect($host,$username,$userpassword,$sqldb);
$status = mysqli_real_escape_string($con,$_POST['status']);

switch($status){
    case "all":
            $username = mysqli_real_escape_string($con,$_POST['username']);
            $useremail = mysqli_real_escape_string($con,$_POST['useremail']);
            $query ="SELECT * FROM users WHERE name='$username' ";
            $result = mysqli_query($con,$query);
            
            $query1 ="SELECT * FROM users WHERE email='$useremail' ";
            $result1 = mysqli_query($con,$query1);
            
            if(mysqli_num_rows($result)>0){
                $response['username']='error';
                $response['status']='error';
            };
            if(mysqli_num_rows($result1)>0){
                $response['useremail']='error';
                $response['status']='error';
            };
            break;
    case "email":
            $useremail = mysqli_real_escape_string($con,$_POST['useremail']);
            $query1 ="SELECT * FROM users WHERE email='$useremail' ";
            $result1 = mysqli_query($con,$query1);
            
            if(mysqli_num_rows($result1)>0){
                $response['status']='error';
            };
            break;
    case "check":
            $username = mysqli_real_escape_string($con,$_POST['username']);
            $useremail = mysqli_real_escape_string($con,$_POST['useremail']);
            $query ="SELECT * FROM users WHERE email='$useremail' AND name='$username' ";
            $result = mysqli_query($con,$query);
            if(mysqli_num_rows($result)>0){
                $response['status']='success';
            }else{
                $response['status']='error';
            }
            break;
}




echo json_encode($response);
?>