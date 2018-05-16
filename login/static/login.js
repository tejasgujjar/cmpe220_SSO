//var URL = "localhost:8000"
var URL  = "http://localhost:3000";
$('document').ready(function(){
 $( document ).ajaxStart(function() {
    console.log("starting ajax");
    $('#indicator-icon').show();
  });
  $( document ).ajaxStop(function() {
    console.log("stopping ajax");
    $('#indicator-icon').hide();
  });

  $('#progress_bar').css({"width":100+"%"});
   setTimeout(function(){
     $('.progress').hide(50);
   },1000);

    $('#submit_button').unbind();
    $('#submit_button').bind('click', function(){
        var username = $('#username').val();
        var password = $('#password').val();
        //alert("username: "+username+"\npassword: "+password);
        validate_user(username, password);
    });

});

function validate_user(username, password){
var post_obj = {
    "username":username,
    "password":password
}
            $.ajax({
                //url: URL + '/filter_search/',
                url: URL + '/loginUser/',
                type: 'post', // This is the default though, you don't actually need to always mention it
                //headers:{"X-CSRFToken":getCookie('csrftoken')},
                data:post_obj,
                success: function(data,xhr) {
                  console.log("Success data: "+data);
                       $('#success_alert').show();
                        $('#failure_alert').hide();
                   // alert("sucess");
                },
                error: function(data, xhr) {
                    console.log('Got an error'+data);
                    $('#failure_alert').show();
                    $('#success_alert').hide();

                  //  alert("failed");
                }
              });
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}