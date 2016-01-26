var app = angular.module('app', [
  'ngRoute'
  ,'ngAnimate'
  ,'ngMaterial'
  ,'appControllers'
  //,'mailchimp'
]);

app.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/gallery/:itemCategory', {
        templateUrl: 'partials/list.html',
        controller: 'ListCtrl'
      }).
      when('/gallery/:itemCategory/:itemUrl', {
        templateUrl: 'partials/detail.html',
        controller: 'DetailCtrl'
      }).
      when('/about', {
        title: 'About',
        templateUrl: 'partials/about.html',
        controller: 'PageCtrl'
      }).
      when('/news', {
        title: 'News',
        templateUrl: 'partials/news.html',
        controller: 'PageCtrl'
      }).
      when('/contact', {
        title: 'Contact',
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      }).
      otherwise({
        redirectTo: '/',
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      });
  }
]);

app.run(['$rootScope',
  function ($rootScope) {
    $rootScope.page = {
      setTitle: function (title) {
        this.title = title + ' | Andy Beck';
      }
    }
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $rootScope.page.setTitle(current.$$route.title || 'Andy Beck');
    });
  }
]);

app.animation('.slide_toggle', ['$animateCss', function ($animateCss) {
  return {
      addClass: function(element, className, done) {
          if (className == 'ng-hide') {
              var animator = $animateCss(element, {                    
                  to: {height: '0px', opacity: 0}
              });
              if (animator) {
                  return animator.start().done(function () {
                      element[0].style.height = '';
                      done();
                  });
              }
          }
          done();
      },
      removeClass: function(element, className, done) {
          if (className == 'ng-hide') {
              var height = element[0].offsetHeight;
              var animator = $animateCss(element, {
                  from: {height: '0px', opacity: 0},
                  to: {height: height + 'px', opacity: 1}
              });
              if (animator) {
                  return animator.start().done(done);
              }
          }
          done();
      }
  };
}]);

//app.animation('.slide', function () {
//  return {
//    beforeAddClass : function(element, className, done){
//      if (className == 'ng-hide'){
//        $(element).slideUp({duration: 400}, done);
//      } else {done();}
//    },
//    beforeRemoveClass :  function(element, className, done){
//      if (className == 'ng-hide'){
//        $(element).css({display:'none'});
//        $(element).slideDown({duration: 400}, done);
//      } else {done();}
//    }
//  }
//});

//app.directive('input', function ($parse) {
//  return {
//    restrict: 'E',
//    require: '?ngModel',
//    link: function (scope, element, attrs) {
//      if (attrs.ngModel && attrs.value) {
//        $parse(attrs.ngModel).assign(scope, attrs.value);
//      }
//    }
//  };
//});
