/*
 * setup.js
 *
 * Scene 2
 * Third scene that teaches student how to setup the microscope
 */

// ====== Start Trigger ======= //
function setupEnableSwitch() {
    textSetup("First, let's turn on the light switch.", "60%", "73%");
    var id = "#switch";
    var $el = $(id);
    var clonedComp = highlightComponent(id);
    bringToFront($el);
    $el.click(function () {
        if (setupLightSwitch.isActive()) {
            removeHighlight(clonedComp);
            setupLightSwitch.complete();
        }
    });
}

function setupEnableBlade(){
    textSetup("Now pull on the caliper blade by clicking on it.", "64%", "45%");
    var id = "#caliperBlade";
    var $el = $(id);
    var clonedComp = highlightComponent(id);
    bringToFront($el);
    $el.click(function () {
        if (setupCaliperBlade.isActive()) {
            removeHighlight(clonedComp);
            setupCaliperBlade.complete();
        }
    });
}

function setupEnableSlide() {
    textSetup("Now grab the slide below and put it against the caliper.", "64%", "45%");
    toggleVisibility("#slide");

    registerDrag('slide', 'slideTarget', function() {
        setupSlide.complete();
        $("#caliperBlade").trigger("click");
        toggleVisibility("#slide");
        $("#pseudo_slideCopyCopy").remove();
        $("#pseudo_slideCopy").remove();
    });

    // this is used later in the resizing and gesture demos
    //window.dragMoveListener = dragMoveListener;
}


//  (´・ω・`) broke this
//  knob should go <- not ->
// hehe dwai shrin i got u
function setupCondenser() {
    textSetup("Rotate the condenser knob all the way to the top.", "8%", "45%");
    var id="#draggableDiaphragm";
    if (setupCondense.isActive()) {
        var clonedComp = highlightComponent(id);
        bringToFront($(id));
        var handler = function () {
            subHandler(ms.diaphragmHeightPosition, 0, 4.8, setupCondense, handler, id, null);
        }
        $(document).bind("mousemove", handler);
    }
}


function setupAdjustCaliper() {
    textSetup("Move the caliper knob so the aperture light is directly on the specimen.", "62%", "60%");
    id = "#caliperKnob"
        if (setupCaliper.isActive()) {
            var clonedComp1 = highlightComponent("#yCaliperKnob");
            var clonedComp2 = highlightComponent("#xCaliperKnob");

            bringToFront($("#xCaliperKnob"));
            bringToFront($("#yCaliperKnob"));

            var handler = function () {
                //console.log(ms.xcaliper + ", " + ms.ycaliper);
                if(ms.xcaliper >-1 && ms.xcaliper<1)
                    subHandler(ms.ycaliper, 18, 20, setupCaliper, handler, id, null);
            }
            $(document).bind("mousemove", handler);
            $("#stageLight").removeClass("st0");
        }
}
