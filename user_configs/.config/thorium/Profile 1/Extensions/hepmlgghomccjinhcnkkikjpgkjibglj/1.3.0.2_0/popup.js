var refreshDisplayTimeout;
var bgpage = chrome.extension.getBackgroundPage();
var previousValues = [3, 5, 10, 30];
var editing = false;

var CHOSEN_TONE_STORAGE_KEY = 'chosen_tone';
var TONES_PURCHASED_STORAGE_KEY = 'tones_purchased';
var TONES_SKU = 'timer_alert_sound_pack';

var tonesWerePurchased = false;

bgpage.stopAlarmSound();
checkIfTonesPurchased();

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(CHOSEN_TONE_STORAGE_KEY, function(item) {
        if (item[CHOSEN_TONE_STORAGE_KEY]) {
            var chosenTone = item[CHOSEN_TONE_STORAGE_KEY];

            toneRadios = document.querySelectorAll('.tone');
            toneRadios.forEach(function(item) {
                if (item.value == chosenTone) {
                    item.checked = true;
                }
            });
        }
        console.log(item[CHOSEN_TONE_STORAGE_KEY]);
    });

    toneRadios = document.querySelectorAll('.tone');
    toneRadios.forEach(function(item) {
        item.addEventListener('change', function() {
            bgpage.playSound(item.id);
            chrome.storage.local.set({[CHOSEN_TONE_STORAGE_KEY]: item.id}, function() {
                console.log(item.id + ' saved');
            });
        });
    });

    document.querySelector('#start').addEventListener('click', setTimer);
    document.querySelector('#cancel').addEventListener('click', reset);
    document.querySelector('#wrench').addEventListener('click', swap);
    document.querySelector('#pause').addEventListener('click', pauseTimer);
    document.querySelector('#resume').addEventListener('click', resumeTimer);
    document.querySelector('#restart').addEventListener('click', restartTimer);
    document.querySelector('#buy').addEventListener('click', buyTones);
    document.body.addEventListener('click', bgpage.stopAlarmSound);

    load();
});

function show(section)
{
    document.getElementById(section).style.display = "block";
}

function showInline(section)
{
    document.getElementById(section).style.display = "inline";
}

function hide(section)
{
    document.getElementById(section).style.display = "none";
}

function load()
{
    hide("settings");
    hide("modify");
    hide("resume");
    hide("buy");
    hide('tone-settings');
    editing = false;

    // if timer is paused, show resume button and hide pause button
    if(bgpage.pauseDate)
    {
        showInline("resume");
        hide("pause");
    }

    // loads custom times if they exist
    for(var i = 0; i < document.choices.radio.length; i++)
        if(localStorage[i] != null)
            document.getElementById("s"+i).textContent = localStorage[i];

    // if timer is off, show settings
    if(!bgpage.alarmDate)
    {
        show("settings");
        hide("display");
    }

    // else the timer is on, so show countdown
    else
    {
        document.body.style.minWidth = '420px'
        show("display");
        refreshDisplay();
        show("modify");
    }
}

function getChoice()
{
    // find selected RADIO, RETURN selected value
    var num;
    for(var i = 0; i < document.choices.radio.length; i++)
    {
        if(document.choices.radio[i].checked == true)
        {
            num = parseInt(document.getElementById("s"+i).textContent);
            return num; // HACK this just returns the first selected radio
        }
    }
    return num;
}

function getToneChoice()
{
    return document.querySelector('input[name="tone"]:checked').value;
}

function swap()
{
    editing = true;

    // swap text with fields
    for(var i = 0; i < document.choices.radio.length; i++)
    {
        var span = document.getElementById("s"+i);
        var num = parseInt(span.textContent);

        previousValues[i] = num;

        var html = "<input class='input-mini' type='text' name='custom' id='c"+i;
        html += "' value='"+num;
        html += "'>";
        // used to select on click and auto save on change

        span.innerHTML = html;
    }

    // swap edit button with done button
    var butt = document.getElementById("swapper");
    butt.innerHTML = "<a href='#' id='done' class='btn'><i class='icon-ok'></i> Done</a>";
    document.querySelector('#done').addEventListener('click', swapBack);

    if (!tonesWerePurchased) {
        show("buy");
    } else {
        show('tone-settings');
    }
}

function swapBack()
{
    // swap fields with text
    for(var i = 0; i < document.choices.radio.length; i++)
    {
        var span = document.getElementById("s"+i);
        var num = parseInt(document.getElementById("c"+i).value);

        if(isValid(num))
        {
            localStorage[i] = num;
            span.textContent = num;
        }
        else
            span.textContent = previousValues[i];
    }

    // swap done button with edit button
    var butt = document.getElementById("swapper");
    butt.innerHTML = "<a href='#' id='wrench' class='btn'><i class='icon-wrench'></i> Edit</a>";
    document.querySelector('#wrench').addEventListener('click', swap);

    editing = false;

    hide("buy");
    hide('tone-settings');
}

