/**
 * handles home page
 */
restApp.controller('homeController',['$scope','$resource','$location','$window','$route','flash', function($scope,  $resource, $location, $window, $route, flash){
    
	$scope.flash = flash;
	
	$scope.companiesListApi =  $resource("/api/companies", {}, {get:{}});
    
    $scope.companies = $scope.companiesListApi.get(function(data){
	
	}, function(data){
		alert('error getting company list');
	});
    
    $scope.createCompany = function(uri){
    	$location.path("/createCompany/");
    }
    
    $scope.viewCompany = function(uri){
    	$location.search('companyUri',uri);
    	$location.path("/viewCompany/");
    }
    
    $scope.editCompany = function(uri){
    	$location.search('companyUri',uri);
		$location.path("/editCompany/");
	}
    
    $scope.addOwner = function(uri){
    	$location.search('companyUri',uri);
		$location.path("/createOwner/");
	}
    
    $scope.deleteCompany = function(uri){
		
		
	    if($window.confirm("Really delete company?")){
	    	var deleteCompanyApi = $resource(uri);
	    	deleteCompanyApi.delete(function(data){
				
	    		flash.setMessage('Company deleted');
	    		
	    		//need to use route here instead of location.path
	    		$route.reload();
				
			}, function(data){
				alert('error deleting company');
			});
	    }
		
	}
    
    
}]);


/**
 * handles view company page
 */
restApp.controller('viewCompanyController',['$scope','$resource','$location','$window','flash', function($scope,  $resource, $location,$window, flash){
    
	$scope.flash = flash;
	
	$scope.companyApi =  $resource($location.search().companyUri, {}, {get:{}});
	
	if($location.search().ownerJustDeleted){
		$location.search('ownerJustDeleted',null)
		flash.setMessage("Owner deleted");
	}
	
	if($location.search().ownerJustCreated){
		$location.search('ownerJustCreated',null)
		flash.setMessage("Owner created");
	}
	
	if($location.search().ownerJustUpdated){
		$location.search('ownerJustUpdated',null)
		flash.setMessage("Owner updated");
	}
	
	$scope.company =  $scope.companyApi.get(
			function(data){
				$scope.ownersApi =  $resource(data._links.owners.href, {}, {get:{}});
				$scope.owners =  $scope.ownersApi.get();
		}, function(data){
			alert("error getting company");
		}
		);
	
	
	
	
	$scope.editCompany = function(uri){
		$location.search('companyUri',uri);
		$location.path("/editCompany/");
		
	}
	
	$scope.deleteCompany = function(uri){
		
		
	    if($window.confirm("Really delete company?")){
	    	var deleteCompanyApi = $resource(uri);
	    	deleteCompanyApi.delete(function(data){
				
	    		flash.setMessage("Company deleted");
	    		
	    		$location.path("/");
				
			}, function(data){
				alert('error deleting company');
			});
	    }
	    
		
		
	}
	
	$scope.deleteOwner = function(uri){
		
		if($window.confirm("Really delete owner?")){
		
			var deleteOwnerApi = $resource(uri);
			
			deleteOwnerApi.delete(function(data){
				
				flash.setMessage("Owner deleted");
				
				$location.search("ownerJustDeleted", true);
				$location.path("/viewCompany/");
				
			}, function(data){
				alert('error deleting owner');
			});
		}
		
		
	}
	
	$scope.editOwner = function(uri){
		
		$location.search("ownerUri",uri);
		$location.path("/editOwner");
	}
	
	$scope.addNewOwner = function(companyUri){
		$location.search('companyUri',$location.search().companyUri);
		$location.path("/createOwner");
		
	}
    
}]);


/**
 * handles the create company page
 */
restApp.controller('createCompanyController',['$scope','$resource','$location','flash', function($scope,  $resource, $location, flash){
	
	$scope.flash = flash;
	
	$scope.company= {};
	
	$scope.saveCompany = function(){
	
		var newCompanyApi =  $resource("/api/companies",{}, {});
		
		newCompanyApi.save( $scope.company,function(data){
			
			flash.setMessage('Company saved');
			
			$location.path("/");
			
		}, function(data){
			alert('error saving company');
		});
		
		
	}
	
    
}]);


/**
 * handles the edit company page
 */
restApp.controller('editCompanyController',['$scope','$resource','$location','flash', function($scope,  $resource, $location, flash){
	$scope.flash = flash;	
	
	$scope.companyApi =  $resource($location.search().companyUri, {}, {get:{}});
	
	$scope.company =  $scope.companyApi.get();
	
	$scope.updateCompany = function(){
		var updateCompanyApi =  $resource($location.search().companyUri,{}, {"save":{method:"PUT"}});
		
		updateCompanyApi.save( $scope.company,function(data){
			
			flash.setMessage('Company saved');
			
			$location.path("/");
			
		}, function(data){
			alert('error updating company');
		});
	}
	
    
}]);


/**
 * handles the create owner page
 */
restApp.controller('createOwnerController',['$scope','$resource','$location','flash', function($scope,  $resource, $location, flash){
	
	$scope.flash = flash;
	
	$scope.owner= {company: $location.search().companyUri};
	
	$scope.saveOwner = function(){
	
		var newOwnerApi =  $resource("/api/owners",{}, {});
		
		newOwnerApi.save( $scope.owner,function(data){
			
			$location.search("ownerJustCreated", true);
			
			$location.search('companyUri',$location.search().companyUri);
	    	$location.path("/viewCompany/");
		}, function(data){
			alert('error creating owner');
		});
		
		
	}
	
    
}]);



/**
 * handles the edit owner page
 */
restApp.controller('editOwnerController',['$scope','$resource','$location','flash', function($scope,  $resource, $location, flash){
	
	$scope.flash = flash;
	
	$scope.ownerApi =  $resource($location.search().ownerUri, {}, {get:{}});
	
	$scope.owner =  $scope.ownerApi.get();
	
	$scope.updateOwner = function(){
	
	var updateOwnerApi =  $resource($location.search().ownerUri,{}, {"save":{method:"PUT"}});
		
	updateOwnerApi.save( $scope.owner,function(data){
			
			$location.search('companyUri',$location.search().companyUri);
			$location.search("ownerJustUpdated",true);
			$location.path("/viewCompany/");
			
		}, function(data){
			alert('error');
		});
		
		
	}
	
    
}]);