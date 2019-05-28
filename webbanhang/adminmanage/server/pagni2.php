<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

session_start();
$response=[];
$resstate=[];
include 'config.php';
$host=HOST;
$username=USERNAME;
$userpassword=USERPASSWORD;
$sqldb=SQL;
$con = mysqli_connect($host,$username,$userpassword,$sqldb);

$begin =mysqli_real_escape_string($con,$_POST['begin']);
$end =mysqli_real_escape_string($con,$_POST['end']);
$delete = mysqli_real_escape_string($con,$_POST['delete']);

$query1 ="SELECT COUNT(*) FROM user ";
$query2 ="SELECT * FROM user WHERE isdelete=$delete LIMIT $begin,$end ";

$result1 =mysqli_query($con,$query1);
$result2 =mysqli_query($con,$query2);

if(mysqli_num_rows($result2)>0){
    while($row = mysqli_fetch_assoc($result2)){
        $response['state'][]=$row;
    }
}else{
}

$row1 = mysqli_fetch_assoc($result1);
$response['count']=$row1['COUNT(*)'];
echo json_encode($response);

?>