function setTimer()
{
    // make sure we're dealing with text not fields
    if(editing)
        swapBack();

    // SET background timer for selected number
    // HIDE settings, DISPLAY countdown

    var num = getChoice();
    var tone = getToneChoice();

    // set timer, hide settings, display reset button
    if(isValid(num))
    {
        bgpage.setAlarm(num * 60000);
        bgpage.setAlarmTone(tone);
        hide("settings");
        document.body.style.minWidth = '420px'
        show("modify");
        show("display");
        refreshDisplay();
    }
    else
        bgpage.error();
}

// Returns true if 0 <= amt <= 240
function isValid(amt)
{
    if(isNaN(amt) || (amt == null))
        return false;
    else if((amt < 0) || (amt > 240))
        return false;
    else
        return true;
}

function refreshDisplay()
{
    if(bgpage.alarmDate) 
    {
        percent = bgpage.getTimeLeftPercent();

        if(percent < 8) // very hacky visual adjustment
        {
            document.getElementById("bar").style.color = "grey";
        }
        else
        {
            document.getElementById("bar").style.color = "white";
        }
        document.getElementById("bar").textContent = bgpage.getTimeLeftString();
        document.getElementById("bar").style.width = percent + "%";

        refreshDisplayTimeout = setTimeout(refreshDisplay, 100);
    }
    else
    {
        reset();
    }
}

function pauseTimer()
{
    clearTimeout(refreshDisplayTimeout);
    hide("pause");
    showInline("resume");
    bgpage.pause();
}

function resumeTimer()
{
    hide("resume");
    showInline("pause");
    bgpage.resume();
    refreshDisplay();
}

function restartTimer()
{
    hide("resume");
    showInline("pause");
    bgpage.restart();
    refreshDisplay();
}

function reset()
{
    clearTimeout(refreshDisplayTimeout);
    bgpage.turnOff();
    hide("display");
    document.body.style.minWidth = '240px'
    show("settings");
    hide("modify");
}



/*****************************************************************************
* In-app Payments
*****************************************************************************/

function checkIfTonesPurchased() {
    chrome.storage.sync.get(TONES_PURCHASED_STORAGE_KEY, function(item) {
        if(item[TONES_PURCHASED_STORAGE_KEY]) {
            tonesWerePurchased = true;
        }
        else {
            getLicenses();
        }
    });
}

function buyTones() {
    buyProduct(TONES_SKU);
}

function debugNotification(message) {
    var notificationOptions = {
        type: "basic",
        title: "Timer Debug",
        message: message,
        iconUrl: "img/48.png",
        priority: 2,
        requireInteraction: true
    }
    chrome.notifications.create(notificationOptions);
}





// only works when published to trusted testers or publically
function getProductList() {
  console.log("google.payments.inapp.getSkuDetails");
  console.log("Retreiving list of available products...");
  
  google.payments.inapp.getSkuDetails({
    'parameters': {'env': 'prod'},
    'success': onSkuDetails,
    'failure': onSkuDetailsFailed
  });
}

function onSkuDetails(response) {
  console.log("onSkuDetails", response);
  var products = response.response.details.inAppProducts;
  var count = products.length;
  for (var i = 0; i < count; i++) {
    var product = products[i];
  }
  getLicenses();
}

function onSkuDetailsFailed(response) {
  console.log("onSkuDetailsFailed", response);
  console.log("Error retrieving product list. (" + response.response.errorType + ")");
}



function getLicenses() {
  console.log("google.payments.inapp.getPurchases");
  console.log("Retreiving list of purchased products...");
  google.payments.inapp.getPurchases({
    'parameters': {'env': "prod"},
    'success': onLicenseUpdate,
    'failure': onLicenseUpdateFailed
  });
}

function onLicenseUpdate(response) {
  console.log("onLicenseUpdate", response);
  var licenses = response.response.details;
  var count = licenses.length;
  for (var i = 0; i < count; i++) {
    if (licenses[i]['sku'] == TONES_SKU && licenses[i]['state'] == 'ACTIVE') {
        tonesWerePurchased = true;
        chrome.storage.sync.set({[TONES_PURCHASED_STORAGE_KEY]: true});
        hide("buy");
        show('tone-settings');
    }
  }
}

function onLicenseUpdateFailed(response) {
  console.log("onLicenseUpdateFailed", response);
  console.log("Error retrieving list of purchased products.");
}



// when published to trusted testers, purchase will go through and charge
function buyProduct(sku) {
  console.log("google.payments.inapp.buy", sku);
  console.log("Kicking off purchase flow for " + sku);
  google.payments.inapp.buy({
    parameters: {'env': "prod"},
    'sku': sku,
    'success': onPurchase,
    'failure': onPurchaseFailed
  });
}

function onPurchase(purchase) {
  console.log("onPurchase", purchase);
  var jwt = purchase.jwt;
  var cartId = purchase.request.cardId;
  var orderId = purchase.response.orderId;
  console.log("Purchase completed. Order ID: " + orderId);
  debugNotification("Purchase completed!");
  getLicenses();
}

function onPurchaseFailed(purchase) {
  console.log("onPurchaseFailed", purchase);
  var reason = purchase.response.errorType;
  console.log("Purchase failed. " + reason);
  debugNotification("Purchase failed: " + reason);
}
