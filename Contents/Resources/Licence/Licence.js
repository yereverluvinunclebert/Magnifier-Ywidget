/*
LICENCE DISPLAY - A program to display licence information.
Copyright  2005-2008  Ricky Romero and Harry Whitfield

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public Licence as published by the
Free Software Foundation; either version 2 of the Licence, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public Licence for more details.

You should have received a copy of the GNU General Public Licence along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

Licence Display - version 3.0
1 December, 2008
Copyright  2005-2008  Ricky Romero and Harry Whitfield
mailto:g6auc@arrl.net
*/

/*members alignment, altKey, bgColor, bgOpacity, color, data, editable,
    event, focus, font, hOffset, height, licenceHide, mainWindow, onMouseUp,
    opacity, open, readFile, shadow, size, src, title, tooltip, vOffset,
    value, visible, width, window
*/

var licence_info        = null;
var accept  	        = null;
var acceptShadow        = null;
var decline             = null;
var declineInstruction  = null;
var declineInstruction2 = null;
var declineShadow       = null;
var licence             = null;
var theLicenceFrame     = null;
var widgetTitle         = null;

function showLicence() {
	if (system.event.altKey) {
		filesystem.open("Resources/Licence/GNU-GPL.html");
	}
}

function closeTheWidget() {
	closeWidget();
}

function acceptLicence() {
	var mainWindow = licence_info.mainWindow;
	licence_info.visible = false;
	mainWindow.visible = true;
	mainWindow.focus();

	theLicenceFrame.opacity =
		widgetTitle.opacity =
		declineInstruction.opacity =
		declineInstruction2.opacity =
		licence.opacity =
		acceptShadow.opacity =
		accept.opacity =
		declineShadow.opacity =
		decline.opacity = 0;

	preferences.licenceHide.value = "1";
}

function displayLicence() {
	theLicenceFrame.opacity =
		widgetTitle.opacity =
		declineInstruction.opacity =
		declineInstruction2.opacity =
		licence.opacity =
		acceptShadow.opacity =
		accept.opacity =
		declineShadow.opacity =
		decline.opacity = 255;

	preferences.licenceHide.value = "0";
	licence_info.visible = true;
}

function testLicence() {
	if (licence_info.visible) {
		closeWidget();
	}
}

function createLicence(mainWindow) {	// mainWindow parameter is a window
	licence_info = new Window();

	licence_info.mainWindow = mainWindow;

	licence_info.title = "Licence Agreement";
	licence_info.alignment = "left";
	licence_info.hOffset = 400;
	licence_info.vOffset = 150;
	licence_info.width = 365;
	licence_info.height = 310;
	licence_info.visible = false;
	licence_info.shadow = false;

	theLicenceFrame = new Image();
	theLicenceFrame.window = licence_info;
	theLicenceFrame.src = "Resources/Licence/Frame.png";
	theLicenceFrame.hOffset = 0;
	theLicenceFrame.vOffset = 0;
	theLicenceFrame.width = 365;
	theLicenceFrame.height = 310;

	widgetTitle = new Text();
	widgetTitle.window = licence_info;
	widgetTitle.data = "Licence Agreement";
	widgetTitle.hOffset = 34;
	widgetTitle.vOffset = 34;
	widgetTitle.alignment = "left";
	widgetTitle.font = "Helvetica, Arial Bold";
	widgetTitle.size = 11;
	widgetTitle.color = "#FFFFFF";

	declineInstruction2 = new Text();
	declineInstruction2.window = licence_info;
	declineInstruction2.data = "If you do not agree with the terms set forth above, please click the";
	declineInstruction2.alignment = "center";
	declineInstruction2.hOffset = 183;
	declineInstruction2.vOffset = 236;
	declineInstruction2.font = "Helvetica";
	declineInstruction2.size = 9;
	declineInstruction2.color = "#FFFFFF";

	declineInstruction = new Text();
	declineInstruction.window = licence_info;
	declineInstruction.data = "Decline button below and destroy this Widget and its documentation.";
	declineInstruction.alignment = "center";
	declineInstruction.hOffset = 183;
	declineInstruction.vOffset = 248;
	declineInstruction.font = "Helvetica";
	declineInstruction.size = 9;
	declineInstruction.color = "#FFFFFF";

	licence = new TextArea();
	licence.window = licence_info;
	licence.data = "";
	licence.hOffset = 35;
	licence.vOffset = 45;
	licence.width = 296;
	licence.height = 177;
	licence.alignment = "left";
	licence.font = "Helvetica";
	licence.size = 11;
	licence.color = "#FFFFFF";
	licence.bgColor = "#25443C";
	licence.opacity = 255;
	licence.bgOpacity = 192;
	licence.editable = false;
	licence.tooltip = "Alt-click to see the full licence text.";
	licence.onMouseUp = showLicence;

	acceptShadow = new Text();
	acceptShadow.window = licence_info;
	acceptShadow.data = "Accept";
	acceptShadow.hOffset = 329;
	acceptShadow.vOffset = 279;
	acceptShadow.alignment = "right";
	acceptShadow.font = "Helvetica, Arial Bold";
	acceptShadow.size = 11;
	acceptShadow.color = "#FFFFFF";
	acceptShadow.opacity = 192;
	acceptShadow.onMouseUp = acceptLicence;

	accept = new Text();
	accept.window = licence_info;
	accept.data = "Accept";
	accept.hOffset = 329;
	accept.vOffset = 278;
	accept.alignment = "right";
	accept.font = "Helvetica, Arial Bold";
	accept.size = 11;
	accept.color = "#000000";
	accept.opacity = 192;

	declineShadow = new Text();
	declineShadow.window = licence_info;
	declineShadow.data = "Decline";
	declineShadow.hOffset = 236;
	declineShadow.vOffset = 279;
	declineShadow.alignment = "left";
	declineShadow.font = "Helvetica, Arial Bold";
	declineShadow.size = 11;
	declineShadow.color = "#FFFFFF";
	declineShadow.opacity = 192;
	declineShadow.onMouseUp = closeTheWidget;

	decline = new Text();
	decline.window = licence_info;
	decline.data = "Decline";
	decline.hOffset = 236;
	decline.vOffset = 278;
	decline.alignment = "left";
	decline.font = "Helvetica, Arial Bold";
	decline.size = 11;
	decline.color = "#000000";
	decline.opacity = 192;

	licence.data = filesystem.readFile("Resources/Licence/licence.txt");

	if (preferences.licenceHide.value === "0") {
		mainWindow.visible   = false;
		licence_info.visible = true;
		licence_info.focus();
	} else {
		licence_info.visible = false;
		mainWindow.visible   = true;
		mainWindow.focus();
	}
}
