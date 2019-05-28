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
$begin=mysqli_real_escape_string($con,$_POST['begin']);
$end=mysqli_real_escape_string($con,$_POST['end']);
$category=mysqli_real_escape_string($con,$_POST['category']);
$query ="SELECT * FROM product WHERE product_category='$category'
ORDER BY RAND()
LIMIT $end";



$result =mysqli_query($con,$query);

if(mysqli_num_rows($result)>0){

    while($row = mysqli_fetch_assoc($result)){
        $response[]=$row;
    }
}else{

}
echo json_encode($response);

?>