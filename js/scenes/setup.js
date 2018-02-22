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
    $("#slide").mousedown('dragstart', function(){
        removeHighlight(clonedSlider);
        if(!cloned){
        clonedSliderBoo = highlightComponent("#slideTarget");
        cloned = true;
        }
    });
   
    registerDrag('slide', 'slideTarget', function() {
        setupSlide.complete();
        $("#caliperBlade").trigger("click");
        removeHighlight(clonedSliderBoo);
    });

    // this is used later in the resizing and gesture demos
    // window.dragMoveListener = dragMoveListener;
}

function setupCondenser() {
    textSetup("Rotate the condenser knob all the way to the top.", "8%", "45%");
    var id="#draggableDiaphragm";
    if (setupCondense.isActive()) {
        highlightComponent(id);
    }
}

function setupAdjustCaliper() {
    textSetup("Move the caliper knob so the aperture light is directly on the specimen.", "62%", "60%");
    var idX = "#xCaliperKnob";
    var idY = "#yCaliperKnob";

    // THE COMPONENT IS ACTIVE, NOT SURE WHY IT ISN'T HIGHLIGHTING
    if (setupCaliper.isActive()) {
        highlightComponent(idX);
        highlightComponent(idY);
        $("#stageLight").removeClass("st0");
    }
}
