$(document).ready(function(){
$("#username").attr('autocomplete','off').val("");
$("#password").attr('autocomplete','off').val("");
	$(document).on("click","#login-btn",function(){
		var username=$("#username").val();
		var password=$("#password").val();
		$.ajax({
		  type: "POST",
		  url: "/user/login",
		  data: {"username":username,"password":password},
		  success: function(){
		  		//if we get 200 Response
		  		alert("Logged in")

		  },
		  error: function(){
		  		//if we get 404 response
		  		alert("Login failed")
		  }
		});
		return false;//stop form submission
	})


});