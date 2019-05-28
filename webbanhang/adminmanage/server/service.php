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
$id=mysqli_real_escape_string($con,$_POST['id']);
$state=mysqli_real_escape_string($con,$_POST['state']);

if($state=="add"){
    $name=mysqli_real_escape_string($con,$_POST['name']);
    $category=mysqli_real_escape_string($con,$_POST['category']);
    $content=mysqli_real_escape_string($con,$_POST['content']);
    $mota=mysqli_real_escape_string($con,$_POST['mota']);
    $author=mysqli_real_escape_string($con,$_POST['author']);
    $image=mysqli_real_escape_string($con,$_POST['file']);
    $tags=mysqli_real_escape_string($con,$_POST['tags']);
    $isslide=mysqli_real_escape_string($con,$_POST['isslide']);

    $query ="INSERT INTO product (product_name,product_category,product_content,product_author,product_img,tags,product_isslide,product_mota) VALUES('$name','$category','$content','$author','$image','$tags','$isslide','$mota')";
}

else if($state=="edit"){
    $name=mysqli_real_escape_string($con,$_POST['name']);
    $category=mysqli_real_escape_string($con,$_POST['category']);
    $content=mysqli_real_escape_string($con,$_POST['content']);
    $author=mysqli_real_escape_string($con,$_POST['author']);
    $image=mysqli_real_escape_string($con,$_POST['file']);
    $tags=mysqli_real_escape_string($con,$_POST['tags']);
    $mota=mysqli_real_escape_string($con,$_POST['mota']);
    $isslide=mysqli_real_escape_string($con,$_POST['isslide']);

    $query ="UPDATE product set product_name='$name',product_category='$category',product_content='$content',product_isslide='$isslide',product_mota='$mota',product_author='$author',product_img='$image',tags='$tags' WHERE id=$id ";
}

else if($state=='delete')
$query ="DELETE FROM product WHERE id='$id'";

$result =mysqli_query($con,$query);

// if(mysqli_num_rows($result)>0){
//     $response['status']='true';
// };
echo json_encode($result);
?>