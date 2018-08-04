setTimeout(function(){
	if(
		dadosGraficos["tipoProblema"]["acumuloLixo"] == 0 &&
		dadosGraficos["tipoProblema"]["buracoPista"] == 0 &&
		dadosGraficos["tipoProblema"]["faltaEnergia"] == 0 &&
		dadosGraficos["tipoProblema"]["matoAlto"] == 0 &&
		dadosGraficos["tipoProblema"]["posteCaido"] == 0 &&
		dadosGraficos["tipoProblema"]["vazamentoAgua"] == 0
	) {
		var html = '<div>';
		html += '<h3>Gráfico de alertas por tipo de problema</h3><br>';
		html += '<p>Nenhum registro encontrado.</p>';
		html += '</div>';
		
		$('#grafico-alertas-por-tipo-problema').html(html);
	} else {
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);

		function drawChart() {

			var data = google.visualization.arrayToDataTable([
				['Tipo de Problema', 'Alertas'],
				['Acúmulo de lixo', dadosGraficos["tipoProblema"]["acumuloLixo"]],
				['Buraco na pista', dadosGraficos["tipoProblema"]["buracoPista"]],
				['Falta de energia', dadosGraficos["tipoProblema"]["faltaEnergia"]],
				['Mato alto', dadosGraficos["tipoProblema"]["matoAlto"]],
				['Poste caído', dadosGraficos["tipoProblema"]["posteCaido"]],
				['Vazamento de água', dadosGraficos["tipoProblema"]["vazamentoAgua"]]
			]);


			var options = {
				title: 'Alertas por Tipo de Problema'
			};

			var chart = new google.visualization.PieChart(document.getElementById('grafico-alertas-por-tipo-problema'));

			chart.draw(data, options);
		}
		setTimeout(function() {
			$('#grafico-alertas-por-tipo-problema').parent().parent().removeClass('ativo');
		}, 350);
	}
}, 3000);