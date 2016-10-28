/*
 * low.js
 *
 * Scene 3
 * Third scene that teaches student how to use the microscope.
 */

function lowAdjustEyepiece() {
    textSetup("Adjust the eyepiece to change the magnification.", "5%", "25%");
    var id="#ocularLensBase";
    if (lowEyepiece.isActive()) { 
        var clonedComp = highlightComponent(id);
            bringToFront($(id));
        var handler = function(){
            subHandler(ms.eyepiecePosition, 10, 25, lowEyepiece, document, handler, id, clonedComp);
        }
        $(document).bind("mousemove", handler);
    }
}

// Trigger for coarse knob.
function lowAdjustCoarse() {
    textSetup("Move the stage up by moving the course knob.", "10%", "64%");
    var id="#knobsCoarse"
    if (lowCoarse.isActive()) { 
        var clonedComp = highlightComponent(id);
            bringToFront($(id));
        var handler = function(){
            subHandler(ms.knobPosition, 0, 20, lowCoarse, document, handler, id, clonedComp);
        }
        $(document).bind("mousemove", handler);
    }
}

//Trigger for fine knob 
function lowAdjustFine() {
    textSetup("Move the stage up slightly by moving the fine knob.", "10%", "64%");
    var id="#knobsFine"
    if (lowFine.isActive()) {  
        var clonedComp = highlightComponent(id);
            bringToFront($(id));
        var handler = function(){
            subHandler(ms.knobPosition, -10, 0, lowFine, document, handler, id, clonedComp);
        }
        $(document).bind("mousemove", handler);
    }
}


// Adjust diaphram light
function lowDLight() {
    textSetup("Adjust the diaphragm to change the lighting on the slide.", "10%", "60%");
    var id="#diaphragm"
    if (lowDiaphragmLight.isActive()) { 
        var handler = function(){
            subHandler(ms.diaphragmLightPosition, 5, 30, lowDiaphragmLight, document, handler, id);
        }
        $(document).bind("mousemove", handler);
    }
}


function lowDHeight() {
    textSetup("Adjust the height of the diaphragm by rotating the diaphragm knob", "5%", "50%");
    var id="#draggableDiaphragm"
    if (lowDiaphragmHeight.isActive()) { 
        var clonedComp = highlightComponent(id);
            bringToFront($(id));
        var handler = function(){
            subHandler(ms.diaphragmHeightPosition, 5, 15, lowDiaphragmHeight, document, handler, id, clonedComp);
        }
        $(document).bind("mousemove", handler);
    }
}


function lowAdjustCaliper() {
    textSetup("Move the caliper to adjust the position of the slide.", "62%", "60%");
    var id="#caliperKnob"
    if (lowCaliper.isActive()) {

        var handler = function(){
            subHandler(ms.xcaliper, 5, 20, lowCaliper, document, handler, id);
            subHandler(ms.ycaliper, 5, 20, lowCaliper, document, handler, id);
        }
        $(document).bind("mousemove", handler);

        }
    
}


function lowAdjustLenses() {
    textSetup("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", "10%", "36%"); 
    var id="lenses"
    if (lowLenses.isActive()) { 
        var clonedComp = highlightComponent(id);
            bringToFront($(id));
        var handler = function(){
            subHandler(ms.diaphragmHeightPosition, 5, 15, lowLenses, document, handler, id, clonedComp);
        }
        $(document).bind("mousemove", handler);
    }
}
