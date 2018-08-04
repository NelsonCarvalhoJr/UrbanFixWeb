setTimeout(function(){
	if(
		dadosGraficos["status"]["emitido"] == 0 &&
		dadosGraficos["status"]["recebido"] == 0 &&
		dadosGraficos["status"]["analise"] == 0 &&
		dadosGraficos["status"]["encaminhado"] == 0 &&
		dadosGraficos["status"]["resolvido"] == 0 && 
		dadosGraficos["status"]["rejeitado"] == 0
	) {
		var html = '<div>';
		html += '<h3>Gráfico de alertas por status</h3><br>';
		html += '<p>Nenhum registro encontrado.</p>';
		html += '</div>';
		
		$('#grafico-alertas-por-status').html(html);
	} else {
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);

		google.charts.load('current', {'packages':['bar']});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {
			var data = google.visualization.arrayToDataTable([
				['Status', 'Alertas'],
				['Emitido', dadosGraficos["status"]["emitido"]],
				['Recebido', dadosGraficos["status"]["recebido"]],
				['Em análise', dadosGraficos["status"]["analise"]],
				['Encaminhado', dadosGraficos["status"]["encaminhado"]],
				['Resolvido', dadosGraficos["status"]["resolvido"]],
				['Rejeitado', dadosGraficos["status"]["rejeitado"]]
			]);

			var options = {
			chart: {
				title: 'Alertas por Status',
					subtitle: 'Quantidade de alertas por status',
				}
			};

			var chart = new google.charts.Bar(document.getElementById('grafico-alertas-por-status'));

			chart.draw(data, google.charts.Bar.convertOptions(options));
		}
	}
}, 3000);