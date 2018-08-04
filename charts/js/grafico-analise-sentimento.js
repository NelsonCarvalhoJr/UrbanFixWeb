setTimeout(function(){
	if(
		dadosGraficos["sentimento"]["neutro"] == 0 &&
		dadosGraficos["sentimento"]["satisfeito"] == 0 &&
		dadosGraficos["sentimento"]["insatisfeito"] == 0
	) {
		var html = '<div>';
		html += '<h3>Gráfico de análise de sentimento dos comentários</h3><br>';
		html += '<p>Nenhum registro encontrado.</p>';
		html += '</div>';
		
		$('#grafico-analise-sentimento').html(html);
	} else {
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);

		function drawChart() {

			var data = google.visualization.arrayToDataTable([
				['Sentimento', 'Comentário'],
				['Neutro', dadosGraficos["sentimento"]["neutro"]],
				['Satisfeito', dadosGraficos["sentimento"]["satisfeito"]],
				['Insatisfeito', dadosGraficos["sentimento"]["insatisfeito"]]
			]);


			var options = {
				title: 'Análise de Sentimento dos Comentários'
			};

			var chart = new google.visualization.PieChart(document.getElementById('grafico-analise-sentimento'));

			chart.draw(data, options);
		}
		setTimeout(function() {
			$('#grafico-analise-sentimento').parent().parent().removeClass('ativo');
		}, 500);
	}
}, 3000);