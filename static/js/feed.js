$(document).ready(function(){
$("#loc_search").geocomplete();
$("#post_location").geocomplete();
$('form').trigger('reset');
 	$(".grid").html("");
$("#loc_search_form").on("submit",searchPosts);//on submit
$("#loc_search_form").on("change",searchPosts);// on autocomplete click


function searchPosts(){
	var query=$("#loc_search").val().trim();
	if(query===""){
		return;
	}
	$('#cover').fadeIn(1000);
$.ajax({
		  type: "POST",
		  url: "/posts/search",
		  data:{"i":0,"len":20,"location":query},
		  success: function(response){	
		  	$.toast({
				    heading: 'Success',
				    text: 'Search success',
				    showHideTransition: 'fade',
				    icon: 'success'
				});
		  	var js=JSON.parse(response);
		  	var main=$();
		  	for (var i = 0; i < js.length; i++) {
		  		var obj=js[i];
		  		var html=$("<div class='col-xs-12 col-sm-6 col-md-4 col-lg-4 grid-items'><div class='card well' style='background-color:#673AB7'><img src='' class='img-responsive post_img' style='text-align:center'><div class='card-content'><br><div style='padding-right:10px'><p style='float:left;position:relative;top:-5px'><img class='img-circle' height='35px'><a href='#' style='color:white' class='author'></a></p><p class='report_time' style='float:right'></p></div><br><br><h4 class='title'></h4><h6 class='location' style='color:white'></h6><p style='padding-right:2px' class='story'></p><a style='cursor:pointer;color:white' href='#'>(Read More)</a></div></div></div>")
		  		html.find(".img-circle").attr("src","/user/pic/"+obj["author"]);
		  		html.find(".post_img").attr("src","/user/profile_pic/"+obj["picture"]);
		  		html.find(".story").text(obj["content"]);
		  		html.find(".title").text(obj["title"]);
		  		html.find(".author").text(obj["author"]);
		  		html.find(".location").text(obj["location"]);
		  		html.find(".report_time").text(timeConverter(obj["report_time"]));
		  		
		  		main=main.add(html);
		  	};
 				$(".grid").html(main);
 				$('#cover').fadeOut(1000);
		  	
		  },
		  error: function(){
		  		//if we get 404 response
		  		$.toast({
				    heading: 'Error',
				    text: 'Search failure',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
				$('#cover').fadeOut(1000);
		  }
		});

return false;
}


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

var POST_FILE_IMG="default.jpg";
$.ajax({
		  type: "POST",
		  url: "/user/details",
		  success: function(response){
		  	var js=response;
		  	$("#user_name").text(js["name"]);
		  	$("#profile_section_user_name").text(js["name"]);
		  	$("#user_name1").text(js["name"]);
		  	$("#user_email").text(js["email"]);
		  	$("#profile_section_email").text(js["email"]);
		  	$("#user_profile_icon").attr("src","/user/profile_pic/"+js["profile_pic"]);
		  	$("#user_profile_icon_small").attr("src","/user/profile_pic/"+js["profile_pic"]);
		  	$("#profile_section_pic").attr("src","/user/profile_pic/"+js["profile_pic"]);
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
function fetch_feed(){

	$.ajax({
		  type: "POST",
		  url: "/user/get_feed",
		  data:{"i":0,"len":20},
		  success: function(response){
		  	var js=JSON.parse(response);
		  	var main=$();
		  	$.toast({
				    heading: 'Success',
				    text: 'Feeds fetched',
				    showHideTransition: 'fade',
				    icon: 'success'
				});
		  	for (var i = 0; i < js.length; i++) {
		  		var obj=js[i];
		  		var html=$("<div class='col-xs-12 col-sm-6 col-md-4 col-lg-4 grid-items'><div class='card well' style='background-color:#673AB7'><img src='' class='img-responsive post_img' style='text-align:center'><div class='card-content'><br><div style='padding-right:10px'><p style='float:left;position:relative;top:-5px'><img class='img-circle' height='35px'><a href='#' style='color:white' class='author'></a></p><p class='report_time' style='float:right'></p></div><br><br><h4 class='title'></h4><h6 class='location' style='color:white'></h6><p style='padding-right:2px' class='story'></p><a style='cursor:pointer;color:white' href='#'>(Read More)</a></div></div></div>")
		  		html.find(".img-circle").attr("src","/user/pic/"+obj["author"]);
		  		html.find(".post_img").attr("src","/user/profile_pic/"+obj["picture"]);
		  		html.find(".story").text(obj["content"]);
		  		html.find(".title").text(obj["title"]);
		  		html.find(".author").text(obj["author"]);
		  		html.find(".location").text(obj["location"]);
		  		html.find(".report_time").text(timeConverter(obj["report_time"]));
		  		
		  		main=main.add(html);
		  	};
 				$(".grid").html(main);
		  		 $('#cover').fadeOut(1000);

		  	
		  },
		  error: function(){
		  		//if we get 404 response
		  		$.toast({
				    heading: 'Error',
				    text: 'Feeds fetch failure',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
		  }
		});
}
fetch_feed();//init




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

$("#user_show_profile").on("click",function(){
	$("#profile_section").attr("style","").attr("style","display:block;");
	return false;
});

Dropzone.options.postImgUpload= {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 15, // MB
  maxFiles:1,
  uploadMultiple:false,
  success:function(file,response){
	POST_FILE_IMG=response["file_id"];
  },
  dictDefaultMessage:"Attach an image proof",
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
				Dropzone.forElement("#post_img_upload").removeAllFiles();
    }
}
};

$("#post_submit").on("click",function(){
		//for post 
		var post_title=$("#post_title").val();
		var post_content=$("#post_content").val();
		var post_location=$("#post_location").val();
		if(post_title===""){
			$.toast({
				    heading: 'Error',
				    text: 'Post title cannot be left empty',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#post_title").val("");
			return;
		}
		if(post_content===""){
			$.toast({
				    heading: 'Error',
				    text: 'Post description cannot be left empty',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#post_content").val("");
			return;
		}
		if(post_location===""){
			$.toast({
				    heading: 'Error',
				    text: 'Post location cannot be left empty',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
			$("#post_location").val("");
			return;
		}
		
		var anonyoumous=false;
		if ($('#post_anonyoumous').is(":checked"))
		{
		  anonyoumous=true;
		}
		
		$.ajax({
		  type: "POST",
		  url: "/user/post",
		  data: {"title":post_title,"content":post_content,"picture":POST_FILE_IMG,"anonyoumous":anonyoumous,"location":post_location},
		  success: function(){
		  		//if we get 200 Response
		  		$.toast({
				    heading: 'Success',
				    text: 'Post successfull',
				    showHideTransition: 'fade',
				    icon: 'success'
				});
				$("form").trigger('reset');
				Dropzone.forElement("#post_img_upload").removeAllFiles();
				fetch_feed();

		  },
		  error: function(e){
		  		//if we get 404 response
		  		$.toast({
				    heading: 'Error',
				    text: 'Post failed',
				    showHideTransition: 'fade',
				    icon: 'error'
				});
		  }
		});
		return false;//stop form submission
	});



});