<?

session_start();

if(!isset($_SESSION['username'])){
	header('location:login.php');
}
echo $_SESSION['__session']

?>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Norweigan Pink Salmon | Inventory</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<link rel="stylesheet" type="text/css" href="./css/design.css?version=51">
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.22/css/dataTables.bootstrap4.min.css">
	<link rel="stylesheet" type="text/css" href="./css/design.css?version=51">
	<script type="text/javascript" src="js/jquery-3.5.1.min.js" ></script> 
	<script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-firestore.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-database.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.0.1/firebase-storage.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"></script>
	<script type="text/javascript" src='js/moment.min.js'></script>
	<script type="text/javascript" src='js/inventoryOperations.js'></script>
	
</head>
<body>
	<div class="wrapper">
		
		<?php
		include("sidebar.php"); 
		echo $sideBar;
		?>
		<div class="main">
			<div class="container container-fluid" style="padding-top:50px;">
				<div class="jumbotron">
					<div class="row">
                        <div class="col-lg-6 col-xs-8">
						<!-- small box -->
							<div class="small-box bg-yellow">
								<div class="inner">
								<h3>PHP<span id="salesCount"></span></h3>

								<p>Total Sales Profit</p>
								</div>
								<div class="icon">
									<i class="fas fa-money-bill-wave"></i>
								</div>
							</div>
						</div>
						
						<div class="col-lg-6 col-xs-8" style="cursor:pointer;" onclick="window.location = 'transactions.php'">
						<!-- small box -->
							<div class="small-box bg-secondary">
								<div class="inner">
								<h3 id="unfulfilledCount"></h3>

								<p>Unfulfilled Orders</p>
								</div>
								<div class="icon" href="transactions.php">
								<i class="fas fa-shopping-cart" ></i>
								</div>
							</div>
						</div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-xs-8">
						<!-- small box -->
							<div class="small-box bg-red">
								<div class="inner">
								<h3 id="cancelledCount"></h3>

								<p>Cancelled Orders</p>
								</div>
								<div class="icon">
									<i class="fas fa-money-bill-wave"></i>
								</div>
							</div>
						</div>
						
						<div class="col-lg-6 col-xs-8" style="cursor:pointer;" onclick="window.location = 'transactions.php'">
						<!-- small box -->
							<div class="small-box bg-green">
								<div class="inner">
								<h3 id="fulfilledCount"></h3>

								<p>Fulfilled Orders</p>
								</div>
								<div class="icon" href="transactions.php">
								<i class="fas fa-shopping-cart" ></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
</html>