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
    case "all":
        $query= "SELECT * FROM `tags` ";
        $result =mysqli_query($con,$query);
        if(mysqli_num_rows($result)>0){
            while($row = mysqli_fetch_assoc($result)){
                $response[]=$row;
            }
        }else{

        }
        break;
    case "add":
        $name=mysqli_real_escape_string($con,$_POST['name']);
        $query ="INSERT  INTO `tags` (tag_name) VALUES('$name') "   ;
        $result =mysqli_query($con,$query);
        $response=$result;
        break;
    case "delete":
        $id=mysqli_real_escape_string($con,$_POST['id']);
        $query ="DELETE FROM tags WHERE tag_id='$id'";
        $result =mysqli_query($con,$query);
        $response=$result;
        break;
}




echo json_encode($response);

?>