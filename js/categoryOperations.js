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

const tableRow = ` <tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td>
    <button type="button" class="btn btn-success edit">EDIT</button>
</td>
 <td>
    <button type="button" class="btn btn-danger delete">DELETE</button>
</td>
</tr>
`

$(document).ready(function() {

    refresh();
    function refresh() {
        let count = 0;
        categoryRefs.on("child_added", snap => {
            count++;
            let field = snap.val();
            console.log(field, " "+ snap)
            let id = snap.key
            $("#tableBody").append('<tr id=row'+id+'>'+
            '<td>'+count+'</td>' +
            '<td>'+field.name+'</td>' +
            '<td> <button type="button" class="btn btn-success edit">EDIT</button> </td>' +
            '<td> <button type="button" class="btn btn-danger delete">DELETE</button> </td>' +
            '</tr>')
        })
    }

    $("#saveCategory").click(function() {
        console.log("Inserting!");
        let newCategory = {};
        newCategory.name = $("#categoryName").val();
        categoryRefs.push(newCategory, function() {
            alert("Category has been inserted successfully!");
            $("#categoryAddModal").modal('hide');
        })
    })

    
   
})