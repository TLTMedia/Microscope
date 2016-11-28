/*
 * high.js
 *
 * Scene 4
 * Fourth scene that teaches student how to use the microscope on highium magnification.
 */


//  eyepiece position should displace cell view.
//  See: /__image-reference/gifs/ocular.gif
function highAdjustLenses() {
    textSetup("Rotate the lenses to highest magnification (blue)).", "15%", "35%"); 
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
function highAdjustFine() {
    textSetup("Move the stage up slightly by moving the fine knob.", "60%", "64%");
    var id="#knobsFine"
        if (highFine.isActive()) {  
            console.log("Fine knob");
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.slideBlur, -0.1, 0.1, highFine, document, handler, id, clonedComp);
            }
            $(document).bind("mousemove", handler);
        }
}

// Trigger for fine knob 
function highAdjustDiopter() {
    textSetup("Adjust the diopter to make the left view clear.", "20%", "30%");
    var id="#ocularLeft"
        if (highDiopter.isActive()) {  
            highDiopter.complete();
            return;
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.slideBlur, -0.1, 0.1, highFine, document, handler, id, clonedComp);
            }
            $(document).bind("mousemove", handler);
        }
}


// Trigger for the ocular lenses
function highAdjustEyepiece() {
    textSetup("Adjust the eyepiece to change the magnification.", "60%", "30%");
    var id="#ocularRight";
    if (highOcular.isActive()) { 
        var clonedComp = highlightComponent(id);
        var clonedComp2 = highlightComponent("#ocularLeft");
        bringToFront($("#ocularRight"));
        bringToFront($("#ocularLeft"));
        var handler = function(){
            subHandler(ms.eyepiecePosition, 10, 25, highOcular, document, handler, id, [clonedComp]);
        }
        $(document).bind("mousemove", handler);
    }
}
