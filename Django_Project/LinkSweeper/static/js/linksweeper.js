var game_score = 0;
var game_cont = true;
var game_links_left = 0;
var game_lvl = 0;
var tmplinks = ['aple', 'asas', 'asasa', 'dsfs', 'sfewf', 'fewfw', 'fwfwfw', 'rwefwf', 'wef23rfe', 'fwfwfw', 'rwefwf', 'wef23rfe'];


// RANDOM POPUP TEXT
var r_text = new Array ();
r_text[0] = "<p>Mario just ate it</p><p>Mario just ate it</p><p>Mario just ate it</p><p>Mario just ate it</p>";
r_text[1] = "<p>Carell how is the millisecond thing going</p><p>Carell how is the millisecond thing going</p>";
r_text[2] = "I've been for a walk";
r_text[3] = "On a winter's day";
r_text[4] = "I'd be safe and warm";
r_text[5] = "If I was in L.A.";
r_text[6] = "California dreaming, On such a winter's day";

function generate_game_board(parent_div, level_type){
    if(level_type=='grid'){
        window.game_links = new Object();
        var game_board_html =  " "+
            "<table style='width:100%;'>"+
                    "<tr>" +
                      "<td>" +
                            "<div class='link-container center'>" +
                                "<div class='link' style=''>" +
                                    "<p class='link-styler' style='background-color: white;'></p>" +
                                "</div>" +
                            "</div>" +
                      "</td>" +
                      "<td>" +
                            "<div class='link-container center'>" +
                                "<div class='link' style=''>" +
                                    "<p class='link-styler' style='background-color: white;'></p>" +
                                "</div>" +
                            "</div>" +
                      "</td>" +
                      "<td>" +
                            "<div class='link-container center'>" +
                                "<div class='link' style=''>" +
                                    "<p class='link-styler' style='background-color: white;'></p>" +
                                "</div>" +
                            "</div>" +
                      "</td>" +
                    "</tr>" +

                    "<tr>" +
                      "<td>" +
                            "<div class='link-container center'>" +
                                "<div class='link' style=''>" +
                                    "<p class='link-styler' style='background-color: white;'></p>" +
                                "</div>" +
                            "</div>" +
                      "</td>" +
                      "<td>" +
                            "<div class='link-container center'>" +
                                "<div class='link' style=''>" +
                                    "<p class='link-styler' style='background-color: white;'></p>" +
                                "</div>" +
                            "</div>" +
                      "</td>" +
                      "<td>" +
                            "<div class='link-container center'>" +
                                "<div class='link' style=''>" +
                                    "<p class='link-styler' style='background-color: white;'></p>" +
                                "</div>" +
                            "</div>" +
                      "</td>" +
                    "</tr>" +

                    "<tr>" +
                      "<td>" +
                            "<div class='link-container center'>" +
                                "<div class='link' style=''>" +
                                    "<p class='link-styler' style='background-color: white;'></p>" +
                                "</div>" +
                            "</div>" +
                      "</td>" +
                      "<td>" +
                            "<div class='link-container center'>" +
                                "<div class='link' style=''>" +
                                    "<p class='link-styler' style='background-color: white;'></p>" +
                                "</div>" +
                            "</div>" +
                      "</td>" +
                      "<td>" +
                            "<div class='link-container center'>" +
                                "<div class='link' style=''>" +
                                    "<p class='link-styler' style='background-color: white;'></p>" +
                                "</div>" +
                            "</div>" +
                      "</td>" +
                    "</tr>" +
                "</table>";

        $(parent_div).html( game_board_html );
        $('.link-styler').each(function() {
            $(this).generate();
            game_links_left++;
        });
        update_score();
    }
}

function clean_board(parent_div){
    $(parent_div).empty();
}

function validate_game(){
    if(game_links_left == 0){
        if(game_lvl >= 1){
            console.log('DONE');
            clean_board('.game-board');
            $('.game-board').html('<p>DONE</p>');
            update_score_push();
            return;
        }
        game_lvl += 1;
        clean_board('.game-board');
        generate_game_board('.game-board', 'grid');
        play_game();
    }
}

