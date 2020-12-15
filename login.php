<!DOCTYPE html>
<html>
<head>
	<title>User Login and Registration</title>
	<link rel="stylesheet" type="text/css" href="./css/style.css">
	<link rel="stylesheet" text="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
	<script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-database.js"></script>
	<script src="./js/form.js"></script>
</head>
<body>
<div class="container">
	<div class="login-box">
	
		<div class="login-left">
			<h2>Pink Salmon Dashboard</h2> 
			<div class="form-group">
				<label>Email</label>
				<input type="text" id="email" class="form-control" required>
			</div>
			<div class="form-group">
				<label>Password</label>
				<input type="password" id="password" class="form-control" required>
			</div>
			<button type="button" onclick="signIn();" class="btn btn-primary">Login</button>

		</div>
	
	</div>
</div>
</body>
</html>
<!--
<!DOCTYPE html>
<html>
<head>
	<title> FORM </title>
	 The core Firebase JS SDK is always required and must be listed first 
	<script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"></script>
	<script src="./js/form.js"></script>


</head>
<body>
	<h1> FORM </h1>
	<div id="formContainer">
		<div id="header">  </div>
			<input type="email" placeholder="email" id="email"/>
			<input type="password" placeholder="password" id="password"/>

				<button onclick="signUp()" id="signUp"> Sign Up </button>
				<button onclick="signIn()" id="signIn"> Sign In </button>
				<button onclick="signOut()" id="sigOut"> Sign Out </button>
	</div>

</body>
</html>-->