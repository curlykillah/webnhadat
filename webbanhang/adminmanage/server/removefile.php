<?php

// echo 'asdasdsad';
include 'config.php';
$host=HOST;
$username=USERNAME;
$userpassword=USERPASSWORD;
$sqldb=SQL;
$con = mysqli_connect($host,$username,$userpassword,$sqldb);
$id = mysqli_real_escape_string($con,$_POST['id']);
$target='../../image/'.$id;
unlink('../../image/'.$id);
$query ="DELETE FROM image WHERE img_name='$id'";
$result =mysqli_query($con,$query);
// $string = 'I am.happy today.';
// $replacement = 'very ';
// $test='';
// $test= $string . $replacement;
// echo $test;
// echo strcspn($string,".");
// echo strripos($string,".");
// echo substr_replace($string, $replacement, strripos($string,"."), 0); // I am very happy today.
echo $result
?>