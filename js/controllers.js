'use strict';

/* CONTROLLERS */

var appCtrl = angular.module('appCtrl', []);


/* FOOTER */
appCtrl.controller('FooterCtrl', ['$scope', '$sce', 'settings',
   function ($scope, $sce, settings) {
       $scope.footer = $sce.trustAsHtml('&copy; 2008-' + new Date().getFullYear() + ' ' + settings.site_title);
   }
]);


/* NAVIAGTION controller */
appCtrl.controller('NavCtrl', ['$scope', '$location', 'settings',
  function ($scope, $location, settings) {

      $scope.goPath = function (path) {
          $location.path(path);
      };

      $scope.goUrl = function (url) {
          window.open(url);
          //console.log(url);
      };

      $scope.goHome = function (path) {
          $scope.page.direction = $scope.page.direction === 'down' ? 'up' : 'down';
          $location.path(path);
      };

      $scope.closeView = function () {
          $scope.page.direction = $scope.page.direction === 'down' ? 'up' : 'down';
          if ($location.path().indexOf('portfolio/') > -1) {
              $scope.page.direction = 'zoom-out';
              $location.path('/portfolio');
          } else {
              $location.path('/');
          }
      };

      //$scope.$on('$routeChangeSuccess', function () {
      //    $scope.introState = false;
      //});

  }
]);


/* HOME controller */
appCtrl.controller('HomeCtrl', ['$scope', '$location', 'settings', 
    function ($scope, $location, settings) {

        //$scope.page.setDirection('fade');

        $scope.goPath = function (path) {
            $location.path(path);
        };

        $scope.page.navOpen(false);
        //$scope.page.navState = false;
        //console.log($scope.page.navState);

        //$scope.navStuck = function () {
        //    angular.element(document.querySelector('#navbar')).addClass('stuck');
        //    angular.element(document.querySelector('#navbar-sticky-placeholder')).removeClass('hidden');
        //};

        //$scope.navUnstuck = function () {
        //    angular.element(document.querySelector('#navbar')).removeClass('stuck');
        //    angular.element(document.querySelector('#navbar-sticky-placeholder')).addClass('hidden');
        //};

    }
]);


/* INFO VIEW controller */
appCtrl.controller('InfoCtrl', ['$scope', '$location',
   function ($scope, $location) {

       //$scope.page.setDirection('down');
       $scope.page.direction = 'down';

       $scope.page.navOpen(true);

       $scope.goPath = function (path) {
           $location.path(path);
       };

       $scope.goUrl = function (url) {
           window.open(url);
       };

   }
]);


/* LIST VIEW controller */
appCtrl.controller('ListCtrl', ['$scope', '$filter', '$routeParams', 'sortData', '$location', 'settings', '$anchorScroll',
   function ($scope, $filter, $routeParams, sortData, $location, settings, $anchorScroll) {

       $scope.page.navOpen(true);

       sortData.getItems().then(function (data) {
           /* filter items by category from category parameter */
           $scope.items = $filter('filter')(data.items, {
               category: $routeParams.itemCategory
           });
       });

       $scope.itemIn = function ($el) {
           $el.addClass('fadeInUp');
       };
       $scope.itemOut = function ($el) {
           $el.removeClass('fadeInUp');
       };

       $scope.goPath = function (path) {
           $location.path(path);
           $anchorScroll();
       };

   }
]);


/* DETAIL VIEW controller */
appCtrl.controller('DetailCtrl', ['$scope', '$routeParams', '$filter', '$location', 'sortData', 'settings', '$document',
   function ($scope, $routeParams, $filter, $location, sortData, settings, $document) {

       $scope.page.navOpen(true);

       $scope.url = $routeParams.itemUrl;

       sortData.getItems().then(function (data) {

           /* get all items in category, filtered by category parameter */
           var items = $filter('filter')(data.items, {
               category: $routeParams.itemCategory
           });

           /* get current item, filtered by url parameter */
           var item = $filter('filter')(items, {
               url: $scope.url
           }, true)[0];

           /* the index of the selected item in the array */
           var currentIndex = items.indexOf(item);

           /* find previous item */
           if (currentIndex > 0)
               $scope.prevItem = Number(currentIndex) - 1;
           else
               $scope.prevItem = items.length - 1;

           /* find next item */
           if (currentIndex < items.length - 1)
               $scope.nextItem = Number(currentIndex) + 1;
           else
               $scope.nextItem = 0;

           /* set scopes */
           $scope.page.setTitle(item.title);
           $scope.item = item;
           $scope.prev = items[$scope.prevItem];
           $scope.next = items[$scope.nextItem];

           //Analytics.trackPage('/' + item.url, item.title);

           /* view previous */
           $scope.getPrev = function (page) {
               $scope.page.setDirection('forward');
               $location.url('/portfolio/' + items[page].url);
           };

           /* view next */
           $scope.getNext = function (page) {
               $scope.page.setDirection('backward');
               $location.url('/portfolio/' + items[page].url);
           };

           $scope.goUrl = function (url) {
               window.open(url);
               //console.log(url);
           };

           $scope.goPath = function (path) {
               $location.path(path);
           };

       });

   }
]);