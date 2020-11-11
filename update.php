<?php
$connection = mysqli_connect("localhost","root","");
$db = mysqli_select_db($connection, 'salmon');

	if (isset($_POST['updatedata']))
	{
		$id = $_POST['update_id'];

		$ProdCode = $_POST['ProdCode'];
		$ProdName = $_POST['ProdName'];
		$ProdPrice = $_POST['ProdPrice'];

		$query = "UPDATE productdata SET ProdCode= '$ProdCode', ProdName= '$ProdName', ProdPrice= '$ProdPrice' WHERE id='$id' ";
		$query_run = mysqli_query($connection, $query);

		if ($query_run) 
		{
			echo '<script> alert("Data Updated"); </script>';
              header('location: product.php');
		}
		else
		{
			echo '<script> alert("Fail to Update Data"); </script>';

		}
	}


?>