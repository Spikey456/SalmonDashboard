const auth = firebase.auth();

async function signOut(){
    try{
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location.href = "login.php"
            alert("Signed out");
        }).catch(function(error) {
        // An error happened.
        });
        
    }catch(error){
        console.log(error)  
    }
    
}