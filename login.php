<!--<!DOCTYPE html>
<html>
<head>
	<title>User Login and Registration</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" text="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
</head>
<body>
<div class="container">
	<div class="login-box">
	<div class="row">
		<div class="col-md-6 login-left">
			<h2>Login Here</h2>
			<form action="validation.php" method="POST">
				<div class="form-group">
					<label>Username</label>
					<input type="text" name="user" class="form-control" required>
				</div>
				<div class="form-group">
					<label>Password</label>
					<input type="password" name="password" class="form-control" required>
				</div>
				<button type="submit" class="btn btn-primary">Login</button>

			</form>
	</div>

		<div class="col-md-6 login-right">
			<h2>Register Here</h2>
			<form action="registration.php" method="POST">
				<div class="form-group">
					<label>Username</label>
					<input type="text" name="user" class="form-control" required>
				</div>
				<div class="form-group">
					<label>Password</label>
					<input type="password" name="password" class="form-control" required>
				</div>
				<button type="submit" class="btn btn-primary">Register</button>

			</form>
	</div>
	</div>
	</div>
</div>
</body>
</html>-->

<!DOCTYPE html>
<html>
<head>
	<title> FORM </title>
	<!-- The core Firebase JS SDK is always required and must be listed first -->
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
</html>