$(document).ready(function(){
$(document).on("click","#logout",function(){
		$.ajax({
		  type: "POST",
		  url: "/user/logout",
		  success: function(){
		  		//if we get 200 Response
		  		$.toast({
				    heading: 'Success',
				    text: 'Logout success',
				    showHideTransition: 'fade',
				    icon: 'success'
				});
		  		window.location="/"
		  },
		  error: function(){
		  		//if we get 404 response
		  		$.toast({
				    heading: 'Error',
				    text: 'Logout failure',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
		  }
		});
		return false;//stop form submission
	});
});