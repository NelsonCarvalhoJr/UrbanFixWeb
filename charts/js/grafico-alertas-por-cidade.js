setTimeout(function(){
	if(
		dadosGraficos["cidade"]["barueri"] == 0 &&
		dadosGraficos["cidade"]["carapicuiba"] == 0 &&
		dadosGraficos["cidade"]["cotia"] == 0 &&
		dadosGraficos["cidade"]["itapevi"] == 0 &&
		dadosGraficos["cidade"]["jandira"] == 0 &&
		dadosGraficos["cidade"]["osasco"] == 0 &&
		dadosGraficos["cidade"]["saoPaulo"] == 0
	) {
		var html = '<div>';
		html += '<h3>Gráfico de alertas por cidades</h3><br>';
		html += '<p>Nenhum registro encontrado.</p>';
		html += '</div>';
		
		$('#grafico-alertas-por-cidade').html(html);
	} else {
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);

		google.charts.load('current', {'packages':['bar']});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {
			var data = google.visualization.arrayToDataTable([
				['Cidades', 'Alertas'],
				['Barueri', dadosGraficos["cidade"]["barueri"]],
				['Carapicuíba', dadosGraficos["cidade"]["carapicuiba"]],
				['Cotia', dadosGraficos["cidade"]["cotia"]],
				['Itapevi', dadosGraficos["cidade"]["itapevi"]],
				['Jandira', dadosGraficos["cidade"]["jandira"]],
				['Osasco', dadosGraficos["cidade"]["osasco"]],
				['São Paulo', dadosGraficos["cidade"]["saoPaulo"]]
			]);

			var options = {
			chart: {
				title: 'Alertas por Cidade',
					subtitle: 'Quantidade de alertas por cidade',
				}
			};

			var chart = new google.charts.Bar(document.getElementById('grafico-alertas-por-cidade'));

			chart.draw(data, google.charts.Bar.convertOptions(options));
		}
		setTimeout(function() {
			$('#grafico-alertas-por-cidade').parent().parent().removeClass('ativo');
		}, 1350);
	}
}, 3000);