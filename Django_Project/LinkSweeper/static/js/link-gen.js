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
var probability = 0.1;
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
function getLink(difficulty) { 
    return "http://www.google.com";
}

/* Main Link Destruction Function */
function destroyLink(link,level) {
    var link, value;
    if (random() < window.probability) {
        return {
            link:link,
            value:true,
            type:"valid"
        };
    } else {
        var diff = levelToDifficulty(level),
        n_options = 2;
        var type = randomInt(1,n_options);
        console.log(type);
        switch (type) {
            case 1:
                link = letterSwap(link,diff);
                value = false;
                type = "letter_swap";
                break;
            case 2:
                link = subtractAddLetter(link,diff);
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
        return link;
    } catch (e) {
        console.log(link[n]);
        console.log("invalid");
    }
    return link;
}
function subtractAddLetter(link,difficulty) {
    var n = randomInt(0,link.length);
    if (random() > 0.7) {
        return link.substr(0,n) + link.substr(n+1);
    } else {
        return link.substr(0,n) + link[n] + link.substr(n)
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

/* jQuery wrapper */
$.fn.generate = function() {
    var link = getLink(0);
    var link_info = destroyLink(link,levelToDifficulty(0));
    $(this).text(link_info.link + " " + link_info.value ); 
}


