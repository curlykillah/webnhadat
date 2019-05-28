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

$state=mysqli_real_escape_string($con,$_POST['state']);

if($state=="add"){
    $name=mysqli_real_escape_string($con,$_POST['name']);
    $category=mysqli_real_escape_string($con,$_POST['category']);
    $content=mysqli_real_escape_string($con,$_POST['content']);
    $author=mysqli_real_escape_string($con,$_POST['author']);
    $image=mysqli_real_escape_string($con,$_POST['file']);
    $tags=mysqli_real_escape_string($con,$_POST['tags']);
    

    $query ="INSERT INTO product (product_name,product_category,product_content,product_author,product_img,tags) VALUES('$name','$category','$content','$author','$image','$tags')";
}

else if($state=="edit"){
    $id=mysqli_real_escape_string($con,$_POST['id']);
    $name=mysqli_real_escape_string($con,$_POST['name']);
    $category=mysqli_real_escape_string($con,$_POST['category']);
    $content=mysqli_real_escape_string($con,$_POST['content']);
    $author=mysqli_real_escape_string($con,$_POST['author']);
    $image=mysqli_real_escape_string($con,$_POST['file']);
    $tags=mysqli_real_escape_string($con,$_POST['tags']);

    $query ="UPDATE product set product_name='$name',product_category='$category',product_content='$content',product_author='$author',product_img='$image',tags='$tags' WHERE id=$id ";
}

else if($state=='delete'){
    $id=mysqli_real_escape_string($con,$_POST['id']);
    $query ="DELETE FROM product WHERE id='$id'";
}

else if($state=='view'){
    $id=mysqli_real_escape_string($con,$_POST['id']);
    $view=mysqli_real_escape_string($con,$_POST['view']);
    $query ="UPDATE product set product_view=$view WHERE id=$id";
}


$result =mysqli_query($con,$query);

// if(mysqli_num_rows($result)>0){
//     $response['status']='true';
// };
echo json_encode($result);
?>