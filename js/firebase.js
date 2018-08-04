// Conexão Firebase
/*
	Desenvolvido por Nelson Carvalho
	nelson.oak.13@gmail.com
	Data: de 27/11/2017 a 28/11/2017
	Data da Última Atualização: 10/06/2018
*/
// Configuração de conexão com o Firebase
var config = {
	apiKey: "AIzaSyA9e95yksCn6oQfwvcQ1GslAYO_x-UoHPQ",
	authDomain: "urban-fix-teste.firebaseapp.com",
	databaseURL: "https://urban-fix-teste.firebaseio.com",
	projectId: "urban-fix-teste",
	storageBucket: "urban-fix-teste.appspot.com",
	messagingSenderId: "146955407106"
};
// Inicializar conexão com o Firebase
firebase.initializeApp(config);
// Pegar referência para o banco de dados e do sistema de armazenamento de imagens
var database = firebase.database();
var storage = firebase.storage();
var gsReference = storage.refFromURL('gs://urban-fix-teste.appspot.com/');
// Realizar login
function login(email, senha) {
	// Desativar botão para evitar múltiplos acessos a função
	$('#btn-login').attr("disabled", "");
	// Flag para verificar se login é válido
	var alerta = true;
	// Pegar dados do Funcionário
	firebase.database().ref('/Employee').once('value').then(function(snapshot) {
		// Para cada Funcionário, comparar email e senha com valores digitados
		snapshot.forEach(function(value){
			if(email == value.val().email && senha == value.val().password) {
				// Alterar flag para falso e efetuar login
				alerta = false;
				loginSession(value.val().cpf, value.val().uuid);
			}
		});
		// Se alerta for verdadeiro, alertar ao usuário "login inválido"
		if(alerta) {
			alert("Login inválido!");
		}
		// Reativar botão
		$('#btn-login').removeAttr("disabled");
	});
}
// Criar Session
function loginSession(cpf, uuid) {
	// Ajax para criar Session
	$.ajax({
		url: 'efetua-login.php',
		data: 'chave=c#@v&Me$tre&cpf='+cpf+'&uuid='+uuid,
		method: 'post',
		success: function() {
			// Redirecionar para a página de casos
			window.location = 'casos.php';
		}
	});
}
// Pegar foto do Funcionário
function getPhotoEmployee(uuid) {
	// Inicializar conteúdo de html
	var html = "";
	// Pegar dados do Funcionário
	firebase.database().ref('/Employee/' + uuid).once('value').then(function(snapshot) {
		// Gerar html com a foto
		html += '<img src="../images/' + (snapshot.val().photo || "") + '" style="max-width:250px;"><br><br>';
		html += '<span style="margin-top:20px;font-size:20px;">' + (snapshot.val().name || "") + '</span><br><br>';
		// Exibir foto
		$('#img-user').html(html);
	});
}
// Pegar Alertas
function getAlerts() {
	// Pegar dados dos Alertas
	firebase.database().ref('/Alerts').once('value').then(function(snapshot) {
		// Inicializar conteúdo de html
		var html = '';
		// Para cada dados de usuário...
		snapshot.forEach(function(value){
			// Obter ID
			var id = value.val().id;
			// Gerar html
			html += '<tr onclick="window.location = \'casos-detalhe.php?id=' + (id || "") + '\';" style="cursor:pointer;">';
			html += '<td>' + (value.val().id || "") + '</td>';
			html += '<td>' + (value.val().date || "") + '</td>';
			html += '<td>%' + (id ? id.substring(0, 11) : "") + '</td>';	// Add nome do usuário aqui (ainda não sei como)
			html += '<td>' + (value.val().kindOfProblem || "") + '</td>';
			html += '<td>' + (value.val().description || "") + '</td>';
			html += '<td>' + (value.val().location["address"] || "") + '</td>';
			html += '<td>' + (value.val().status || "")+ '</td>';
			html += '<td>' + (value.val().urgency || "")+ '</td>';
			html += '</tr>';
			// Pegar dados do Usuário
			firebase.database().ref('/Persons').once('value').then(function(snapshot2) {
				// Para cada dados de Usuário, obter nome de usuário
				snapshot2.forEach(function(value){
					html = html.replace('%' + value.val().cpf, value.val().name);
				});
				// Exibir html
				$("#table-body").html(html);
			});
		});
	});
}
// Buscar Alertas
function searchAlert(inicialDate, finalDate, kindOfProblem, locationAddress, status, urgency) {
	// Obter dados dos Alertas
	firebase.database().ref('/Alerts').once('value').then(function(snapshot) {
		// Inicializar conteúdo de html
		var html = '';
		// Flag para verificar se resultado de busca é vazio
		var search = false;
		// Para cada dados de Alerta, verificar se os valores digitados são correspondentes com o alerta
		snapshot.forEach(function(value){
			if(
				(estaDentroDoIntervaloDeTempo(value.val().date, inicialDate, finalDate)) ||
				(value.val().kindOfProblem.indexOf(kindOfProblem) != -1 && kindOfProblem != "") ||
				(value.val().location["address"].indexOf(locationAddress) != -1 && locationAddress != "") ||
				(value.val().status.indexOf(status) != -1 && status != "") ||
				(value.val().urgency.indexOf(urgency) != -1 && urgency != "")
			) {
				// Mudar flag de verificação para verdadeiro
				search = true;
				// Obter ID
				var id = value.val().id;
				// Obter conteúdo de html
				html += '<tr onclick="window.location = \'casos-detalhe.php?id=' + (id || "") + '\';" style="cursor:pointer;">';
				html += '<td>' + (value.val().id || "") + '</td>';
				html += '<td>' + (value.val().date || "") + '</td>';
				html += '<td>%' + (id ? id.substring(0, 11) : "") + '</td>';	// Add nome do usuário aqui (ainda não sei como)
				html += '<td>' + (value.val().kindOfProblem || "") + '</td>';
				html += '<td>' + (value.val().description || "") + '</td>';
				html += '<td>' + (value.val().location["address"] || "") + '</td>';
				html += '<td>' + (value.val().status || "")+ '</td>';
				html += '<td>' + (value.val().urgency || "")+ '</td>';
				html += '</tr>';
				// Pegar dados de Usuário
				firebase.database().ref('/Persons').once('value').then(function(snapshot2) {
					// Para cada Usuário, obter nome de Usuário
					snapshot2.forEach(function(value){
						html = html.replace('%' + value.val().cpf, value.val().name);
					});
					// Exibir conteúdo de html
					$("#table-body").html(html);
				});
			}
		});
		// Se flag de verificação for falso...
		if(search == false) {
			// Gera html "nenhum resultado encontrado"
			html = '<tr><td colspan="8" style="text-align: center;">Nenhum resultado encontrado</td></tr>';
			// Exibir html
			$("#table-body").html(html);
		}
	});
}
// Reiniciar busca de Alertas
function resetSearchOfAlerts() {
	// Zerar conteúdos dos campos
	$('#inicialDate').val('');
	$('#finalDate').val('');
	$('#kindOfProblem').val('');
	$('#locationAddress').val('');
	$('#status').val('');
	$('#urgency').val('');
	// Obter todos os Alertas
	getAlerts();
}
// Pegar Alerta
function getAlert(id) {
	// Obter CPF
	cpf = id.substring(0, 11);
	// Obter dados do Alerta
	firebase.database().ref('/Alerts/' + id).once('value').then(function(snapshot) {
		// Inicializar conteúdo de html
		var html = '';
		// Gerar conteúdo de html
		html += '<tr><td>ID</td><td>' + (snapshot.val().id || "") + '</td></tr>';
		html += '<tr><td>Data</td><td>' + (snapshot.val().date || "") + '</td></tr>';
		html += '<tr><td>Tipo de Problema</td><td>' + (snapshot.val().kindOfProblem || "") + '</td></tr>';
		html += '<tr><td>Descrição</td><td>' + (snapshot.val().description || "") + '</td></tr>';
		html += '<tr><td>Criticidade</td><td>' + (snapshot.val().urgency || "") + '</td></tr>';
		html += '<tr><td>Status</td><td><b>' + (snapshot.val().status || "") + '</b></td></tr>';
		// Inicializar mapa de localização
		initMap(snapshot.val().location['latitude'], snapshot.val().location['longitude']);
		// Exibir conteúdo de html
		$("#table-alert-body").html(html);
		// Selecionar status do Alerta
		$("#status").val(snapshot.val().status || "");
		// Criar referência para o Google Cloud Storage URI
		gsReference.child(snapshot.val().photoId).getDownloadURL().then(function(url) {
			// Baixar a foto
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onload = function(event) {
				var blob = xhr.response;
			};
			xhr.open('GET', url);
			xhr.send();
			// Inserir foto na tag img
			var img = document.getElementById('photoAlert');
			img.src = url;
		}).catch(function(error) {console.log(error);
			// Tratar erros
		});
	});
	// Obter dados do Usuário
	firebase.database().ref('/Persons/').once('value').then(function(snapshot2) {
		// Inicializar conteúdo de html
		var html = '';
		//Para cada Usuário, verificar se o Usuário gerou o Alerta
		snapshot2.forEach(function(value2) {
			if(cpf == value2.val().cpf) {
				// Gerar conteúdo de html
				html += '<tr><td>CPF</td><td>' + (value2.val().cpf || "") + '</td></tr>';
				html += '<tr><td>Nome</td><td>' + (value2.val().name || "") + '</td></tr>';
				html += '<tr><td>Data de Nascimento</td><td>' + (value2.val().birthDate || "") + '</td></tr>';
				// Exibir conteúdo de html
				$("#table-user-body").html(html);
			}
		});
	});
	// Obter dados dos Comentários
	firebase.database().ref('/Comments/' + id + '/comments').once('value').then(function(snapshot3){
		// Inicializar conteúdo de html
		var html = '';
		// Para cada comentário, gerar conteúdo de html
		snapshot3.forEach(function(value3) {
			html += '<tr>';
			html += '<td>' + (value3.val().id || '0') + '</td>';
			html += '<td>' + (value3.val().personName || '') + '</td>';
			html += '<td>' + (value3.val().content || '') + '</td>';
			html += '<td>' + ((value3.val().sentiment || '') == 'NEUTRAL' ? 'Neutro' : ((value3.val().sentiment || '') == 'SATISFIED' ? 'Satisfeito' : ((value3.val().sentiment || '') == 'DISSATISFIED' ? 'Insatisfeito' : ''))) + '</td>';
			html += '</tr>';
		});
		// Exibir conteúdo de html
		$("#table-comments-body").html(html);
	});
}
// Inicializar mapa
function initMap(latitude = 0, longitude = 0) {
	// Localização do ponto no mapa
	var uluru = {lat: latitude, lng: longitude};
	// Inicializar mapa
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: uluru
	});
	// Adicionar marcação de localização
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}
// Atualizar Status
function updateStatus(id) {
	// Desativar botão de alterar para evitar múltiplos acessos a função
	$('#btn-alterar').attr("disabled", "");
	// Obter dados do Alerta
	firebase.database().ref('/Alerts/' + id).once('value').then(function(snapshot) {
		// Gerar post com os dados atuais do alerta e o novo status
		var postData = {
			checked: snapshot.val().checked,
			date: (snapshot.val().date || ""),
			description: (snapshot.val().description || ""),
			id: (snapshot.val().id || ""),
			kindOfProblem: (snapshot.val().kindOfProblem || ""),
			location: (snapshot.val().location || ""),
			photoId: (snapshot.val().photoId || ""),
			status: $('#status').val(),
			urgency: (snapshot.val().urgency || "")
		};
		// Pegar chave para efetuar atualização via post
		var newPostKey = firebase.database().ref().child('/Alerts/' + id + '/').push().key;
		// Editar dados via post
		var updates = {};
		updates['/Alerts/' + id] = postData;
		firebase.database().ref().update(updates);
		// Emitir alerta "status alterado com sucesso"
		alert("Status alterado com sucesso!");
		// Recarregar página
		window.location = "casos-detalhe.php?id=" + id;
	});
}
// Pegar Funcionário
function getEmployee(uuid) {
	// Obter dados do Funcionário
	firebase.database().ref('/Employee/' + uuid).once('value').then(function(snapshot) {
		// Adicionar dados do Funcionário nos seus respectivos campos
		$('#name').val(snapshot.val().name);
		$('#cpf').val(snapshot.val().cpf);
		$('#email').val(snapshot.val().email);
		$('#photo-name').val(snapshot.val().photo);
	});
}
// Atualizar Funcionário
function updateEmployee(uuid) {
	// Verificar se campos e senha são válidos
	if(validaCampos()) {
		if(validaSenha()) {
			// Verificar se existe foto do Funcionário
			if($('#photo').val()) {
				// Verificar quantos pontos existem no nome da foto
				var photoName = $('#photo').val(), cont = 0, i;
				for(i = 0; i < photoName.length; i++) {
					if(photoName[i] == '.') {
						cont++;
					}
				}
				// Criar array com o nome da foto, separando através dos pontos (".")
				var aPhotoName = photoName.split('.');
				// Verificar extensão da foto
				if(validaExtensao(aPhotoName[cont])) {
					// Gerar nome para foto através da data do dia atual
					$('#photo-name').val(removeEspacosEDoisPontos(Date()) + '.' + aPhotoName[cont]);
				} else {
					// Alertar "extensão inválida" e sair da funçção
					alert("Extensão inválida!");
					return;
				}
			}
			// Obter dados do Funcionário
			firebase.database().ref('/Employee/' + uuid).once('value').then(function(snapshot) {
				// Gerar post com os novos dados do Funcionário
				var postData = {
					cpf: $('#cpf').val(),
					name: $('#name').val(),
					email: $('#email').val(),
					photo: $('#photo-name').val(),
					password: $('#password').val() ? $('#password').val() : snapshot.val().password,
					uuid: snapshot.val().uuid
				};
				// Criar chave para editar dados via post
				var newPostKey = firebase.database().ref().child('/Employee/' + uuid + '/').push().key;
				// Editar dados via post
				var updates = {};
				updates['/Employee/' + uuid + '/'] = postData;
				firebase.database().ref().update(updates);
				// Emitir alerta "dados alterados com sucesso"
				alert("Dados alterados com sucesso!");
				// Enviar dados do formulário para efetuar upload da foto
				$('#form').submit();
			});
		} else {
			// Emitir alerta "senhas diferentes"
			alert('As senha estão diferentes!')
		}
	} else {
		// Emitir alerta "preencha todos os campos"
		alert('Preencha todos os campos!');
	}
}
// Pegar dados dos Gráficos
function getGraphicData(inicialDate, finalDate) {
	// Inicializar objeto que armazenará os dados para os gráficos
	var ret = {
		status: {
			emitido: 0,
			recebido: 0,
			analise: 0,
			encaminhado: 0,
			resolvido: 0,
			rejeitado: 0
		},
		criticidade: {
			baixa: 0,
			moderado: 0,
			critico: 0
		},
		tipoProblema: {
			acumuloLixo: 0,
			buracoPista: 0,
			faltaEnergia: 0,
			matoAlto: 0,
			posteCaido: 0,
			vazamentoAgua: 0
		},
		cidade: {
			barueri: 0,
			carapicuiba: 0,
			cotia: 0,
			itapevi: 0,
			jandira: 0,
			osasco: 0,
			saoPaulo: 0
		},
		sentimento: {
			neutro: 0,
			satisfeito: 0,
			insatisfeito: 0
		}
	};
	// Pegar dados dos Alertas
	firebase.database().ref('/Alerts').once('value').then(function(snapshot) {
		// Para cada dados de Alerta, verificar se os dados estão dentro do intervalo ou se o intervalo de busca é vazio
		snapshot.forEach(function(value){
			if(estaDentroDoIntervaloDeTempo(value.val().date, inicialDate, finalDate) || (inicialDate == '' && finalDate == '')) {
				// Verificar status do Alerta e adicionar 1 ao seu status correspondente
				switch(value.val().status) {
					case "Emitido":
						ret["status"]["emitido"] ++;
						break;
					case "Recebido":
						ret["status"]["recebido"] ++;
						break;
					case "Em análise":
						ret["status"]["analise"] ++;
						break;
					case "Encaminhado para o órgão responsável":
						ret["status"]["encaminhado"] ++;
						break;
					case "Resolvido":
						ret["status"]["resolvido"] ++;
						break;
					case "Rejeitado":
						ret["status"]["rejeitado"] ++;
						break;
				}
				// Verificar criticidade do Alerta e adicionar 1 a sua criticidade correspondente
				switch(value.val().urgency) {
					case "Baixa":
						ret["criticidade"]["baixa"] ++;
						break;
					case "Moderado":
						ret["criticidade"]["moderado"] ++;
						break;
					case "Crítico":
						ret["criticidade"]["critico"] ++;
						break;
				}
				// Verificar tipo de problema do Alerta e adicionar 1 a seu tipo de problema correspondente
				switch(value.val().kindOfProblem) {
					case "Acúmulo de lixo":
						ret["tipoProblema"]["acumuloLixo"] ++;
						break;
					case "Buraco na pista":
						ret["tipoProblema"]["buracoPista"] ++;
						break;
					case "Falta de energia":
						ret["tipoProblema"]["faltaEnergia"] ++;
						break;
					case "Mato alto":
						ret["tipoProblema"]["matoAlto"] ++;
						break;
					case "Poste caido":
						ret["tipoProblema"]["posteCaido"] ++;
						break;
					case "Vazamento de água":
						ret["tipoProblema"]["vazamentoAgua"] ++;
						break;
				}
				// Verificar cidade do Alerta e adicionar 1 a sua cidade correpondente
				if(value.val().location["address"].indexOf("Barueri") != -1)
					ret["cidade"]["barueri"] ++;
				else if(value.val().location["address"].indexOf("Carapicuíba") != -1)
					ret["cidade"]["carapicuiba"] ++;
				else if(value.val().location["address"].indexOf("Cotia") != -1)
					ret["cidade"]["cotia"] ++;
				else if(value.val().location["address"].indexOf("Itapevi") != -1)
					ret["cidade"]["itapevi"] ++;
				else if(value.val().location["address"].indexOf("Jandira") != -1)
					ret["cidade"]["jandira"] ++;
				else if(value.val().location["address"].indexOf("Osasco") != -1)
					ret["cidade"]["osasco"] ++;
				else if(value.val().location["address"].indexOf("São Paulo") != -1)
					ret["cidade"]["saoPaulo"] ++;
				// Pegar dados dos Comentários
				firebase.database().ref('/Comments/' + value.val().id + '/comments').once('value').then(function(snapshot2){			
					// Para cada dados de Comentário
					snapshot2.forEach(function(value2) {
						// Verificar conteúdo de sentimento do Comentário e adicionar 1 ao sentimento correspondente
						switch(value2.val().sentiment) {
							case "NEUTRAL":
								ret["sentimento"]["neutro"] ++;
								break;
							case "SATISFIED":
								ret["sentimento"]["satisfeito"] ++;
								break;
							case "DISSATISFIED":
								ret["sentimento"]["insatisfeito"] ++;
								break;
						}
					});
				});	
			}
		});
	});
	// Retornar objeto com dados para os gráficos
	return ret;
}
// Validações
// Verificar se está dentro do intervalo de tempo
function estaDentroDoIntervaloDeTempo(date, inicialDate, finalDate) {
	// Obter dia, mês e ano do Alerta
	var day = date.substr(0, 2);
	var month = date.substr(3, 2);
	var year = date.substr(6, 4);
	// Obter dia, mês e ano iniciais
	var inicialDay = inicialDate.substr(0, 2);
	var inicialMonth = inicialDate.substr(3, 2);
	var inicialYear = inicialDate.substr(6, 4);
	// Obter dia, mês e ano finais
	var finalDay = finalDate.substr(0, 2);
	var finalMonth = finalDate.substr(3, 2);
	var finalYear = finalDate.substr(6, 4);
	// Inicializar variável de retorno
	var ret = false;
	// Se ano inicial for maior que ano do Alerta ou ano final for menor que ano do Alerta, retorno deve ser falso
	if(inicialYear > year || year > finalYear) {
		ret = false;
	// Se ano inicial for menor que ano do Alerta, iniciar verificações da data final
	} else if(inicialYear < year) {
		// Se ano final for menor que ano do Alerta, retorno deve ser verdadeiro
		if(year < finalYear) {
			ret = true;
		// Senão, anos são iguais, então deve-se verificar mês
		} else {
			// Se mês final for menor que mês do Alerta, retorno deve ser falso
			if(month > finalMonth) {
				ret = false;
			// Se mês final for maior que mês do Alerta, retorno deve ser verdadeiro
			} else if(month < finalMonth) {
				ret = true;
			// Senão, meses são iguais então deve-se verificar dia
			} else {
				// Se dia final for menor que dia do Alerta, retorno deve ser falso
				if(day > finalDay) {
					ret = false;
				// Senão, dia finla é maior ou igual ao dia do Alerta, então deve-se retornar verdadeiro
				} else {
					ret = true;
				}
			}
		}
	// Senão, anos são iguais, então deve-se verificar mês inicial
	} else {
		// Se mês inicial for maior que o mês do Alerta, retorno deve ser falso
		if(inicialMonth > month) {
			ret = false;
		// Se mês inicial for maior que mês do alerta, iniciar verificação da data final
		} else if(inicialMonth < month) {
			// Se ano final for menor que ano do Alerta, retorno deve ser verdadeiro
			if(year < finalYear) {
				ret = true;
			// Senão, anos são iguais, então deve-se verificar mês
			} else {
				// Se mês final for menor que mês do Alerta, retorno deve ser falso
				if(month > finalMonth) {
					ret = false;
				// Se mês final for maior que mês do Alerta, retorno deve ser verdadeiro
				} else if(month < finalMonth) {
					ret = true;
				// Senão, meses são iguais então deve-se verificar dia
				} else {
					// Se dia final for menor que dia do Alerta, retorno deve ser falso
					if(day > finalDay) {
						ret = false;
					// Senão, dia finla é maior ou igual ao dia do Alerta, então deve-se retornar verdadeiro
					} else {
						ret = true;
					}
				}
			}
		// Senão, meses são iguais, então deve-se verificar dia inicial
		} else {
			// Se dia inicial for maior que dia do Alerta, então retorno deve ser falso
			if(inicialDay > day) {
				ret = false;
			// Senão, dia inicial é menor ou igual ao dia do Alerta, então inicia-se a verificação da data final
			} else {
				// Se ano final for menor que ano do Alerta, retorno deve ser verdadeiro
				if(year < finalYear) {
					ret = true;
				// Senão, anos são iguais, então deve-se verificar mês
				} else {
					// Se mês final for menor que mês do Alerta, retorno deve ser falso
					if(month > finalMonth) {
						ret = false;
					// Se mês final for maior que mês do Alerta, retorno deve ser verdadeiro
					} else if(month < finalMonth) {
						ret = true;
					// Senão, meses são iguais então deve-se verificar dia
					} else {
						// Se dia final for menor que dia do Alerta, retorno deve ser falso
						if(day > finalDay) {
							ret = false;
						// Senão, dia finla é maior ou igual ao dia do Alerta, então deve-se retornar verdadeiro
						} else {
							ret = true;
						}
					}
				}
			}
		}
	}
	// Retornar valor da variável retorno
	return ret;
}
// Verificar se campos de edição de Funcionário estão vazios
function validaCampos() {
	// Se todos os campos estiverem preenchidos, retornar verdadeiro
	if($('#name').val() && $('#cpf').val() && $('#email').val()) return true;
	// Retorno padrão é falso
	return false;
}
// Verificar se senhas de funcionário são iguais
function validaSenha() {
	// Se a senha estiver vazia, retornar verdadeiro, pois senha não será alterada
	if($('#password').val == '') return true;
	// Se senhas forem iguais, retornar verdadeiro
	if($('#password').val() == $('#check-password').val()) return true;
	// Retorno padrão é falso
	return false;
}
// Verificar extensão da imagem
function validaExtensao(extensao) {
	// Se a extensão da imagem for png, jpg ou jpeg, retornar verdadeiro'
	if(extensao.toLowerCase() == 'png' || extensao.toLowerCase() == 'jpg' || extensao.toLowerCase() == 'jpeg') return true;
	// Retorno padrão é falso
	return false;
}
// Remover dois pontos e espaço do nome da imagem
function removeEspacosEDoisPontos(str) {
	// Iniciar string de retorno
	var newStr = "";
	// Para cada caractere da string do parâmetro, verificar se ocaracter é diferente de espaço (" ") ou dois pontos (":")
	for(var i = 0; i < str.length; i++) {
		if(str[i] != ' ' && str[i] != ':') {
			// Adicionar caractere na string de retorno
			newStr += str[i];
		}
	}
	// Retornar nova string
	return newStr;
}