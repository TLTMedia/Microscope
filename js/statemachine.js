/*
 * statemachine.js
 *
 * Responsible for feedback on events triggered by the user.
 * Singleton design pattern (Instantiate ONLY once).
 *
 **/



//Globalize drag components (this is fine because there cannot be multiple drag instances unless user is not homosapien)
var isDown = false;

var prevX = 0;
var prevY = 0;

//** State machine boundaries are defined in global.js 

/*
 * We should introduce the idea of a state machine which represents the state
 * of the microscope at any given time. The machine should be able to
 * transition into other states seamlessly, regardles of the current state.
 */

// Everything is set to minimum on init
class StateMachine {
    constructor() {
        this.lightStatus = 0; // Brightness of the light ranged 0-1. 0 being off.
        this.eyepiecePosition = 0;
        this.knobPosition = 0;
        this.xslide = 0;
        this.yslide = 0;
        this.diaphragmLightPosition = 0;
        this.diaphragmHeightPosition = 0;
        this.diopterPosition = 0;
        this.xcaliper = 0;
        this.ycaliper = 0;
        this.yheight = 0;
        this.yknobcaliper = 0;
        this.lensePosition = 0;
        this.zoom = 1;
        this.slideBlur = 0;
        this.slideBlur2 = 0;
        this.lenseWheel = 0;
        this.inBounds = true;
        this.lenseStates = ["#lenses1Red", "#lenses2", "#lenses3", "#lenses4Yellow", "#lenses5", "#lenses6", "#lenses7Blue", "#lenses8", "#lenses9", "#lenses10White", "#lenses11", "#lenses12"];
        console.log("State machine has been created and updated.");
    }

    // Set values to setup values
    setup() {
        sm_orig["MAX_Y_CALIPER"] += sm_orig["MAX_KNOB"];
        sm_orig["MIN_Y_CALIPER"] += sm_orig["MAX_KNOB"];
        this.lightStatus = 0; // Brightness of the light ranged 0-1. 0 being off.
        this.eyepiecePosition = 10;
        this.knobPosition = sm_orig["MAX_KNOB"];
        this.xslide = 0;
        this.yslide = 5 + this.knobPosition;
        this.diaphragmLightPosition = 0;
        this.diaphragmHeightPosition = 270 / 12;
        this.diopterPosition = 0;
        this.xcaliper = 0;
        this.ycaliper = 5 + this.knobPosition;
        this.yheight = 0 + this.knobPosition;
        this.yknobcaliper = 0 + this.knobPosition;
        this.lensePosition = 5;
        this.zoom = 1;
        this.slideBlur = 0;
        this.slideBlur2 = 0;
        this.lenseWheel = 0;
        this.inBounds = true;
        this.lenseStates = ["#lenses1Red", "#lenses2", "#lenses3", "#lenses4Yellow", "#lenses5", "#lenses6", "#lenses7Blue", "#lenses8", "#lenses9", "#lenses10White", "#lenses11", "#lenses12"];
        console.log("State machine is set to default values.");
    }
}



ms = new StateMachine();
ms.setup()

    /* Translate Reduce (DRY) - HTML
     *
     * Condense all transforms into a single method and pass by argument.
     * 
     */
    function translateReduce(components, x, y) {
        $(components).css({
            "-webkit-transform": "translate(" + x + "px," + y + "px)",
            "-ms-transform": "translate(" + x + "px," + y + "px)",
            "-moz-transform": "translate(" + x + "px," + y + "px)",
            "transform": "translate(" + x + "px," + y + "px)"
        });
    }



    /* Translate Reduce (DRY) - SVGS
     *
     * Condense all transforms into a single method and pass by argument.
     * 
     */
    function translateReduceSVG(components, x, y) {
        $(components).attr("transform", "translate(" + x + " " + y + ")");
    }

/* 
   Call updateAnimation() for everytime there is a state change. The microscope animation is dependent on only ONE source, and that is the state of the machine. Thus, everytime the state of the machine changes from user input, the changes of the scope should reflect all at once. 
   */
