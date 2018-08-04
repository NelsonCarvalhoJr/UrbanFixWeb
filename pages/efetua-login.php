<?php
	session_start();
	if($_POST['chave'] = 'c#@v&Me$tre') {
		$_SESSION['cpfUsuario'] = $_POST['cpf'];
		$_SESSION['uuid'] = $_POST['uuid'];
	}
?>