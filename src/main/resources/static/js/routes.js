//routes
restApp.config(function ( $routeProvider ){

    $routeProvider
    .when('/',{
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    .when('/viewCompany',{
        templateUrl: 'pages/company/view.html',
        controller: 'viewCompanyController'
    })
    
    .when('/createCompany',{
        templateUrl: 'pages/company/create.html',
        controller: 'createCompanyController'
    })
    
    .when('/editCompany',{
        templateUrl: 'pages/company/edit.html',
        controller: 'editCompanyController'
    })
    
    .when('/createOwner',{
        templateUrl: 'pages/owner/create.html',
        controller: 'createOwnerController'
    })
    
    .when('/editOwner',{
        templateUrl: 'pages/owner/edit.html',
        controller: 'editOwnerController'
    })
});