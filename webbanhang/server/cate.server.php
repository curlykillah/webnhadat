<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

session_start();

include 'config.php';
$host=HOST;
$username=USERNAME;
$userpassword=USERPASSWORD;
$sqldb=SQL;

$response=[];

$con = mysqli_connect($host,$username,$userpassword,$sqldb);
$category=mysqli_real_escape_string($con,$_POST['category']);
$query= "SELECT * FROM `category` WHERE cate_keyword= '$category'";

$result =mysqli_query($con,$query);

if(mysqli_num_rows($result)>0){

    while($row = mysqli_fetch_assoc($result)){
        $response[]=$row;
    }
}else{

}
echo json_encode($response);

?>