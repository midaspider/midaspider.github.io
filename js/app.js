'use strict';

/* JAVASCRIPT FUNCTIONS */
function imgLoaded(img) {
   //console.log(img);
   var imgWrapper = img.parentNode;
   imgWrapper.className += imgWrapper.className ? ' loaded' : 'loaded';
};


/* ANGULAR APP */
var app = angular.module('app', [
    'ngRoute'
  , 'ngAnimate'
  , 'ngSanitize'
  , 'ngTouch'
  , 'angular-google-analytics'
  //, 'SmoothScrollbar'
  , 'appCtrl'
]);


/* CONSTANTS */
app.constant('settings', {
   site_title: 'Midaspider',
   tracking_id: 'UA-82221819-1',
   items_json: 'data/items.json'
});


/* CONFIG */
app.config(['AnalyticsProvider', 'settings',
   function (AnalyticsProvider, settings) {
      AnalyticsProvider.setAccount(settings.tracking_id);
   }
]);

app.config(['$routeProvider', '$locationProvider', '$provide',
   function ($routeProvider, $locationProvider, $provide) {

       $routeProvider
          .when('/info', {
              title: 'Information',
              controller: 'InfoCtrl',
              templateUrl: 'partials/info.html'
          })
          .when('/portfolio', {
              title: 'Portfolio',
              controller: 'ListCtrl',
              templateUrl: 'partials/list.html'
          })
          .when('/portfolio/:itemUrl', {
              controller: 'DetailCtrl',
              templateUrl: 'partials/detail.html'
          })
          .otherwise({
              controller: 'HomeCtrl',
              templateUrl: 'partials/home.html',
              redirectTo: '/'
          });

       $locationProvider
          .html5Mode(true);

      /*$provide.decorator('$sniffer', function ($delegate) {
         $delegate.history = false; // set false to spoof Hashbang in HTML5 Mode
         return $delegate;
      });*/

   }
]);


/* DIRECTIVES */
app.directive('navBar', function () {
   return {
      templateUrl: 'partials/nav.html'
   };
});


app.directive('animateOnLoad', ['$animateCss', function ($animateCss) {
   return {
      'link': function (scope, element) {
         $animateCss(element, {
            event: 'enter',
            structural: true,
            from: { 'opacity': 0 },
            to: { 'opacity': 1 }
         }).start();
      }
   };
}]);


/* FACTORIES */
app.factory('sortData', ['$http', 'settings',
   function ($http, settings) {
   var items = [];
   return {
      getItems: function () {
         return $http.get(settings.items_json).then(function (response) {
            items = response.data;
            /* sort items by date in descending order */
            items.sort(function (a, b) {
               return b.date.localeCompare(a.date);
            });            
            return {
               items: items
            };
         })
      },
      saveItems: function () { }
   };
}]);


/* RUN */
app.run(function (Analytics) { });
app.run(['$rootScope', 'settings',
   function ($rootScope, settings) {
       $rootScope.page = {
           setTitle: function (title) {
               this.title = title + ' | ' + settings.site_title;
               //console.log('title: ' + title);
           },
           setDirection: function (newDirection) {
               this.direction = newDirection;
               console.log('direction: ' + this.direction);
           },
           navOpen: function (newState) {
               this.navState = newState;
               //console.log('intro state: ' + introState);
           }
       }
       $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
           $rootScope.page.title = current.$$route ? current.$$route.title + ' | ' + settings.site_title : settings.site_title;
       });
   }]);


/* ANIMATION */
app.animation('.slide', function () {
   return {
      beforeAddClass: function (element, className, done) {
         if (className === 'ng-hide') {
            element.slideUp({ duration: 350 }, done);
         }
      },
      removeClass: function (element, className, done) {
         if (className === 'ng-hide') {
            element.hide().slideDown({ duration: 350 }, done);
         }
      }
   }
});