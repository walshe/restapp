

/**
 * this is allows a flash message to persist for length of one page transition
 */
restApp.factory("flash", function($rootScope) {
	  var queue = [];
	  var currentMessage = "";
	  
	  $rootScope.$on("$routeChangeSuccess", function() {
		  var message = queue.shift(); 
		  
		  currentMessage = message || "";
	  });

	  return {
	    setMessage: function(message) {
	      queue.push(message);
	    },
	    getMessage: function() {
	      return currentMessage;
	    }
	  };
	});