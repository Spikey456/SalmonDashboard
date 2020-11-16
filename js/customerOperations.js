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
customerSchema = {
    name
    email
    password
    createDate
    role_id
}
*/
/*
*/

//DATETIME:  YYYY-MM-DDThh:mm:ss.sTZD
const dbRef = firebase.database().ref();
const customerRefs = dbRef.child('customers');
const rolesRefs = dbRef.child('roles');

$(document).ready(function() {
    let selectedID = null;
    let custRef;
    let table = $('#datatableid').DataTable({
        "language": {
            "emptyTable": 'WALANG DATA',
            "zeroRecords": "No reco rds to display"
        }
    });
    rolesRefs.on("child_added", snap => {
        let field = snap.val();
        let id = snap.key
        $("#customerRole").append('<option value="'+id+'">'+field.name+'</option>')
        $("#customerRoleEdit").append('<option value="'+id+'">'+field.name+'</option>')
    });
    refresh();
    function refresh(){
        custRef = null;
        selectedID = null
        table.clear().draw();
        let count = 0;
        customerRefs.on("child_added", snap =>{
            count++;
            
           
            console.log(snap.key)
            var roleName, roleID;
            var field = snap.val();
            console.log(field, " "+ snap)
            var id = snap.key
            rolesRefs.child(field.role).once("value", function(roleSnap){
                roleName = roleSnap.val().name;
                roleID = roleSnap.key
                console.log(roleID)
                
                let nameLabel = '<td><span id="labelName'+id+'">'+field.name+'</span></td>'
                let emailLabel = '<td><span id="labelEmail'+id+'">'+field.email+'</span></td>'
                let roleLabel = '<td><span id="labelRole'+id+'">'+roleName+'</span><input type="hidden" class="hiddenID" value="'+roleID+'"></td>'
                let editBtn = `<button type="button" id='update`+id+`' class="btn btn-success edit">EDIT</button>`;
                let delBtn =  `<button type="button" id='del`+id+`' class="btn btn-danger delete">DELETE</button>`;
                table.row.add([count, nameLabel, emailLabel, roleLabel, editBtn, delBtn]).draw();

                console.log("Successful append to table")

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
            }).catch(function(error){
                console.log(error)
            })
            
        })
    }

    function updateEntry(id){
        custRef = firebase.database().ref('customers/'+id)
        selectedID = id
        var name = $(`#labelName${id}`).html();
        var role = $(`#labelRole${id}`).siblings(".hiddenID").val();;
        $("#customerNameEdit").val(name)
        $("#customerRoleEdit").val(role)
        $("#editmodal").modal("show")
    }

    $("#updatedata").on("click", function(){
        let newName = $("#customerNameEdit").val();
        let newRole = $("#customerRoleEdit").val();
        custRef.update({
            name: newName,
            role: newRole
        }).then(function(){
            refresh();
            $("#editmodal").modal("hide");
        }).catch(function(err){
            console.log(err)
        })
    })

    $("#deleteCustomer").on("click", function(){
        console.log("Deleting " + selectedID);
        custRef = firebase.database().ref('customers/'+selectedID)
        custRef.remove().then(function (){
            $("#deletemodal").modal('hide')
            refresh()
               
            alert("Deleted");
        }).catch(function(error){
            alert(error)
        });
    })

    $("#saveCustomer").on("click", function(){
        console.log("Inserting!");
        var getDate = new Date().toJSON(); 
        let newCustomer = {};
        newCustomer.name = $("#customerName").val();
        newCustomer.email = $("#customerEmail").val();
        newCustomer.password = $("#customerPassword").val();
        newCustomer.role = $("#customerRole").val();
        newCustomer.created = getDate;
        console.log(newCustomer)
        auth.createUserWithEmailAndPassword(newCustomer.email, newCustomer.password).then(function(response){
            console.log(response)
            if(response){
                const userID = response.user.uid;
                console.log(response.user.uid)
               
                firebase.database().ref('/customers/'+userID).set(newCustomer).then(function(){
                    document.getElementById("tableBody").innerHTML = "";
                    $("#customeraddmodal").modal('hide');
                    refresh();
                })
                
                   
                
            }
        }).catch(function(error){
            console.log(error)
        })
        /*customerRefs.push(newCustomer, function() {
            
        
            
            
            $("#categoryName").val('');
            $("#categoryAddModal").modal('hide');

        })*/
    })

});