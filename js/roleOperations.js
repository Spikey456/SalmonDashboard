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
const rolesRefs = dbRef.child('roles');



$(document).ready(function() {
    let selectedID = null;
    let rRefs;
    let table = $('#datatableid').DataTable({
        "language": {
            "emptyTable": 'Loading...',
            "zeroRecords": "No records to display"
        }
    });
    refresh();
    function refresh(){
        rRefs = null;
        selectedID = null
        //$("#update_id").val("")  
        $('#roleNameUpdate').val("")
        let count = 0;
        table.clear().draw();
        rolesRefs.on("child_added", snap => {
            
            count++;
            let field = snap.val();
            console.log(field, " "+ snap)
            let id = snap.key
            let nameLabel = '<td><span id="labelName'+id+'">'+field.name+'</span></td>'
            let editBtn = `<button type="button" id='update`+id+`' class="btn btn-success edit">EDIT</button>`;
            let delBtn =  `<button type="button" id='del`+id+`' class="btn btn-danger delete">DELETE</button>`;
        
            table.row.add([count, nameLabel, editBtn, delBtn]).draw();
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
            $(`#del${id}`).bind("click", function(event) {
                event.preventDefault()
                selectedID = id
                $("#deletemodal").modal('show')
            });
        })
    }

    function updateEntry(id){
        rRefs = firebase.database().ref('roles/'+id)
        selectedID = id;
        var name = $(`#labelName${id}`).html();
        console.log($(`#labelName${id}`).html())
        //$("#update_id").val(id)  
        $('#roleNameUpdate').val(name)
        $("#editmodal").modal("show");
        
    }

    $('#updatedata').on('click', function(){
        let newName = $('#roleNameUpdate').val()
        rRefs.update({
            name: newName
        }).then(function(){
            $("#editmodal").modal("hide");
            alert("updated");
            refresh();
        }).catch(function(error) {
            alert(error)
        })
    })

    $("#deleteRole").on("click", function(){
        console.log("Deleting " + selectedID);
        catRef = firebase.database().ref('roles/'+selectedID)
        catRef.remove().then(function (){
            $("#deletemodal").modal('hide')
            refresh()
               
            alert("Deleted");
        }).catch(function(error){
            alert(error)
        });
    })


    $("#saveRole").click(function() {
        console.log("Inserting!");
        let newRole = {};
        newRole.name = $("#roleName").val();
        rolesRefs.push(newRole, function() {
            document.getElementById("tableBody").innerHTML = "";
            refresh();
        
            
            
            $("#roleName").val('');
            $("#roleaddmodal").modal('hide');

        })
    })
})