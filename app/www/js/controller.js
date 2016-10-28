//Url do Web Service
var urlRoot = "http://site.com/";

//Headers das requisições POST
var headers = {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'};

app.controller('MenuCtrl', function($scope, $state) {	
	$scope.sair = function() {
		localStorage.removeItem('usuario');
		$state.go('base.home');
	};
})
.controller('HomeCtrl', function($scope, $state, $http, loadingService, popupService) {
	//Variável que vai armazenar os dados de formulário
	$scope.form = {};

	$scope.entrar = function(formulario) {
		if(!formulario.$valid) {
			var template = '<ul><li>Todos os campos são requeridos.</li>'+
				'<li>Formato do celular: 99 99999-9999 ou 99 9999-9999.</li>'+
				'<li>A senha deve ter ao menos 6 caracteres.</li></ul>';

			popupService.alert('Alerta',template);
		} else {
			loadingService.show();

			var url = urlRoot+'getUsuario.php';
			var data = {celular : $scope.form.celular,senha : $scope.form.senha};
			
			$http.post(url, data, headers)
			.success(function(data) {
				loadingService.hide();
				if(data == -1) {
					popupService.alert('Alerta','O Usuário não existe.');
				} else if(data == 0) {
					popupService.alert('Alerta','Senha incorreta.');
				} else {
					//Como o localstorage não permite armazenar objetos, transformamos o
					//objeto numa string e armazenamos
					localStorage.usuario = JSON.stringify(data);

					$state.go('menu.topico');
				}
			})
			.error(function() {
				loadingService.hide();
				popupService.alert('Alerta','Não foi possível recuperar o usuário.');
			});
		}
	}

	$scope.cadastrar = function() {
		$state.go('base.cadastro');
	}

	$scope.redefinirSenha = function() {
		$state.go('base.redefinirsenha');
	}
})
.controller('CadastroCtrl', function($scope, $state, $http, $stateParams, $cordovaCamera,$ionicActionSheet,loadingService,popupService) {
	//Variável que vai armazenar os dados de formulário
	$scope.usuario = {imagem:null};

	$scope.cadastrar = function(formulario) {
		if(formulario.$valid) {
			$scope.post();
		} else {
			var template = '<ul><li>Todos os campos são requeridos.</li>'+
				'<li>O nome deve ter entre 3 e 50 caracteres.</li>'+
				'<li>O email deve ser válido e ter no máximo 100 caracteres.</li>'+
				'<li>Formato do celular: 99 99999-9999 ou 99 9999-9999.</li>'+
				'<li>O resumo deve ter no mínimo 4 caracteres.</li>'+
				'<li>A senha deve ter no mínimo 6 caracteres.</li></ul>';

			popupService.alert('Alerta',template);
		}
	};
	$scope.post = function() {
		loadingService.show();

		var url = urlRoot+'novoUsuario.php';
		var data = {
			nome:$scope.usuario.nome,email:$scope.usuario.email,celular:$scope.usuario.celular,
			resumo_profissional:$scope.usuario.resumo,imagem:$scope.usuario.imagem,
			senha:$scope.usuario.senha
		};

		$http.post(url, data, headers)
		.success(function() {
			//Após cadastrar, pedimos o usuário pro servidor novamente para conseguir o id
			//do usuário. Modificar para só retornar o id, porque o resto já temos.
			$scope.get();
		})
		.error(function() {
			loadingService.hide();
			popupService.alert('Alerta','Erro ao cadastrar.');
		});
	};
	$scope.get = function() {
		var url = urlRoot+'getUsuario.php';
		var data = {celular : $scope.usuario.celular};

		$http.post(url, data, headers)
		.success(function(data) {
			loadingService.hide();

			localStorage.usuario = JSON.stringify(data);
			$state.go('menu.topico');
		})
		.error(function(data, status) {
			loadingService.hide();
			popupService.alert('Alerta','Erro ao recuperar os dados.');
		});
	};
	$scope.action = function() {
		//Mostrar menu de contexto
		var hide = $ionicActionSheet.show({
			buttons: [
			{ text: '<i class="icon ion-camera"></i> Camera' },
			{ text: '<i class="icon ion-images"></i> Galeria' },
			{ text: '<i class="icon ion-minus-circled"></i> Remover' }
			],
			titleText: 'Ações',
			cancelText: 'Cancelar',
			cancel: function() {
			},
			buttonClicked: function(index) {
				switch(index) {
					case 0:
					$scope.camera();
					break;
					case 1:
					$scope.galeria();
					break;
					case 2:
					$scope.remover();
					break;
				}
				return true;
			}
		});
	};
	$scope.camera = function() {
		var options = {
			quality: 90,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 300,
			targetHeight: 300,
			saveToPhotoAlbum: true,
			correctOrientation:true
		};

		$cordovaCamera.getPicture(options).then(function(imageData) {
			//tira a foto e retorna a imagem como base64 encoded
			$scope.usuario.imagem = imageData;
		}, function(err) {
			popupService.alert('Alerta','Erro ao recuperar a imagem. '+err);
		});
	};
	$scope.galeria = function() {
		var options = {
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY
		};

		$cordovaCamera.getPicture(options).then(function(imageData) {
			//seleciona a foto da galeria e retorna a imagem como base64 encoded
			$scope.usuario.imagem = imageData;
		}, function(err) {
			popupService.alert('Alerta','Erro ao recuperar a imagem. '+err);
		});
	};
	$scope.remover = function() {
		$scope.usuario.imagem = null;
	};
})
.controller('RedefinirsenhaCtrl', function($scope, $state, $http, loadingService, popupService) {
	$scope.form = {};

	$scope.ok = function(formulario) {
		if(!formulario.$valid) {
			var template = '<ul><li>Todos os campos são requeridos.</li>'+
				'<li>Formato do celular: 99 99999-9999 ou 99 9999-9999.</li>'+
				'<li>A senha deve ter ao menos 6 caracteres.</li></ul>';

			popupService.alert('Alerta',template);
		} else {
			loadingService.show();

			url = urlRoot+'enviaEmail.php';
			data = {celular:$scope.form.celular,senha:$scope.form.senha};

			$http.post(url,data,headers)
			.success(function(data) {
				loadingService.hide();

				if(data == 1) {
					popupService.alert('Alerta','Sua senha foi enviada por email.')
					.then(function(res) {
						//espera o usuário apertar o botão 'ok' para redirecionar
						$state.go('base.home');
					});
				} else if(data == -1) {
					popupService.alert('Alerta','Usuário não cadastrado.');
				} else {
					popupService.alert('Alerta','Erro ao enviar o email.');
				}
			})
			.error(function(data, status) {
				loadingService.hide();
				popupService.alert('Alerta','Erro ao enviar o email.');
			});
		}
	}
})
.controller('TopicoCtrl', function($scope, $http, loadingService, popupService) {
	//O evento 'beforeEnter' serve para carregar dados antes de entrar na view.
	//Isso reduz o lag das transições.
	$scope.$on("$ionicView.beforeEnter", function() {
		loadingService.show();
		var url = urlRoot+'getTopicos.php';

		$http.get(url)
		.success(function(data) {
			loadingService.hide();
			$scope.topicos = data;
		})
		.error(function(data, status) {
			loadingService.hide();
			popupService.alert('Alerta','Erro ao recuperar os topicos.');
		});
	});
})
.controller('SubtopicoCtrl', function($scope, $http, $stateParams, loadingService, popupService) {
	$scope.$on("$ionicView.beforeEnter", function() {
		loadingService.show();
		var url = urlRoot+'getSubtopicos.php';
		var data = {topicoid:$stateParams.topicoid};

		$http.post(url,data,headers)
		.success(function(data) {
			loadingService.hide();
			$scope.subtopicos = data;
		})
		.error(function(data, status) {
			loadingService.hide();
			popupService.alert('Alerta','Erro ao recuperar os subtopicos.');
		});
	});

	$scope.titulo = $stateParams.topiconome;
})
.controller('PerguntasCtrl', function($scope, $state, $http, $stateParams, $ionicPopup, loadingService, popupService) {
	$scope.$on("$ionicView.beforeEnter", function() {
		loadingService.show();
		var url = urlRoot+'getPerguntas.php';
		var data = {subtopicoid:$stateParams.subtopicoid};

		$http.post(url,data,headers)
		.success(function(data) {
			loadingService.hide();
			$scope.perguntas = data;
		})
		.error(function(data, status) {
			loadingService.hide();
			popupService.alert('Alerta','Erro ao recuperar as perguntas.');
		});
	});

	$scope.titulo = $stateParams.subtopiconome;

	$scope.showConfirm = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Confirmação',
			template: 'A pergunta que você quer fazer já pode ter sido feita e respondida. '+
			'Recomendamos que você pesquise primeiro antes de perguntar. Deseja continuar?',
			cancelText: 'Cancelar',
			okText: 'OK'
		}).then(function(res) {
			//Se o usuário continuar, redirecionar para a view nova pergunta
			if(res) $state.go('menu.novapergunta',{subtopicoid:$stateParams.subtopicoid});
		});
	};
})
.controller('PerguntaCtrl', function($scope, $state, $http, $ionicActionSheet, $stateParams, $interval, $filter, popupService) {
	$scope.$on("$ionicView.beforeEnter", function() {
		$scope.pergunta = {};
		$scope.respostas = [];
		$scope.votos = [];

		var url = urlRoot+'getPergunta.php';
		var data = {perguntaid:$stateParams.perguntaid};

		$http.post(url,data,headers)
		.success(function(data) {
			$scope.pergunta = data;
		})
		.error(function(data, status) {
			popupService.alert('Alerta','Erro ao recuperar a pergunta.');
		});

		url = urlRoot+'getRespostas.php';

		$http.post(url,data,headers)
		.success(function(data) {
			$scope.respostas = data;
		})
		.error(function(data, status) {
			popupService.alert('Alerta','Erro ao recuperar as respostas.');
		});

		$scope.getVotos();
	});

	//A cada 10 segundos atualiza as respostas
	$interval(function () {
		$scope.updateRespostas();
	}, 10000);

	$scope.form = {};

	//Atualizar as respostas
	$scope.updateRespostas = function() {
		var url = urlRoot+'getRespostas.php';
		var data = {perguntaid:$stateParams.perguntaid};

		$http.post(url,data,headers)
		.success(function(data) {
			$scope.respostas = data;
		});
	};

	//Mostrar 'context menu' das perguntas
	$scope.actionPergunta = function(usuarioid) {
		//Pegamos a string dos dados do usuário do localstorage e transformamos de volta em
		//objeto.
		var usuario = JSON.parse(localStorage.usuario);

		//Se o usuário logado é diferente do usuário da pergunta
		if(usuario.id != usuarioid) {
			var hidePergunta = $ionicActionSheet.show({
				buttons: [
				{ text: '<i class="icon ion-ios-information"></i> Perfil do usuário' }
				],
				titleText: 'Ações',
				cancelText: 'Cancelar',
				cancel: function() {
				},
				buttonClicked: function(index) {
					switch(index) {
						case 1:
						$state.go('menu.perfil',{usuarioid:usuarioid});
						break;
					}
					return true;
				}
			});
		}
	};

	//Mostrar 'context menu' das respostas
	$scope.actionResposta = function(usuariorespid,respostaid) {
		var usuario = JSON.parse(localStorage.usuario);

		//Se o usuário logado é diferente do usuário da resposta
		if(usuario.id != usuariorespid) {

			//Se o usuário logado que fez essa pergunta
			if(usuario.id == $scope.pergunta.uid) {
				var options = [
				{ text: '<i class="icon ion-checkmark-round"></i> Definir como resposta' },
				{ text: '<i class="icon ion-ios-information"></i> Perfil do usuário' }
				];

				var btnClicked = function(index) {
					switch(index) {
						case 0:
						$scope.updatePergunta(respostaid,$scope.pergunta.pid);
						break;
						case 1:
						$state.go('menu.perfil',{usuarioid:usuariorespid});
						break;
					}
					return true;
				};
			} else {
				var options = [
				{ text: '<i class="icon ion-chevron-up"></i> Resposta boa' },
				{ text: '<i class="icon ion-chevron-down"></i> Resposta ruim' },
				{ text: '<i class="icon ion-ios-information"></i> Perfil do usuário' }
				];

				var btnClicked = function(index) {
					switch(index) {
						case 0:
						$scope.updateRelevancia('+',respostaid);
						break;
						case 1:
						$scope.updateRelevancia('-',respostaid);
						break;
						case 2:
						$state.go('menu.perfil',{usuarioid:usuariorespid});
						break;
					}
					return true;
				};
			}

			var hideResposta = $ionicActionSheet.show({
				buttons: options,
				titleText: 'Ações',
				cancelText: 'Cancelar',
				cancel: function() {
				},
				buttonClicked: function(index) {
					return btnClicked(index);
				}
			});
		}
	};

	//Usuário deu uma resposta à pergunta.
	$scope.responder = function() {
		if($scope.form.resposta.length > 0) {
			var url = urlRoot+'novaResposta.php';
			var data = {
				perguntaid:$scope.pergunta.pid,usuarioid:JSON.parse(localStorage.usuario).id,
				resposta:$scope.form.resposta
			};

			$http.post(url,data,headers)
			.success(function(data) {
				$scope.updateRespostas();
				$scope.form.resposta = "";
			})
			.error(function(data, status) {
				popupService.alert('Alerta','Erro ao inserir a resposta.');
			});
		}
	};

	//Aumenta ou diminuiu a relevancia da resposta
	$scope.updateRelevancia = function(tipo,respostaid) {
		var found = $filter('getVoto')($scope.votos, respostaid);
		var url = urlRoot+'updateResposta.php';
		var data = {
			tipo:tipo,respostaid:respostaid,
			comando:'',usuarioid:JSON.parse(localStorage.usuario).id
		};

		//Se o usuário não votou nessa resposta
		if(found == null) {
			data.comando = 'insert';

			$http.post(url,data,headers)
			.success(function(data) {
				$scope.updateRespostas();
				$scope.getVotos();
			})
			.error(function(data, status) {
				popupService.alert('Alerta','Erro ao atualizar a resposta.');
			});
		} 
		//Se o usuário votou, mas é oposto ao voto antigo
		else if(found.tipo != tipo) {
			data.comando = 'update';

			$http.post(url,data,headers)
			.success(function(data) {
				$scope.updateRespostas();
				$scope.getVotos();
			})
			.error(function(data, status) {
				popupService.alert('Alerta','Erro ao atualizar a resposta.');
			});
		} else {
			var txt = tipo=='+'?'positivamente':'negativamente';
			popupService.alert('Alerta','Você já votou '+txt+' nessa resposta');
		}
	};

	//Definir resposta como definitiva
	$scope.updatePergunta = function(respostaid,perguntaid) {
		var url = urlRoot+'updatePergunta.php';
		var data = {respostaid:respostaid,perguntaid:perguntaid};

		$http.post(url,data,headers)
		.success(function(data) {
			$scope.pergunta.presposta = respostaid;
			$scope.updateRespostas();
		})
		.error(function(data, status) {
			popupService.alert('Alerta','Erro ao atualizar a pergunta.');
		});
	};

	//Retorna todos os votos do usuário para a pergunta atual
	$scope.getVotos = function() {
		var url = urlRoot+'getVotos.php';
		var data = {
			usuarioid:JSON.parse(localStorage.usuario).id,perguntaid:$stateParams.perguntaid
		};

		$http.post(url,data,headers)
		.success(function(data) {
			$scope.votos = data;
		})
		.error(function(data, status) {
			popupService.alert('Alerta','Erro ao recuperar os votos.');
		});
	};
})
.controller('NovaPerguntaCtrl', function($scope, $http, $stateParams,$ionicHistory,$cordovaCamera,$ionicActionSheet,loadingService, popupService) {
	$scope.pergunta = {imagem:null};
	$scope.novaPergunta = function(formulario) {
		if(formulario.$valid) {
			loadingService.show();
			url = urlRoot+'novaPergunta.php';
			data = {
				usuarioid:JSON.parse(localStorage.usuario).id,subtopicoid:$stateParams.subtopicoid,
				titulo:$scope.pergunta.titulo,descricao:$scope.pergunta.descricao,
				anexo:$scope.pergunta.imagem
			};

			$http.post(url,data,headers)
			.success(function() {
				loadingService.hide();
				//Usamos o ionicHistory dessa vez para o botão voltar da view redirecionar
				//o usuário para subtopicos, e não de volta para nova pergunta
				$ionicHistory.goBack();
			})
			.error(function(data, status) {
				loadingService.hide();
				popupService.alert('Alerta','Erro ao inserir nova Pergunta.');
			});
		} else {
			var template = '<ul><li>Todos os campos são requeridos.</li>'+
				'<li>O Título deve ter entre 5 e 50 caracteres.</li>'+
				'<li>A Descrição deve ter entre 5 e 250 caracteres.</li></ul>';

			popupService.alert('Alerta',template);
		}
	};

	$scope.action = function() {
		var hide = $ionicActionSheet.show({
			buttons: [
			{ text: '<i class="icon ion-camera"></i> Camera' },
			{ text: '<i class="icon ion-images"></i> Galeria' },
			{ text: '<i class="icon ion-minus-circled"></i> Remover' }
			],
			titleText: 'Ações',
			cancelText: 'Cancelar',
			cancel: function() {
			},
			buttonClicked: function(index) {
				switch(index) {
					case 0:
					$scope.camera();
					break;
					case 1:
					$scope.galeria();
					break;
					case 2:
					$scope.removerAnexo();
					break;
				}
				return true;
			}
		});
	};

	$scope.camera = function() {
		var options = {
			quality: 90,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			encodingType: Camera.EncodingType.JPEG,
			allowEdit: true,
			targetWidth: 250,
			targetHeight: 200,
			saveToPhotoAlbum: false,
			correctOrientation:true
		};

		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.pergunta.imagem = imageData;
		}, function(err) {
			popupService.alert('Alerta','Erro ao recuperar a imagem. '+err);
		});
	};

	$scope.galeria = function() {
		var options = {
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY
		};

		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.pergunta.imagem = imageData;
		}, function(err) {
			popupService.alert('Alerta','Erro ao recuperar a imagem. '+err);
		});
	};

	$scope.removerAnexo = function() {
		$scope.pergunta.imagem = null;
	};
})
.controller('AlterarDadosCtrl', function($scope, $http, $cordovaCamera, $ionicActionSheet, loadingService, popupService) {
	$scope.usuario = JSON.parse(localStorage.usuario);

	$scope.alterar = function(formulario) {
		if(!formulario.$valid) {
			var template = '<ul><li>Tirando a senha, todos os campos são requeridos.</li>'+
				'<li>O nome deve ter entre 3 e 50 caracteres.</li>'+
				'<li>O email deve ser válido e ter no máximo 100 caracteres.</li>'+
				'<li>Formato do celular: 99 99999-9999 ou 99 9999-9999.</li>'+
				'<li>O resumo deve ter no mínimo 4 caracteres.</li>'+
				'<li>A senha deve ter no mínimo 6 caracteres.</li></ul>';

			popupService.alert('Alerta',template);
		} else {
			loadingService.show();
			url = urlRoot+'updateUsuario.php';

			$http.post(url,$scope.usuario,headers)
			.success(function(data) {
				loadingService.hide();
				localStorage.usuario = JSON.stringify($scope.usuario);
				popupService.alert('Mensagem','Sucesso ao alterar os dados.');
			})
			.error(function(data, status) {
				loadingService.hide();
				popupService.alert('Alerta','Erro ao alterar os dados.');
			});
		}
	};

	$scope.action = function() {
		var hide = $ionicActionSheet.show({
			buttons: [
			{ text: '<i class="icon ion-camera"></i> Camera' },
			{ text: '<i class="icon ion-images"></i> Galeria' },
			{ text: '<i class="icon ion-minus-circled"></i> Remover' }
			],
			titleText: 'Ações',
			cancelText: 'Cancelar',
			cancel: function() {
			},
			buttonClicked: function(index) {
				switch(index) {
					case 0:
					$scope.camera();
					break;
					case 1:
					$scope.galeria();
					break;
					case 2:
					$scope.remover();
					break;
				}
				return true;
			}
		});
	};
	$scope.camera = function() {
		var options = {
			quality: 90,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 300,
			targetHeight: 300,
			saveToPhotoAlbum: true,
			correctOrientation:true
		};

		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.usuario.imagem = imageData;
		}, function(err) {
			popupService.alert('Alerta','Erro ao recuperar a imagem. '+err);
		});
	};
	$scope.galeria = function() {
		var options = {
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY
		};

		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.usuario.imagem = imageData;
		}, function(err) {
			popupService.alert('Alerta','Erro ao recuperar a imagem. '+err);
		});
	};
	$scope.remover = function() {
		$scope.usuario.imagem = null;
	};
})
.controller('RankingCtrl', function($scope, $http, loadingService, popupService) {
	$scope.$on("$ionicView.beforeEnter", function() {
		loadingService.show();
		var url = urlRoot+'getRanking.php';

		$http.get(url)
		.success(function(data) {
			loadingService.hide();
			$scope.ranking = data;
		})
		.error(function(data, status) {
			loadingService.hide();
			popupService.alert('Alerta','Erro ao recuperar o Ranking.');
		});
	});
})
.controller('PerfilCtrl', function($scope, $http, $stateParams, loadingService, popupService) {
	$scope.$on("$ionicView.beforeEnter", function() {
		loadingService.show();
		var url = urlRoot+'getUsuario.php';
		var data = { usuarioid : $stateParams.usuarioid };

		$http.post(url,data,headers)
		.success(function(data) {
			loadingService.hide();
			$scope.usuario = data;
			$scope.titulo = $scope.usuario.nome.split(' ')[0];
		})
		.error(function(data, status) {
			loadingService.hide();
			popupService.alert('Alerta','Erro ao recuperar os dados do Usuário.');
		});
	});
})
.controller('MinhasRespostasCtrl', function($scope, $http, loadingService, popupService) {
	$scope.$on("$ionicView.beforeEnter", function() {
		loadingService.show();
		var url = urlRoot+'getRespostas.php';
		var data = {usuarioid:JSON.parse(localStorage.usuario).id};

		$http.post(url,data,headers)
		.success(function(data) {
			loadingService.hide();
			$scope.respostas = data;
		})
		.error(function(data, status) {
			loadingService.hide();
			popupService.alert('Alerta','Erro ao recuperar as respostas.');
		});
	});
})
.controller('MinhasPerguntasCtrl', function($scope, $http, loadingService, popupService) {
	$scope.$on("$ionicView.beforeEnter", function() {
		loadingService.show();
		var url = urlRoot+'getPerguntas.php';
		var data = {usuarioid:JSON.parse(localStorage.usuario).id};

		$http.post(url,data,headers)
		.success(function(data) {
			loadingService.hide();
			$scope.perguntas = data;
		})
		.error(function(data, status) {
			loadingService.hide();
			popupService.alert('Alerta','Erro ao recuperar as perguntas.');
		});
	});
});