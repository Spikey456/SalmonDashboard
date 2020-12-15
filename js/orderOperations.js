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
    var productObjs = {};
    var customerObjs = {};
    var orders = {};
    var table = $('#datatableid').DataTable({
        "language": {
            "emptyTable": 'Loading...',
            "zeroRecords": "No reco rds to display"
        }
    });

    refreshProductList();
    refreshCustomerList();
    
    function refreshCustomerList(){
        customerObjs = {};
        customerRefs.on("child_added", snap =>{
            let field = snap.val();
            let id = snap.key
            console.log(snap)
            $("#orderUser").append('<option value="'+id+'">'+field.name+'&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'+field.email+'</option>')
            customerObjs[id] = field
            console.log(customerObjs)
        });
    }
    
    function refreshProductList(){
        $('[id^=orderProduct]').html(`<option default value="">Select Product...</option>`);
        productsRefs.on("child_added", snap =>{
            if(snap){
                let field = snap.val();
                let id = snap.key;
                $('[id^=orderProduct]').append('<option value="'+id+'">'+field.name+'</option>')
                productObjs[id] = field;
                console.log(productObjs)
            }
            
        })
    }

    refresh()
    function refresh(){
        let count = 0
        orders = {};
        productObjs = {};
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
            localizeDate = localizeDate.toISOString().split('T')[0];
            console.log(localizeDate)
            console.log(orders)
            let idLabel = '<td><span id="labelName'+orderID+'">'+orderID+'</span></td>'
            let statusLabel = '<td><span id="labelEmail'+orderID+'">'+field.status+'</span></td>'
            let nameLabel = '<td><span id="labelEmail'+orderID+'">'+field.user.name+'</span></td>'
            let roleLabel = '<td><span id="labelEmail'+orderID+'">'+checkRole(field.user.role)+'</span></td>'
            let createdLabel = '<td><span id="labelRole'+orderID+'">'+localizeDate+'</span></td>'
            let fulfilledLabel = '<td><span id="labelRole'+orderID+'">'+field.fulfilled+'</span></td>'
            let totalLabel = '<td><span id="labelRole'+orderID+'">'+field.fulfilled+'</span></td>'
            let viewOrderBtn = `<button type="button" id='show`+orderID+`' class="btn btn-success edit">View Order</button>`;
            table.row.add([count, idLabel, statusLabel, nameLabel, roleLabel, createdLabel, fulfilledLabel, viewOrderBtn]).draw();
            $("#datatableid").on("click", `#show${orderID}`, function(){
                // your code goes here
                event.preventDefault()
                prodRefs = null;
                showOrderEntry(orderID)
             });
            /*$(`#show${orderID}`).bind("click", function(event) {
                event.preventDefault()
                prodRefs = null;
                showOrderEntry(orderID)
            });*/
        })
        
    }

    function checkRole(roleID){
        if(roleID === "-MM7epSByKyZ4VVVPBYK"){
            return "Reseller";
        }else if(roleID === "-MM7eqzttvW3oJ3gnyYZ" ){
            return "Wholesaler";
        }
    }

    function localizeStatus(status){
        if(status === "UNFULFILLED"){
            return "Unfulfilled";
        }else if(status === "ORDER_APPROVED"){
            return "Approved";
        }else if(status === "IN_TRANSIT"){
            return "On the way";
        }else if(status === "FULFILLED"){
            return "Fulfilled";
        }else if(status === "CANCELLED"){
            return "Cancelled";
        }else if(status === "REQUEST_FOR_CANCEL"){
            return "Request for cancellation";
        }else if(status === "REJECTED"){
            return "Rejected"
        }
    }
    function numberWithCommas(x) {
        return "PHP"+x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let addProductCounter = 1;
    $("#addMoreProducts").on("click", function(){
        console.log("Adding more products");
        $("#selectGroup").append(`
        <div class="row" style="padding-bottom:10px;">
            <div class="col-8">
                <select class="custom-select"  id="orderProduct[${addProductCounter}]" required>
                    <option selected value="">Select Product...</option>
                </select>
            </div>
            <div class="col-3" style="padding: 0px 5px; margin-right:10px;">
                <input type="number" required class="form-control" id="orderQuantity[${addProductCounter}]" placeholder="Qty.">
            </div>
            <div class="col" style="padding: 0px 5px;">
                <button type="button" class="btn btn-danger" id="removeThis[${addProductCounter}]">-</button>
              </div>
        </div>
        `);
        refreshProductList();
        $(`#removeThis[${addProductCounter}]`).bind('click', function(event){
            event.preventDefault()
            console.log("dddd");
            addProductCounter--;
        })
        addProductCounter++;
    })
    

    function removeThisProduct(num){
        $(`#row[${num}]`).remove();
    }

    function showOrderEntry(id){
        console.log(orders[id])
        let localizeDate = new Date(orders[id].created)
        localizeDate = localizeDate.toISOString().split('T')[0];
        let shippingWholeSale = 0;
        let orderProductView = ``;
        let orderStatusDisplay = `
            <div class="row justify-content-around">
              <div class="col">
                <label style="font-weight: 600;">Order Status:</label>
                <p style="text-align:center" id="orderViewStatusDisplay">${localizeStatus(orders[id].status)}</p>
              </div>
              <div class="col">
                <label style="font-weight: 600;">Placed on:</label>
                <p style="text-align:center" id="orderViewCreateDate">${localizeDate}</p>
              </div>
              <div class="col">
                <label style="font-weight: 600;">Customer Name:</label>
                <p style="text-align:center" id="orderViewCustName">${orders[id].user.name}</p>
              </div>
              <div class="col">
                <label style="font-weight: 600;">Email:</label>
                <p style="text-align:center" id="orderViewCustEmail">${orders[id].user.email}</p>
              </div>
            </div>
        `;

        let orderSummaryDisplay = `
            <h4>Order Summary</h4>
            <hr class="solid">
            <div class="col">
              <div class="row justify-content-end">
                <div class="col">
                  <label style="font-weight: 600;">Customer Type: </label>
                </div>
                <div class="col">
                  <p>${orders[id].user.role === "-MM7epSByKyZ4VVVPBYK" ? "Reseller": "Wholesaler"}</p>
                </div>
              </div>
              <div class="row justify-content-end">
                <div class="col">
                  <label style="font-weight: 600;">Shipping Method: </label>
                </div>
                <div class="col">
                  <p>${orders[id].shippingMethod}</p>
                </div>
              </div>
              <div class="row justify-content-end">
                <div class="col">
                  <label style="font-weight: 600;">Subtotal: </label>
                </div>
                <div class="col">
                  <p>${numberWithCommas(orders[id].subtotal)}</p>
                </div>
              </div>
              <div class="row justify-content-end">
                <div class="col">
                  <label style="font-weight: 600;">Shipping Fee: </label>
                </div>
                <div class="col">
                  <p>${orders[id].user.role === "-MM7epSByKyZ4VVVPBYK" ? "N/A": "PHP1,000"}</p>
                </div>
              </div>
              <hr class="solid">
              <div class="row justify-content-end">
                <div class="col">
                  <h4>Total: </h4>
                </div>
                <div class="col">
                  <p>${numberWithCommas(orders[id].total)}</p>
                </div>
              </div>
              
            </div>
        `

        Object.keys(orders[id].products).forEach(key => {
            let price = 0;
            if(orders[id].user.role === "-MM7epSByKyZ4VVVPBYK"){
                price += parseInt(orders[id].products[key].product.resellerPrice, 10) * parseInt(orders[id].products[key].product.quantity, 10)
                console.log(price)
              
            }else if(orders[id].user.role === "-MM7eqzttvW3oJ3gnyYZ"){
                price += parseInt(orders[id].products[key].product.wholeSalePrice, 10) * parseInt(orders[id].products[key].product.quantity, 10)
                console.log(price)
                shippingWholeSale = 1000
              
            }
            console.log(key, orders[id].products[key].product);
            
            orderProductView += `<hr class="solid">
            <div id=${key} class="row">
                <div class="col">
                    <img style="width:100%; height:100px; object-fit: contain;" src="${orders[id].products[key].product.image}"/>
                </div>
                <div class ="col">
                    <label><span id="orderViewProductName[${key}]">${orders[id].products[key].product.name}</span></label>
                </div>
                <div class="col">
                    <label>Qty. <span id="orderViewQuantity[${key}]">${orders[id].products[key].product.quantity}</span></label>
                </div>
                <div class="col">
                    <label><span id="orderViewPrice[${key}]">${numberWithCommas(price)}</span></label>
                </div>
                </div>
            <hr class="solid">`
         
            
        });
        $("#orderViewStatus").html(orderStatusDisplay)
        $("#orderViewProducts").html(orderProductView)
        $("#orderViewSummary").html(orderSummaryDisplay)
        $("#orderModal").modal("show");
    }
    $("#saveOrder").on("click", function(){

        var getDate = new Date().toJSON(); 
        let newOrder = {}
        newOrder.created = getDate;
        newOrder.status = "UNFULFILLED";
        newOrder.fulfilled = "N/A";
        let products = {}
        let price = 0;
        let subtotal = 0;
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
                                if(storedQuantities[count] > 15){
                                    price += (field.resellerPrice) * storedQuantities[count]
                                    subtotal += price
                                    receiveOption = "Pickup"
                                }else{
                                    price += (field.pricePerKg) * storedQuantities[count]
                                    subtotal += price
                                }
                                
                            }else if(roleField.name === "Wholesaler"){
                                if(storedQuantities[count] > 30){
                                    price += (field.wholeSalePrice) * storedQuantities[count]
                                    subtotal += price
                                    price += 1000
                                    receiveOption = "Delivery"
                                }else{
                                    price += (field.resellerPrice) * storedQuantities[count]
                                    subtotal += price
                                    price += 1000
                                    receiveOption = "Delivery"
                                }
                                
                            }
                            else{
                                price = field.pricePerKg
                                subtotal += price
                                receiveOption = "Pickup"
                            }
                            let deductStocks = field.stocks - storedQuantities[count]
                            let addProduct = {
                                image: field.image,
                                name: field.name,
                                category_id: field.category_id,
                                pricePerKg: field.pricePerKg,
                                resellerPrice: field.resellerPrice,
                                wholeSalePrice: field.wholeSalePrice,
                                shopPrice: field.shopPrice,
                                quantity: storedQuantities[count],
                                stock: field.stocks
                            }
                            console.log(addProduct)
                            products[productId].product = addProduct;
                            
                            
                        }
                    })
               
                    count++;
                })
                console.log("should push...")
                newOrder.pickupDate = pickupDate;
                newOrder.total = price;
                newOrder.subtotal = subtotal;
                newOrder.products = products
                newOrder.shippingMethod = receiveOption;
                console.log(newOrder)
                orderRefs.push(newOrder, function(){
                    alert("Order successfully created!")
                    $("#orderUser").val("");
                    $("#orderPickupDate").val("");
                    $('[id^=orderQuantity]').val("");
                    selectArray = null;
                    quantityArray = null;
                    $('[id^=orderProduct]').val("");
                    $("#orderaddmodal").modal("hide")
                })
                
            })
                
        })
        
        
        console.log(products)
        
    })
})