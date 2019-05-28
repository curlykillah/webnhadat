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
$category=mysqli_real_escape_string($con,$_POST['category']);
$keyword=mysqli_real_escape_string($con,$_POST['keyword']);
$begin =mysqli_real_escape_string($con,$_POST['begin']);
$end =mysqli_real_escape_string($con,$_POST['end']);
$order =mysqli_real_escape_string($con,$_POST['order']);

$query= "SELECT * FROM `product` WHERE `product_category`='$category' AND `tags` like '%$keyword%' OR `product_category`='$category'
 AND `product_name` like '%$keyword%' OR `product_category`='$category' AND `product_author` like '%$keyword%' ORDER BY $order DESC LIMIT $begin,$end ";
$query2= "SELECT COUNT(*) FROM `product` WHERE `product_category`='$category' AND `tags` like '%$keyword%' OR `product_category`='$category'
AND `product_name` like '%$keyword%' OR `product_category`='$category' AND `product_author` like '%$keyword%' ";

$result =mysqli_query($con,$query);
$result2 =mysqli_query($con,$query2);
if(mysqli_num_rows($result)>0){

    while($row = mysqli_fetch_assoc($result)){
        $response['state'][]=$row;
    }
}else{

}
$row1 = mysqli_fetch_assoc($result2);
$response['count']=$row1['COUNT(*)'];
echo json_encode($response);

?>