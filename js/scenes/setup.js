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

    var origSlideX = 210;
    var origSlideY = 70;

    $("#slide").attr('transform', `translate(${origSlideX} ${origSlideY})`)
    registerDrag('slide', 'slideTarget', function() {
        setupSlide.complete();
        $("#caliperBlade").trigger("click");
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
        highlightComponent(id);
    }
}


function setupAdjustCaliper() {
    textSetup("Move the caliper knob so the aperture light is directly on the specimen.", "62%", "60%");
    id = "#caliperKnob"
    if (setupCaliper.isActive()) {
        highlightComponent("#yCaliperKnob");
        highlightComponent("#xCaliperKnob");
        $("#stageLight").removeClass("st0");
    }
}
