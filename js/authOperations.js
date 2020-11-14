const auth = firebase.auth();

function signOut(){
    auth.signOut();
    window.location.href = "login.php"
    alert("Signed out");
}