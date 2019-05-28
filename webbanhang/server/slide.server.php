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
        break;
    case "all":
        $order=mysqli_real_escape_string($con,$_POST['order']);
        $query ="SELECT * FROM product
        WHERE product_isslide='active'
        ORDER BY $order DESC";
        break;
    case "category":
      
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