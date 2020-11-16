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
ordersSchema = {
    quantity
    pickupDate
    weight
    estPrice
    createDate
    products
    user_id
}
*/
/*
*/

//DATETIME:  YYYY-MM-DDThh:mm:ss.sTZD
const dbRef = firebase.database().ref();
const orderRefs = dbRef.child("orders")
const customerRefs = dbRef.child('customers');
const productsRefs = dbRef.child('products');
const rolesRefs = dbRef.child('roles');


$(document).ready(function() {
    var selectedID, orRef;
    var orders = {};
    var table = $('#datatableid').DataTable({
        "language": {
            "emptyTable": 'Loading...',
            "zeroRecords": "No reco rds to display"
        }
    });
    refreshProductList();
    customerRefs.on("child_added", snap =>{
        let field = snap.val();
        let id = snap.key
        console.log(snap)
        $("#orderUser").append('<option value="'+id+'">'+field.email+'</option>')
    });
    function refreshProductList(){
        productsRefs.on("child_added", snap =>{
            let field = snap.val();
            let id = snap.key;
            $('[id^=orderProduct]').append('<option value="'+id+'">'+field.name+'</option>')
        })
    }
    refresh()
    function refresh(){
        let count = 0
        orders = {};
        table.clear().draw();
        orderRefs.on("child_added", snap => {
            count++;
            let field = snap.val();
            
            let orderID = snap.key;
            field.id = orderID
            console.log(field)
            console.log(orderID)
            orders[orderID] = field
            let localizeDate = new Date(field.created)
            localizeDate = localizeDate.getFullYear() +"-"+ localizeDate.getMonth() + "-" + localizeDate.getDay();
            console.log(localizeDate)
            console.log(orders)
            let idLabel = '<td><span id="labelName'+orderID+'">'+orderID+'</span></td>'
            let statusLabel = '<td><span id="labelEmail'+orderID+'">'+field.status+'</span></td>'
            let nameLabel = '<td><span id="labelEmail'+orderID+'">'+field.user.name+'</span></td>'
            let roleLabel = '<td><span id="labelEmail'+orderID+'">'+checkRole(field.user.role)+'</span></td>'
            let createdLabel = '<td><span id="labelRole'+orderID+'">'+localizeDate+'</span></td>'
            let fulfilledLabel = '<td><span id="labelRole'+orderID+'">'+field.fulfilled+'</span></td>'
            let viewOrderBtn = `<button type="button" id='show`+orderID+`' class="btn btn-success edit">View Order</button>`;
            table.row.add([count, idLabel, statusLabel, nameLabel, roleLabel, createdLabel, fulfilledLabel, viewOrderBtn]).draw();
            $(`#show${orderID}`).bind("click", function(event) {
                event.preventDefault()
                prodRefs = null;
                showOrderEntry(orderID)
            });
        })
        
    }

    function checkRole(roleID){
        if(roleID === "-MM7epSByKyZ4VVVPBYK"){
            return "Reseller";
        }else if(roleID === "-MM7eqzttvW3oJ3gnyYZ" ){
            return "Wholesaler";
        }
    }

    function showOrderEntry(id){
        console.log(orders[id])
    }
    $("#saveOrder").on("click", function(){

        var getDate = new Date().toJSON(); 
        let newOrder = {}
        newOrder.created = getDate;
        newOrder.status = "UNFULFILLED";
        newOrder.fulfilled = false;
        let products = {}
        let price = 0;
        let customerField, roleField, receiveOption;
        let userID = $("#orderUser").val();
        let pickupDate =$("#orderPickupDate").val();
        let storedQuantities = []
        quantityArray = $('[id^=orderQuantity]');
        quantityArray.each(function(){
            storedQuantities.push(this.value)
        })
        console.log(storedQuantities)
        console.log(pickupDate);
        selectArray = $('[id^=orderProduct]');
        let count = 0;
        customerRefs.child(userID).once("value", userSnap => {

            customerField= userSnap.val();
            console.log(customerField)
            let id = userSnap.key
           
            newOrder.user = {
                id, 
                name: customerField.name,
                email: customerField.email,
                password: customerField.password,
                role: customerField.role
            }
            console.log(newOrder)
            rolesRefs.child(customerField.role).once("value", roleSnap =>{

                roleField = roleSnap.val();
                console.log(roleField)
                
                console.log(newOrder)
                selectArray.each(function() {
                    let productId = this.value
                
                    
                    productsRefs.child(productId).on("value", snap =>{
                        if(snap){
                            let field = snap.val()
                            console.log(snap.val())
        
                            if(roleField.name === "Reseller"){
                                price += (field.pricePerKg - 15) * storedQuantities[count]
                                receiveOption = "Pickup"
                            }else if(roleField.name === "Wholesaler"){
                                price += (field.pricePerKg - 25) * storedQuantities[count]
                                price += 1000
                                receiveOption = "Delivery"
                            }
                            else{
                                price = field.pricePerKg
                            }
                            
                            let addProduct = {
                                image: field.image,
                                name: field.name,
                                category_id: field.category_id,
                                pricePerKg: field.pricePerKg,
                                stock: field.stocks
                            }
                            console.log(addProduct)
                            products[productId] = addProduct;
                            
                        }
                    })
               
                    count++;
                })
                console.log("should push...")
                newOrder.pickupDate = pickupDate;
                newOrder.total = price;
                newOrder.products = products
                newOrder.shippingMethod = receiveOption;
                console.log(newOrder)
                orderRefs.push(newOrder, function(){
                    alert("Order successfully created!")
                    $("#orderaddmodal").modal("hide")
                })
                
            })
                
        })
        
        
        console.log(products)
        
    })
})