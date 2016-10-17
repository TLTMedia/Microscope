/*
 * low.js
 *
 * Scene 3
 * Third scene that teaches student how to use the microscope 
 */

// ===== Utility Functions ===== //

function textSetup(tooltip, lt, tp){
    popupOn(tooltip, {"left": lt, "top": tp});
}

// Property to inspect, lower bound, upper bound, engine piece, div piece, remove listener
function subHandler(prop, low, upper, piece, doc, handler){
    if(prop > low && prop < upper){ 
        piece.complete();
        $(doc).unbind("mousemove", handler);               
    }
}

// ====== Start Trigger Listeners ======= //


function lowAdjustEyepiece() {
    textSetup("Adjust the eyepiece to change the magnification.", "5%", "25%");
    if (lowEyepiece.isActive()) { 
        var handler = function(){
            subHandler(microscope.eyepiecePosition, 10, 25, lowEyepiece, document, handler);
        }
        $(document).bind("mousemove", handler);
    }
}

/*Trigger for coarse knob (for now I have conjoined them)*/
function lowAdjustCoarse() {
    textSetup("Move the stage up by moving the course knob.", "10%", "64%");
    if (lowCoarse.isActive()) { 
        var handler = function(){
            subHandler(microscope.knobPosition, -30, 0, lowCoarse, document, handler);
        }
        $(document).bind("mousemove", handler);
    }
}

/*Trigger for fine knob (for now I have conjoined them)*/

function lowAdjustFine() {
    textSetup("Move the stage up slightly by moving the fine knob.", "10%", "64%");
    if (lowFine.isActive()) { 
        var handler = function(){
            subHandler(microscope.knobPosition, -30, -10, lowFine, document, handler);
        }
        $(document).bind("mousemove", handler);
    }
}


// Adjust diaphram light
function lowDLight() {
    textSetup("Adjust the diaphragm to change the lighting on the slide.", "10%", "60%");
    if (lowDiaphragmLight.isActive()) { 
        var handler = function(){
            subHandler(microscope.diaphragmLightPosition, 5, 30, lowDiaphragmLight, document, handler);
        }
        $(document).bind("mousemove", handler);
    }
}


function lowDHeight() {
    textSetup("Adjust the height of the diaphragm by rotating the knob.", "50%", "60%");
    if (lowDiaphragmHeight.isActive()) {
        var handler = function(){
            subHandler(microscope.diaphragmHeightPosition, 5, 15, lowDiaphragmHeight, document, handler);
        }
        $(document).bind("mousemove", handler);
    }
}


function lowAdjustCaliper() {
    textSetup("Move the caliper to adjust the position of the slide.", "62%", "60%");
    if (lowCaliper.isActive()) {

        var handler = function(){
            subHandler(microscope.xcaliper, 5, 20, lowCaliper, document, handler);
            subHandler(microscope.ycaliper, 5, 20, lowCaliper, document, handler);
        }
        $(document).bind("mousemove", handler);

        }
    
}


function lowAdjustLenses() {
    textSetup("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", "10%", "36%"); 
    if (lowLenses.isActive()) {
        var handler = function(){
            subHandler(microscope.diaphragmHeightPosition, 5, 15, lowLenses, document, handler);
        }
        $(document).bind("mousemove", handler);
    }
}
