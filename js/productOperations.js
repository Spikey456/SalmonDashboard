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
        let count = 0;
        
        table.clear().draw();
        productsRefs.on("value", snap => {
            
            snap.forEach(function(childSnapshot){
                console.log(childSnapshot.key)
                
                console.log(count)
                var field = childSnapshot.val();
                var categoryName, categoryID;
                console.log(field, " "+ snap)
                var id = childSnapshot.key
                categoryRefs.child(field.category_id).once("value", function(catSnap){
                    let imageLabel
                    categoryName = catSnap.val()
                    categoryID = catSnap.key;
                    count++;
                    categoryName = categoryName.name
                    
                    console.log(catSnap.val().name)
                    let nameLabel = '<td><p id="labelName'+id+'">'+field.name+'</p></td>'
                    if(field.image !== ""){
                        var storageRef = firebase.storage().ref("images/"+field.image);
                        storageRef.getDownloadURL().then(function(url) {
                            console.log("getting image...")
                            imageLabel = '<td><img id="labelImage'+id+'" style="width: 50px; height:50px;" src="'+url+'"></td>'
                            let category = '<td><p id="labelCategory'+id+'">'+categoryName+'</p><input type="hidden" class="hiddenID" value="'+categoryID+'"></td>'
                            let priceLabel = '<td><p id="labelPrice'+id+'">'+field.pricePerKg+'</p></td>'
                            let stocksLabel = '<td><p id="labelStocks'+id+'">'+field.stocks+'</p></td>'
                            let editBtn = `<button type="button" id='update`+id+`' class="btn btn-success edit">EDIT</button>`;
                            let delBtn =  `<button type="button" id='del`+id+`' class="btn btn-danger delete">DELETE</button>`;
                    
                            table.row.add([count, imageLabel, nameLabel, category, priceLabel, stocksLabel,editBtn, delBtn]).draw();
                            $(`#update${id}`).bind("click", function(event) {
                                event.preventDefault()
                                prodRefs = null;
                                updateEntry(id)
                            });
                            $(`#del${id}`).bind("click", function(event) {
                                event.preventDefault()
                                selectedID = id
                                $("#deletemodal").modal('show')
                            });
                        });
                        
                    }else{
                        imageLabel = '<td><img id="labelImage'+id+'" style="width: 50px; height:50px;" src="'+imgDefault+'"></td>'
                    }
                    
                   
                })
               
            })
            
        })
    }

    function updateEntry(id) {
        prodRefs = firebase.database().ref('products/'+id)
        selectedID = id
        var name = $(`#labelName${id}`).html();
        var price = $(`#labelPrice${id}`).html();
        var stocks = $(`#labelStocks${id}`).html();
        var category_id = $(`#labelCategory${id}`).siblings(".hiddenID").val();
        var img = document.getElementById(`labelImage${id}`).src;
        $("#prodNameEdit").val(name)
        $("#prodPriceEdit").val(price)
        $("#prodStocksEdit").val(stocks)
        $("#prodCatEdit").val(category_id)
        $("#prodImg").attr("src",img)
        console.log(img)
        $(`#editmodal`).modal("show")
        
    }

    $("#prodImg").on("click", function(){
        $("#uploadImage").click();
    })

    $("#uploadImage").on('change', function(){
        var fileName = $(this)[0].files[0].name
        console.log($(this)[0].files[0])
        var reader = new FileReader();
        var dataUrl;
        reader.onload = function (e) {
            console.log(e.currentTarget.result)
            dataUrl = e.currentTarget.result;
            var storageRef = firebase.storage().ref('images/'+fileName);
            storageRef.putString(dataUrl, 'data_url').then(function(snapshot) {
                alert('Uploaded a base64 string!');
                prodRefs.update({
                    image: fileName
                }).then(function(){
                    $('#prodImg').attr('src', e.currentTarget.result);
                    refresh();
                }).catch(function(err){
                    console.log(err)
                })
            }).catch(function(error){
                alert(error);
            });
            
            alert(e.currentTarget.result)
        }
        
        console.log(reader.readAsDataURL($(this)[0].files[0]))
      
    })

    $('#updatedata').on("click", function() {
        let newName = $("#prodNameEdit").val();
        let newCategory = $("#prodCatEdit").val();
        let newPrice = $("#prodPriceEdit").val();
        let newStocks = $("#prodStocksEdit").val();
        prodRefs.update({
            name: newName,
            category_id: newCategory,
            pricePerKg: newPrice,
            stocks: newStocks
        }).then(function(){
            refresh();
            $("#editmodal").modal("hide");
        }).catch(function(err){
            console.log(err)
        })
    })

    $("#deleteProduct").on("click", function(){
        console.log("Deleting " + selectedID);
        prodRefs = firebase.database().ref('products/'+selectedID)
        prodRefs.remove().then(function (){
            $("#deletemodal").modal('hide')
            refresh()
               
            alert("Deleted");
        }).catch(function(error){
            alert(error)
        });
    })

    $("#saveProduct").click(function() {
        console.log("Inserting!");
        let newProduct = {};
        newProduct.name = $("#prodName").val();
        newProduct.category_id =  $("#prodCat").val();
        newProduct.pricePerKg =  $("#prodPrice").val();
        newProduct.stocks =  $("#prodStocks").val();
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