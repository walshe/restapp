/**
 * handles home page
 */
restApp.controller('homeController',['$scope','$resource','$location','$window','$route','flash', function($scope,  $resource, $location, $window, $route, flash){
    
	$scope.flash = flash;
	
	$scope.companiesListApi =  $resource("/api/companies", {}, {get:{}});
    
    $scope.companies = $scope.companiesListApi.get(function(data){
	
	}, function(data){
		alert('error');
	});
    
    $scope.createCompany = function(uri){
    	$location.path("/createCompany/");
    }
    
    $scope.viewCompany = function(uri){
    	$location.search('uri',uri);
    	$location.path("/viewCompany/");
    }
    
    $scope.editCompany = function(uri){
		$location.search("uri",uri);
		$location.path("/editCompany/");
	}
    
    $scope.addOwner = function(uri){
		$location.search("uri",uri);
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
				alert('error');
			});
	    }
		
	}
    
    
}]);


/**
 * handles view company page
 */
restApp.controller('viewCompanyController',['$scope','$resource','$location','$window','flash', function($scope,  $resource, $location,$window, flash){
    
	$scope.flash = flash;
	
	$scope.companyApi =  $resource($location.search().uri, {}, {get:{}});
	
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
			alert("error");
		}
		);
	
	
	
	
	$scope.editCompany = function(uri){
		
		$location.search("uri",uri);
		$location.path("/editCompany/");
		
	}
	
	$scope.deleteCompany = function(uri){
		
		
	    if($window.confirm("Really delete company?")){
	    	var deleteCompanyApi = $resource(uri);
	    	deleteCompanyApi.delete(function(data){
				
	    		flash.setMessage("Company deleted");
	    		
	    		$location.path("/");
				
			}, function(data){
				alert('error');
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
				alert('error');
			});
		}
		
		
	}
	
	$scope.editOwner = function(uri){
		
		$location.search("uri",uri);
		$location.path("/editOwner");
	}
	
	$scope.addNewOwner = function(companyUri){
		
		$location.search("uri",companyUri)
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
			alert('error');
		});
		
		
	}
	
    
}]);


/**
 * handles the edit company page
 */
restApp.controller('editCompanyController',['$scope','$resource','$location','flash', function($scope,  $resource, $location, flash){
	$scope.flash = flash;	
	
	$scope.companyApi =  $resource($location.search().uri, {}, {get:{}});
	
	$scope.company =  $scope.companyApi.get();
	
	$scope.updateCompany = function(){
		var updateCompanyApi =  $resource($location.search().uri,{}, {"save":{method:"PUT"}});
		
		updateCompanyApi.save( $scope.company,function(data){
			
			flash.setMessage('Company saved');
			
			$location.path("/");
			
		}, function(data){
			alert('error');
		});
	}
	
    
}]);


/**
 * handles the create owner page
 */
restApp.controller('createOwnerController',['$scope','$resource','$location','flash', function($scope,  $resource, $location, flash){
	
	$scope.flash = flash;
	
	$scope.owner= {company: $location.search().uri};
	
	$scope.saveOwner = function(){
	
		var newOwnerApi =  $resource("/api/owners",{}, {});
		
		newOwnerApi.save( $scope.owner,function(data){
			
			$location.search("ownerJustCreated", true);
			
			$location.search('uri',$scope.owner.company);
	    	$location.path("/viewCompany/");
		}, function(data){
			alert('error');
		});
		
		
	}
	
    
}]);



/**
 * handles the edit owner page
 */
restApp.controller('editOwnerController',['$scope','$resource','$location','flash', function($scope,  $resource, $location, flash){
	
	$scope.flash = flash;
	
	$scope.ownerApi =  $resource($location.search().uri, {}, {get:{}});
	
	$scope.owner =  $scope.ownerApi.get();
	
	$scope.updateOwner = function(){
	
	var updateOwnerApi =  $resource($location.search().uri,{}, {"save":{method:"PUT"}});
		
	updateOwnerApi.save( $scope.owner,function(data){
			
			$location.search("uri",data._links.company.href);
			$location.search("ownerJustUpdated",true);
			$location.path("/viewCompany/");
			
		}, function(data){
			alert('error');
		});
		
		
	}
	
    
}]);