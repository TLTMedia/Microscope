/*
 * clean.js
 *
 * Scene 4
 * Fourth scene instructs user to put away the microscope.
 */


function cleanAdjustLenses() {
    //    textSetup("Rotate the lenses to the lowest objective (4X) without the 100X objective passing the slide.", "15%", "35%");
    //$("#popupType").html("Objective");
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
    //$("#popupType").html("Coarse Knob");
    $(document).unbind("click", handler);
    //    textSetup("Move the stage to the bottom using the coarse knob.", "60%", "64%");
    var id = "#knobsCoarse"
    highlightComponent("#knobsCoarse")
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
    cloned = false;
    //$("#popupType").html("Slide");
    //textSetup("Remove the slide and put it back in the slide box.", "64%", "45%");
    deregisterDrag('slide');
    //removeHighlightCopy();

    highlightComponent("#slide");
    //MAKE IT SO I CAN ONLY DRAG IF THE CALIPER METAL IS UNLOCKED
    $("#slide").on("mousedown", function () {
      $("#canvasLeft, #canvasRight").css("display", "none")
        if (!cloned) {

            console.log("YERR")
            $("#slideContents, #slideContents2").hide();
            clonedSliderBoxHighlight = highlightComponent("#slideBox");
            removeHighlightId("#slideCopy");
            removeHighlightId("#slideTargetCopy");
            cloned = true;
        }
    });

    registerDrag('slide', 'slideBoxTarget', function () {
        $("#slideBox").css("display", "none");
        $("#slideBoxClosed").css("display", "inline");
        $("#slide").css("display", "none");
        cleanupSlide.complete();
        removeHighlight(clonedSliderBoxHighlight);
        removeHighlightId("#slideTargetCopy");
        removeHighlightId("#slideCopy");
    });

}

function cleanDisableSwitch() {
    //$("#popupType").html("Light Switch");
    //    textSetup("Lastly, let's turn off the light switch.", "60%", "73%");
    id = "#switch";
    highlightComponent("#switch");

    $("#switch").mousemove(function () {
        if ($("#light_1_").css("fill") == 'rgb(0, 0, 0)') {
            removeHighlightId("#switchCopy");
            cleanupLight.complete();
            $("#stageLight").hide();
        }
    });

}
