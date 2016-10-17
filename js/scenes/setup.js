
/*
 * setup.js
 *
 * Scene 2
 * Third scene that teaches student how to setup the microscope 
 */


// ====== Start Trigger ======= //
function setupEnableSwitch() {
    textSetup("First, let's turn on the light switch.", "10%", "73%");
    $("#switch").click(function() {
            if (setupLightSwitch.isActive()) {
            setupLightSwitch.complete();
            }
            });
}

function setupEnableSlide(){
    textSetup("Now take the slide and put it against the caliper.", "10%", "50%");
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
