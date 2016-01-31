var app = angular.module('app', [
  'ngRoute'
  ,'ngAnimate'
  ,'ngMaterial'
  ,'appControllers'
  ,'mailchimp'
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
        controller: 'PageCtrl'
      });
  }
]);

app.factory('utilities', function () {
  function splitName(fullName) {
    var formData = {},
      nameArr = fullName.split(' ');
    if (nameArr.length == 1) {
      formData.first_name = nameArr[0];
      formData.last_name = '';
    } else if (nameArr.length > 2) {
      formData.last_name = nameArr.pop();
      formData.first_name = nameArr.join(' ');
    } else {
      formData.first_name = nameArr[0];
      formData.last_name = nameArr[nameArr.length - 1];
    }
    return formData;
  }
  return {
    splitName: splitName
    // add more properties as needed
  }
});

app.run(['$rootScope',
  function ($rootScope) {
    $rootScope.page = {
      setTitle: function (title) {
        this.title = title + ' | Andy Beck';
      },
      setDirection: function (direction) {
        this.direction = direction;
      }
    }
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $rootScope.page.title = current.$$route ? current.$$route.title + ' | Andy Beck' : 'Andy Beck';
    });
  }
]);

app.animation('.slide_toggle', ['$animateCss',
  function ($animateCss) {
    return {
      addClass: function (element, className, done) {
        if (className == 'ng-hide') {
          var animator = $animateCss(element, {
            to: { height: '0px', opacity: 0 }
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
      removeClass: function (element, className, done) {
        if (className == 'ng-hide') {
          var height = element[0].offsetHeight;
          var animator = $animateCss(element, {
            from: { height: '0px', opacity: 0 },
            to: { height: height + 'px', opacity: 1 }
          });
          if (animator) {
            return animator.start().done(done);
          }
        }
        done();
      }
    };
  }
]);

//app.animation('.slide_toggle', function () {
//  return {
//    beforeAddClass : function(element, className, done){
//      if (className == 'ng-hide'){
//        $(element).slideUp({duration: 300}, done);
//      } else {done();}
//    },
//    beforeRemoveClass :  function(element, className, done){
//      if (className == 'ng-hide'){
//        $(element).css({display:'none'});
//        $(element).slideDown({duration: 300}, done);
//      } else {done();}
//    }
//  }
//});
