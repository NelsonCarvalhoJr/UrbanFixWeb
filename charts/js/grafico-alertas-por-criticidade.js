setTimeout(function(){
	if(
		dadosGraficos["criticidade"]["baixa"] == 0 &&
		dadosGraficos["criticidade"]["moderado"] == 0 &&
		dadosGraficos["criticidade"]["critico"] == 0
	) {
		var html = '<div>';
		html += '<h3>Gráfico de alertas por nível de criticidade</h3><br>';
		html += '<p>Nenhum registro encontrado.</p>';
		html += '</div>';
		
		$('#grafico-alertas-por-criticidade').html(html);
	} else {
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);

		function drawChart() {

			var data = google.visualization.arrayToDataTable([
				['Criticidade', 'Alertas'],
				['Baixa', dadosGraficos["criticidade"]["baixa"]],
				['Moderado', dadosGraficos["criticidade"]["moderado"]],
				['Crítico', dadosGraficos["criticidade"]["critico"]]
			]);


			var options = {
				title: 'Alertas por Criticidade'
			};

			var chart = new google.visualization.PieChart(document.getElementById('grafico-alertas-por-criticidade'));

			chart.draw(data, options);
		}
		setTimeout(function() {
			$('#grafico-alertas-por-criticidade').parent().parent().removeClass('ativo');
		}, 350);
	}
}, 3000);