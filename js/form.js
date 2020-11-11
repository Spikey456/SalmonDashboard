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

const auth = firebase.auth();


function signUp(){
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = auth.createUserWithEmailAndPassword(email.value, password.value)
  promise.catch(e => {alert(e.message); return});
  
  alert("Signed up");
}

function signIn(){
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = auth.signInWithEmailAndPassword(email.value, password.value)
  promise.catch(e => {alert(e.message); return});

  alert("Signed in! Welcome "+ email.value+"!");
}

function signOut(){
  auth.signOut();
  alert("Signed out");
}

auth.onAuthStateChanged(function(user){
 
  if(user){
      var email = user.email;
      alert("Active User: "+email)
      console.log("USER ID: "+user.uid)
      userID = user.uid
      window.location.pathname = "/SalmonDashboard/home.php"
  }else{
      alert("No Active User")
  }
})