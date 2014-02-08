var SEC = 1000,
    MIN = 60*1000,
    WAIT_PERIOD = 10;
window.count = 0;
function getSeconds() {
    return Math.floor(window.count/SEC)%60;
}
function getMinutes() {
    return Math.floor(window.count/MIN);
}
function getMillis() {
    return window.count % 1000 / 100;
}
function startTimer(t) {
    window.count = 30*SEC;
    timer();
}
function timer() {
    console.log("call to timer " + window.count);
    updateTimer();
    if (window.count > 0) {
        count += -WAIT_PERIOD;
    } else {
        count = 0;
        return true;
    }
    setTimeout(timer(),WAIT_PERIOD);
}
function updateTimer() {
    $('#timer-min').text(getMinutes());
    $('#timer-sec').text(getSeconds());
    $('#timer-mil').text(getMillis());
}

