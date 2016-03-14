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
		  		$.toast({
				    heading: 'Success',
				    text: 'Login success',
				    showHideTransition: 'fade',
				    icon: 'success'
				});

		  },
		  error: function(){
		  		//if we get 404 response
		  		$.toast({
				    heading: 'Error',
				    text: 'Wrong login credentials',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
		  }
		});
		return false;//stop form submission
	});

	$(document).on("click","#user-submit",function(){
		//for regular user registeration
		var p1=$("#user-password1").val();
		var p2=$("#user-password2").val();
		if((p1!==p2) || (p1==="" && p2==="")){
			$.toast({
				    heading: 'Error',
				    text: 'passwords do not match',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#user-password1").val("");
			$("#user-password2").val("");
			return;
		}
		var name=$("#user-name").val();
		var email=$("#user-email").val();
		if(name===""){
			$.toast({
				    heading: 'Error',
				    text: 'Name cannot be left empty',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#user-name").val("");
			return;
		}
		if(email===""){
			$.toast({
				    heading: 'Error',
				    text: 'Email cannot be left empty',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#user-email").val("");
			return;
		}
		if(email.indexOf("@")<0){
			$.toast({
				    heading: 'Error',
				    text: 'Email type invalid',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#user-email").val("");
			return;
		}
		return false;//stop form submission
	});

$(document).on("click","#org-submit",function(){
		//for regular org registeration
		var p1=$("#org-password1").val();
		var p2=$("#org-password2").val();
		if((p1!==p2) || (p1==="" && p2==="")){
			$.toast({
				    heading: 'Error',
				    text: 'passwords do not match',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#org-password1").val("");
			$("#org-password2").val("");
			return;
		}
		var name=$("#org-name").val();
		var email=$("#org-email").val();
		if(name===""){
			$.toast({
				    heading: 'Error',
				    text: 'Name cannot be left empty',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#org-name").val("");
			return;
		}
		if(email===""){
			$.toast({
				    heading: 'Error',
				    text: 'Email cannot be left empty',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#org-email").val("");
			return;
		}
		if(email.indexOf("@")<0){
			$.toast({
				    heading: 'Error',
				    text: 'Email type invalid',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#org-email").val("");
			return;
		}
		return false;//stop form submission
	});

});