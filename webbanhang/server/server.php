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
$status=mysqli_real_escape_string($con,$_POST['status']);

switch($status){
    case "id":
        $id=mysqli_real_escape_string($con,$_POST['id']);
        $category=mysqli_real_escape_string($con,$_POST['category']);
        $query= "SELECT * FROM `product` WHERE id= $id AND product_category='$category'";
        break;
    case "all":
        $query ="SELECT * FROM `product`";
        break;
    case "category":
        $category=mysqli_real_escape_string($con,$_POST['category']);
        $query= "SELECT * FROM `product` WHERE product_category='$category'";
        break;
}



$result =mysqli_query($con,$query);

if(mysqli_num_rows($result)>0){

    while($row = mysqli_fetch_assoc($result)){
        $response[]=$row;
    }
}else{

}
echo json_encode($response);

?>