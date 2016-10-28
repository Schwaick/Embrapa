//Serviço de loading do App
app.factory('loadingService', function($ionicLoading) {
	return {
		show: function() {
			$ionicLoading.show({
				template: 'Aguarde...'
			});
		},
		hide: function() {
			$ionicLoading.hide();
		}
	};
});

//Serviço de popup do App
app.factory('popupService', function($ionicPopup) {
	return {
		alert: function(titulo,template) {
			return $ionicPopup.alert({
				title: titulo,
				template: template
			});
		}
	};
});