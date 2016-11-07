/*
 * statemachine.js
 *
 * Responsible for feedback on events triggered by the user.
 * Singleton design pattern (Instantiate ONLY once).
 *
 **/

var components = [
"#frame",
    "#base",
    "#diaphragm",
    "#diaphragmKnob",
    "#slideStage",
    "#slide",
    "#caliperKnob",
    "#caliper",
    "#xcaliper",
    "#ycaliper",
    "#apertureFixed",
    "#aperture",
    "#illumination",
    "#eyepiece",
    "#ocularLensBase",
    "#ocularRight",
    "#ocularLeft",
    "#lenses",
    "#switch",
    "#knobsCoarse",
    "#knobsFine",
    "#lensesBasePath",
    "#lensesBase",
    "#slide",
    
    "#lenses1Red",
    "#lenses2",
    "#lenses3",
    "#lenses4Yellow",
    "#lenses5",
    "#lenses6",
    "#lenses7Blue",
    "#lenses8",
    "#lenses9",
    "#lenses10White",
    "#lenses11",
    "#lenses12",


    // "#light"     // to be added in separate SVG to reduce load delay
    ];


    var overlapnents = [
    "#lensesRed",
    "#lensesBlue",
    "#lensesYellow",
    "#lensesWhite",
    ]

    // Steps ordered in an array
    var stepTexts = ["Turn on the light.", "Adjust the eyepieces"];
    var stepIndex = 0;

    /*
     * We should introduce the idea of a state machine which represents the state
     * of the microscope at any given time. The machine should be able to
     * transition into other states seamlessly, regardles of the current state.
     */

    class StateMachine {
        constructor() {
            this.lightStatus = 0; // Brightness of the light ranged 0-1. 0 being off.
            this.eyepiecePosition = 0;
            this.knobPosition = 0;
            this.xslide = 0;
            this.yslide = 0;
            this.diaphragmLightPosition = 5;
            this.diaphragmHeightPosition = 0;
            this.xcaliper = 0;
            this.ycaliper = 0;
            this.yheight = 0;
            this.yknobcaliper = 0;
            this.lensePosition = 0;
            this.zoom = 1;
            this.slideBlur = 0;
            this.lenseStates = ["#lensesRed", "#lensesYellow", "#lensesBlue", "#lensesWhite"];
            this.view = 0; //0 for front, 1 for left
            console.log("State machine has been created and updated.");
        }

    }

ms = new StateMachine();

/* User global states
*/

//Globalize drag components (this is fine because there cannot be multiple drag instances unless user is not homosapien)
var isDown = false;
var prevX = 0;
var prevY = 0;
var MAX_OCULAR = 50;
var MAX_KNOB = 20;
var MIN_KNOB = -10;
var MAX_DIAPHRAGM_LIGHT = 40;
var MIN_DIAPHRAGM_HEIGHT = -15;
var MAX_DIAPHRAGM_HEIGHT = 15;
var MAX_CALIPER = 20;
var MIN_CALIPER = -20;
var last_angle = 0; 

// Variables needed for rotating
var target_wp,o_x, o_y, h_x, h_y, last_angle, last_degree;

//function lowMagnification(){
//    $("#headerText").text("Test 2 ");
//}

// function highMagnification(){
//    $("#headerText").text("");
// }


// function sideViewOn(){}
// function sideViewOff(){}


/* Translate Reduce (DRY)
 *
 * Condense all transforms into a single method and pass by argument.
 * 
 */
function translateReduce(components, x, y){
    $(components).css({
     "-webkit-transform": "translate(" + x + "px," + y + "px)",
    "-ms-transform": "translate(" + x + "px," + y + "px)",
    "transform": "translate(" + x +  "px," + y + "px)"
    });
}

/* 
   Call updateAnimation() for everytime there is a state change. The microscope animation is dependent on only ONE source, and that is the state of the machine. Thus, everytime the state of the machine changes from user input, the changes of the scope should reflect all at once. 
   */
