/*
 * med.js
 *
 * Scene 4
 * Third scene that teaches student how to use the microscope on medium magnification.
 */


//  eyepiece position should displace cell view.
//  See: /__image-reference/gifs/ocular.gif
function medAdjustLenses() {
    textSetup("Rotate the lenses to medium magnification (yellow).", "15%", "35%"); 
    var id="#lensesBasePath"
        if (medLenses.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                if (ms.lensePosition==3){
                    removeHighlightCopy();
                    medLenses.complete();
                    $(document).unbind("mousemove", handler);
                }
            }
            $(document).bind("mousemove", handler);
        }
}


// Trigger for fine knob 
function medAdjustFine() {
    textSetup("Move the stage up slightly by moving the fine knob.", "60%", "64%");
    var id="#knobsFine"
        if (medFine.isActive()) {  
            console.log("Fine knob");
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.slideBlur, -0.1, 0.1, medFine, document, handler, id, clonedComp);
            }
            $(document).bind("mousemove", handler);
        }
}


// Trigger for fine knob 
function medAdjustDiopter() {
    textSetup("Adjust the diopter to make the left view clear.", "20%", "30%");
    var id="#ocularLeft"
        if (medDiopter.isActive()) {  
            medDiopter.complete();
            return;
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.slideBlur, -0.1, 0.1, medFine, document, handler, id, clonedComp);
            }
            $(document).bind("mousemove", handler);
        }
}


// Trigger for the ocular lenses
function medAdjustEyepiece() {
    textSetup("Adjust the eyepiece to change the magnification.", "60%", "30%");
    var id="#ocularRight";
    if (medOcular.isActive()) { 
        var clonedComp = highlightComponent(id);
        var clonedComp2 = highlightComponent("#ocularLeft");
        bringToFront($("#ocularRight"));
        bringToFront($("#ocularLeft"));
        var handler = function(){
            subHandler(ms.eyepiecePosition, 10, 25, medOcular, document, handler, id, [clonedComp]);
        }
        $(document).bind("mousemove", handler);
    }
}
