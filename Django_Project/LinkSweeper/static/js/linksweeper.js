$(document).ready(function() {
    var game_score = 0;

    // Links
    $(function() {

        var flag = true;
        var initX = 0;
        var initY = 0;

        $( ".link" ).draggable({ 
            axis: "x",
            cursor: "move", 
            containment: "parent",
            revert: true,


            drag: function(e) {

                var parentOffset = $(this).parent().offset(); 
                var relX = e.pageX - parentOffset.left;
                var relY = e.pageY - parentOffset.top;

                if(flag){
                    initX = relX;
                    initY = relY;
                    flag = false;
                }

                console.log('(x,y): (' + relX + ',' + relY + ')');
                console.log('Init (x,y): (' + initX + ',' + initY + ')');


                // RGB
                bg_color = [255, 255, 255];

                // bg_color[0] -= relX;
                // console.log('rgb('+bg_color[0]+','+bg_color[1]+','+bg_color[2]+')');
                if( relX < initX){
                    $(this).parent().css('background-color' , 'red');
                }
                if( relX > initX){
                    $(this).parent().css('background-color' , 'green');
                }

            },
        });
    });

    // AJAX POST
    $('#post-score').click(function(){
        game_score += 109;
        console.log(game_score)
        $.ajax({
            type: "POST",
            url: "ajax/update/score/",
            dataType: "json",
            data: { "game_score": game_score },
            success: function(ajax_response) {
                console.log(ajax_response);
                if (ajax_response == 'PASS'){
                    location.reload(true);
                }
            }
        });
    });

    // CSRF code
    function getCookie(name) {
        var cookieValue = null;
        var i = 0;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (i; i < cookies.length; i++) {
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
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        crossDomain: false, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    }); 


});
