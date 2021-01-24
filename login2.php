<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" text="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="./css/style2.css">
	<script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-database.js"></script>
    <script src="./js/form.js"></script>
</head>

<div id="cover">
        <div id="form-ui">
            <form method="post" action="">
                <div id="close-form"></div>
                <div id="form-body">
                    <div id="welcome-lines">
                        <div id="w-line-1">Hi,Sellers</div>
                        <div id="w-line-2">Welcome Back</div>
                    </div>
                    <div id="input-area">
                        <div class="f-inp">
                            <input type="text" placeholder="Email Address" id="email">
                        </div>
                        <div class="f-inp">
                            <input type="password" placeholder="Password" id="password">
                        </div>
                    </div>
                    <div id="submit-button-cvr">
                        <button type="button" id="submit-button" onclick="signIn();"class="btn btn-primary" >LOGIN</button>
                    </div>
                    <div id="forgot-pass">
                        <a href="#">Forgot password?</a>
                    </div>
                    <div id="bar"></div>
                </div>
            </form>
            <div id="img-box">
                <img src="http://k003.kiwi6.com/hotlink/g6uwrzfdof/l_ui.png" alt="UI Image">
            </div>
        </div>
    </div>

</html>