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
    category_id
    weight
    stocks
    estPrice
}
*/
/*
productSchema = {
    name
}
*/
const dbRef = firebase.database().ref();
const productsRefs = dbRef.child('products');
const categoryRefs = dbRef.child('category');

const imgDefault = "https://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg";

$(document).ready(function() {
    let selectedID = null;
    let prodRefs;
    let products = {}
    let table = $('#datatableid').DataTable({
        "language": {
            "emptyTable": 'Loading...',
            "zeroRecords": "No records to display"
        }
    });
    refresh();
 
    categoryRefs.on("child_added", snap => {
        let field = snap.val();
        let id = snap.key
        $("#prodCat").append('<option value="'+id+'">'+field.name+'</option>')
        $("#prodCatEdit").append('<option value="'+id+'">'+field.name+'</option>')
    });
    

 

    function refresh(){
        products = {}
        $.ajax({
            dataType: "json",
            url: "https://maimai-89309.firebaseio.com/.json?format=export",
            type: "GET",
            success: function(data){
                if(data!== null) {
                    console.log(data.category)
                    for (const [key, value] of Object.entries(data)) {
                        console.log(`${key}: ${value.name}`);
                    }
                }
            }
        })


        
        
        productsRefs.once("value", snap => {
            table.clear().draw();
            let count = 0;
            snap.forEach(function(childSnapshot){
                console.log(childSnapshot.key)
                
          
                var field = childSnapshot.val();
                var categoryName, categoryID;
                console.log(field, " "+ snap)
                var id = childSnapshot.key
                
                categoryRefs.child(field.category_id).once("value", function(catSnap){
                    
                    console.log(count)
                    let imageLabel
                    categoryName = catSnap.val()
                    categoryID = catSnap.key;
                    
                    categoryName = categoryName.name

                    let nameLabel = '<td><span id="labelName'+id+'">'+field.name+'</span></td>'
                    if(field.image !== ""){
                        
                       
                            count++;
                            console.log("getting image...")
                            imageLabel = '<td><img id="labelImage'+id+'" style="width: 50px; height:50px;" src="'+field.image+'"></td>'
                            let category = '<td><span id="labelCategory'+id+'">'+categoryName+'</span><input type="hidden" class="hiddenID" value="'+categoryID+'"></td>'
                            let priceLabel = '<td><span id="labelPrice'+id+'">'+field.pricePerKg+'</span></td>'
                            let wholeSaleLabel = '<td><span id="labelWholeSalePrice'+id+'">'+field.wholeSalePrice+'</span></td>'
                            let resellLabel = '<td><span id="labelResellPrice'+id+'">'+field.resellerPrice+'</span></td>'
                            let shopLabel = '<td><span id="labelShopPrice'+id+'">'+field.shopPrice+'</span></td>'
                            let stocksLabel = '<td><span id="labelStocks'+id+'">'+field.stocks+'</span></td>'
                            let statusLabel = '<td><p id="labelStatus'+id+'">'+(field.isOutOfStock ? "Out of stock": (field.isPublished ? "Published": "Not Published"))+'</p></td>';
                            let editBtn = `<button type="button" id='update`+id+`' class="btn btn-success edit">EDIT</button>`;

                    
                            table.row.add([count, imageLabel, nameLabel, category, priceLabel, shopLabel, resellLabel, wholeSaleLabel, stocksLabel, statusLabel, editBtn]).draw();
                            $(`#update${id}`).bind("click", function(event) {
                                event.preventDefault()
                                prodRefs = null;
                                updateEntry(id)
                            });
                            
                            let visibility = field.isPublished;
                            let status = {
                                visibility
                            }
                            products[id] = status
               
                        
                    }else{
                        count++;
                        imageLabel = '<td><img id="labelImage'+id+'" style="width: 50px; height:50px;" src="'+imgDefault+'"></td>'
                        let category = '<td><p id="labelCategory'+id+'">'+categoryName+'</p><input type="hidden" class="hiddenID" value="'+categoryID+'"></td>'
                        let priceLabel = '<td><p id="labelPrice'+id+'">'+field.pricePerKg+'</p></td>'
                        let wholeSaleLabel = '<td><span id="labelWholeSalePrice'+id+'">'+field.wholeSalePrice+'</span></td>'
                        let resellLabel = '<td><span id="labelResellPrice'+id+'">'+field.resellerPrice+'</span></td>'
                        let shopLabel = '<td><span id="labelShopPrice'+id+'">'+field.shopPrice+'</span></td>'
                        let stocksLabel = '<td><span id="labelStocks'+id+'">'+field.stocks+'</span></td>'
                        let statusLabel = '<td><p id="labelStatus'+id+'">'+(field.isOutOfStock ? "Out of stock": (field.isPublished ? "Published": "Not Published"))+'</p></td>';
                        let editBtn = `<button type="button" id='update`+id+`' class="btn btn-success edit">EDIT</button>`;

                
                        table.row.add([count, imageLabel, nameLabel, category, priceLabel, shopLabel, resellLabel, wholeSaleLabel, stocksLabel, statusLabel, editBtn]).draw();
                        $(`#update${id}`).bind("click", function(event) {
                            event.preventDefault()
                            prodRefs = null;
                            updateEntry(id)
                        });
                      
                    }
                    
                   
                })
               
            })
            
        })
    }



    $("#visibilityCheckBox").on('click', function(){
        console.log($("#visibilityCheckBox").is(":checked"))
        if($("#visibilityCheckBox").is(":checked")){
            console.log("TRUEEE")
        }else{
            console.log("FALSEEEE")
        }
    })

    function updateEntry(id) {
        
        prodRefs = firebase.database().ref('products/'+id)
        selectedID = id
        var name = $(`#labelName${id}`).html();
        var price = $(`#labelPrice${id}`).html();
        var shopPrice = $(`#labelShopPrice${id}`).html();
        var resellPrice = $(`#labelResellPrice${id}`).html();
        var wholeSalePrice = $(`#labelWholeSalePrice${id}`).html();
        var stocks = $(`#labelStocks${id}`).html();
        var category_id = $(`#labelCategory${id}`).siblings(".hiddenID").val();
        var img = document.getElementById(`labelImage${id}`).src;
        $("#visibilityCheckBox").prop('checked', products[id].visibility)
        $("#prodTitle").html(name);
        $("#prodNameEdit").val(name)
        $("#prodSupplierPriceEdit").val(price)
        $("#prodShopPriceEdit").val(shopPrice)
        $("#prodResellerPriceEdit").val(resellPrice)
        $("#prodWholesalerPriceEdit").val(wholeSalePrice)
        $("#prodStocksEdit").val(stocks)
        $("#prodCatEdit").val(category_id)
        $("#prodImg").attr("src",img)
        console.log(img)
        console.log($("#visibilityCheckBox").is(":checked"))
        $(`#editmodal`).modal("show")
        
    }

    $("#prodImg").on("click", function(){
        $("#uploadImage").click();
    })

    $("#uploadImage").on('change', function(){
        var fileName = $(this)[0].files[0].name
        var reader = new FileReader();
        var dataUrl;
        reader.onload = function (e) {
            dataUrl = e.currentTarget.result;
            var storageRef = firebase.storage().ref('images/'+fileName);
            storageRef.putString(dataUrl, 'data_url').then(function(snapshot) {
                storageRef.getDownloadURL().then(function(url){
                    alert('Uploaded a base64 string!');
                    console.log(url)
                    prodRefs.update({
                        image: url
                    }).then(function(){
                        $('#prodImg').attr('src', url);
                        refresh();
                    }).catch(function(err){
                        console.log(err)
                    })
                })
                
            }).catch(function(error){
                alert(error);
            });
            
        }
        
        console.log(reader.readAsDataURL($(this)[0].files[0]))
      
    })

    $('#updatedata').on("click", function() {
        let newName = $("#prodNameEdit").val();
        let newCategory = $("#prodCatEdit").val();
        let newPrice = $("#prodSupplierPriceEdit").val();
        let newShopPrice = $("#prodShopPriceEdit").val();
        let newResellerPrice = $("#prodResellerPriceEdit").val();
        let newWholesalerPrice = $("#prodWholesalerPriceEdit").val();
        let visibility = $("#visibilityCheckBox").is(":checked")
        let newStocks = $("#prodStocksEdit").val();
        prodRefs.update({
            name: newName,
            category_id: newCategory,
            pricePerKg: newPrice,
            resellerPrice: newResellerPrice,
            shopPrice: newShopPrice,
            wholeSalePrice: newWholesalerPrice,
            isPublished: visibility,
            stocks: newStocks
        }).then(function(){
            refresh();
            $("#editmodal").modal("hide");
        }).catch(function(err){
            console.log(err)
        })
    })

    $("#deleteProduct").on("click", function(){

        /*
        console.log("Deleting " + selectedID);
        prodRefs = firebase.database().ref('products/'+selectedID)
        prodRefs.remove().then(function (){
            $("#deletemodal").modal('hide')
            refresh()
               
            alert("Deleted");
        }).catch(function(error){
            alert(error)
        });*/
    })

    $("#saveProduct").click(function() {
        console.log("Inserting!");
        let newProduct = {};
        newProduct.name = $("#prodName").val();
        newProduct.category_id =  $("#prodCat").val();
        newProduct.pricePerKg =  $("#prodSupplierPrice").val();
        newProduct.stocks =  $("#prodStocks").val();
        newProduct.resellerPrice = $("#prodResellerPrice").val();
        newProduct.shopPrice = $("#prodShopPrice").val();
        newProduct.wholeSalePrice = $("#prodWholesalerPrice").val();
        newProduct.image = ''
        console.log(newProduct)
        productsRefs.push(newProduct, function() {
            document.getElementById("tableBody").innerHTML = "";
            refresh();
        
            
            
            $("#productsRefsName").val('');
            $("#productaddmodal").modal('hide');

        })
    })

    
});