function updateAnimation() {
    W_RAT = $(window).width()/$(window).height();
    var aspectRatio = 4/3;
    /* Microscope animations */
    translateReduceSVG("#ocularRight, #ocularRightCopy", ms.eyepiecePosition, 0);
    translateReduceSVG("#ocularLeftCopy", -1 * ms.eyepiecePosition, 0);
    translateReduceSVG("#ocularLeftDiopter", -1 * ms.eyepiecePosition, ms.diopterPosition);

    translateReduceSVG("#friend", -1 * ms.eyepiecePosition, 0);
    translateReduceSVG("#ocularLeft", -1 * ms.eyepiecePosition, 0);
    translateReduceSVG("#slideStage, #stageLight", 0, ms.knobPosition);
    translateReduceSVG("#slide", ms.xslide, ms.yslide);
    translateReduceSVG("#apertureKnob", ms.diaphragmLightPosition * -1, ms.knobPosition + ms.diaphragmHeightPosition / 3) ;
    translateReduceSVG("#diaphragm, #aperture, #diaphragmCopy", 0, ms.knobPosition + ms.diaphragmHeightPosition / 3);
    translateReduceSVG("#adjustDHeight", 0, ms.diaphragmHeightPosition);
    translateReduceSVG("#caliperMetal, #caliperKnob, #caliper", 0, ms.yknobcaliper);
    translateReduceSVG("#caliperMetal, #ycaliper, #xcaliper", ms.xcaliper, ms.ycaliper);

    // Aperture precision
    $("#stageLight ellipse").attr("rx", 12-((sm_orig.MAX_DIAPHRAGM_HEIGHT-ms.diaphragmHeightPosition)/2));
    $("#stageLight ellipse").attr("ry", 6-((sm_orig.MAX_DIAPHRAGM_HEIGHT-ms.diaphragmHeightPosition)/4));

    //console.log(W_RAT);
    if(W_RAT <aspectRatio){
        translateReduce("#slideView", ms.eyepiecePosition * (Math.pow(4*(1/W_RAT),-1)+aspectRatio), 0);
        translateReduce("#slideView2", -ms.eyepiecePosition * (Math.pow(3*(1/W_RAT),-1)+aspectRatio), 0);
    } else{
        translateReduce("#slideView", ms.eyepiecePosition * Math.pow(3*(1/W_RAT),2), 0);
        translateReduce("#slideView2", -ms.eyepiecePosition * Math.pow(3*(1/W_RAT),2), 0);
    }
    //

    //console.log($(window).width());
    //console.log(ms.xcaliper);
    //console.log(ms.xslide + ", " + (ms.yslide-ms.knobPosition));
    // We can derive the slide content offset from the position on the scope
        
     
    //console.log(ms.knobPosition);
    /* Slide Contents Animations */
    // Caliper movements on slide.
    //translateReduce("#slideContents, #slideContents2", (ms.xcaliper * 10), (ms.ycaliper * 10)+(10*(1*(sm_orig["MAX_KNOB"]-ms.knobPosition))));

    //console.log("Ycaliper: " + ms.ycaliper*10);
    //console.log("Offset: " + 10*(sm_orig["MAX_KNOB"]-ms.knobPosition));
    //var yCali = ((ms.ycaliper*10)+((10*(sm_orig["MAX_KNOB"]-ms.knobPosition))));
    var yCali = (ms.yslide - ms.knobPosition) * 10;
    var xCali = (ms.xslide) * 10;
    //console.log(yCali);
    // Microscope darkness (hack is based off of a black background to darken)
    // [0,40] -> Expand to [0,60]
    $("#slideContents,#slideContents2,#stageLight").css({
        "opacity": (0.4) + ((1.5 * ms.diaphragmLightPosition) / 100)
    });

    //console.log("scale(" + ms.zoom + ") translate(" + xCali + "px," + yCali + "px)");

    $("#slideContents, #slideContents2").css({
        "transform": "scale(" + ms.zoom + ") translate(" + xCali + "px," + yCali + "px)"
    });

    var chosenBlur = ms.slideBlur;
    if (!ms.inBounds) {}

    // Initializes both slide contents to blur
    $("#slideContents, #slideContents2").css({
        "-ms-filter": "blur(" + Math.abs(chosenBlur) + "px)",
        "-webkit-filter": "blur(" + Math.abs(chosenBlur) + "px)",
        "filter": "blur(" + Math.abs(chosenBlur) + "px)"
    });

    // Reblurs the second slide contents (with diopter as a factor)
    var chosenBlur = ms.eyepiecePosition + ms.slideBlur2 
        $("#slideContents2").css({
            "-ms-filter": "blur(" + Math.abs(chosenBlur) + "px)",
            "-webkit-filter": "blur(" + Math.abs(chosenBlur) + "px)",
            "filter": "blur(" + Math.abs(chosenBlur) + "px)"
        });

}


