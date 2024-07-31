var alarmRingTimeout;
var updateBadgeTextInterval;

var userChosenDuration;

var setDate;
var pauseDate;
var alarmDate;

var greenColor = [76, 187, 23, 255];
var yellowColor = [250, 150, 0, 255];
var guiLagAdjustment = 500;

var tones = { "chime" : "audio/chime.mp3",
              "tone": "audio/tone.mp3",
              "blop": "audio/blop.mp3",
              "watch": "audio/watch.mp3",
              "spoon" : "audio/spoon.mp3",
              "ice" : "audio/ice.mp3", 
              "turkey" : "audio/turkey.mp3" }
var alarmSound = new Audio(tones["chime"]);

function setAlarm(tMillis)
{
    userChosenDuration = tMillis;
    ringIn(tMillis + guiLagAdjustment);
}

function ringIn(tMillis)
{
    clearTimeout(alarmRingTimeout);
    clearInterval(updateBadgeTextInterval);
    pauseDate = null;

    var tSecs = parseInt(tMillis / 1000);
    var tMins = parseInt(tSecs / 60);
    var secs = tSecs % 60;
    var tHrs = parseInt(tMins / 60);
    var mins = tMins % 60;
    var millis = tMillis % 1000;

    alarmDate = new Date();
    // alarmDate.setTime(alarmDate.getTime() + millis);
    alarmDate.setHours(alarmDate.getHours() + tHrs);
    alarmDate.setMinutes(alarmDate.getMinutes() + mins);
    alarmDate.setSeconds(alarmDate.getSeconds() + secs);
    alarmDate.setMilliseconds(alarmDate.getMilliseconds() + millis);

    setDate = new Date();
    alarmRingTimeout = setTimeout(ring, alarmDate.getTime() - setDate.getTime());

    chrome.browserAction.setBadgeBackgroundColor({color:greenColor});
    updateBadgeTextInterval = setInterval(function() {
        chrome.browserAction.setBadgeText({text: getTimeLeftBadgeString()});
    }, guiLagAdjustment);
}

function pause()
{
    pauseDate = new Date();
    clearTimeout(alarmRingTimeout);
    chrome.browserAction.setBadgeBackgroundColor({color:yellowColor});
}

function resume()
{
    var remainingAfterPause = (alarmDate.getTime() - pauseDate.getTime());
    ringIn(remainingAfterPause);
}

function restart()
{
    ringIn(userChosenDuration + guiLagAdjustment);
}

function getTimeLeft()
{
    if (pauseDate)
        return (alarmDate.getTime() - pauseDate.getTime());

    var now = new Date();
    return (alarmDate.getTime() - now.getTime());
}

function getTimeLeftPercent()
{
    return parseInt(getTimeLeft() / userChosenDuration * 100);
}

function getTimeLeftString()
{
    var until = getTimeLeft();
    var tSecs = parseInt(until / 1000);
    var tMins = parseInt(tSecs / 60);
    var secs = tSecs % 60;
    var tHrs = parseInt(tMins / 60);
    var mins = tMins % 60;
    if(secs < 10) secs = "0" + secs;
    if(mins < 10) mins = "0" + mins;
    if(tHrs < 10) tHrs = "0" + tHrs;
    return ((tHrs > 0 ? tHrs + ":" : "") + mins + ":" + secs);
}

function getTimeLeftBadgeString()
{
    var until = getTimeLeft();
    var tSecs = parseInt(until / 1000);
    var tMins = parseInt(tSecs / 60);
    var secs = tSecs % 60;
    var tHrs = parseInt(tMins / 60);
    var mins = tMins % 60;

    if (tHrs > 0) {
        return tHrs + 'hr';
    } else if (tMins > 0) {
        return tMins + 'm';
    } else {
        return tSecs + 's';
    }
}

function ring()
{
    var notificationOptions = {
        type: "basic",
        title: "Timer",
        message: "Time\'s up!",
        iconUrl: "img/48.png",
        priority: 2,
        requireInteraction: true//, buttons: [{title: 'Repeat'}, {title: 'Snooze for 1m'}]
    }
    chrome.notifications.create(notificationOptions);

    // alarmSound.loop = true;
    // alarmSound.pause();
    // alarmSound.currentTime = 0.0;
    // alarmSound.volume = 1.0; // 0.0 to 1.0
    alarmSound.play();
    turnOff();
}

function turnOff()
{
    clearTimeout(alarmRingTimeout);
    clearInterval(updateBadgeTextInterval);
    userChosenDuration = 0;
    alarmDate = null;
    pauseDate = null;
    setDate = null;
    chrome.browserAction.setBadgeText({text: ""});
}

function error()
{
    alert("Please enter a number between 1 and 240.");
}

function playSound(soundname)
{
    var sound = new Audio(tones[soundname]);
    sound.play();
    setTimeout(function() { sound.pause(); }, 1700)
}

function setAlarmTone(tonename)
{
    stopAlarmSound();
    alarmSound = new Audio(tones[tonename]);
}

function stopAlarmSound()
{
    alarmSound.pause();
    alarmSound.currentTime = 0.0;
}

// Chrome bug: only first event on a notification is heard
chrome.notifications.onClosed.addListener(function(notificationId, byUser) {
    stopAlarmSound();
});

chrome.notifications.onClicked.addListener(function(notificationId) {
    stopAlarmSound();
});

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
    switch (buttonIndex) {
        case 0: 
            stopAlarmSound();
            break;
        default:
            stopAlarmSound();
    }
});