function updateAnimation(){
    /* Microscope animations */
    translateReduce("#ocularRight", ms.eyepiecePosition, 0);
    translateReduce("#ocularLeft", -1 * ms.eyepiecePosition, 0);
    translateReduce("#slideStage", 0, ms.knobPosition);
    translateReduce("#slide", ms.xslide, ms.yslide);
    translateReduce("#apertureKnob", ms.diaphragmLightPosition, ms.knobPosition);
    translateReduce("#diaphragm, #aperture", 0, ms.knobPosition);
    translateReduce("#adjustDHeight", 0, ms.diaphragmHeightPosition);
    translateReduce("#caliperKnob, #caliper", 0, ms.yknobcaliper);
    translateReduce("#ycaliper, #xcaliper", ms.xcaliper, ms.ycaliper);

    /* Slide Contents Animations */
    // Caliper movements on slide.
    translateReduce("#slideContentsContainer", ms.xcaliper, ms.ycaliper-ms.yheight);
    // Microscope darkness (hack is based off of a black background to darken)
    // [0,40] -> Expand to [0,100]
    $("#slideContents").css({
        "opacity" : (2.5*ms.diaphragmLightPosition)/100
    });

    $("#slideContents").css({
        "transform": "scale(" + ms.zoom + ")" 
    });

    $("#slideContents").css({
        "-ms-filter": "blur(" + Math.abs(ms.slideBlur) + "px)", 
        "-webkit-filter": "blur(" + Math.abs(ms.slideBlur) + "px)", 
        "filter": "blur(" + Math.abs(ms.slideBlur) + "px)" 
    });


}



/* Toggles the light switch */
function enableLightSwitch() {
    //$("#headerText").text("Turn on the light.");
    $("#switch").on('click', function() {
        ms.lightStatus = (1 + ms.lightStatus) % 2; 
        if (ms.lightStatus > 0) {
            $("#light").removeClass("elementOff");
            $("#light").addClass("lightOn");
        } else {
            $("#light").removeClass("lightOn");
            $("#light").addClass("elementOff");
        }

    });
}


// === Functionality for the FRONT view of the Microscope ==== /// 

/*Enables functionality for the eyepiece on call.*/
function enableEyepiece() {
    function addOcularDrag(ocularPart) {
        var ocularPartOpposite = "#ocularLeft";
        var val = 1;
        //Swap logic based on which side of the component is being dragged.

        if (ocularPart == "#ocularLeft") {
            ocularPartOpposite = "#ocularRight";
        }

        $(ocularPart)
            .mousedown(function() {
                isDown = true;
            })
        .mousemove(function(event) {
            if (isDown) {
                if ((prevX < event.pageX && ocularPart == "#ocularRight") || (prevX > event.pageX && ocularPart == "#ocularLeft")) {
                    if (ms.eyepiecePosition < MAX_OCULAR) {
                        ms.eyepiecePosition += val;
                    }
                } else if ((prevX > event.pageX && ocularPart == "#ocularRight") || (prevX < event.pageX && ocularPart == "#ocularLeft")) {
                    if (ms.eyepiecePosition > 0) {
                        ms.eyepiecePosition -= val;
                    }
                } 
                prevX = event.pageX;
                updateAnimation();
            }
        })
        .mouseup(function() {
            isDown = false;
        })
        .mouseleave(function() {
            isDown = false;
        });
    }
    addOcularDrag("#ocularRight");
    addOcularDrag("#ocularLeft");
}

