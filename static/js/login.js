$(document).ready(function(){

$('form').trigger('reset');
$("#loc_search").geocomplete();

$("#loc_search_form").on("submit",function(){
 
  return false;
});

function fetchMarkers(){

	$.ajax({
		  type: "POST",
		  url: "/posts/markers",
		  success: function(response){
		  		//if we get 200 Response
		  		$.toast({
				    heading: 'Success',
				    text: 'Map generated',
				    showHideTransition: 'fade',
				    icon: 'success'
				});
		  		var js=JSON.parse(response);
		  		var map;
			        map = new google.maps.Map(document.getElementById('maps_iframe'), {
			          center: {lat: 22, lng: 78},
			          zoom: 5
			        });
		  		for (var i = 0; i < js.length; i++) {
		  			
		  			var myLatLng = js[i];
		  			var marker = new google.maps.Marker({
				    position: {"lat":parseFloat(myLatLng["lat"]),"lng":parseFloat(myLatLng["long"])},
				    map: map
				  });
		  		};
		  		console.log(map)
		  		map.initialize();
				 

				  

		  },
		  error: function(){
		  		//if we get 404 response
		  		$.toast({
				    heading: 'Error',
				    text: 'Fetching map data failed',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
		  }
		});
}
fetchMarkers()
$("#username").attr('autocomplete','off').val("");
$("#password").attr('autocomplete','off').val("");
var USER_FILE_IMG="default.jpg";
var ORG_FILE_IMG="default.jpg";
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
				window.location="/feed";

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
$(document).on("focusout","#user-user_name,#org-user_name",function(){
	//check for available username
	var username=$(this).val();
	if(username===""){
		return;
	}
	$.ajax({
		  type: "POST",
		  url: "/user/check",
		  data: {"username":username},
		  success: function(){
		  		//if we get 200 Response
		  		$.toast({
				    heading: 'Success',
				    text: 'Username available <b>'+username+'</b>',
				    showHideTransition: 'fade',
				    icon: 'success'
				});

		  },
		  error: function(){
		  		//if we get 404 response
		  		$.toast({
				    heading: 'Error',
				    text: 'Username not available <b>'+username+'</b>',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
				$(this).val("");
		  }
		});
		return false;//stop form submission

});
$(document).on("focusout","#user-email,#org-email",function(){
	//check for available username
	var email=$(this).val();
	if(email===""){
		return;
	}
	$.ajax({
		  type: "POST",
		  url: "/user/email/check",
		  data: {"email":email},
		  success: function(){
		  		//if we get 200 Response
		  		$.toast({
				    heading: 'Success',
				    text: 'Email available <b>'+email+'</b>',
				    showHideTransition: 'fade',
				    icon: 'success'
				});

		  },
		  error: function(){
		  		//if we get 404 response
		  		$.toast({
				    heading: 'Error',
				    text: 'Email not available <b>'+email+'</b>',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
				$(this).val("");
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
		var username=$("#user-user_name").val();
		if(username===""){
			$.toast({
				    heading: 'Error',
				    text: 'username cannot be left empty',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#user-user_name").val("");
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
		var mob=$("#user-mob").val();
		if(mob===""){
			$.toast({
				    heading: 'Error',
				    text: 'Mobile number cannot be left empty',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#user-mob").val("");
			return;
		}
		$.ajax({
		  type: "POST",
		  url: "/user",
		  data: {"name":name,"username":username,"password":p2,"email":email,"user_type":"user","mob_num":mob,"profile_pic":USER_FILE_IMG},
		  success: function(){
		  		//if we get 200 Response
		  		$.toast({
				    heading: 'Success',
				    text: 'User registeration successfull',
				    showHideTransition: 'fade',
				    icon: 'success'
				});
				$("form").trigger('reset');
				$("#new_user_signup").modal("toggle");
				Dropzone.forElement("#user_img_upload").removeAllFiles();
				
		  },
		  error: function(){
		  		//if we get 404 response
		  		$.toast({
				    heading: 'Error',
				    text: 'User registeration failed',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
		  }
		});
		return false;//stop form submission
	});


$(document).on("click",".org-submit-close",function(){

	$("form").trigger('reset');
	Dropzone.forElement("#org_img_upload").removeAllFiles();
	ORG_FILE_IMG="default.jpg";
});
$(document).on("click",".user-submit-close",function(){

	$("form").trigger('reset');
	Dropzone.forElement("#user_img_upload").removeAllFiles();
	USER_FILE_IMG="default.jpg";
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
		var username=$("#org-user_name").val();
		if(username===""){
			$.toast({
				    heading: 'Error',
				    text: 'username cannot be left empty',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#org-user_name").val("");
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
		var mob=$("#org-mob").val();
		if(mob===""){
			$.toast({
				    heading: 'Error',
				    text: 'Mobile number cannot be left empty',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#org-mob").val("");
			return;
		}
		$.ajax({
		  type: "POST",
		  url: "/user",
		  data: {"name":name,"username":username,"password":p2,"email":email,"user_type":"org","mob_num":mob,"profile_pic":ORG_FILE_IMG},
		  success: function(){
		  		//if we get 200 Response
		  		$.toast({
				    heading: 'Success',
				    text: 'Organization registeration successfull',
				    showHideTransition: 'fade',
				    icon: 'success'
				});
				$('form').trigger('reset');
				$("#new_org_signup").modal("toggle");
				Dropzone.forElement("#org_img_upload").removeAllFiles();
				

		  },
		  error: function(){
		  		//if we get 404 response
		  		$.toast({
				    heading: 'Error',
				    text: 'Organization registeration failed',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
		  }
		});
		
	});

Dropzone.options.userImgUpload= {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 2, // MB
  maxFiles:1,
  uploadMultiple:false,
   init: function () {
        this.on("addedfile", function (file) {
            $("#user-submit").css("display","none")
        });
        this.on("complete", function (file) {
            $("#user-submit").css("display","inline")
        });
    },
  success:function(file,response){
	USER_FILE_IMG=response["file_id"];
  },
  dictDefaultMessage:"Choose a profile pic",
  accept: function(file, done) {
    if(file.name.indexOf(".png")>0 || file.name.indexOf(".jpg")>0 || file.name.indexOf(".jpeg")>0){
    	done();
    }else{
		  		$.toast({
				    heading: 'Error',
				    text: 'Only jpg and png formats supported',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
				Dropzone.forElement("#user_img_upload").removeAllFiles();
    }
}
};
Dropzone.options.orgImgUpload= {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 2, // MB
  maxFiles:1,
  init: function () {
        this.on("addedfile", function (file) {
            $("#org-submit").css("display","none")
        });
        this.on("complete", function (file) {
            $("#org-submit").css("display","inline")
        });
    },
  success:function(file,response){
	ORG_FILE_IMG=response["file_id"];
  },
  uploadMultiple:false,
  dictDefaultMessage:"Choose a profile pic",
  accept: function(file, done) {
    if(file.name.indexOf(".png")>0 || file.name.indexOf(".jpg")>0 || file.name.indexOf(".jpeg")>0){
    	done();
    }else{
		  		$.toast({
				    heading: 'Error',
				    text: 'Only jpg and png formats supported',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
				Dropzone.forElement("#org_img_upload").removeAllFiles();
    }
}
};

Dropzone.forElement("#org_img_upload").on("success",function(){
						$.toast({
						    heading: 'Success',
						    text: 'File upload success',
						    showHideTransition: 'fade',
						    icon: 'success'
						});

});
Dropzone.forElement("#org_img_upload").on("error",function(){
				$.toast({
				    heading: 'Error',
				    text: 'File upload error',
				    showHideTransition: 'fade',
				    icon: 'error'
				});

});
Dropzone.forElement("#user_img_upload").on("success",function(file,responsejson){

						$.toast({
						    heading: 'Success',
						    text: 'File upload success',
						    showHideTransition: 'fade',
						    icon: 'success'
						});

});
Dropzone.forElement("#user_img_upload").on("error",function(){
				$.toast({
				    heading: 'Error',
				    text: 'File upload error',
				    showHideTransition: 'fade',
				    icon: 'error'
				});

});
});