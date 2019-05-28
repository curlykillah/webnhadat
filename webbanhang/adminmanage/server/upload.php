<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include 'config.php';
$host=HOST;
$username=USERNAME;
$userpassword=USERPASSWORD;
$sqldb=SQL;
$con = mysqli_connect($host,$username,$userpassword,$sqldb);

$response=[];
if(!empty($_FILES)){
    $starget_dir= "../../image/";
    $starget_file= $starget_dir.basename($_FILES['file']['name']);
    $starget_name=basename($_FILES['file']['name']);

    if($_FILES['file']['size']>5242880){
        $response['status']="error size";
    }
    $file_type=pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION);
    $file_type_allow=array('png','jpg','jpeg','gif');
    if(!in_array(strtolower($file_type) ,$file_type_allow)){
        $response['status']="error type";
    }
    $i=0;
    while(file_exists($starget_file)){
        $i++;
        $starget_name_test=substr_replace(basename($_FILES['file']['name']),'('.$i.')', strripos(basename($_FILES['file']['name']),"."), 0);
        $starget_name=$starget_name_test;
        $starget_file_test=$starget_dir.$starget_name_test;
        $starget_file=$starget_file_test;
    }
    if($response==[]){
        move_uploaded_file($_FILES['file']['tmp_name'],$starget_file);
        $name=$starget_name;
        $size=$_FILES['file']['size'];
        $type=$_FILES['file']['type'];
        $query ="INSERT INTO image (img_name,img_size,img_type) VALUES('$name','$size','$type')";
        $result =mysqli_query($con,$query);
        $response['status']="Uploaded";
        $response['name']=$starget_name;
    }
    echo json_encode($response);
}else{
    $response['status']="error";
    echo json_encode($response);
}
?>