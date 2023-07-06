//===========================================================================
// IO widget
// Originally written and Steampunked by: Dean Beedell
// Dean.beedell@lightquick.co.uk
// Vitality code, advice and patience from Harry Whitfield
//
//===========================================================================var mainWindowwidthDefault = mainWindow.width;

//resizing variables
var mainWindowwidthDefault = mainWindow.width;
var mainWindowheightDefault = mainWindow.height;

var imagehoffsetDefault = image.hoffset;
var imagevoffsetDefault = image.voffset;
var imagewidthDefault = image.width;
var imageheightDefault = image.height;

var collarhoffsetDefault = collar.hoffset;
var collarvoffsetDefault = collar.voffset;
var collarwidthDefault = collar.width;
var collarheightDefault = collar.height;


    var pinhoffsetDefault = pin.hOffset;
    var pinvoffsetDefault = pin.vOffset;
    var pinwidthDefault = pin.width ;
    var pinheightDefault = pin.height;

    var Scale = Number(preferences.maxWidthPref.value) / 100;

var tingingSound = "Resources/ting.mp3";
var currStamp = "Resources/magnifier-dock.png";;
var lock = "Resources/lock.mp3";

var widgetName = "magnifier.widget";

var debugFlg = "";
//===========================================
// this function runs on startup
//===========================================
function startup() {
    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
        preferences.imageEditPref.hidden=false;
        preferences.imageCmdPref.hidden=false;
    } else {
        preferences.imageEditPref.hidden=true;		
        preferences.imageCmdPref.hidden=true;
    }		

    mainScreen();
    buildVitality(currStamp);
    resize();
    setmenu();
    settooltip();
    // create the licence window
    createLicence(mainWindow);
    // set the widget lock status if pinned
    if (preferences.widgetLockPref.value === "1") {
		mainWindow.locked = true;
                log ( "Setting the locking pin ",pin.hOffset);
		pin.opacity = 255;
		pin.hOffset = preferences.pinhOffsetPref.value * Scale ;
		pin.vOffset = preferences.pinvOffsetPref.value * Scale ;
    }
}
//=====================
//End function
//=====================


//==============================
// 
//==============================
collar.onclick = function () {
//	if (!mainWindow.locked) {
		mainWindow.locked = true;
		preferences.widgetLockPref.value = "1";
		log ( "pin.hOffset ",pin.hOffset);
		log ( "pin.vOffset ",pin.vOffset);
                pin.hOffset = system.event.hOffset - 5;
		pin.vOffset = system.event.vOffset - 5;
		// store the pin position in the original unscaled amount
                preferences.pinhOffsetPref.value = pin.hOffset / Scale;
		preferences.pinvOffsetPref.value = pin.vOffset / Scale;
		pin.opacity = 255;
//	}

	if (preferences.soundpref.value === "enable") {
		play(lock, false);
	}
};


//==============================
// 
//==============================
collar.onMulticlick = function () {
//	if (!mainWindow.locked) {
};

//==============================
// pins the widget in place
//==============================
pin.onMouseDown = function () {
	if (mainWindow.locked) {
                mainWindow.locked = false;
	        // this does not work yet
                pin.opacity = 0;
		preferences.widgetLockPref.value = "0";
	}
	if (preferences.soundpref.value === "enable") {
		play(lock, false);
	}
};
//==============================
//
//==============================




//======================================================================================
