var SEC = 1000,
    MIN = 60*1000,
    WAIT_PERIOD = 10;
window.count = 0;
function getSeconds() {
    return Math.floor(count/SEC)%60;
}
function getMinutes() {
    return Math.floor(count/MIN);
}
function getMillis() {
    return count % 1000 / 100;
}
function startTimer(t) {
    updateTimer();
    if (window.count > 0) {
        count+= WAIT_PERIOD;
    } else {
        count = 0;
    }
    setTimeout(startTimer(),WAIT_PERIOD);
}
function updateTimer() {
    $('#timer-min').text(getMinutes());
    $('#timer-sec').text(getSeconds());
    $('#timer-mil').text(getMillis());
}