/* Modify the level of the state up and down to focus. */
function enableCoarseKnob() {
    /*Params: knob type, degree of slide*/
    function addCourseDrag(coursePart, power) {
        var val = power;
        $(coursePart)
            .mousedown(function() {
                isDown = true;
            })
        .mousemove(function(event) {
            if (isDown) {
                if (prevY > event.pageY) {
                    if (ms.knobPosition < MAX_KNOB) {
                        ms.knobPosition += val;
                        ms.yslide += val;
                        ms.ycaliper += val;
                        ms.yknobcaliper +=val;
                        ms.yheight += val;
                        ms.zoom += val*0.02;
                        if (coursePart == "#knobsFine"){
                            ms.slideBlur += 0.2;
                        }
                        else if (coursePart == "#knobsCoarse"){
                            ms.slideBlur += 0.1;
                        }
                    }
                } else if ((prevY < event.pageY)) {
                    if (ms.knobPosition > MIN_KNOB) {
                        ms.knobPosition -= val;
                        ms.yslide -= val;
                        ms.ycaliper -= val;
                        ms.yknobcaliper -=val;
                        ms.yheight -= val;
                        ms.zoom -= val*0.02;
                        if (coursePart == "#knobsFine"){
                            ms.slideBlur -= 0.2;
                        }
                        else if (coursePart == "#knobsCoarse"){
                            ms.slideBlur -= 0.1;
                        }
 
 
                    }
                }
                //console.log(ms.knobPosition);
                prevY = event.pageY;
                updateAnimation();
            }
        })
        .mouseup(function() {
            isDown = false;
        })
        .mouseleave(function() {
            isDown = false;
        });
    }

    addCourseDrag("#knobsCoarse", 0.5);
    addCourseDrag("#knobsFine", 0.1);
}


/*Enables functionality for the eyepiece on call.*/
function enableDiaphragmLight() {
    function addDiaphragmDrag(part) {
        var val = 1;
        $(part)
            .mousedown(function() {
                isDown = true;
            })
        .mousemove(function(event) {
            if (isDown) {
                if ((prevX < event.pageX)){ 
                    if (ms.diaphragmLightPosition < MAX_DIAPHRAGM_LIGHT) {
                        ms.diaphragmLightPosition += val;
                    }
                } else if ((prevX > event.pageX)){ 
                    if (ms.diaphragmLightPosition > 0) {
                        ms.diaphragmLightPosition -= val;
                    }
                }
                prevX = event.pageX;
                updateAnimation();
            }
        })
        .mouseup(function() {
            isDown = false;
        })
        .mouseleave(function() {
            isDown = false;
        });
    }
    addDiaphragmDrag("#diaphragm");

}

function enableCaliper(){

    // Low knob
    function addCaliperXDrag(part) {
        var val = 1;

        $(part)
            .mousedown(function() {
                isDown = true;
            })
        .mousemove(function(event) {
            if (isDown) {
                if ((prevX < event.pageX)){ 
                    if (ms.xcaliper < MAX_CALIPER) {
                        ms.xcaliper += val;
                        ms.xslide += val;
                    }
                } else if ((prevX > event.pageX)){ 
                    if (ms.xcaliper > MIN_CALIPER) {
                        ms.xcaliper -= val;
                        ms.xslide -= val;
                    }
                }
                prevX = event.pageX;
                updateAnimation();
            }
        })
        .mouseup(function() {
            isDown = false;
        })
        .mouseleave(function() {
            isDown = false;
        });
    }

    function addCaliperYDrag(part) {
        var val = 1;

        $(part)
            .mousedown(function() {
                isDown = true;
            })
        .mousemove(function(event) {
            if (isDown) { 
                if ((prevX < event.pageX)){ 
                    if (ms.ycaliper < MAX_CALIPER) {
                        ms.ycaliper += val;
                        ms.yslide += val;
                        //                ms.xcaliper += (val/3);
                        //              ms.xslide += (val/3);
                    }
                } else if ((prevX > event.pageX)){ 
                    if (ms.ycaliper > MIN_CALIPER) {
                        ms.ycaliper -= val;
                        ms.yslide -= val;
                        //                ms.xcaliper -= (val/3);
                        //                ms.xslide -= (val/3);
                    }
                }
                prevX = event.pageX;
                updateAnimation();
            }
        })
        .mouseup(function() {
            isDown = false;
        })
        .mouseleave(function() {
            isDown = false;
        });
    }
    console.log("Caliper events set");
    addCaliperXDrag("#xcaliperKnob");
    addCaliperYDrag("#ycaliperKnob");

}


