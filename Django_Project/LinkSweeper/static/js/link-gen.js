/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
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

/* Global Variables */
var probability = 0.5;
var swaps = {
    ":":[";"],
    "/":["\\"],
    ".":[","],
    "A":["&","/-\\","4"],
    "a":["@","c","q","g","e"],
    "B":["5","D","9","8","P","l3"],
    "b":["g","h","q","d"],
    "C":["6","Q","("],
    "c":["<","a","q","o","e"],
    "D":["0","{)","B","lD"],
    "d":["p","b","cl"],
    "E":["8","3","Z","F","B"],
    "e":["g","q","c","a"],
    "F":["B","E"],
    "f":["r","t","l"],
    "G":["O","5","@","6"],
    "g":["9","b","y","e","p","q"],
    "G":["6","C","Q"],
    "h":["n","lu","ln"],
    "H":[ "#","l4","N"],
    "i":["!","1","l","j"],
    "I":["!","1","l"],
    "j":["i","y","g"],
    "J":["I","L"],
    "k":["h","b","l<"],
    "K":["l<","R"],
    "l":["I","1","t"],
    "L":["I"],
    "m":["nn","w","uu"],
    "M":["NN","W"],
    "o":["0","c"],
    "O":["0","C"],
    "p":["q","g"],
    "P":["T","R"],
    "q":["g","y","p"],
    "Q":["D","G","O"],
    "r":["t","n"],
    "R":["P","B"],
    "s":["z","e","c"],
    "S":["$","6","Z","2"],
    "t":["i","I","l","f"],
    "T":["F","P"],
    "u":["w","v","y"],
    "U":["Y","V"],
    "v":["w","u","y"],
    "V":["Y","U"],
    "w":["m","vv","uu"],
    "W":["VV","UU"],
    "x":["><","y"],
    "X":["><","%"],
    "y":["q","g"],
    "Y":["A","X","T"],
    "z":["s"],
    "Z":["S"],
}


/* Main Generation Function */
function getLink(level) { 
    return destroyLink("http://www.google.com",level);
}

/* Main Link Destruction Function */
function destroyLink(link,level) {
    var link, value, pos = -1;
    if (random() < window.probability) {
        return {
            link:link,
            value:true,
            pos:pos,
            type:"valid"
        };
    } else {
        var diff = levelToDifficulty(level),
        n_options = 2;
        var type = randomInt(1,n_options);
        console.log(type);
        switch (type) {
            case 1:
                link_info = letterSwap(link,diff);
                if (link_info.invalid) break;
                link = link_info.link;
                pos = link_info.pos;
                value = false;
                type = "letter_swap";
                break;
            case 2:
                link_info = subtractAddLetter(link,diff);
                if (link_info.invalid) break;
                link = link_info;
                pos = link_info.pos;
                value = false;
                type = "subtract_add";
                break;
            default:
                link = link;
                value = true;
                type = "valid";
        }
        return {
            link:link,
            value:value,
            pos:pos,
            type:type
        };
    }
}

/* Individual Link Destruction Algorithms */
function letterSwap(link,difficulty) {
    var n = randomInt(0,link.length);
    try {
        var r = randomInt(0,swaps[link[n]].length);
        link = link.substr(0,n) + swaps[link[n]][r] + link.substr(n+1);
        pos = n;
        invalid = false;
    } catch (e) {
        console.log(link[n]);
        console.log("invalid");
        n = -1;
        invalid = true;
    }
    return {
        link:link,
        pos:n,
        invalid:invalid
    }
}
function subtractAddLetter(link,difficulty) {
    var n = randomInt(0,link.length);
    if (random() > 0.7) {
        link = link.substr(0,n) + link.substr(n+1);
    } else {
        link = link.substr(0,n) + link[n] + link.substr(n)
    }
    return {
        link:link,
        pos:n,
        invalid:false
    }
}



/* Helper Methods */
function tanh(x) {
    // e^x - e^-x / e^x + e^-x
    return (Math.exp(2*x) - 1)/(Math.exp(2*x) + 1);
}

function levelToDifficulty(level) {
    var maxLevel = 10;
    /*
    var x = level;
    return tanh(x-1); 
    */
    return level/maxLevel;
}
function random() {
    return Math.random();
}
function randomInt(min,max) {
    return Math.floor(min + max*random()); 
}
$(window).ready(function () {
    window.game_links = new Object();
});
/* jQuery wrapper */
$.fn.generate = function() {
    var link_info = getLink(window.level);
    $(this).text(link_info.link); 
    window.game_links[link_info.link] = {
        value:link_info.value,
        type:link_info.type,
        pos:link_info.pos
    };
};


