/*
 * low.js
 *
 * Scene 3
 * Third scene that teaches student how to use the microscope 
 */

// ===== Hardcoded Bounds ===== //

var bounds = {}


// ====== Start Trigger ======= //

function textSetupEyepiece() {
    var arr = ["#eyepiece", "#ocularRight", "#ocularLeft", "#ocularLensBase"];
    popupOn("Adjust the eyepiece to change the magnification.", {
            "left": "5%",
            "top": "25%",
            });
}

function textSetupDiaphragmLight() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    popupOn("Adjust the diaphragm to change the lighting on the slide.", {
            "left": "10%",
            "top": "60%",
            });
}


function textSetupDiaphragmHeight() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    popupOn("Adjust the height of the diaphragm by rotating the knob.", {
            "left": "50%",
            "top": "60%",
            });
}

function textSetupFine() {
    arr = ["#knobsFine"];
    popupOn("Move the stage up a little to sharpen the focus", {
            "left": "10%",
            "top": "64%",
            });
}

function textSetupCoarse() {
    arr = ["#knobsCoarse"];
    popupOn("Move the stage up by moving the coarse knob.", {
            "left": "10%",
            "top": "64%",
            });
}

function textSetupCaliper() {
    arr = ["#caliper", "#xcaliper", "#ycaliper", "#caliperKnob"];
    popupOn("Move the caliper to adjust the position of the slide.", {
            "left": "62%",
            "top": "60%",
            });
}

function textSetupLenses() {
    arr = ["#lenses", "#lensesRed", "#lensesBlue", "#lensesYellow", "#lensesWhite"];
    edgeArr = arr;
    popupOn("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", {
            "left": "10%",
            "top": "36%",
            });
}


/* Property to inspect, lower bound, upper bound, engine piece, div piece, remove listener*/
function subHandler(prop, low, upper, piece, components, handler){
    if(prop > low && prop < upper){ 
        piece.complete();
        $(components).unbind("mousemove", handler);               
    }
}

function lowAdjustEyepiece() {
    textSetupEyepiece();
    if (lowEyepiece.isActive()) {
        var components = "#ocularRight, #ocularLeft" 
        var handler = function(){
            subHandler(microscope.eyepiecePosition, 10, 25, lowEyepiece, components, handler);
        }
        $(components).bind("mousemove", handler);
    }
}

/*Trigger for coarse knob (for now I have conjoined them)*/
function lowAdjustCoarse() {
    textSetupCoarse();
    if (lowCoarse.isActive()) { 
        var components = "#knobsCoarse" 
        var handler = function(){
            subHandler(microscope.knobPosition, -30, 0, lowCoarse, components, handler);
        }
        $(components).bind("mousemove", handler);
    }
}

/*Trigger for fine knob (for now I have conjoined them)*/

function lowAdjustFine() {
    textSetupFine();
    if (lowFine.isActive()) {
        var components = "#knobsFine" 
        var handler = function(){
            subHandler(microscope.knobPosition, -30, -10, lowFine, components, handler);
        }
        $(components).bind("mousemove", handler);
    }
}


// Adjust diaphram light
function lowDLight() {
    textSetupDiaphragmLight();
    if (lowDiaphragmLight.isActive()) {
        var components = "#diaphragm" 
        var handler = function(){
            subHandler(microscope.diaphragmLightPosition, 5, 30, lowDiaphragmLight, components, handler);
        }
        $(components).bind("mousemove", handler);
    }
}


function lowDHeight() {
    textSetupDiaphragmHeight();
    if (lowDiaphragmHeight.isActive()) {
        var components = document 
        var handler = function(){
            subHandler(microscope.diaphragmHeightPosition, 5, 15, lowDiaphragmHeight, components, handler);
        }
        $(components).bind("mousemove", handler);
    }
}


function lowAdjustCaliper() {
    textSetupCaliper();
    if (lowCaliper.isActive()) {
        var components = document 
        var handler = function(){
            subHandler(microscope.xcaliper, 5, 20, lowCaliper, components, handler);
            subHandler(microscope.ycaliper, 5, 20, lowCaliper, components, handler);
        }
        $(components).bind("mousemove", handler);

        }
    
}


function lowAdjustLenses() {
    textSetupLenses();
    if (lowLenses.isActive()) {
        var components = document 
        var handler = function(){
            subHandler(microscope.diaphragmHeightPosition, 5, 15, lowLenses, components, handler);
        }
        $(components).bind("mousemove", handler);
    }
}