function enableLenses(){
    // For the sake of time, just make clicking rotate.
    function addLenseClick(part){
        $(ms.lenseStates[0]).css("opacity", "1");  
        $(part).css("opacity", "0");  
        $(part).click(function(){
            $(ms.lenseStates[ms.lensePosition]).css("opacity", "0");  
            ms.lensePosition = ((ms.lensePosition + 1) % ms.lenseStates.length) 
            $(ms.lenseStates[ms.lensePosition]).css("opacity", "1");     
        })
    }
    addLenseClick("#lenses");
    $("#lenses, #lensesRed, #lensesBlue, #lensesYellow, #lensesWhite").click(function(){console.log(this);});
}

/* 
 * Rotate functionality attributed to mgibsonbr for the algorithm.
 * http://stackoverflow.com/questions/14599738/how-to-make-object-rotate-with-drag-how-to-get-a-rotate-point-around-the-origin 
 * 
 */
var dir=0; //unset, setRight, setLeft

function enableSideDiaphragmRotate(){ 
    $('#draggableDiaphragm').mousedown(function (e) {
        h_x = e.pageX;
        h_y = e.pageY; // clicked point
        e.preventDefault();
        e.stopPropagation();
        isDown = true;
        target_wp = $(e.target).closest('#draggableDiaphragm');
        if (!target_wp.data("origin")) target_wp.data("origin", {
            left: target_wp.offset().left,
           top: target_wp.offset().top
        });
        o_x = target_wp.data("origin").left;
        o_y = target_wp.data("origin").top; // origin point

        last_angle = target_wp.data("last_angle") || 0;
    })

    $("#draggableDiaphragm").mousemove(function (e) {
        if (isDown) {
            var s_x = e.pageX,
    s_y = e.pageY; // start rotate point
    if (s_x !== o_x && s_y !== o_y) { //start rotate
        var s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
        s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
        s_rad += last_angle; // relative to the last one

        var degree = parseInt(s_rad * (360 / (2 * Math.PI)));

        if (dir==0){
        if (last_degree < degree && degree%3==0){
                dir=1;
        }
        else if (last_degree > degree && degree%3==0){
                dir=-1;
        }
        }
        if (dir!=0){
            // Turning Right
            if (ms.diaphragmHeightPosition < MAX_DIAPHRAGM_HEIGHT && dir == 1) {
                ms.diaphragmHeightPosition += dir;
            }
            // Turning Left
            else if(ms.diaphragmHeightPosition > MIN_DIAPHRAGM_HEIGHT && dir == -1){
                ms.diaphragmHeightPosition += dir;
            }
            // Detect directional change
            //
            //if (((last_degree > degree && dir == 1) || (degree < last_degree && dir == -1)) && (Math.abs(degree-last_degree) < 3) ) dir=0;
        }

        console.log()
        last_degree = parseInt(degree); 
        updateAnimation();
        target_wp.css('-moz-transform', 'rotate(' + degree + 'deg)');
        target_wp.css('-moz-transform-origin', '50% 50%');
        target_wp.css('-webkit-transform', 'rotate(' + degree + 'deg)');
        target_wp.css('-webkit-transform-origin', '50% 50%');
        target_wp.css('-o-transform', 'rotate(' + degree + 'deg)');
        target_wp.css('-o-transform-origin', '50% 50%');
        target_wp.css('-ms-transform', 'rotate(' + degree + 'deg)');
        target_wp.css('-ms-transform-origin', '50% 50%');
    }
        }
    }) // end mousemove

    $(document).mouseup(function (e) {
        isDown = false
        dir=0;
        var s_x = e.pageX,
    s_y = e.pageY;

    // Saves the last angle for future iterations
    var s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
    s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
    s_rad += last_angle;
    if (target_wp)
        target_wp.data("last_angle", s_rad);
    })
}

//Enables all the functionality of the ms.
function enableScope(){
    bindTooltip();
    enableLightSwitch();
    enableEyepiece();
    enableCoarseKnob();
    enableDiaphragmLight();
    enableCaliper();
    enableSideDiaphragmRotate()
    updateAnimation();
}

