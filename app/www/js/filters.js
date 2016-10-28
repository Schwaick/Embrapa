//Encontrar o voto do usuário para uma resposta específica
app.filter('getVoto', function() {
	return function(input, respostaid) {
		var i=0, len=input.length;
		for (; i<len; i++) {
			if (+input[i].resposta_id == +respostaid) {
				return input[i];
			}
		}
		return null;
	}
});