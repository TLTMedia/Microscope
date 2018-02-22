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
    textSetup("Rotate the lenses to highest objective (40X) without the 100X objective passing the slide.", "15%", "35%");
    var id = "#lensesBasePath";
    if (highLenses.isActive()) {
        $("#ocularLeftCopy").remove();
        var clonedComp = highlightComponent(id);

        var handler = function () {
            //            console.log(ms.lensePosition);
            if (ms.lensePosition === 6) {
                removeHighlightCopy();
                highLenses.complete();
                $(document).unbind("mousemove", handler);
            }
        }
        $(document).bind("click", handler);
    }
}


function highAdjustAperture() {
    $(document).unbind("click", handler);
    textSetup("Adjust the aperture knob until the maximum light passes through the slide.", "60%", "60%");
    var id = "#diaphragm";

    //    highlightComponent(id);

    if (highAperture.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            // The "highlight" attribute is a made up attribute
            // such that if the diaphragm isn't highlighted, highlight it once and set
            // highlight = true
            //            if ($("#diaphragm").attr("highlight") == null) {
            //                highlightComponent(id);
            //                $("#diaphragm").attr("highlight", "true")
            //            }

            //AS OF RIGHT NOW, THE APERTURE KNOB UNHIGHLIGHTS AT A CERTAIN POINT EVEN THOUGH THE PROCESS ISN'T COMPLETE
            //            console.log("lowDiaphragmLight.isActive()" + lowDiaphragmLight.isActive());
            //            console.log(ms.diaphragmLightPosition);
            subHandler(ms.diaphragmLightPosition, 38, 40, highAperture, highAperture.id, null);

        }
        $(document).bind("mousemove", handler);
    }
}


// Trigger for fine knob
function highAdjustFine() {
    $("#diaphragmCopy").remove();
    $(document).unbind("mousemove", handler);
    textSetup("Adjust the fine knob until the slide view becomes clear.", "60%", "64%");
    var id = "#knobsFine";
    if (highFine.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            subHandler(ms.slideBlur, -0.1, 0.1, highFine, id, null);
        }
        $(document).bind("mousemove", handler);
    }
}
