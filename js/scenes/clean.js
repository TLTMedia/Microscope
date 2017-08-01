/*
 * clean.js
 *
 * Scene 4
 * Fourth scene instructs user to put away the microscope.
 */


function cleanAdjustLenses() {
    textSetup("Rotate the lenses to the lowest objective (4X) without the 100X objective passing the slide.", "15%", "35%");
    var id="#lensesBasePath"
        if (cleanupLow.isActive()) {
            var clonedComp = highlightComponent(id);
            var handler = function(){
                if (ms.lensePosition==0){
                    removeHighlightCopy();
                    cleanupLow.complete();
                    $(document).unbind("mousemove", handler);
                }
            }
            $(document).bind("mousemove", handler);
        }
}

// Trigger for coarse knob.
function cleanAdjustCoarse() {
    textSetup("Move the stage to the bottom using the coarse knob.", "60%", "64%");
    var id="#knobsCoarse"
        if (cleanupCoarse.isActive()) {
            var clonedComp = highlightComponent(id);
            var handler = function(){
                //console.log(ms.knobPosition);
                subHandler(ms.knobPosition, 19, 21, cleanupCoarse, id, null);
            }
            $(document).bind("mousemove", handler);
        }
}

function cleanRemoveSlide() {
    textSetup("Now grab the slide below and put it against the caliper.", "64%", "45%");
    toggleVisibility("#slide");

    /*
    //Moving the original slide
    toggleVisibility("#slide");

    var cloned = highlightComponent("#slide");
    $(cloned).attr("style", $("#slide").attr("style"));

    interact('#slide')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            // enable autoScroll
            autoScroll: true,

            // call this function on every dragmove event
            onmove: dragMoveListener,
            // call this function on every dragend event
            onend: function (event) {
                console.log('moved a distance of '
                    + (Math.sqrt(event.dx * event.dx +
                            event.dy * event.dy)|0) + 'px');
            }
        });

    function dragMoveListener (event) {
        if (cleanupSlide.isActive() && Math.abs(x) > 100 || y < 0 || y > 100) {
            removeHighlight($("#slideCopy"));
            cleanupSlide.complete();
            $("#pseudo_slideCopyCopy").remove();
            $("#pseudo_slideCopy").remove();
            $("#slide").remove();
        }
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;
    */
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
