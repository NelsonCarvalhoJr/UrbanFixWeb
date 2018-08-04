<!DOCTYPE html>
<html lang="pt-br">

<head>
	<?php
		session_start();
		if(!$_SESSION['cpfUsuario']) {
			header("location:login.php");
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
	
	<!-- Style jQuery UI -->
	<link href="../jquery-ui/jquery-ui.css" rel="stylesheet">

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
		getAlerts();
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
                    <h1 class="page-header">Casos</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
			<div class="row" style="margin-bottom:20px;">
				<div class="col-lg-2">
					<input type="text" name="inicialDate"id="inicialDate" placeholder="Data Inicial" style="width: 100%" autocomplete="off">
				</div>
				<!-- /.col-lg-2 -->
				<div class="col-lg-2">
					<input type="text" name="finalDate"id="finalDate" placeholder="Data Final" style="width: 100%" autocomplete="off">
				</div>
				<!-- /.col-lg-2 -->
				<div class="col-lg-4">
					<select name="kindOfProblem" id="kindOfProblem" style="width: 100%">
						<option value="">Selecione um tipo de problema</option>
						<option value="Acúmulo de lixo">Acúmulo de lixo</option>
						<option value="Buraco na pista">Buraco na pista</option>
						<option value="Falta de energia">Falta de energia</option>
						<option value="Mato alto">Mato alto</option>
						<option value="Poste caido">Poste caído</option>
						<option value="Vazamento de água">Vazamento de água</option>
					</select>
				</div>
				<!-- /.col-lg-4 -->
				<div class="col-lg-4">
					<input type="text" name="locationAddress" id="locationAddress" placeholder="Endereço" style="width: 100%">
				</div>
            </div>
            <!-- /.row -->
			<div class="row" style="margin-bottom:20px;">
				<!-- /.col-lg-4 -->
				<div class="col-lg-4">
					<select name="status" id="status" style="width: 100%">
						<option value="">Selecione um status</option>
						<option value="Emitido">Emitido</option>
						<option value="Recebido">Recebido</option>
						<option value="Em análise">Em análise</option>
						<option value="Encaminhado para o órgão responsável">Encaminhado para o órgão responsável</option>
						<option value="Resolvido">Resolvido</option>
						<option value="Rejeitado">Rejeitado</option>
					</select>
				</div>
				<!-- /.col-lg-4 -->
				<div class="col-lg-4">
					<select name="urgency" id="urgency" style="width: 100%">
						<option value="">Selecione uma criticidade</option>
						<option value="Baixa">Baixa</option>
						<option value="Moderado">Moderado</option>
						<option value="Crítico">Crítico</option>
					</select>
				</div>
				<!-- /.col-lg-4 -->
				<div class="col-lg-2">
					<input type="button" value="Pesquisar" onclick="searchAlert($('#inicialDate').val(), $('#finalDate').val(), $('#kindOfProblem').val(), $('#locationAddress').val(), $('#status').val(), $('#urgency').val());">
				</div>
				<!-- /.col-lg-2 -->
				<div class="col-lg-2">
					<input type="button" value="Limpar Pesquisa" onclick="resetSearchOfAlerts();">
				</div>
				<!-- /.col-lg-2 -->
			</div>
			<!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
									<th>ID</th>
                                    <th>Data</th>
                                    <th>Usuário</th>
                                    <th>Tipo de Problema</th>
                                    <th>Descrição</th>
									<th>Endereço</th>
                                    <th>Status</th>
									<th>Criticidade</th>
                                </tr>
                            </thead>
                            <tbody id="table-body">
                                <tr>
                                    <td colspan="8" style="text-align:center">Carregando...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.table-responsive -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
	
	<!-- jQuery UI -->
	<script src="../jquery-ui/external/jquery/jquery.js"></script>
	<script src="../jquery-ui/jquery-ui.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../vendor/metisMenu/metisMenu.min.js"></script>

    <!-- DataTables JavaScript -->
    <script src="../vendor/datatables/js/jquery.dataTables.min.js"></script>
    <script src="../vendor/datatables-plugins/dataTables.bootstrap.min.js"></script>
    <script src="../vendor/datatables-responsive/dataTables.responsive.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="../dist/js/sb-admin-2.js"></script>

    <!-- Page-Level Demo Scripts - Tables - Use for reference -->
    <script>
		$(document).ready(function() {
			$('#dataTables-example').DataTable({
				responsive: true
			});
		});
    </script>

    <script>
		$(function(){
			$("#inicialDate").datepicker({
				showButtonPanel: true,
				dateFormat: 'dd/mm/yy'
				// ver https://jqueryui.com/datepicker/#date-range para verificar data ini < data fim
			});

			
			$("#finalDate").datepicker({
				showButtonPanel: true,
				dateFormat: 'dd/mm/yy'
				// ver https://jqueryui.com/datepicker/#date-range para verificar data ini < data fim
			});
		});		
    </script>
</body>

</html>
