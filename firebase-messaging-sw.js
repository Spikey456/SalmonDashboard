 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here. Other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
    apiKey: "AIzaSyCrtAOZF_LsREEunsraF9jWthN7l1UkBf0",
    authDomain: "maimai-89309.firebaseapp.com",
    databaseURL: "https://maimai-89309.firebaseio.com",
    projectId: "maimai-89309",
    storageBucket: "maimai-89309.appspot.com",
    messagingSenderId: "650135569553",
    appId: "1:650135569553:web:8fe6972f65f21989eaeb30"
 });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();

 messaging.setBackgroundMessageHandler(function(payload){
    const title = 'Hello World';
    const options = {
       body: payload.data.status
    }
    return self.registration.showNotification(title, options);
 })