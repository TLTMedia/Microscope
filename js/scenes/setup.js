
/*
 * setup.js
 *
 * Scene 2
 * Third scene that teaches student how to setup the microscope 
 */


// ====== Start Trigger ======= //
function setupEnableSwitch() {
    textSetup("First, let's turn on the light switch.", "60%", "73%");
    id="#switch"
        var clonedComp = highlightComponent(id);
            bringToFront($(id));
    $("#switch").click(function() {
            if (setupLightSwitch.isActive()) {
            removeHighlight(clonedComp);
            setupLightSwitch.complete();
            }
            });
}

function setupEnableSlide(){
    textSetup("Now take the slide and put it against the caliper.", "60%", "50%");
    // Make the slide visible
    /*
       $("#slider").css({
       "-website-transform": "translate(" + 0 + "px," + 0 + "px)",
       "transform": "translate(" + 0 + "px," + 0 + "px)"
       });
     */
    $(document).click(function(){
            if (setupSlide.isActive())
            {
            setupSlide.complete();

            }
            });
}


//  (´・ω・`) broke this
//  knob should go <- not ->
// hehe dwai shrin i got u
function setupDLight() {
    textSetup("Move the aperture knob slightly to the left.", "55%", "60%");
    id = "#diaphragm"
        if (setupAperture.isActive()) {
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            bringToFront($("#aperture"));
            bringToFront($("#apertureKnob"));
            var handler = function(){
                subHandler(ms.diaphragmLightPosition, 10, 40, setupAperture, document, handler, id, clonedComp);
            }
            $(document).bind("mousemove", handler);
        }
}


function setupAdjustCaliper() {
    textSetup("Move the caliper knob so the aperture light is on the specimen.", "62%", "60%");
    id = "#caliperKnob"
        if (setupCaliper.isActive()) {
             //var clonedComp = highlightComponent("#caliperKnob");

             var clonedComp2 = highlightComponent("#yCaliperKnob");
             var clonedComp2 = highlightComponent("#xCaliperKnob");
 
            //bringToFront($(id));
            bringToFront($("#xCaliperKnob"));
            bringToFront($("#yCaliperKnob"));
            
            var handler = function(){    
                subHandler(ms.xcaliper, 5, 20, setupCaliper, document, handler, id, null);
                subHandler(ms.ycaliper, 5, 20, setupCaliper, document, handler, id, null);
            }
            $(document).bind("mousemove", handler);

        }

}
