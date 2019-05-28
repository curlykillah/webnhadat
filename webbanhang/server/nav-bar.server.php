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
$vip=mysqli_real_escape_string($con,$_POST['vip']);
$query= "SELECT * FROM `category` WHERE cate_piority<= $vip";

$result =mysqli_query($con,$query);

if(mysqli_num_rows($result)>0){

    while($row = mysqli_fetch_assoc($result)){
        $response[]=$row;
    }
}else{

}
echo json_encode($response);

?>