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
$active = mysqli_real_escape_string($con,$_POST['active']);
$status = mysqli_real_escape_string($con,$_POST['status']);
switch($status){
    case 'all':
        $query1 ="SELECT COUNT(*) FROM users WHERE user_isdelete=$delete AND user_isactive=$active ";
        $query2 ="SELECT * FROM users WHERE user_isdelete=$delete AND user_isactive=$active LIMIT $begin,$end ";
        break;
    case 'search':
        $keyword = mysqli_real_escape_string($con,$_POST['key']);
        $query1 ="SELECT COUNT(*) FROM users WHERE user_isdelete=$delete AND user_isactive=$active AND `name` like '%$keyword%' OR user_isdelete=$delete AND user_isactive=$active AND `vip` like '%$keyword%' ";
        $query2 ="SELECT * FROM users WHERE user_isdelete=$delete AND user_isactive=$active AND `name` like '%$keyword%' OR user_isdelete=$delete AND user_isactive=$active AND `vip` like '%$keyword%' LIMIT $begin,$end ";
        break;
}


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