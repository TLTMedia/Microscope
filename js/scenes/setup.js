/*
 * setup.js
 *
 * Scene 2
 * Third scene that teaches student how to setup the microscope
 */

// ====== Start Trigger ======= //
function setupEnableSwitch() {
    removeHighlightCopy();
    var clonedComp;
    //    $("#popupType").html("Light Switch");
    //textSetup("Turn on the light to the brightest setting by clicking on the switch.", "60%", "60%");
    var id = "#switch";
    var clonedComp = highlightComponent(id);
    setTimeout(function () {
        clonedComp = highlightComponent(id);
    }, 0);
    //highlightComponent("#switch");
    var $el = $(id);

    $el.mousemove(function () {
        if ($("#light_1_").css("fill") == 'rgb(232, 224, 152)') {
            removeHighlight(clonedComp);
            setupLightSwitch.complete();
            $("#stageLight").show();
        }
    });

}

function setupEnableStage() {
    //textSetup("Lower the stage all the way to the bottom by rotating the coarse focus knob.", "66%", "58%");
    var id = "#knobsCoarse";
    var $el = $(id);
    var clonedComp = highlightComponent(id);
    //$("#popupType").html("Stage");

    $el.mousemove(function () {
        if (ms.knobPosition == 32) {
            removeHighlight(clonedComp);
            setupStage.complete();
        }
    });

}

function setupEnableBlade() {
    var id = "#caliperBlade";
    var $el = $(id);
    var clonedComp = highlightComponent(id);
    $el.click(function () {
        if (setupCaliperBlade.isActive()) {
            removeHighlight(clonedComp);
            setupCaliperBlade.complete();
            //$el.trigger("click");
        }
    });
}

function setupEnableSlide() {
    toggleVisibility("#slide");
    var origSlideX = 210;
    var origSlideY = 70;

    $("#slide").attr('transform', `translate(${origSlideX} ${origSlideY})`)
    var clonedSlider = highlightComponent("#slide");
    var clonedSliderBoo;

    var offset = $("#slide").offset();
    var width = $("#slide").width();
    var height = $("#slide").height();
    var centerX = offset.left + (width / 2);
    var centerY = offset.top + (height / 2);
    var cloned = false;

    // Set it so the sliderCopy disappears when the slider is grabbed
    // and so the slide target is highlighted
    // clonedSliderBoo is the highlight of the slideTarget
    $("#slide").mousedown('dragstart', function () {
        removeHighlight(clonedSlider);
        if (!cloned) {
            clonedSliderBoo = highlightComponent("#slideTarget");
            cloned = true;
        }
    });

    deregisterDrag('slide')

    registerDrag('slide', 'slideTarget', function () {
        setupSlide.complete();
        $("#caliperBlade").trigger("click");
        removeHighlight(clonedSliderBoo);
    });

    $("#slide").mousedown('dragstart', function () {});

    // this is used later in the resizing and gesture demos
    // window.dragMoveListener = dragMoveListener;
}

function setupCondenser() {

    var id = "#draggableDiaphragm";
    if (setupCondense.isActive()) {
        highlightComponent(id);
    }
}

function setupAdjustCaliper() {
    var idX = "#xCaliperKnob";
    var idY = "#yCaliperKnob";

    // THE COMPONENT IS ACTIVE, NOT SURE WHY IT ISN'T HIGHLIGHTING
    if (setupCaliper.isActive()) {
        highlightComponent(idX);
        highlightComponent(idY);
        $("#stageLight").removeClass("st0");
    }
}
