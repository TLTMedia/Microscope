/*
 * clean.js
 *
 * Scene 4
 * Fourth scene instructs user to put away the microscope.
 */


function cleanAdjustLenses() {
    textSetup("Rotate the lenses to the lowest objective (4X) without the 100X objective passing the slide.", "15%", "35%");
    var id = "#lensesBasePath"
    if (cleanupLow.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            if (ms.lensePosition == 0) {
                removeHighlightCopy();
                cleanupLow.complete();
                $(document).unbind("mousemove", handler);
            }
        }
        $(document).bind("click", handler);
    }
}

// Trigger for coarse knob.
function cleanAdjustCoarse() {
    textSetup("Move the stage to the bottom using the coarse knob.", "60%", "64%");
    var id = "#knobsCoarse"
    if (cleanupCoarse.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            //console.log(ms.knobPosition);
            subHandler(ms.knobPosition, 19, 21, cleanupCoarse, id, null);
        }
        $(document).bind("mousemove", handler);
    }
}

function cleanRemoveSlide() {
    textSetup("Remove the slide and put it back in the case.", "64%", "45%");
    //    toggleVisibility("#slide");
    //    console.log("DONE");

    registerDrag('slide', 'slideBox', function () {
        console.log("DONE");
        cleanupSlide.complete();
        removeHighlightCopy();
        //        toggleVisiblity("#slide");
    });
}

function cleanDisableSwitch() {
    textSetup("Lastly, let's turn off the light switch.", "60%", "73%");
    id = "#switch";
    var clonedComp = highlightComponent(id);
    $("#switch").click(function () {
        if (cleanupLight.isActive()) {
            removeHighlight(clonedComp);
            cleanupLight.complete();
        }
    });
}
