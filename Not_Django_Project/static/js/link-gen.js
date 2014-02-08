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
};


var link_set = [
    'www.google.com',
    'www.facebook.com',
    'www.youtube.com',
    'www.yahoo.com',
    'www.baidu.com',
    'www.wikipedia.com',
    'www.qq.com',
    'www.live.com',
    'www.taobao.com',
    'www.linkedin.com',
    'www.twitter.com',
    'www.amazon.com',
    'www.blogspot.com',
    'www.wordpress.com',
    'www.bing.com',
    'www.pinterest.com',
    'www.ask.com',
    'www.msn.com',
    'www.tumblr.com',
    'www.instagram.com',
    'www.microsoft.com',
    'www.paypal.com',
    'www.imdb.com',
    'www.apple.com',
    'www.imgur.com',
    'www.stackoverflow.com',
    'www.adobe.com',
    'www.cnn.com',
    'www.wordpress.com'
];


var easter_eggs = [
    'http://www.pornhub.com',

];




/* Main Generation Function */
function getLink(level) {
    var x = randomInt(0,link_set.length);
    if (level > 1) {
        link = http() + link_set[x];
    } else {
        link = link_set[x];
    }
    return destroyLink(link,level);
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
        n_options = 3;
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
                link = link_info.link;
                pos = link_info.pos;
                value = false;
                type = "subtract_add";
                break;
            case 3:
                link_info = shuffleLetters(link,diff);
                if (link_info.invalid) break;
                link = link_info.link;
                pos = link_info.pos;
                value = false;
                type = "shuffle";
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
        var r = Math.floor(difficulty*swaps[link[n]].length);
        link = link.substr(0,n) + swaps[link[n]][r] + link.substr(n+1);
        pos = n;
        invalid = false;
    } catch (e) {
        console.log(link + " " + n + " " + link[n]);
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
function shuffleLetters(link,difficulty) {
    var n = randomInt(0,link.length);
    if (link[n-1] != link[n]) {
        link = link.substr(0,n)+link[n]+link[n-1]+link.substr(n+1);
    } else if (link[n+1] != link[n]) {
        link = link.substr(0,n)+link[n+1]+link[n]+link.substr(n-2);
    } else {
        index = -1;
        invalid = true;
        for (n_i=n,n=n+1; n!=n_i;n=(n+1)%n){
            if (link[n] != link[n+1]) {
                link = link.substr(0,n)+link[n+1]+link[n]+link.substr(n+1);
                pos = n;
                invalid = false;
                break;
            }
        }
    }
    return {
        link:link,
        pos:index,
        invalid:invalid
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
function len(item) {
    try {
        return item.length;
    } catch (e) {
        try {
            count = 0;
            for (var i in item) {
                count++;
            }
            return count;
        } catch (e2) {
            return;
        }
    }
}
function http() {
    if (random() > 0.5) {
        return "https://";
    } else {
        return "http://"
    }
}



/* jQuery wrapper */
$.fn.generate = function(level) {
    var link_info = getLink(level);
    $(this).text(link_info.link); 
    window.game_links[link_info.link] = {
        value:link_info.value,
        type:link_info.type,
        pos:link_info.pos
    };
};


