<?php
$connection = mysqli_connect("localhost","root","");
$db = mysqli_select_db($connection, 'salmon');

	if (isset($_POST['savedata']))
	{
		$ProdCode = $_POST['ProdCode'];
		$ProdName = $_POST['ProdName'];
		$ProdPrice = $_POST['ProdPrice'];

		$query = "INSERT INTO productdata(`ProdCode`, `ProdName`, `ProdPrice`) VALUES ('".$ProdCode."','".$ProdName."','".$ProdPrice."')";
		//$query_run = mysqli_query($connection, $query);

		if (mysqli_query($connection, $query)) 
		{
			echo '<script> alert("Data Save"); </script>';
             //header('location: product.php');
		}
		else
		{
			echo '<script> alert("Data Not Save"); </script>';

		}
	}


?>