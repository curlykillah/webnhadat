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
$state=mysqli_real_escape_string($con,$_POST['state']);

switch($state){
    case "edit":
        $id=mysqli_real_escape_string($con,$_POST['id']);
        $name=mysqli_real_escape_string($con,$_POST['name']);
        $password=mysqli_real_escape_string($con,$_POST['password']);
        $vip=mysqli_real_escape_string($con,$_POST['vip']);
        $email=mysqli_real_escape_string($con,$_POST['email']);
        $image=mysqli_real_escape_string($con,$_POST['image']);

        $query ="UPDATE users set name='$name',password='$password',vip='$vip',email='$email',image='$image' WHERE id=$id ";
        break;
    case "upvip":
        $name=mysqli_real_escape_string($con,$_POST['name']);
        $vip=mysqli_real_escape_string($con,$_POST['vip']);
        $file=mysqli_real_escape_string($con,$_POST['file']);
        $query ="UPDATE users set vip='$vip',image='$file' WHERE name='$name' ";
        break;

}


$result =mysqli_query($con,$query);


echo json_encode($result);
?>