<!DOCTYPE html>
<html lang="en">

<head>
	<?php
		session_start();
		if(!$_SESSION['cpfUsuario']) {
			header("location:login.php");
		}
		
		if($_POST) $_SESSION['cpfUsuario'] = $_POST['cpf'];
		if($_FILES) {
			
			$dir = '../images/';
			move_uploaded_file($_FILES['photo']['tmp_name'], $dir . utf8_decode($_POST['photo-name']));
		}
	?>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Urban Fix Web</title>

    <!-- Bootstrap Core CSS -->
    <link href="../vendor/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet">

    <!-- DataTables CSS -->
    <link href="../vendor/datatables-plugins/dataTables.bootstrap.css" rel="stylesheet">

    <!-- DataTables Responsive CSS -->
    <link href="../vendor/datatables-responsive/dataTables.responsive.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
	
	<script src="../js/firebase.js"></script>
	
	<script>
		getPhotoEmployee('<?= $_SESSION['uuid'];?>');
		getEmployee('<?= $_SESSION['uuid'];?>');
	</script>

</head>

<body>

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0;background-color:#000;">
			<div class="col-md-1" style="padding:0;">
				<img src="../images/logo.svg" style="float:left;height:51px;">
			</div>
            <div class="navbar-header col-md-9" style="text-align:center">
				<b><a class="navbar-brand" href="index.html" style="color:#fff;">URBAN FIX WEB</a></b>
            </div>
            <!-- /.navbar-header -->

            <div class="col-md-2">
                <ul class="nav navbar-top-links navbar-right">
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" style="color:#fff;">
                            <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-user">
                            <li><a href="perfil.php"><i class="fa fa-user fa-fw"></i> Perfil</a></li>
                            <li class="divider"></li>
                            <li><a href="logout.php"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li>
                        </ul>
                        <!-- /.dropdown-user -->
                    </li>
                    <!-- /.dropdown -->
                </ul>
            </div>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
	                <center id="img-user">
    	            	<img src="../images/default.png"><br><br>
        	            <span style="margin-top:20px;font-size:20px;"></span><br><br>
                    </center>
                    <ul class="nav" id="side-menu">
                        <li>
                            <a href="perfil.php">Perfil</a>
                        </li>
                        <li>
                            <a href="casos.php">Casos</a>
                        </li>
                        <li>
                            <a href="relatorios.php">Relatórios</a>
                        </li>
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Perfil</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-6" style="min-height:495px;">
                    <form role="form" id="form" method="post" enctype="multipart/form-data">
						<div class="form-group">
							<label>Nome</label>
							<input class="form-control" name="name" id="name" placeholder="Nome">
						</div>
						<div class="form-group">
							<label>CPF</label>
							<input class="form-control" name="cpf" id="cpf" placeholder="CPF" maxlength="11">
						</div>
						<div class="form-group">
							<label>Email</label>
							<input class="form-control" name="email" id="email" placeholder="Email">
						</div>
						<div class="form-group">
							<label>Foto de Perfil</label>
							<input type="file" name="photo" id="photo">
						</div>
						<input type="hidden" name="photo-name" id="photo-name">
						<div class="form-group">
							<label>Senha</label>
							<input type="password" name="password" id="password" class="form-control" placeholder="Senha">
						</div>
						<div class="form-group">
							<label>Repetir a senha</label>
							<input type="password" name="check-password" id="check-password" class="form-control" placeholder="Repetir a Senha">
						</div>
						<button type="button" id="btn-alterar" onclick="updateEmployee('<?= $_SESSION['uuid']; ?>')" class="btn btn-default">Salvar</button>
					</form>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
	
    <!-- jQuery -->
    <script src="../vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../vendor/metisMenu/metisMenu.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="../dist/js/sb-admin-2.js"></script>

</body>

</html>
