<?php
  include("sidebar.php")
?>
<!DOCTYPE html>
<html >
<head>
<meta charset="utf-8">
	
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.22/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" type="text/css" href="./css/design.css?version=51">
  <script type="text/javascript" src="js/jquery-3.5.1.min.js" ></script> 
  <script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-firestore.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-database.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.0.1/firebase-storage.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"></script>
  <script type="text/javascript" src='js/moment.min.js'></script>
  <script type="text/javascript" src='js/customerOperations.js'></script>
  <script type="text/javascript" src='js/authOperations.js'></script>
<body>

<div class="wrapper">
	<!--DDDDDDAAAAAASSSSSHHHHHBBBBBBOOOOAAAARRRRDDDD-->
  <?php
    echo $sideBar;
  ?>
<!--DDDDDDAAAAAASSSSSHHHHHBBBBBBOOOOAAAARRRRDDDD-->


<!-- ADD DATA -->
<div class="modal fade" id="customeraddmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Customer Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
            

      <div class="modal-body">
       	 <div class="form-group">
          <label>Name</label>
          <input type="text" required class="form-control" id="customerName" placeholder="Enter Customer Name">
        </div>
       
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" id="customerEmail" placeholder="Enter Customer Email">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" id="customerPassword" placeholder="Enter Customer Password">
        </div>
        <div class="form-group">
          <label>Role</label>
          <select class="custom-select" id="customerRole" required>
            <option selected value="">Select Role...</option>
          </select>
        </div>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="saveCustomer" class="btn btn-primary">Save Data</button>
      </div>
     

    </div>
  </div>
</div>


<!-------------------------------------------------------------------------------------------------------------->

<!-- EDIT FORM -->
<div class="modal fade" id="editmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Customer Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
          

      <div class="modal-body">
        <div class="form-group">
          <label>Name</label>
          <input type="text" required class="form-control" id="customerNameEdit" placeholder="Enter Customer Name">
        </div>
        <div class="form-group">
          <label>Role</label>
          <select class="custom-select" id="customerRoleEdit" required>
            <option selected value="">Select Role...</option>
          </select>
        </div>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" id="updatedata" class="btn btn-primary">Update Data</button>
      </div>
    

    </div>
  </div>
</div>
<!--------------------------------------------------------------------------------------------------------------------------->

<!-------------------------------------------------------------------------------------------------------------->

<!-- DELETE FORM -->
<div class="modal fade" id="deletemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Achive Customer Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
       
      <div class="modal-body">
        <input type="hidden" name="delete_id" id="delete_id">
        <h5>Do you want to hide this data?</h5>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
        <button type="button" id="deleteCustomer" class="btn btn-primary">Yes</button>
      </div>
   

    </div>
  </div>
</div>
<!--------------------------------------------------------------------------------------------------------------------------->
<div class="main">
<div class="container container-fluid" style="padding-top:50px;">
	<div class="jumnbotron">
	
		

		<div class="card" >
			<div class="card-body text-center">
      <h5 class="card-title">Customers</h5>
      <hr class="solid">
<table id="datatableid" class="table table-bordered table-light">
  <thead class="thead-light">
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">EDIT</th>
       <th scope="col">Archive</th>

    </tr>
  </thead>


  <tbody id="tableBody">

  </tbody>

</table>
				
			</div>
    </div>
    <div class="card">
			<div class="card-body">
				<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#customeraddmodal">
						  Add Customer
						</button>
				
			</div>
		</div>

	</div>
</div>


</div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" integrity="sha512-+NqPlbbtM1QqiK8ZAo4Yrj2c4lNQoGv8P79DPtKzj++l5jnN39rHA/xsqn8zE9l0uSoxaCdrOgFs6yjyfbBxSg==" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.22/js/dataTables.bootstrap4.min.js"></script>



<!--For Delete-->
<script>
	$(document).ready(function(){
		$('.delete').on('click',function(){


			$('#deletemodal').modal('show');


		$tr = $(this).closest('tr');

		var data = $tr.children("td").map(function(){
				return $(this).text();
				}).get();
		console.log(data);

			$('#delete_id').val(data[0]);

		});
	});
</script>


<!--for UPDATE-->
<script>
	$(document).ready(function(){
		$('.edit').on('click',function(){


			$('#editmodal').modal('show');

		//para kopyahin ung inputted data
			$tr = $(this).closest('tr');

			var data = $tr.children("td").map(function(){
				return $(this).text();
				}).get();

			console.log(data);

			$('#update_id').val(data[0]);
			$('#ProdCode').val(data[1]);
			$('#ProdName').val(data[2]);
			$('#ProdPrice').val(data[3]);

		});
	});
</script>

</body>
</html>