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

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<!-- Style para os gráficos -->
	<link rel="stylesheet" type="text/css" href="../charts/style/estilo.css">
	
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
		getPhotoEmployee('<?= $_SESSION['uuid']; ?>');
		var dadosGraficos = getGraphicData(<?= isset($_GET['inicialDate']) ? ("'" . $_GET['inicialDate'] . "'") : "''"; ?>, <?= isset($_GET['finalDate']) ? ("'" . $_GET['finalDate'] . "'") : "''"; ?>);
	</script>
	
	<!-- Scripts para os gráficos - Gerador de Gráficos - Alertas por Status - Alertas por Criticidade - Alertas por Tipo de Problema - Alertas por Cidade - Análise de Sentimento -->
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script type="text/javascript" src="../charts/js/grafico-alertas-por-status.js"></script>
	<script type="text/javascript" src="../charts/js/grafico-alertas-por-criticidade.js"></script>
	<script type="text/javascript" src="../charts/js/grafico-alertas-por-tipo-problema.js"></script>
	<script type="text/javascript" src="../charts/js/grafico-alertas-por-cidade.js"></script>
	<script type="text/javascript" src="../charts/js/grafico-analise-sentimento.js"></script>
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
                    <h1 class="page-header">Relatórios</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
			<div class="row">
				<form method="get">
					<div class="col-lg-3">
						<input type="text" id="inicialDate" name="inicialDate" placeholder="Data Inicial" value="<?= isset($_GET['inicialDate']) ? $_GET['inicialDate'] : ''; ?>" autocomplete="off">
					</div>
					<!-- /.col-lg-3 -->
					<div class="col-lg-3">
						<input type="text" id="finalDate" name="finalDate" placeholder="Data Final" value="<?= isset($_GET['finalDate']) ? $_GET['finalDate'] : ''; ?>" autocomplete="off">
					</div>
					<!-- /.col-lg-3 -->
					<div class="col-lg-2">
						<input type="submit" value="Pesquisar">
					</div>
					<!-- /.col-lg-2 -->
					<div class="col-lg-2">
						<input type="button" value="Limpar Pesquisar" onclick="window.location = 'relatorios.php'">
					</div>
					<!-- /.col-lg-3 -->
				</form>
				<!-- ./form -->
			</div>
            <!-- /.row -->
            <div class="row grafico">
                <div class="col-lg-12">
					<div id="grafico-alertas-por-status"></div>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row grafico">
                <div class="col-lg-12">
					<div id="grafico-alertas-por-criticidade"></div>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row grafico">
                <div class="col-lg-12">
					<div id="grafico-alertas-por-tipo-problema"></div>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row grafico">
                <div class="col-lg-12">
					<div id="grafico-alertas-por-cidade"></div>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row grafico">
                <div class="col-lg-12">
					<div id="grafico-analise-sentimento"></div>
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

    <!-- Custom Theme JavaScript -->
    <script src="../dist/js/sb-admin-2.js"></script>
	
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
