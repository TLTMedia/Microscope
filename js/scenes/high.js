/*
 * high.js
 *
 * Scene 4
 * Fourth scene that teaches student how to use the microscope on highium magnification.
 */


//  eyepiece position should displace cell view.
//  See: /__image-reference/gifs/ocular.gif
function highAdjustLenses() {
    $(document).unbind("mousemove", handler);
    $("#popupType").html("Objective");
    //    textSetup("Rotate the lenses to highest objective(40 X) without the 100 X objective passing the slide.", "15%", "35%");
    var id = "#lensesBasePath";
    if (highLenses.isActive()) {
        $("#ocularLeftCopy").remove();
        var clonedComp = highlightComponent(id);

        var handler = function () {
            console.log(ms.lensePosition);
            if (ms.lensePosition === 6) {
                removeHighlightCopy();
                highLenses.complete();
            }
        }
        $(document).bind("click", handler);
    }
}

function highAdjustAperture() {
    $(document).unbind("click", handler);
    $("#popupType").html("Aperture");
    //    textSetup("Adjust the aperture knob until the maximum light passes through the slide.", "60%", "60%");
    var id = "#diaphragm";
    if (highAperture.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            subHandler(ms.diaphragmLightPosition, 38, 40, highAperture, highAperture.id, null);
        }
        $(document).bind("mousemove", handler);
    }
}


// Trigger for fine knob
function highAdjustFine() {
    $("#diaphragmCopy").remove();
    //$("#popupType").html("Fine Focus");
    $(document).unbind("mousemove", handler);
    //    textSetup("Adjust the fine knob until the slide view becomes clear.", "60%", "64%");
    var id = "#knobsFine";
    if (highFine.isActive()) {
        var clonedComp = highlightComponent(id);
        // console.log(ms.slideBlur)
        var handler = function () {
            subHandler(ms.slideBlur, -0.2, -0.1, highFine, id, null);
        }
        $(document).bind("mousemove", handler);
    }
}
