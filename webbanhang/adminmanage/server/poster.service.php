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
        $authority=mysqli_real_escape_string($con,$_POST['authority']);
        $query ="UPDATE user set authority='$authority' WHERE ID=$id ";
        break;
    case "changePass":
        $id=mysqli_real_escape_string($con,$_POST['id']);
        $password=md5(mysqli_real_escape_string($con,$_POST['password']));
        $authority=mysqli_real_escape_string($con,$_POST['authority']);
        $query ="UPDATE user set password='$password',authority='$authority' WHERE ID=$id ";
        break;
    case "profile":
        $id=mysqli_real_escape_string($con,$_POST['id']);
        $password=md5(mysqli_real_escape_string($con,$_POST['password']));

        $query ="UPDATE user set password='$password' WHERE ID=$id ";
        break;
    case "add":
        $name=mysqli_real_escape_string($con,$_POST['name']);
        $password=md5(mysqli_real_escape_string($con,$_POST['password']));
        $authority=mysqli_real_escape_string($con,$_POST['authority']);
        $query ="INSERT INTO user (username,password,authority) VALUES('$name','$password','$authority')";
        break;
    case 'delete':
        $id=mysqli_real_escape_string($con,$_POST['id']);
        $query ="UPDATE user set isdelete=1 WHERE ID=$id ";
        break;
    case 'active':
        $id=mysqli_real_escape_string($con,$_POST['id']);
        $query ="UPDATE user set isdelete=0 WHERE ID=$id ";
        break;

}


$result =mysqli_query($con,$query);

// if(mysqli_num_rows($result)>0){
//     $response['status']='true';
// };
echo json_encode($result);
?>