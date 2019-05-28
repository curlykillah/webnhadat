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
        $query= "SELECT * FROM `category` ";
        $result =mysqli_query($con,$query);
        if(mysqli_num_rows($result)>0){
            while($row = mysqli_fetch_assoc($result)){
                $response[]=$row;
            }
        }else{

        }
        break;
    case "search":
        $id=mysqli_real_escape_string($con,$_POST['id']);
        $query= "SELECT * FROM `category` WHERE id='$id' ";
        $result =mysqli_query($con,$query);
        if(mysqli_num_rows($result)>0){
            while($row = mysqli_fetch_assoc($result)){
                $response[]=$row;
            }
        }else{

        }
        break;
    case "add":
        $keyword=mysqli_real_escape_string($con,$_POST['keyword']);
        $name=mysqli_real_escape_string($con,$_POST['name']);
        $piority=mysqli_real_escape_string($con,$_POST['piority']);
        $query ="INSERT  INTO `category` (cate_keyword,cate_name,cate_piority) VALUES('$keyword','$name','$piority') "   ;
        $result =mysqli_query($con,$query);
        $response=$result;
        break;
    case "edit":
        $id=mysqli_real_escape_string($con,$_POST['id']);
        $keyword=mysqli_real_escape_string($con,$_POST['keyword']);
        $name=mysqli_real_escape_string($con,$_POST['name']);
        $piority=mysqli_real_escape_string($con,$_POST['piority']);
        $query ="UPDATE category set cate_name='$name',cate_piority='$piority',cate_keyword='$keyword' WHERE id=$id ";
        $result =mysqli_query($con,$query);
        $response=$result;
        break;
    case "delete":
        $id=mysqli_real_escape_string($con,$_POST['id']);
        $query ="DELETE FROM category WHERE id='$id'";
        $result =mysqli_query($con,$query);
        $response=$result;
        break;
}


echo json_encode($response);

?>