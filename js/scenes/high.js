/*
 * high.js
 *
 * Scene 4
 * Fourth scene that teaches student how to use the microscope on highium magnification.
 */


//  eyepiece position should displace cell view.
//  See: /__image-reference/gifs/ocular.gif
function highAdjustLenses() {
    textSetup("Rotate the lenses to highest objective (40X) without the 100X objective passing the slide.", "15%", "35%"); 
    var id="#lensesBasePath"
        if (highLenses.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                if (ms.lensePosition==6){
                    removeHighlightCopy();
                    highLenses.complete();
                    $(document).unbind("mousemove", handler);
                }
            }
            $(document).bind("mousemove", handler);
        }
}


// Trigger for fine knob 
function highAdjustAperture() {
    textSetup("Adjust the aperture knob until the maximum light passes through the slide.", "60%", "60%");
    var id="#diaphragm"
        if (highAperture.isActive()) {  
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                //console.log(ms.diaphragmLightPosition);
                subHandler(ms.diaphragmLightPosition, 38, 40, highAperture, handler, id, null);
            }
            $(document).bind("mousemove", handler);
        }
}


// Trigger for fine knob 
function highAdjustFine() {
    textSetup("Adjust the fine knob until the slide view becomes clear.", "60%", "64%");
    var id="#knobsFine"
        if (highFine.isActive()) {  
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.slideBlur, -0.1, 0.1, highFine, handler, id, null);
            }
            $(document).bind("mousemove", handler);
        }
}



