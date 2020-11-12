<?php
  include("sidebar.php")
?>
<!DOCTYPE html>
<html >
<head>
<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="./css/design.css?version=51">
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.22/css/dataTables.bootstrap4.min.css">
  <script type="text/javascript" src="js/jquery-3.5.1.min.js" ></script> 
  <script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-firestore.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-database.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.0.1/firebase-storage.js"></script>
  <script type="text/javascript" src='js/productOperations.js'></script>
<body style="background-color: darkgrey;">


	<!--DDDDDDAAAAAASSSSSHHHHHBBBBBBOOOOAAAARRRRDDDD-->
  <?php
    echo $sideBar;
  ?>
<!--DDDDDDAAAAAASSSSSHHHHHBBBBBBOOOOAAAARRRRDDDD-->


<!-- ADD DATA -->
<div class="modal fade" id="productaddmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Product Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
            

      <div class="modal-body">
       	 <div class="form-group">
          <label>Name</label>
          <input type="text" required class="form-control" id="prodName" placeholder="Enter Product Name">
        </div>
        <div class="form-group">
          <label>Category</label>
          <select class="custom-select" id="prodCat" required>
            <option selected value="">Select Category...</option>
          </select>
        </div>
        <div class="form-group">
          <label>Product Price per Kilo</label>
          <input type="number" class="form-control" id="prodPrice" placeholder="Enter Product Price">
        </div>
        <div class="form-group">
          <label>Product Available Stocks</label>
          <input type="number" class="form-control" id="prodStocks" placeholder="Enter Product Stocks">
        </div>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="saveProduct" class="btn btn-primary">Save Data</button>
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
        <h5 class="modal-title" id="exampleModalLabel">Edit Product Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
          

      <div class="modal-body">
        <div class="form-group">
          <input id="prodImg" type="image" src="http://upload.wikimedia.org/wikipedia/commons/c/ca/Button-Lightblue.svg" width="30px"/>
          <input type="file" id="uploadImage" style="display: none;" />
        </div>
        <div class="form-group">
          <label>Name</label>
          <input type="text" required class="form-control" id="prodNameEdit" placeholder="Enter Product Name">
        </div>
        <div class="form-group">
          <label>Category</label>
          <select class="custom-select" id="prodCatEdit" required>
            <option selected value="">Select Category...</option>
          </select>
        </div>
        <div class="form-group">
          <label>Product Price per Kilo</label>
          <input type="number" class="form-control" id="prodPriceEdit" placeholder="Enter Product Price">
        </div>
        <div class="form-group">
          <label>Product Available Stocks</label>
          <input type="number" class="form-control" id="prodStocksEdit" placeholder="Enter Product Stocks">
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
        <h5 class="modal-title" id="exampleModalLabel">Delete Product Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
       
      <div class="modal-body">
        <input type="hidden" name="delete_id" id="delete_id">
        <h5>Do you want to delete this data?</h5>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
        <button type="button" id="deleteProduct" class="btn btn-primary">Yes</button>
      </div>
   

    </div>
  </div>
</div>
<!--------------------------------------------------------------------------------------------------------------------------->

<div class="container" style="padding-top:50px;">
	<div class="jumnbotron">
	
		

		<div class="card" >
			<div class="card-body">


<table id="datatableid" class="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      <th scope="col">Price(per kg)</th>
      <th scope="col">Stocks</th>
      <th scope="col">EDIT</th>
       <th scope="col">DELETE</th>

    </tr>
  </thead>


  <tbody>

  </tbody>

</table>
				
			</div>
    </div>
    <div class="card">
			<div class="card-body">
				<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productaddmodal">
						  Add Data
						</button>
				
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