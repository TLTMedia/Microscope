/*
 * low.js
 *
 * Scene 3
 * Third scene that teaches student how to use the microscope on low magnification.
 */


//  See: /__image-reference/gifs/ocular.gif
function lowAdjustLenses() {
    textSetup("Rotate the lenses to lowest objective (4X) without the 100X objective passing the slide.", "15%", "35%"); 
    var id="#lensesBasePath"
        if (lowLenses.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                if (ms.lensePosition==0){
                    removeHighlightCopy();
                    lowLenses.complete();
                    $(document).unbind("mousemove", handler);
                }
            }
            $(document).bind("mousemove", handler);
        }
}



// Adjust diaphragm light
function lowDLight() {
    textSetup("Slowly slide the aperture knob to the left to change the lighting on the slide.", "60%", "65%");
    var id="#diaphragm"
        if (lowDiaphragmLight.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            bringToFront($("#aperture"));
            bringToFront($("#apertureKnob"));
            var handler = function(){
                subHandler(ms.diaphragmLightPosition, 5, 30, lowDiaphragmLight, handler, id, null);
            }
            $(document).bind("mousemove", handler);
        }
}

// Trigger for coarse knob.
function lowAdjustCoarse() {
    textSetup("Move the stage up by moving the course knob.", "60%", "64%");
    var id="#knobsCoarse"
        if (lowCoarse.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.slideBlur, -1, 1, lowCoarse, handler, id, null);
            }
            $(document).bind("mousemove", handler);
        }
}




function lowDHeight() {
    textSetup("Adjust the height of the diaphragm by rotating the diaphragm knob", "18%", "70%");
    var id="#draggableDiaphragm"
        if (lowDiaphragmHeight.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.diaphragmHeightPosition, 5, 15, lowDiaphragmHeight, handler, id, null);
            }
            $(document).bind("mousemove", handler);
        }
}

//  !!! (´・ω・`)
//  separated components. ycaliper shouldn't move with x-Knob
//  xcaliperKnob - "#slide", #xcaliper",  "#caliperMetal"
//  ycaliperKnob - "#slide", #xcaliper", "#ycaliper", "#caliperMetal"
function lowAdjustCaliper() {
    textSetup("Move the caliper to adjust the position of the slide.", "62%", "60%");
    var id="#caliperKnob"
        if (lowCaliper.isActive()) {
            var clonedComp2 = highlightComponent("#yCaliperKnob");
            var clonedComp2 = highlightComponent("#xCaliperKnob");

            //bringToFront($(id));
            bringToFront($("#xCaliperKnob"));
            bringToFront($("#yCaliperKnob"));

            var handler = function(){
                subHandler(ms.xcaliper, 5, 20, lowCaliper, handler, id, null);
                subHandler(ms.ycaliper, 5, 20, lowCaliper, handler, id, null);
            }
            $(document).bind("mousemove", handler);

        }

}

