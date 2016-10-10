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
    "#knobsFine"
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
            this.diaphragmLightPosition = 0;
            this.diaphragmHeightPosition = 0;
            this.xcaliper = 0;
            this.ycaliper = 0;
            this.view = 0; //0 for front, 1 for left
            console.log("State machine has been created");
        }

    }

microscope = new StateMachine();


/* User global states
 */

//Globalize drag components (this is fine because there cannot be multiple drag instances unless user is not homosapien)
var isDown = false;
var prevX = 0;
var prevY = 0;
var knobSpread = 0;
var MAX_OCULAR = 50;
var MAX_KNOB = 40;
var MIN_KNOB = -20;
var MAX_DIAPHRAGM_LIGHT = 40;
var MIN_DIAPHRAGM_HEIGHT = -15;
var MAX_DIAPHRAGM_HEIGHT = 15;
var MAX_CALIPER = 20;
var MIN_CALIPER = -20;


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




/* Toggles the light switch */
function enableLightSwitch() {
    //$("#headerText").text("Turn on the light.");
    $("#switch").on('click', function() {
            microscope.lightStatus = (1 + microscope.lightStatus) % 2;
            console.log(microscope.lightStatus);

            if (microscope.lightStatus > 0) {
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

        if (ocularPart == "#ocularRight") {
            val = 1;

        } else if (ocularPart == "#ocularLeft") {
            ocularPartOpposite = "#ocularRight";
        }

        $(ocularPart)
            .mousedown(function() {
                    isDown = true;
                    })
        .mousemove(function(event) {
                if (isDown) {
                if ((prevX < event.pageX && ocularPart == "#ocularRight") || (prevX > event.pageX && ocularPart == "#ocularLeft")) {
                if (microscope.eyepiecePosition < MAX_OCULAR) {
                microscope.eyepiecePosition += val;
                }
                } else if ((prevX > event.pageX && ocularPart == "#ocularRight") || (prevX < event.pageX && ocularPart == "#ocularLeft")) {
                if (microscope.eyepiecePosition > 0) {
                microscope.eyepiecePosition -= val;
                }
                }

                $("#ocularRight").css({
                    "-website-transform": "translate(" + microscope.eyepiecePosition + "px," + 0 + "px)",
                    "-ms-transform": "translate(" + microscope.eyepiecePosition + "px," + 0 + "px)",
                    "transform": "translate(" + microscope.eyepiecePosition + "px," + 0 + "px)"
                    });
                $("#ocularLeft").css({
                    "-website-transform": "translate(" + -1 * microscope.eyepiecePosition + "px," + 0 + "px)",
                    "-ms-transform": "translate(" + -1 * microscope.eyepiecePosition + "px," + 0 + "px)",
                    "transform": "translate(" + -1 * microscope.eyepiecePosition + "px," + 0 + "px)"
                    });
                prevX = event.pageX;
                microscope.eyepiecePosition = microscope.eyepiecePosition;
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
                if (knobSpread < MAX_KNOB) {
                knobSpread += val;
                }
                } else if ((prevY < event.pageY)) {
                if (knobSpread > MIN_KNOB) {
                knobSpread -= val;
                }
                }
                console.log(knobSpread);
                $("#slideStage").css({
                    "-website-transform": "translate(" + 0 + "px," + knobSpread + "px)",
                    "-ms-transform": "translate(" + 0 + "px," + knobSpread + "px)",
                    "transform": "translate(" + 0 + "px," + knobSpread + "px)"
                    });
                prevY = event.pageY;
                microscope.knobPosition = knobSpread;
                }
                })
        .mouseup(function() {
                isDown = false;
                })
        .mouseleave(function() {
                isDown = false;
                });
    }

    addCourseDrag("#knobsCoarse", 1.0);
    addCourseDrag("#knobsFine", 0.5);
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
                if (microscope.diaphragmLightPosition < MAX_DIAPHRAGM_LIGHT) {
                microscope.diaphragmLightPosition += val;
                }
                } else if ((prevX > event.pageX)){ 
                if (microscope.diaphragmLightPosition > 0) {
                microscope.diaphragmLightPosition -= val;
                }
                }
                $("#apertureKnob").css({
                    "-website-transform": "translate(" + microscope.diaphragmLightPosition + "px," + 0 + "px)",
                    "-ms-transform": "translate(" + microscope.diaphragmLightPosition + "px," + 0 + "px)",
                    "transform": "translate(" + microscope.diaphragmLightPosition + "px," + 0 + "px)"
                    });
                prevX = event.pageX;
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
                if (microscope.xcaliper < MAX_CALIPER) {
                microscope.xcaliper += val;
                }
                } else if ((prevX > event.pageX)){ 
                if (microscope.xcaliper > MIN_CALIPER) {
                microscope.xcaliper -= val;
                }
                }
                $("#xcaliper").css({
                    "-website-transform": "translate(" + microscope.xcaliper + "px," + microscope.ycaliper + "px)",
                    "-ms-transform": "translate(" + microscope.xcaliper + "px," + microscope.ycaliper + "px)",
                    "transform": "translate(" + microscope.xcaliper + "px," + microscope.ycaliper + "px)"
                    });
                prevX = event.pageX;
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
                if (microscope.ycaliper < MAX_CALIPER) {
                microscope.ycaliper += val;
                }
                } else if ((prevX > event.pageX)){ 
                if (microscope.ycaliper > MIN_CALIPER) {
                microscope.ycaliper -= val;
                }
                }
                $("#ycaliper").css({
                    "-website-transform": "translate(" +  0 + "px," + microscope.ycaliper + "px)",
                    "-ms-transform": "translate(" + 0 + "px," +  microscope.ycaliper+ "px)",
                    "transform": "translate(" + 0 + "px," + microscope.ycaliper + "px)"
                    });

                $("#xcaliper").css({
                    "-website-transform": "translate(" + microscope.xcaliper + "px," + microscope.ycaliper + "px)",
                    "-ms-transform": "translate(" + microscope.xcaliper + "px," + microscope.ycaliper + "px)",
                    "transform": "translate(" + microscope.xcaliper + "px," + microscope.ycaliper + "px)"
                    });
                prevX = event.pageX;
                }
        })
        .mouseup(function() {
                isDown = false;
                })
        .mouseleave(function() {
                isDown = false;
                });
    }
    addCaliperXDrag("#xcaliperKnob");
    addCaliperYDrag("#ycaliperKnob");
}


