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
	<link rel="stylesheet" href="design.css">
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
</head>
<body>
	<div class="wrapper">
		<div class="sidebar">
			<h2>Pink Salmon</h2>
			<ul>
				<li><a href="home.php"><i class="fas fa-home"></i>Home</a></li>
				<li><a href="product.php"><i class="fas fa-shopping-cart"></i>Product</a></li>
				<li><a href="#"><i class="fas fa-folder"></i>Inventory</a></li>
				<li><a href="#"><i class="fas fa-cog"></i>Settings</a></li>
			</ul>

		</div>
		<div class="main_content">
			
		</div>
	</div>

</body>
</html>