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
const categoryRefs = dbRef.child('category');


$(document).ready(function() {
    let selectedID = null;
    let catRef;
    let table = $('#datatableid').DataTable({
        "language": {
            "emptyTable": 'WALANG DATA',
            "zeroRecords": "No records to display"
        }
    });
    refresh();
    function refresh() {
        catRef = null;
        selectedID = null
        $("#update_id").val("")  
        $('#categoryNameUpdate').val("")
        let count = 0;
        table.clear().draw();
        categoryRefs.on("child_added", snap => {
            
            count++;
            let field = snap.val();
            console.log(field, " "+ snap)
            let id = snap.key
            let nameLabel = '<td><span id="labelName'+id+'">'+field.name+'</span></td>'
            let editBtn = `<button type="button" id='update`+id+`' class="btn btn-success edit">EDIT</button>`;
        
            table.row.add([count, nameLabel, editBtn]).draw();
            /*$("#tableBody").append('<tr id=row'+id+'>'+
            '<td>'+count+'</td>' +
            '<td>'+field.name+'</td>' +
            '<td> <button type="button" class="btn btn-success edit">EDIT</button> </td>' +
            '<td> <button type="button" class="btn btn-danger delete">DELETE</button> </td>' +
            '</tr>')*/
            $(`#update${id}`).bind("click", function(event) {
                event.preventDefault()
                updateEntry(id)
            });
           
        })
    }

    function updateEntry(id){
        catRef = firebase.database().ref('category/'+id)
        selectedID = id;
        let name = $(`#labelName${id}`).html();
        console.log($(`#labelName${id}`).html())
        $("#update_id").val(id)  
        $('#categoryNameUpdate').val(name)
        $("#editmodal").modal("show");
        
    }

    $('#updatedata').on('click', function(){
        let newName = $('#categoryNameUpdate').val()
        catRef.update({
            name: newName
        }).then(function(){
            $("#editmodal").modal("hide");
            alert("updated");
            //refresh();
        }).catch(function(error) {
            alert(error)
        })
    })

 



    $("#saveCategory").click(function() {
        console.log("Inserting!");
        let newCategory = {};
        newCategory.name = $("#categoryName").val();
        categoryRefs.push(newCategory, function() {
            document.getElementById("tableBody").innerHTML = "";
            refresh();
        
            
            
            $("#categoryName").val('');
            $("#categoryAddModal").modal('hide');

        })
    })

    
   
})