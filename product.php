<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="design.css">
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.22/css/dataTables.bootstrap4.min.css">
<body>
<header>

	<!--DDDDDDAAAAAASSSSSHHHHHBBBBBBOOOOAAAARRRRDDDD-->
	<div class="wrapper">
		<div class="sidebar">
			<h2>Pink Salmon</h2>
			<ul>
				<li><a href="home.php"><i class="fas fa-home"></i>Home</a></li>
				<li><a href="product.php"><i class="fa fa-shopping-cart"></i>Product</a></li>
				<li><a href="#"><i class="fa fa-folder"></i>Inventory</a></li>
				<li><a href="#"><i class="fa fa-cog"></i>Settings</a></li>
			</ul>
		</div>

	</div>
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
            <form action="insert.php" method="POST">

      <div class="modal-body">
 
       	 <div class="form-group">
    <label>Product Code</label>
    <input type="number" class="form-control" name="ProdCode" placeholder="Enter Product Code">
  </div>
  <div class="form-group">
    <label>Product Name</label>
    <input type="text" class="form-control" name="ProdName" placeholder="Enter Product Name">
  </div>
  <div class="form-group">
    <label>Product Price</label>
    <input type="number" class="form-control" name="ProdPrice" placeholder="Enter Product Price">
  </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" name="savedata" class="btn btn-primary">Save Data</button>
      </div>
      </form>

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
            <form action="update.php" method="POST">

      <div class="modal-body">
 				<input type="hidden" name="update_id" id="update_id">
       	 <div class="form-group">
    <label>Product Code</label>
    <input type="number" class="form-control" id="ProdCode" name="ProdCode" placeholder="Enter Product Code">
  </div>
  <div class="form-group">
    <label>Product Name</label>
    <input type="text" class="form-control" id="ProdName" name="ProdName" placeholder="Enter Product Name">
  </div>
  <div class="form-group">
    <label>Product Price</label>
    <input type="number" class="form-control" id="ProdPrice" name="ProdPrice" placeholder="Enter Product Price">
  </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" name="updatedata" class="btn btn-primary">Update Data</button>
      </div>
      </form>

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
            <form action="delete.php" method="POST">

            	<input type="hidden" name="delete_id" id="delete_id">
            	<h4>Do you want to delete this data?</h4>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">NO</button>
        <button type="submit" name="deletedata" class="btn btn-primary">YES!! Delete it</button>
      </div>
      </form>

    </div>
  </div>
</div>
<!--------------------------------------------------------------------------------------------------------------------------->

<div class="container" style="padding-top:50px;">
	<div class="jumnbotron">
	
		

		<div class="card" >
			<div class="card-body">
<?php
		$connection = mysqli_connect("localhost","root","");
		$db = mysqli_select_db ($connection, 'salmon');

		$query = "SELECT * FROM productdata";
		$query_run = mysqli_query($connection, $query);
?>

<table id="datatableid" class="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Product Code</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Price</th>
      <th scope="col">EDIT</th>
       <th scope="col">DELETE</th>

    </tr>
  </thead>
  <?php
		if($query_run)
		{
			foreach($query_run as $row)
			{
	?>
  <tbody>
    <tr>
      <td><?php echo $row['id']; ?></td>
      <td><?php echo $row['ProdCode']; ?></td>
      <td><?php echo $row['ProdName']; ?></td>
      <td><?php echo $row['ProdPrice']; ?></td>
      <td>
      	<button type="button" class="btn btn-success edit">EDIT</button>
      </td>
       <td>
      	<button type="button" class="btn btn-danger delete">DELETE</button>
      </td>
    </tr>
  </tbody>
  <?php
			}
		}
		else
		{
			echo "No record Found";
		}

?>
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

<script>
	$(document).ready(function() {
    $('#datatableid').DataTable({
    		"pagingType": "full_numbers",
    		"leghtMenu": [
    				[10, 25, 50, -1],
    				[10, 25, 50, "All"]
    		],
    		responsive: true,
    		language: {
    			search: "_INPUT_",
    			searchPlaceholder: "Search Records",
    		}

    });

});
</script>

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