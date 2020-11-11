<?php
$connection = mysqli_connect("localhost","root","");
$db = mysqli_select_db($connection, 'salmon');

	if (isset($_POST['deletedata']))
	{
			$id = $_POST['delete_id'];

		$query = "DELETE FROM productdata WHERE id='$id'";
		$query_run = mysqli_query($connection, $query);

		if ($query_run) 
		{
			echo '<script> alert("Succesfully Deleted Data"); </script>';
              header('location: product.php');
		}
		else
		{
			echo '<script> alert("There is a trouble in deleting data"); </script>';

		}
	}


?>