function play_game(){
        var flag = true;
        var initX = 0;
        var initY = 0;

        $( ".link" ).draggable({ 
            axis: "x",
            cursor: "move", 
            containment: "parent",
            revert: true,

            drag: function(e) {
                var red_max = 255, green_max = 128;
                var parentOffset = $(this).parent().offset(); 
                var width = $(this).parent().width();
                var relX = e.pageX - (parentOffset.left+width/2);
                var relY = e.pageY - parentOffset.top;
                
                            
                if(flag){
                    initX = relX;
                    initY = relY;
                    flag = false;
                }
                var val;
                console.log(relX + " " + initX);
                if( relX < initX ){
                    if (Math.abs(relX) > (width-$(this).width())/2 ) {
                        val = 0;
                    } else {
                        val = 255*(1-Math.abs(relX)/((width-$(this).width())/2));
                    }
                    val = Math.floor(val);
                    $(this).parent().css("background-color","rgb("+red_max+","+val+","+val+")");
                }
                else if( relX > initX){
                    if (Math.abs(relX) > (width-$(this).width())/2 ) {
                        val = 0;
                    } else {
                        val = 255*(1-Math.abs(relX)/((width-$(this).width())/2));
                    }
                    val = Math.floor(val);
                    if (val > green_max) {
                        green_val = val
                    } else {
                        green_val = green_max;
                    }
                    console.log("rgb(0,"+val+",0)");
                    $(this).parent().css("background-color","rgb("+val+","+green_val+","+val+")");   
                }
            },

            stop: function(e){
                game_links_left -- ;
                var parentOffset = $(this).parent().offset();
                var w = $(this).parent().width();
                var relX = e.pageX - (parentOffset.left+w/2);
                var relY = e.pageY - parentOffset.top;
                
                
                
                if(flag){
                    initX = relX;
                    initY = relY;
                    flag = false;
                }

                if( relX < initX){
                    $(this).parent().css('background-color' , 'rgb(255,0,0)');
                }
                else if( relX > initX){
                    $(this).parent().css('background-color' , 'rgb(0,128,0)');
                }

                // get the link in the box
                // check if correct
                verify($(this).text(),$(this).parent().css("background-color"));
                // update score mark as correct or not
                console.log('Links left' + game_links_left);
                validate_game();
            }
        });
}

function verify(link,choice) {
    console.log(link + " Choice: " + choice + " " + window.game_links[link].value);
    var translate_choice_to_human_lang;
    if(choice == "rgb(0, 128, 0)"){
        translate_choice_to_human_lang = true; // GREEN
    }else if(choice == "rgb(255, 0, 0)"){
        translate_choice_to_human_lang = false; // RED
    }
  
    if(translate_choice_to_human_lang == window.game_links[link].value){
        console.log('CORRECT');
        game_score += 1;
    }else{
        console.log('INCORRECT');
        game_score -= 1;
    }

    console.log('VALUE: ' + window.game_links[link].value + ' CHOICE: ' + translate_choice_to_human_lang);


    // if (window.game_links[link].value && "rgb(0, 128, 0)" === choice) {
    //     game_score -= 1;
    // } 
    // else if (window.game_links[link].value && "rgb(255, 0, 0)" === choice) {
    //     game_score -= 1;
    // } else {
    //     game_score += 1;
    // }

    console.log(window.game_links[link].value);

    update_score();
}
function update_score() {
    $("#score").text(game_score);
}

function update_score_push() {
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
}

$(document).ready(function() {
/*
$('.link').generate() // will create a link and set the content

or just a call to destroyLink(link,difficulty);


{
    link:"www.example.com",
    value:true
}

*/


    // GAME SHANINIGANS

    generate_game_board('.game-board', 'grid');
    console.log('Total Num of Links: '+ game_links_left);

    play_game();


    // POPUP SHANIGANS
    $('#trigger-hell2').click(function(){
        var counter = 5;
        while(counter > 0){
            counter--;
            var top_val = Math.random()*500;
            var left_val = Math.random()*500;

            var i = Math.floor(7*Math.random())

            new Messi(r_text[i], {

                title: 'BONUS ROUND', 
                center: false, 
                    viewport: {
                        top: top_val+'px', 
                        left: left_val+'px'
                    },
                buttons: [
                        {id: 0, class: 'popup-bt', label: 'Yes', val: 'Y'}, 
                        {id: 1, class: 'popup-bt', label: 'No', val: 'N'}
                ],

            });

        }

    });

    // AJAX POST
    $('#post-score').click();

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
