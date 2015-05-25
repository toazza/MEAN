angular.module('catalogo').controller(FilmesController = function($http, $scope) {
	$http.get('/lista').success(function(retorno) {
		$scope.filmes = retorno.filmes;
	});

	function Filme() {
		this.titulo = "";
		this.diretor = "";
		this.ano = "";
	}

	$scope.filme = new Filme();

	var adicionaFilme = function() {
		$http.post('/grava', $scope.filme)
			.success(function(retorno){
				$scope.filmes.push(retorno);

				$scope.filme = new Filme();
		});
	}

	
	$scope.mostraFilme = function(filme) {
		$scope.filmeSelecionado = filme;
	}


	$scope.deletaFilme = function(filme) {
		$http.delete('/filme/'+ filme._id).success(function(retorno) {
			$scope.filmeSelecionado = null;

			var index = $scope.filmes.indexOf(filme);
			$scope.filmes.splice(index, 1);
		});
	}

	$scope.editarFilme = function(filme) {
		$scope.filme = filme;
	}

	var atualizaFilme = function() {
		$http.put('/filme', $scope.filme).success(function() {
			$scope.filme = new Filme();
		});
	}


	$scope.enviaFilme = function(filme) {
		if($scope.filme._id){
			atualizaFilme(filme);
		} else {
			adicionaFilme(filme);
		}
	}


})

