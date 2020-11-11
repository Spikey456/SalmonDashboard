<?

session_start();
if(!isset($_SESSION['username'])){
	header('location:login.php');
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Norweigan Pink Salmon</title>
	<link rel="stylesheet" type="text/css" href="./css/design.css?version=51">
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.22/css/dataTables.bootstrap4.min.css">
	
</head>
<body>
	<div class="wrapper">
		<div class="sidebar">
			<h2>Pink Salmon</h2>
			<ul>
				<li><a href="home.php"><i class="fas fa-home"></i>Home</a></li>
				<li><a href="product.php"><i class="fas fa-shopping-cart"></i>Product</a></li>
				<li><a href="#"><i class="fas fa-folder"></i>Inventory</a></li>
				<li><a href="#"><i class="fas fa-users"></i>Users</a></li>
				<li><a href="#"><i class="fas fa-cog"></i>Settings</a></li>
			</ul>
		</div>
		<div class="main_content">
			
		</div>
	</div>

</body>
</html>