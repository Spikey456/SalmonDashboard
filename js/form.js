var firebaseConfig = {
  apiKey: "AIzaSyCrtAOZF_LsREEunsraF9jWthN7l1UkBf0",
  authDomain: "maimai-89309.firebaseapp.com",
  databaseURL: "https://maimai-89309.firebaseio.com",
  projectId: "maimai-89309",
  storageBucket: "maimai-89309.appspot.com",
  messagingSenderId: "650135569553",
  appId: "1:650135569553:web:8fe6972f65f21989eaeb30"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();
const auth = firebase.auth();
const customerRefs = dbRef.child('customers');

/**
 * function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value)
    promise.catch(e => {alert(e.message); return});
    
    alert("Signed up");
}
 */
const completeSignIn = () => {
  
}


modalLoading.init(true);
function signIn(){
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  let object = {}
  const promise = auth.signInWithEmailAndPassword(email.value, password.value).then(user => {
    // Get the user's ID token and save it in the session cookie.
      customerRefs.child(user.user.uid).on("value", snap => {
        object = snap.val();
        return firebase.auth().currentUser.getIdToken(true).then(function (token) {
          // set the __session cookie
          
          console.log("LOGGING")
          console.log(object)
          document.cookie = '__session=' + token + ';max-age=3600';
          window.location.pathname = "/SalmonDashboard/home.php"
          })
          .catch(function (error) {//... code for error catching
            console.log(error)
          })
        })
        
      })
  
      
        
  promise.catch(e => {alert(e.message); return});

  alert("Signed in! Welcome "+ email.value+"!");
}

/*
auth.onAuthStateChanged(function(user){
  
  if(user){
      var email = user.email;
      alert("Active User: "+email)
      console.log("USER ID: "+user.uid)
      return firebase.auth().currentUser.getIdToken(true).then(function (token) {
        // set the __session cookie
        document.cookie = '__session=' + token + ';max-age=3600';
        window.location.pathname = "/SalmonDashboard/home.php"
      }).catch(function (error) {//... code for error catching
        console.log(error)
      })

      
      userID = user.uid
      window.location.pathname = "/SalmonDashboard/home.php"
  }
})*/