/* 
 * Rotate functionality attributed to mgibsonbr for the algorithm.
 * http://stackoverflow.com/questions/14599738/how-to-make-object-rotate-with-drag-how-to-get-a-rotate-point-around-the-origin 
 * 
 */

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

        if (last_degree < degree && degree%3==0){
        if (microscope.diaphragmHeightPosition < MAX_DIAPHRAGM_HEIGHT) {
        microscope.diaphragmHeightPosition++;
        }
        }
        else if (last_degree > degree && degree%3==0){
        if (microscope.diaphragmHeightPosition > MIN_DIAPHRAGM_HEIGHT){
        microscope.diaphragmHeightPosition--;
        }
        }

        last_degree = parseInt(degree);
        //console.log(degree); 
        //console.log(microscope.diaphragmHeightPosition);
        $("#adjustDHeight").css({
                "-website-transform": "translate(" + 0 + "px," + microscope.diaphragmHeightPosition + "px)",
                "-ms-transform": "translate(" + 0 + "px," + microscope.diaphragmHeightPosition + "px)",
                "transform": "translate(" + 0 + "px," + microscope.diaphragmHeightPosition + "px)"
                });

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
        var s_x = e.pageX,
        s_y = e.pageY;

        // Saves the last angle for future iterations
        var s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
        s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
        s_rad += last_angle;
        target_wp.data("last_angle", s_rad);
        })
}

//Enables all the functionality of the microscope.
function enableScope(){
    bindTooltip();
    enableLightSwitch();
    enableEyepiece();
    enableCoarseKnob();
    enableDiaphragmLight();
}

function enableFrontScope(){
    enableSideDiaphragmRotate()
}

// Rotates the view of the microscope
function rotateView(){  
    var adjustView = function(){
        resizeWindow();
        if (microscope.view==0){
            enableScope();
        }
        else{
            enableFrontScope();
        }
    }

    microscope.view = (microscope.view+1)%2;
    if (microscope.view == 1){
        $('#microscope').load('img/sideview.svg', adjustView);
    }
    else{
        $('#microscope').load('img/microscope.svg', adjustView);
    }
}


function toggleDiaphragmLight() {}
function toggleDiaphragmHeight() {}
function toggleFine() {}
function toggleCoarse() {}
function toggleLenses() {}
function toggleCaliper() {}
function toggleEyepiece() {}
