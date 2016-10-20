
/*
 * setup.js
 *
 * Scene 2
 * Third scene that teaches student how to setup the microscope 
 */


// ====== Start Trigger ======= //
function setupEnableSwitch() {
    textSetup("First, let's turn on the light switch.", "60%", "73%");
    $("#switch").click(function() {
            if (setupLightSwitch.isActive()) {
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

function setupDLight() {
    textSetup("Move the aperture knob slightly to the left.", "55%", "60%");
    id = "#diaphragm"
    if (setupAperture.isActive()) { 
        var clonePart = $(id).clone();
        clonePart.toggleClass("highlightPart")
        clonePart.attr("id", id+"Copy");
        clonePart.attr("filter","url(#blurMe)");
        clonePart.attr("z-index", "0");
        clonePart.children().attr("fill", "rgba(0,0,0,0)");
        
        clonePart.appendTo($(id).parent())
        var handler = function(){
            subHandler(microscope.diaphragmLightPosition, 5, 30, setupAperture, document, handler, id);
        }
        $(document).bind("mousemove", handler);
    }
}


function setupAdjustCaliper() {
    textSetup("Move the caliper knob so the aperture light is on the specimen.", "62%", "60%");
    id = "#caliperKnob"
    if (setupCaliper.isActive()) {
         $(id).toggleClass("highlightPart"); 
        var handler = function(){    
            subHandler(microscope.xcaliper, 5, 20, setupCaliper, document, handler, id);
            subHandler(microscope.ycaliper, 5, 20, setupCaliper, document, handler, id);
        }
        $(document).bind("mousemove", handler);

        }
    
}
