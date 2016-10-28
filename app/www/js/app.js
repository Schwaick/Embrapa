// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
//Rotas e configurações do App
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  //Trocar o scroll do JS pelo nativo do Android
  $ionicConfigProvider.scrolling.jsScrolling(false);

  $stateProvider
  .state('menu', {
    url: "/menu",
    abstract: true,
    templateUrl: "templates/menutemplate.html",
    controller: 'MenuCtrl'
  })
  .state('menu.topico', {
    url: '/topico',
    views: {
      'menuContent': {
        templateUrl: 'templates/topico.html',
        controller: 'TopicoCtrl'
      }
    }
  })
  .state('menu.subtopico', {
    url: '/subtopico/:topicoid/:topiconome',
    views: {
      'menuContent': {
        templateUrl: 'templates/subtopico.html',
        controller: 'SubtopicoCtrl'
      }
    }
  })
  .state('menu.perguntas', {
    url: '/perguntas/:subtopicoid/:subtopiconome',
    views: {
      'menuContent': {
        templateUrl: 'templates/perguntas.html',
        controller: 'PerguntasCtrl'
      }
    }
  })
  .state('menu.pergunta', {
    url: '/pergunta/:perguntaid',
    views: {
      'menuContent': {
        templateUrl: 'templates/pergunta.html',
        controller: 'PerguntaCtrl'
      }
    }
  })
  .state('menu.novapergunta', {
    url: '/novapergunta/:subtopicoid',
    views: {
      'menuContent': {
        templateUrl: 'templates/novapergunta.html',
        controller: 'NovaPerguntaCtrl'
      }
    }
  })
  .state('menu.alterardados', {
    url: '/alterardados',
    views: {
      'menuContent': {
        templateUrl: 'templates/alterardados.html',
        controller: 'AlterarDadosCtrl'
      }
    }
  })
  .state('menu.ranking', {
    url: '/ranking',
    views: {
      'menuContent': {
        templateUrl: 'templates/ranking.html',
        controller: 'RankingCtrl'
      }
    }
  })
  .state('menu.perfil', {
    url: '/perfil/:usuarioid',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html',
        controller: 'PerfilCtrl'
      }
    }
  })
  .state('menu.minhasrespostas', {
    url: '/minhasrespostas',
    views: {
      'menuContent': {
        templateUrl: 'templates/minhasrespostas.html',
        controller: 'MinhasRespostasCtrl'
      }
    }
  })
  .state('menu.minhasperguntas', {
    url: '/minhasperguntas',
    views: {
      'menuContent': {
        templateUrl: 'templates/minhasperguntas.html',
        controller: 'MinhasPerguntasCtrl'
      }
    }
  })
  .state('base', {
    url: "/base",
    abstract: true,
    templateUrl: "templates/basetemplate.html"
  })
  .state('base.home', {
    url: "/home",
    templateUrl: "templates/home.html",
    controller: 'HomeCtrl'
  })
  .state('base.redefinirsenha', {
    url: "/redefinirsenha",
    templateUrl: "templates/redefinirsenha.html",
    controller: 'RedefinirsenhaCtrl'
  })
  .state('base.cadastro', {
    url: "/cadastro",
    templateUrl: "templates/cadastro.html",
    controller: 'CadastroCtrl'
  });

  //Se o usuário estiver logado, redirecionar para os topicos, senão, para a home
  if (localStorage.usuario) {
    $urlRouterProvider.otherwise('/menu/topico');
  } else {
    $urlRouterProvider.otherwise('/base/home');
  }
});
