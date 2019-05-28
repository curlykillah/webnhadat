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
$status =mysqli_real_escape_string($con,$_POST['status']);

if($status=="home"){
    $query1 ="SELECT COUNT(*) FROM `product` ";
    $query2 ="SELECT * FROM `product` LIMIT $begin,$end ";
}else if($status=="category"){
    $category =mysqli_real_escape_string($con,$_POST['category']);
    $order =mysqli_real_escape_string($con,$_POST['order']);
    $query1 ="SELECT COUNT(*) FROM `product` WHERE product_category='$category'  ";
    $query2 ="SELECT * FROM `product` WHERE product_category='$category' ORDER BY $order DESC LIMIT $begin,$end ";
}else{
    $response['status']="Error";
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