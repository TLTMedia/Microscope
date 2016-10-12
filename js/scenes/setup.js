
/*
 * setup.js
 *
 * Scene 2
 * Third scene that teaches student how to setup the microscope 
 */

// ===== Hardcoded Bounds ===== //



// ====== Start Trigger ======= //
function textSetupSwitch() {
    popupOn("First, let's turn on the light switch.", {
            "left": "10%",
            "top": "73%",
            });
}



function textSetupSlide() {
    popupOn("Now take the slide and put it against the caliper.", {
            "left": "10%",
            "top": "50%",
            });
}


// ====== Enable trigger functionalityr ======= //
function setupEnableSwitch() {
    textSetupSwitch();
    $("#switch").click(function() {
            if (setupLightSwitch.isActive()) {
            setupLightSwitch.complete();
            }
            });
}

function setupEnableSlide(){
    textSetupSlide();
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
