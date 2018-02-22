/*
 * med.js
 *
 * Scene 4
 * Third scene that teaches student how to use the microscope on medium magnification.
 */


//  eyepiece position should displace cell view.
//  See: /__image-reference/gifs/ocular.gif
function medAdjustLenses() {
    $(document).unbind("mousemove", handler);
    textSetup("Rotate the lenses to the middle objective (10X) without the 100X objective passing the slide.", "15%", "35%");
    var id = "#lensesBasePath"
    if (medLenses.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            if (ms.lensePosition == 3) {
                removeHighlightCopy();
                medLenses.complete();
                $(document).unbind("mousemove", handler);
            }
        }
        $(document).bind("click", handler);
    }
}


// Trigger for coarse knob.
function medAdjustCoarse() {
    $(document).unbind("click", handler);
    textSetup("Move the stage up by moving the course knob.", "60%", "64%");
    var id = "#knobsCoarse"
    if (medCoarse.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            subHandler(ms.slideBlur, -1, 1, medCoarse, id, null);
        }
        $(document).bind("mousemove", handler);
    }
}


// Trigger for fine knob
function medAdjustFine() {
    $(document).unbind("mousemove", handler);
    textSetup("Adjust the fine knobs until the slide image becomes clear.", "60%", "64%");
    var id = "#knobsFine"
    if (medFine.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            //            console.log("function called");
            //THE FUNCTION IS CALLED WHENEVER THE MOUSE IS MOVED.
            subHandler(ms.slideBlur, -0.1, 0.1, medFine, id, clonedComp);
            //            console.log(ms.slideBlur);
        }
        $(document).bind("mousemove", handler);
    }
}


// Trigger for fine knob
function medAdjustDiopter() {
    $(document).unbind("mousemove", handler);
    textSetup("Adjust the diopter until the left slide view becomes clear.", "20%", "30%");
    var id = "#ocularLeftDiopter"
    if (medDiopter.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            subHandler(ms.eyepiecePosition + ms.slideBlur2, -1, 1, medDiopter, id, clonedComp);
        }
        $(document).bind("mousemove", handler);
    }
}


// Trigger for the ocular lenses
function medAdjustEyepiece() {
    $(document).unbind("mousemove", handler);
    textSetup("Adjust the eyepiece until both slide views converge.", "60%", "30%");
    var id = "#ocularRight";
    if (medOcular.isActive()) {
        var clonedComp = highlightComponent(id);
        var clonedComp2 = highlightComponent("#ocularLeft");
        //var clonedComp3 = highlightComponent("#ocularLeftDiopter");
        var handler = function () {
            subHandler(ms.eyepiecePosition, -1, 1, medOcular, id, null);
        }
        $(document).bind("mousemove", handler);
    }
}
