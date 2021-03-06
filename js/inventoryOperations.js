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

/*
productSchema = {
    name
}
*/
const dbRef = firebase.database().ref();
const orderRefs = dbRef.child("orders")
const customerRefs = dbRef.child('customers');



$(document).ready(function() {
    getOrderCountAndSales();
    getCustomersCount();
    function getOrderCountAndSales() {
        let count = 0;
        let sales = 0;
        let unfulfilledOrders = 0;
        let cancelledOrders = 0;
        let fulfilledOrders = 0;
 
        orderRefs.once('value', snap => {
            for(const [key, value] of Object.entries(snap.val())){
                count++;
                sales += value.total;
                if(value.status !== "FULFILLED" && value.status !== "CANCELLED" && value.status !=="REJECTED" && value.status !=="REQUEST_FOR_CANCEL"){
                    unfulfilledOrders++;
                }else if(value.status === "CANCELLED" && value.status !=="REJECTED " && value.status == "REQUEST_FOR_CANCEL"){
                    cancelledOrders++;
                }else{
                    fulfilledOrders++;
                }
                
            }
            sales = sales.toString();
            sales = sales.replace(/^\d{1,3}(,\d{3})*(\.\d+)?$/)
            document.getElementById('salesCount').innerHTML = sales;
            document.getElementById('unfulfilledCount').innerHTML = unfulfilledOrders;
            document.getElementById('cancelledCount').innerHTML = cancelledOrders;
            document.getElementById('fulfilledCount').innerHTML = fulfilledOrders;
        })
    }
    function getCustomersCount() {
        let count = 0;
        console.log("Get customer");
        customerRefs.once('value', snap => {
            for(const [key, value] of Object.entries(snap.val())){
                count++;
            }
            
            document.getElementById('customerCount').innerHTML = count;
        })
    }
    
})