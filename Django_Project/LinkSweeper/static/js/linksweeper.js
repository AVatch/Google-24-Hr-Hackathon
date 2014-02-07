$(document).ready(function() {

    // AJAX GET
    $('.get-more').click(function(){

        $.ajax({
            type: "GET",
            url: "/ajax/refresh/score",
            success: function(data) {
            for(i = 0; i < data.length; i++){
                $('ul').append('<li>'+data[i]+'</li>');
            }
        }
        });

    });

    // AJAX POST
    $('.theme-sel').click(function(){
        var theme_choice = $(this).attr('id').substring(10);

        console.log(theme_choice);

        $.ajax({
            type: "POST",
            url: "/ajax/update/score",
            dataType: "json",
            data: { "theme": theme_choice },
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