/* Toggles the light switch */
function enableLightSwitch() {

    $("#switch").on('click', function() {
        ms.lightStatus = (1 + ms.lightStatus) % 2;
        if (ms.lightStatus > 0) {
            $("#illuminationLight").removeClass("elementOff");
            $("#illuminationLight").addClass("lightOn");
        } else {
            $("#illuminationLight").removeClass("lightOn");
            $("#illuminationLight").addClass("elementOff");
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

                    if (ms.eyepiecePosition < sm_orig["MAX_OCULAR"]) {
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
                if (prevY < event.pageY) {
                    if (ms.knobPosition < sm_orig["MAX_KNOB"]) {
                        ms.zoom -= val * 0.1;
                        ms.yslide += val;
                        ms.ycaliper += val;
                        sm_orig["MAX_Y_CALIPER"] += val;
                        sm_orig["MIN_Y_CALIPER"] += val;
                        ms.yknobcaliper += val;
                        ms.yheight += val;
                        ms.knobPosition += val;
                        ms.slideBlur += 0.15;
                    }
                } else if ((prevY > event.pageY)) {
                    if (ms.knobPosition > sm_orig["MIN_KNOB"]) {
                        ms.zoom += val * 0.1;
                        ms.yslide -= val;
                        ms.ycaliper -= val;
                        ms.yknobcaliper -= val;
                        sm_orig["MAX_Y_CALIPER"] -= val;
                        sm_orig["MIN_Y_CALIPER"] -= val;
                        ms.yheight -= val;
                        ms.knobPosition -= val;
                        ms.slideBlur -= 0.15;

                    }
                }
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
}


function enableFineKnob() {
    /*Params: knob type, degree of slide*/
    function addFineDrag(coursePart, power) {
        var val = power;
        $(coursePart)
            .mousedown(function() {
                isDown = true;
            })
        .mousemove(function(event) {
            if (isDown) {
                if (prevY > event.pageY) {
                    if (ms.slideBlur < sm_orig["MAX_BLUR"]) {
                        ms.slideBlur += val;
                    }
                } else if ((prevY < event.pageY)) {
                    if (ms.slideBlur > sm_orig["MIN_BLUR"]) {
                        ms.slideBlur -= val;
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

    addFineDrag("#knobsFine", 0.2);
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
                if ((prevX > event.pageX)) {
                    if (ms.diaphragmLightPosition < sm_orig["MAX_DIAPHRAGM_LIGHT"]) {
                        ms.diaphragmLightPosition += val;
                    }
                } else if ((prevX < event.pageX)) {
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
    addDiaphragmDrag("#diaphragm, #apertureKnob");

}


function enableCaliper() {
    // Low knob
    function addCaliperXDrag(part) {
        var val = 1;

        $(part)
            .mousedown(function() {
                isDown = true;
            })
        .mousemove(function(event) {
            if (isDown) {
                if ((prevX < event.pageX)) {
                    if (ms.xcaliper < sm_orig["MAX_X_CALIPER"]) {
                        ms.xcaliper += val;
                        ms.xslide += val;
                    }
                } else if ((prevX > event.pageX)) {
                    if (ms.xcaliper > sm_orig["MIN_X_CALIPER"]) {
                        ms.xcaliper -= val;
                        ms.xslide -= val;
                    }
                }
                prevX = event.pageX;

                // Blur out if out of magic bounds
                if (ms.xcaliper > -10 && ms.xcaliper < 10 && ms.ycaliper > -10 && ms.ycaliper < 10) {
                    ms.inBounds = true;
                } else {
                    ms.inBounds = false;
                }

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
                if ((prevX < event.pageX)) {
                    if (ms.ycaliper < sm_orig["MAX_Y_CALIPER"]) {
                        ms.ycaliper += val;
                        ms.yslide += val;
                    }
                } else if ((prevX > event.pageX)) {
                    if (ms.ycaliper > sm_orig["MIN_Y_CALIPER"]) {
                        ms.ycaliper -= val;
                        ms.yslide -= val;
                    }
                }
                prevX = event.pageX;
                // Blur out if out of magic bounds
                if (ms.xcaliper > sm_orig["MIN_X_BOUND"] && ms.xcaliper < sm_orig["MAX_X_BOUND"] && ms.ycaliper > sm_orig["MIN_Y_BOUND"] && ms.ycaliper < sm_orig["MAX_Y_BOUND"]) {
                    ms.inBounds = true;
                } else {
                    ms.inBounds = false;
                }


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
    addCaliperXDrag("#xCaliperKnob");
    addCaliperYDrag("#yCaliperKnob");

}


// Total of 8 states on the lenses
function enableLenses() {
    var dangerEnable = false; 
    var rollBack = {};

    function testDanger(){
        if (!dangerEnable && (ms.lensePosition+1 == 9 || ms.lensePosition-1==9)){
            rollBack = {"type": $(".popupInstruct").text(), "text": $("#popupText").text()}

            //console.log(rollBack);
            updatePopup("Warning", "Stop! You risk damaging the 100X objective by moving passed the slide. Go the other way.");

            dangerEnable = true;
        }
        else if (dangerEnable){
            //console.log(rollBack);
            dangerEnable = false;
            updatePopup(rollBack.type, rollBack.text);
        }
    }

    function addLenseClick(part) {
        $(part)
            .mousedown(function() {
                isDown = true;
            })
        .mousemove(function(event) {
            if (isDown) {
                //console.log(ms.lensePosition); //10,9,8
                if ((prevX < event.pageX)) {
                    if (ms.lenseWheel % 10 == 0) {
                        $(ms.lenseStates[ms.lensePosition]).addClass("st0");
                        ms.lensePosition = ((ms.lensePosition + 1) % ms.lenseStates.length);
                        testDanger();
                        $(ms.lenseStates[ms.lensePosition]).removeClass("st0");
                        ms.lenseWheel = 1;
                    } else {
                        ms.lenseWheel++;
                    }
                } else if ((prevX > event.pageX)) {
                    if (ms.lenseWheel % 10 == 0) {
                        $(ms.lenseStates[ms.lensePosition]).addClass("st0");
                        ms.lensePosition = ((ms.lensePosition - 1) % ms.lenseStates.length)
            testDanger();

        if (ms.lensePosition == -1) ms.lensePosition = ms.lenseStates.length - 1;
        $(ms.lenseStates[ms.lensePosition]).removeClass("st0");
        ms.lenseWheel = 19;
                    } else {
                        ms.lenseWheel--;
                    }

                }
                prevX = event.pageX;


                // Invoke danger of proceeding to next lense


                if (ms.lenseStates[ms.lensePosition].includes("Red")) {
                    swapMag(1);
                    ms.slideBlur = 4;
                } else if (ms.lenseStates[ms.lensePosition].includes("Yellow")) {
                    swapMag(2);
                    ms.slideBlur = 4;
                } 
                else if (ms.lenseStates[ms.lensePosition].includes("White")){
                    swapMag(2);
                } 
                else if (ms.lenseStates[ms.lensePosition].includes("Blue")){
                    swapMag(2);
                    ms.slideBlur = 4;
                }

                // no viable lense state renders no images 
                else {
                    ms.zoomSave = ms.zoom;
                    swapMag(-1);
                }
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
    addLenseClick("#lensesBasePath");
}


// Enable functionality for the left diopter
function enableDiopter(){
    function addDiopterDrag(ocularPart, power) {
        var val = power;
        $(ocularPart)
            .mousedown(function() {
                isDown = true;
            })
        .mousemove(function(event) {
            if (isDown) {
                if (prevX > event.pageX) {
                    if (ms.diopterPosition > sm_orig["MIN_DIOPTER"]) {
                        ms.diopterPosition -= power;
                        ms.slideBlur2 -= 1; 
                    }
                } else if ((prevX < event.pageX)) {
                    if (ms.diopterPosition < sm_orig["MAX_DIOPTER"]) {
                        ms.diopterPosition += power;
                        ms.slideBlur2 += 1;
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
    addDiopterDrag("#friend", 0.5);
}


function enableSideDiaphragmRotate() {
    // Abstracted in Jimrambe's code, passed in state machine.
    setupKnobs(ms, updateAnimation);
}

//Enables all the functionality of the ms.
function enableScope() {
    bindTooltip();
    enableLightSwitch();
    enableEyepiece();
    enableCoarseKnob();
    enableFineKnob();
    enableDiaphragmLight();
    enableCaliper();
    enableSideDiaphragmRotate();
    enableDiopter();
    updateAnimation();
}


updateAnimation()
