$(document).ready(function(){
$("#loc_search").geocomplete();
$("#loc_search_form").on("submit",function(){
 
  return false;
});
$.ajax({
		  type: "POST",
		  url: "/user/details",
		  success: function(response){
		  	var js=response;
		  	$("#user_name").text(js["name"]);
		  	$("#user_name1").text(js["name"]);
		  	$("#user_email").text(js["email"]);
		  	$("#user_profile_icon").attr("src","/user/profile_pic/"+js["profile_pic"]);
		  		//if we get 200 Response
		  		$.toast({
				    heading: 'Success',
				    text: 'Profile Fetched',
				    showHideTransition: 'fade',
				    icon: 'success'
				});
		  },
		  error: function(){
		  		//if we get 404 response
		  		$.toast({
				    heading: 'Error',
				    text: 'Profile fetch failure',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
		  }
		});
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