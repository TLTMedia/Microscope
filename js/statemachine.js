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
        this.caliperBlade = 0;
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
        this.desiredFrame = this;
    }

    // Set values to setup values
    setup() {
        sm_orig["MAX_Y_CALIPER"] = sm_bd["MAX_Y_CALIPER"] + sm_orig["MAX_KNOB"];
        sm_orig["MIN_Y_CALIPER"] = sm_bd["MIN_Y_CALIPER"] + sm_orig["MAX_KNOB"];
        this.lightStatus = 0; // Brightness of the light ranged 0-1. 0 being off.
        this.eyepiecePosition = 10;
        this.knobPosition = sm_orig["MAX_KNOB"];
        this.xslide = 0;
        this.yslide = 5 + this.knobPosition;
        this.diaphragmLightPosition = 0;
        this.diaphragmHeightPosition = 270 / 12;
        this.diopterPosition = 0;
        this.caliperBlade = 0;
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

    // Freeze frame to ensure user follows tutorial appropriately.
    freezeState(desiredFrame){
        this.desiredFrame = desiredFrame;
    }

    /* Translate Reduce (DRY) - HTML
     *
     * Condense all transforms into a single method and pass by argument.
     */
    translateReduce(components, x, y) {
        $(components).css({
            "-webkit-transform": "translate(" + x + "px," + y + "px)",
        "-ms-transform": "translate(" + x + "px," + y + "px)",
        "-moz-transform": "translate(" + x + "px," + y + "px)",
        "transform": "translate(" + x + "px," + y + "px)"
        });
    }

    /* Translate Reduce (DRY) - SVG
     *
     * Condense all transforms into a single method and pass by argument.
     */
    translateReduceSVG(components, x, y) {
        try{
            $(components).attr("transform", "translate(" + x + " " + y + ")");
        }
        catch(err){

            console.log(components, x, y)
        }
    }


    //Rotate Center
    rotateReduceSVG(components, rotate, xOff, yOff) {
        try{
            var coord = $(components)[0].getBBox();
            $(components).attr("transform", "rotate(" + rotate + " " + (coord.x+(coord.width/2) + xOff) +" " + (coord.y + (coord.height/2) + yOff) + ")");
        }
        catch(err){
        }
    }

    /* 
       Call this.update() for everytime there is a state change. The microscope animation is dependent on only ONE source, and that is the state of the machine. Thus, everytime the state of the machine changes from user input, the changes of the scope should reflect all at once. 
       */
    update() {
        W_RAT = $(window).width()/$(window).height();
        var aspectRatio = 4/3;
        /* Microscope animations */
        this.translateReduceSVG("#ocularRight, #ocularRightCopy", this.eyepiecePosition, 0);
        this.translateReduceSVG("#ocularLeftCopy", -1 * this.eyepiecePosition, 0);
        this.translateReduceSVG("#ocularLeftDiopter, #friend", -1 * this.eyepiecePosition, this.diopterPosition);

        this.translateReduceSVG("#ocularLeftStick", -1 * this.eyepiecePosition, 0);
        this.translateReduceSVG("#ocularLeft", -1 * this.eyepiecePosition, 0);
        this.translateReduceSVG("#slideStage, #stageLight", 0, this.knobPosition);
        this.translateReduceSVG("#slide", this.xslide, this.yslide);
        this.translateReduceSVG("#apertureKnob", this.diaphragmLightPosition * -1, this.knobPosition + this.diaphragmHeightPosition / 3) ;
        this.translateReduceSVG("#diaphragm, #aperture, #diaphragmCopy", 0, this.knobPosition + this.diaphragmHeightPosition / 3);
        this.translateReduceSVG("#adjustDHeight", 0, this.diaphragmHeightPosition);
        this.translateReduceSVG("#caliperMetal, #caliperKnob, #caliper", 0, this.yknobcaliper);
        this.translateReduceSVG("#caliperMetal, #ycaliper, #xcaliper", this.xcaliper, this.ycaliper);
        this.rotateReduceSVG("#caliperBlade", this.caliperBlade, 0, -25);
        this.rotateReduceSVG(".knob", this.diaphragmHeightPosition*10, 0, 0);
        // Aperture precision
        $("#stageLight ellipse").attr("rx", 12-((sm_orig.MAX_DIAPHRAGM_HEIGHT-this.diaphragmHeightPosition)/2));
        $("#stageLight ellipse").attr("ry", 6-((sm_orig.MAX_DIAPHRAGM_HEIGHT-this.diaphragmHeightPosition)/4));

        //console.log(W_RAT);
        if(W_RAT <aspectRatio){
            this.translateReduce(".slideRect, #slideView", this.eyepiecePosition * (Math.pow(4*(1/W_RAT),-1)+aspectRatio), 0);
            this.translateReduce(".slideRect,#slideView2", -this.eyepiecePosition * (Math.pow(3*(1/W_RAT),-1)+aspectRatio), 0);
        } else{
            this.translateReduce(".slideRect,#slideView", this.eyepiecePosition * Math.pow(3*(1/W_RAT),2), 0);
            this.translateReduce(".slideRect,#slideView2", -this.eyepiecePosition * Math.pow(3*(1/W_RAT),2), 0);
        }

        var yCali = (this.yslide - this.knobPosition) * 10;
        var xCali = (this.xslide) * 10;
        // Microscope darkness (hack is based off of a black background to darken)
        // [0,40] -> Expand to [0,60]
        $("#slideContents,#slideContents2,#stageLight, .slideRect").css({
            "opacity": (0.4) + ((1.5 * this.diaphragmLightPosition) / 100)
        });

        $("#slideContents, #slideContents2, .slideRect").css({
            "transform": "scale(" + this.zoom + ") translate(" + xCali + "px," + yCali + "px)"
        });

        var chosenBlur = this.slideBlur;
        if (!this.inBounds) {}

        // Initializes both slide contents to blur
        $("#slideContents, #slideContents2").css({
            "-ms-filter": "blur(" + Math.abs(chosenBlur) + "px)",
            "-webkit-filter": "blur(" + Math.abs(chosenBlur) + "px)",
            "filter": "blur(" + Math.abs(chosenBlur) + "px)"
        });

        // Reblurs the second slide contents (with diopter as a factor)
        var chosenBlur = this.eyepiecePosition + this.slideBlur2 
            $("#slideContents2").css({
                "-ms-filter": "blur(" + Math.abs(chosenBlur) + "px)",
                "-webkit-filter": "blur(" + Math.abs(chosenBlur) + "px)",
                "filter": "blur(" + Math.abs(chosenBlur) + "px)"
            });

    }

    // Enables particular microscope component.
    enable(component){
        switch(component){
            case "light-switch":
                this.enableLightSwitch();
                break;
            case "caliper-blade":
                this.enableCaliperBlade();
                break;
            case "lenses":
                this.enableLenses();
                break;
            case "eyepiece":
                this.enableEyepiece();
                break;
            case "coarse-knob":
                this.enableCoarseKnob();
                break;
            case "fine-knob":
                this.enableFineKnob();
                break;
            case "diaphragm-light":
                this.enableDiaphragmLight();
                break;
            case "caliper":
                this.enableCaliper();
                break;
            case "diopter":
                this.enableDiopter();
                break;
            case "sideview":
                this.enableSideDiaphragmRotate();
                break;
        }
    }

    // Enables all the functionality of the ms.
    enableScope() {
        bindTooltip();
        enableLightSwitch();
        enableEyepiece();
        enableCoarseKnob();
        enableFineKnob();
        enableDiaphragmLight();
        enableCaliper();
        enableSideDiaphragmRotate();
        enableLenses();
        enableDiopter();
        this.update();
    }



    // === Functionality for the FRONT view of the Microscope ==== /// 

    /* Toggles the light switch */
    enableLightSwitch() {
        var _this=this;
        $("#switch").on('click', function() {
            _this.lightStatus = (1 + _this.lightStatus) % 2;
            if (_this.lightStatus > 0) {
                $("#illuminationLight").removeClass("elementOff");
                $("#illuminationLight").addClass("lightOn");
            } else {
                $("#illuminationLight").removeClass("lightOn");
                $("#illuminationLight").addClass("elementOff");
            }

        });
    }



    /*Enables functionality for the eyepiece on call.*/
    enableEyepiece() {
        var _this=this;
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

                        if (_this.eyepiecePosition < sm_orig["MAX_OCULAR"]) {
                            _this.eyepiecePosition += val;
                        }
                    } else if ((prevX > event.pageX && ocularPart == "#ocularRight") || (prevX < event.pageX && ocularPart == "#ocularLeft")) {
                        if (_this.eyepiecePosition > 0) {
                            _this.eyepiecePosition -= val;
                        }
                    }
                    prevX = event.pageX;
                    _this.update();
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
    enableCoarseKnob() {
        var _this=this;
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
                        if (_this.knobPosition < sm_orig["MAX_KNOB"]) {
                            _this.zoom -= val * 0.1;
                            _this.yslide += val;
                            _this.ycaliper += val;
                            sm_orig["MAX_Y_CALIPER"] += val;
                            sm_orig["MIN_Y_CALIPER"] += val;
                            _this.yknobcaliper += val;
                            _this.yheight += val;
                            _this.knobPosition += val;
                            _this.slideBlur += 0.15;
                        }
                    } else if ((prevY > event.pageY)) {
                        if (_this.knobPosition > sm_orig["MIN_KNOB"]) {
                            _this.zoom += val * 0.1;
                            _this.yslide -= val;
                            _this.ycaliper -= val;
                            _this.yknobcaliper -= val;
                            sm_orig["MAX_Y_CALIPER"] -= val;
                            sm_orig["MIN_Y_CALIPER"] -= val;
                            _this.yheight -= val;
                            _this.knobPosition -= val;
                            _this.slideBlur -= 0.15;

                        }
                    }
                    prevY = event.pageY;
                    _this.update();
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


    enableFineKnob() {
        var _this=this;
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
                        if (_this.slideBlur < sm_orig["MAX_BLUR"]) {
                            _this.slideBlur += val;
                        }
                    } else if ((prevY < event.pageY)) {
                        if (_this.slideBlur > sm_orig["MIN_BLUR"]) {
                            _this.slideBlur -= val;
                        }
                    }
                    //console.log(ms.knobPosition);
                    prevY = event.pageY;
                    _this.update();
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
    enableDiaphragmLight() {
        var _this=this;
        function addDiaphragmDrag(part) {
            var val = 1;
            $(part)
                .mousedown(function() {
                    isDown = true;
                })
            .mousemove(function(event) {
                if (isDown) {
                    if ((prevX > event.pageX)) {
                        if (_this.diaphragmLightPosition < sm_orig["MAX_DIAPHRAGM_LIGHT"]) {
                            _this.diaphragmLightPosition += val;
                        }
                    } else if ((prevX < event.pageX)) {
                        if (_this.diaphragmLightPosition > 0) {
                            _this.diaphragmLightPosition -= val;
                        }
                    }
                    prevX = event.pageX;
                    _this.update();
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

    enableCaliperBlade(){
        var _this = this;
        $("#caliperBlade").on("click", function(){
            if (_this.caliperBlade > 0){
                _this.caliperBlade = 0;}
            else{
                _this.caliperBlade = 25;
            }
        _this.update();
        }); 
    }

    enableCaliper() {
        var _this=this;
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
                        if (_this.xcaliper < sm_orig["MAX_X_CALIPER"]) {
                            _this.xcaliper += val;
                            _this.xslide += val;
                        }
                    } else if ((prevX > event.pageX)) {
                        if (_this.xcaliper > sm_orig["MIN_X_CALIPER"]) {
                            _this.xcaliper -= val;
                            _this.xslide -= val;
                        }
                    }
                    prevX = event.pageX;

                    // Blur out if out of magic bounds
                    if (_this.xcaliper > -10 && this.xcaliper < 10 && this.ycaliper > -10 && this.ycaliper < 10) {
                        _this.inBounds = true;
                    } else {
                        _this.inBounds = false;
                    }
                    _this.update();
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
                        if (_this.ycaliper < sm_orig["MAX_Y_CALIPER"]) {
                            _this.ycaliper += val;
                            _this.yslide += val;
                        }
                    } else if ((prevX > event.pageX)) {
                        if (_this.ycaliper > sm_orig["MIN_Y_CALIPER"]) {
                            _this.ycaliper -= val;
                            _this.yslide -= val;
                        }
                    }
                    prevX = event.pageX;
                    // Blur out if out of magic bounds
                    if (_this.xcaliper > sm_orig["MIN_X_BOUND"] && this.xcaliper < sm_orig["MAX_X_BOUND"] && this.ycaliper > sm_orig["MIN_Y_BOUND"] && this.ycaliper < sm_orig["MAX_Y_BOUND"]) {
                        _this.inBounds = true;
                    } else {
                        _this.inBounds = false;
                    }


                    _this.update();
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
    enableLenses() {
        var _this=this;
        var dangerEnable = false; 
        var rollBack = {};

        function testDanger(){
            if (!dangerEnable && (_this.lensePosition+1 == 9 || _this.lensePosition-1==9)){
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
                        if (_this.lenseWheel % 10 == 0) {
                            $(_this.lenseStates[_this.lensePosition]).toggle();
                            _this.lensePosition = ((_this.lensePosition + 1) % _this.lenseStates.length);
                            testDanger();
                            $(_this.lenseStates[_this.lensePosition]).toggle();
                            _this.lenseWheel = 1;
                        } else {
                            _this.lenseWheel++;
                        }
                    } else if ((prevX > event.pageX)) {
                        if (_this.lenseWheel % 10 == 0) {
                            $(_this.lenseStates[_this.lensePosition]).toggle();
                            _this.lensePosition = ((_this.lensePosition - 1) % _this.lenseStates.length)
                testDanger();

            if (_this.lensePosition == -1) _this.lensePosition = _this.lenseStates.length - 1;
            $(_this.lenseStates[_this.lensePosition]).toggle();
            _this.lenseWheel = 19;
                        } else {
                            _this.lenseWheel--;
                        }

                    }
                    prevX = event.pageX;


                    // Invoke danger of proceeding to next lense
                    if (_this.lenseStates[_this.lensePosition].includes("Red")) {
                        $('.slideRect').css("display", "block");
                        $('#slideRect2').css("display", "none");
                        swapMag(1);
                        _this.slideBlur = 4;
                    } else if (_this.lenseStates[_this.lensePosition].includes("Yellow")) {
                        $('.slideRect').css("display", "block");
                        swapMag(2);
                        _this.slideBlur = 4;
                    } 
                    else if (_this.lenseStates[_this.lensePosition].includes("White")){
                        $('.slideRect').css("display", "block");
                        swapMag(3);
                    } 
                    else if (_this.lenseStates[_this.lensePosition].includes("Blue")){
                        $('.slideRect').css("display", "block");
                        swapMag(3);
                        _this.slideBlur = 4;
                    }

                    // no viable lense state renders no images 
                    else {
                        _this.zoomSave = _this.zoom;
                        swapMag(-1);
                        $('.slideRect').css("display", "none");
                    }
                    _this.update();
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
    enableDiopter(){
        var _this=this;
        function addDiopterDrag(ocularPart, power) {
            var val = power;
            $(ocularPart)
                .mousedown(function() {
                    isDown = true;
                })
            .mousemove(function(event) {
                if (isDown) {
                    if (prevX > event.pageX) {
                        if (_this.diopterPosition > sm_orig["MIN_DIOPTER"]) {
                            _this.diopterPosition -= power;
                            _this.slideBlur2 -= 1; 
                        }
                    } else if ((prevX < event.pageX)) {
                        if (_this.diopterPosition < sm_orig["MAX_DIOPTER"]) {
                            _this.diopterPosition += power;
                            _this.slideBlur2 += 1;
                        }
                    }
                    prevX = event.pageX;
                    _this.update();
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


    enableSideDiaphragmRotate() {
        // Abstracted in Jimrambe's code, passed in state machine.
        setupKnobs(this);
    }

}



ms = new StateMachine();
that = ms;
ms.setup();
ms.update();
