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
    case "add":
        $postername=mysqli_real_escape_string($con,$_POST['postername']);
        $date=mysqli_real_escape_string($con,$_POST['date']);
        $content=mysqli_real_escape_string($con,$_POST['content']);
        $cate=mysqli_real_escape_string($con,$_POST['cate']);
        $action=mysqli_real_escape_string($con,$_POST['action']);
        $query ="INSERT INTO admin_manage (name_poster,date_change,name_change,category,action) VALUES('$postername','$date','$content','$cate','$action')";
        $result =mysqli_query($con,$query);
        $response['status']='success';
        break;
    case "all":
        $end=mysqli_real_escape_string($con,$_POST['end']);
        $query= "SELECT * FROM admin_manage ORDER BY id DESC limit 0,$end  ";
        $result =mysqli_query($con,$query);
        if(mysqli_num_rows($result)>0){
            while($row = mysqli_fetch_assoc($result)){
                $response[]=$row;
            }
        }
        break;
    case "seen":
        $id=mysqli_real_escape_string($con,$_POST['id']);
        $query= "UPDATE admin_manage set seen=1 WHERE id=$id";
        $result =mysqli_query($con,$query);
        break;
}
echo json_encode($response);

?>