/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
 * link-gen.js
 * Javascript to generate damaged and dubious links
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  generateLink(level)
 *      Arguments:
 *          level - level the user is on 
 *      Description:
 *        - Wrapper to create a dubious link within the selected
 *          elements
 *      Usage:
 *          $(selector).generate()
 *
 *  $.fn.generate - jQuery wrapper
 *      Arguments:
 *          None
 *      Description:
 *        - Wrapper to create a dubious link within the selected
 *          elements
 *      Usage:
 *          $(selector).generate()
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */



/* Main Generation Function */
function generateLink(level,probability_threshold) {
}

/* Individual Link Destruction Algorithms */
function letterSwap(difficulty) {
}


/* Helper Methods */
function levelToDifficulty(level) {
    return 1.0 - 1.0/level; 
}  


/* jQuery wrapper */
$.fn.generate = function() {
    var difficulty = window.difficulty;
    var link = generateLink(difficulty);
    $(this).text(link); 
}

