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
$id=mysqli_real_escape_string($con,$_POST['id']);
$state=mysqli_real_escape_string($con,$_POST['state']);



 if($state=="edit"){
    $vip=mysqli_real_escape_string($con,$_POST['vip']);
    $email=mysqli_real_escape_string($con,$_POST['email']);

    $query ="UPDATE users set vip='$vip',email='$email' WHERE id=$id ";
}else if($state=="changePass"){
    $password=md5(mysqli_real_escape_string($con,$_POST['password']));
    $vip=mysqli_real_escape_string($con,$_POST['vip']);
    $email=mysqli_real_escape_string($con,$_POST['email']);

    $query ="UPDATE users set password='$password',vip='$vip',email='$email' WHERE id=$id ";
}

else if($state=='delete')
$query ="UPDATE users set user_isdelete=1 WHERE id=$id ";
else if($state=='undelete')
$query ="UPDATE users set user_isdelete=0 WHERE id=$id ";
else if($state=='active')
$query ="UPDATE users set user_isactive=1 WHERE id=$id ";
$result =mysqli_query($con,$query);

// if(mysqli_num_rows($result)>0){
//     $response['status']='true';
// };
echo json_encode($result);
?>