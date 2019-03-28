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
var oldRotation = 0;
var caliperYUpperLimit;
var caliperYLowerLimit;
var prevRotation;

var oculusState;
var tileSize = 128;
var slideTableSize = 4;

//** State machine boundaries are defined in global.js

/*
 * We should introduce the idea of a state machine which represents the state
 * of the microscope at any given time. The machine should be able to
 * transition into other states seamlessly, regardles of the current state.
 */

// Everything is set to minimum on init
class StateMachine {
  constructor() {
    oculusState = {
      zoom: 0,
      row: 0,
      col: 0,
      index: 0,
      brightness: 0,
      focusLeft: 0,
      focusRight: 0
    }
    // this.slideZoomInstance = new slideZoom("#slideView");

    //console.log(slideZoomInstance)


    this.lightStatus = 0; // Brightness of the light ranged 0-1. 0 being off.
    this.eyepiecePosition = 0;
    this.knobPosition = 0;
    this.xslide = 0;
    this.yslide = 0;
    this.magnification = 0;
    this.diaphragmLightBlur = 0;
    this.diaphragmLightWidth = 0;
    this.diaphragmBrightness = 0;
    this.condenserBrightness = 0;
    this.diaphragmHeightPosition = 0;
    this.diaphragmLightPosition = 0;
    this.diopterPosition = 0;
    this.caliperBlade = 0;
    this.xcaliper = 0;
    this.ycaliper = 0;
    this.yheight = 0;
    this.yknobcaliper = 0;
    this.lensePosition = 0;
    this.sideSlidePosition = 0;
    this.zoomPosition = 0;
    this.zoom = 1;
    this.slideBlur = 0;
    this.slideBlur2 = 0;
    this.lenseWheel = 0;
    this.inBounds = true;
    //CHANGE THE LENSES ORDER
    this.lenseStates = ["#lenses1Red", "#lenses2", "#lenses3", "#lenses4Yellow", "#lenses5", "#lenses6", "#lenses7Blue", "#lenses8", "#lenses9", "#lenses10White", "#lenses11", "#lenses12"];
    this.sideSlideStates = ["#sideLenses1", "#sideLenses2", "#sideLenses3", "#sideLenses4Yellow", "#sideLenses5", "#sideLenses6", "#sideLenses7Blue", "#sideLenses8", "#sideLenses9", "#sideLenses10White", "#sideLenses11", "#sideLenses12"];
    this.desiredFrame = this;
    this.slideBox = 0;
    this.leftOcularPosition = 0;
    this.setup();

    //var slideView2 = $("#slideView2").clone();
    //console.log(slideView2.html())
  //  $("#slideView").html(slideView2.html())

    this.update();
  }

  // Set values to setup values
  setup() {
    sm_orig["MAX_Y_CALIPER"] = sm_bd["MAX_Y_CALIPER"] + sm_orig["MAX_KNOB"];
    sm_orig["MIN_Y_CALIPER"] = sm_bd["MIN_Y_CALIPER"] + sm_orig["MAX_KNOB"];
    state = {
      zoom: 0,
      row: 0,
      col: 0,
      index: 0,
      brightness: 0,
      focusLeft: 0,
      focusRight: 0
    }
    // this.slideZoomInstance = new slideZoom("#slideView");
    // slideZoomInstance.showSlide(state);
    // slideZoomInstance.showSlide(state);

    this.lightStatus = 0; // Brightness of the light ranged 0-1. 0 being off.
    this.eyepiecePosition = 30;
    this.knobPosition = sm_orig["MAX_KNOB"] - 4;
    this.xslide = 0;
    this.yslide = this.knobPosition - 30;
    this.magnification = 0;
    state.brightness = 0;
    this.diaphragmBrightness = 0;
    this.condenserBrightness = 0;
    this.diaphragmLightBlur = 0;
    this.diaphragmLightWidth = 0;
    this.diaphragmHeightPosition = 270 * DIAPHRAGM_HEIGHT_TO_ROTATION_RATIO;
    this.diaphragmLightPosition = 0;
    this.diopterPosition = 0;
    this.caliperBlade = 0;
    this.xcaliper = 0;
    this.ycaliper = 0;
    this.yheight = this.knobPosition;
    this.yknobcaliper = this.knobPosition;
    this.lensePosition = 5;
    this.sideSlidePosition = 5;
    this.zoomPosition = 0;
    this.zoom = 1;
    this.slideBlur = 0.2;
    this.slideBlur2 = 0;
    this.lenseWheel = 0;
    this.inBounds = true;
    // console.log("State machine is set to default values.");
    this.slideBox = 0;
    this.leftOcularPosition = 0.2;
  }

  // Freeze frame to ensure user follows tutorial appropriately.
  freezeState(desiredFrame) {
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
    try {
      $(components).attr("transform", "translate(" + x + " " + y + ")");
    } catch (err) {
      console.error(components, x, y)
    }
  }

  //Rotate Center
  rotateReduceSVG(components, rotate, xOff, yOff) {
    try {
      var coord = $(components)[0].getBBox();
      $(components).attr("transform", "rotate(" + rotate + " " + (coord.x + (coord.width / 2) + xOff) + " " + (coord.y + (coord.height / 2) + yOff) + ")");
    } catch (err) {}
  }

  /*
     Call this.update() for everytime there is a state change.
     The microscope animation is dependent on only ONE source,
     and that is the state of the machine.
     Thus, everytime the state of the machine changes from user input,
     the changes of the scope should reflect all at once.
     */
  update() {
    //console.log(this);
    W_RAT = $(window).width() / $(window).height();
    //var diopterColor =
    var aspectRatio = 4 / 3;
    /* Microscope animations */
    // console.log(this.slideBlur)
    this.translateReduceSVG("#ocularRight, #ocularRightCopy", this.eyepiecePosition, 0);
    this.translateReduceSVG("#ocularLeftCopy", -1 * this.eyepiecePosition, 0);
    this.translateReduceSVG("#ocularLeftDiopter, #friend", -1 * this.eyepiecePosition, this.diopterPosition);
    this.translateReduceSVG("#ocularLeftStick", -1 * this.eyepiecePosition, 0);
    this.translateReduceSVG("#ocularLeft", -1 * this.eyepiecePosition, 0);
    this.translateReduceSVG("#slideStage", 0, this.knobPosition);
    this.translateReduceSVG("#slide", this.xcaliper, this.ycaliper);
    this.translateReduceSVG("#apertureKnob", this.diaphragmLightPosition * -1, this.knobPosition + this.diaphragmHeightPosition / 3);
    this.translateReduceSVG("#diaphragm, #aperture, #diaphragmCopy", 0, this.knobPosition + this.diaphragmHeightPosition / 3);
    this.translateReduceSVG("#adjustDHeight", 0, this.diaphragmHeightPosition);
    this.translateReduceSVG("#caliperMetal", this.xcaliper, 0);
    this.translateReduceSVG("#ycaliper", this.caliperBlade / 2.8, this.ycaliper);
    this.translateReduceSVG("#xcaliper", this.caliperBlade / 2, 0);
    this.translateReduceSVG("#cover", 0, this.ycaliper);
    this.rotateReduceSVG("#caliperBlade", this.caliperBlade, 0, -25);
    this.rotateReduceSVG(".knob", this.diaphragmHeightPosition * 10, 0, 0);
    // console.log(this.knobPosition)

    // Aperture precision
    // $("#stageLight ellipse").attr("rx", 12 - ((sm_orig.MAX_DIAPHRAGM_HEIGHT - this.diaphragmHeightPosition) / 2));
    //$("#stageLight ellipse").attr("ry", 6 - ((sm_orig.MAX_DIAPHRAGM_HEIGHT - this.diaphragmHeightPosition) / 4));
    caliperYUpperLimit = this.yheight + 15;
    caliperYLowerLimit = this.yheight - 40;

    //FIX LENSES
    //+25 to x slideviews
    //25% width and height

    //this.translateReduce(".sviewContainer", -110, 0);

    if (W_RAT < aspectRatio) {
      this.translateReduce(".slideRect, #slideView", (this.eyepiecePosition * (Math.pow(4 * (1 / W_RAT), -1) + aspectRatio)) + 5, 0);
      this.translateReduce(".slideRect,#slideView2", -this.eyepiecePosition * ((Math.pow(3 * (1 / W_RAT), -1) + aspectRatio)) + 5, 0);
    } else {
      this.translateReduce(".slideRect,#slideView", (this.eyepiecePosition * Math.pow(4 * (1 / W_RAT), 2)) + 5, 0);
      this.translateReduce(".slideRect,#slideView2", (-this.eyepiecePosition * Math.pow(3 * (1 / W_RAT), 2)) + 5, 0);
    }
    var yCali = ((this.ycaliper)) + 17;
    var xCali = (this.xcaliper * 10) - 100;
    // Microscope darkness (hack is based off of a black background to darken)
    // [0,40] -> Expand to [0,60]

    var illumination = `rgba(${Math.min(232, 232*this.illuminationBrightness)},${Math.min(224, 224*this.illuminationBrightness)},${Math.min(152, 152*this.illuminationBrightness)},1)`
    oculusState = {
      zoom: this.zoomPosition, //still need to adjust to lense states
      row: ((this.ycaliper + 38.5) / 55),
      col: ((this.xcaliper + 57) / 70),
      index: 0,
      brightness: ((this.illuminationBrightness)/1.25 + (this.diaphragmLightPosition/100)), //Need to implement diaphragmLightPosition into this
      focusLeft: this.slideBlur,
      focusRight: this.slideBlur
    }

    if(slideZoomInstance){
        //console.log(this.illuminationBrightness,slideZoomInstance)
        slideZoomInstance.showSlide(oculusState);
    }
    $("#light_1_").css("fill", illumination);

    this.diaphragmBrightness = this.diaphragmLightPosition + this.condenserBrightness;

    //        console.log("new illumination = ", illumination)
    $("#slideContents,#slideContents2, #stageLight, .slideRect").css({
      "opacity": (0.4) + ((0.8 * this.diaphragmBrightness) / 100)
    });

    //Add a bind that dynamically changes opacity of #stageLight based on condenser
    // console.log(state)

    if (document.getElementById("stageLight")) {

      var box = document.getElementById("stageLight").getBBox();
      var cx = box.x + box.width / 2;
      var cy = box.y + box.height / 2;

      $("#stageLight").attr("transform", "translate(" + cx + " " + cy + ") scale(" + this.diaphragmLightWidth + ") translate(" + (-cx) + " " + (-cy) + ")");;
    }

    $(".slideRect").css({
      //            "transform": "scale(" + this.zoom + ") "
      "transform": "translate(" + xCali + " % , " + yCali + " % )"
    });

    //magniifcation based on objectiv lenses
    //        $("#slideContents").css({
    //            display: "none"
    //        });

    $("#slideContents").css({
      "transform": "scale(" + this.magnification + ")"
    });

    if (!this.inBounds) {}

    // Initializes both slide contents to blur
    $("#canvasRight").css({
      "-ms-filter": "blur(" + Math.abs(state.focusRight) + "px)",
      "-webkit-filter": "blur(" + Math.abs(state.focusRight) + "px)",
      "filter": "blur(" + Math.abs(state.focusRight) + "px)"
    });

    $("#canvasLeft").css({
      "-ms-filter": "blur(" + Math.abs(state.focusLeft) + "px)",
      "-webkit-filter": "blur(" + Math.abs(state.focusLeft) + "px)",
      "filter": "blur(" + Math.abs(state.focusLeft) + "px)"
    });


    // Reblurs the second slide contents (with diopter as a factor)
    var chosenBlur = this.eyepiecePosition + this.slideBlur2
    $("#slideContents2").css({
      "-ms-filter": "blur(" + Math.abs(chosenBlur) + "px)",
      "-webkit-filter": "blur(" + Math.abs(chosenBlur) + "px)",
      "filter": "blur(" + Math.abs(chosenBlur) + "px)"
    });

  }

  // Enables all the functionality of the ms.

  // === Functionality for the FRONT view of the Microscope ==== ///

  /* Toggles the light switch */
  enableLightSwitch() {
    var _this = this;
    //        console.log(this);

    $("#illuminationLight").toggleClass("lightOn");
    registerKnob("#switch", Directions.VERTICAL, function(rotation) {

      _this.illuminationBrightness = Math.min(Math.max(0, -rotation * 10), 1);
      _this.update();
      //console.log(rotation);
    }, 0);
  }

  /*Enables functionality for the eyepiece on call.*/
  enableEyepiece() {
    var _this = this;

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
            if ((prevX < event.pageX && ocularPart === "#ocularRight") || (prevX > event.pageX && ocularPart === "#ocularLeft")) {

              if (_this.eyepiecePosition < sm_orig["MAX_OCULAR"]) {
                _this.eyepiecePosition += val;
              }
            } else if ((prevX > event.pageX && ocularPart === "#ocularRight") || (prevX < event.pageX && ocularPart === "#ocularLeft")) {
              if (_this.eyepiecePosition > 0) {
                _this.eyepiecePosition -= val;
              }
              console.log(_this.eyepiecePosition)
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
    var _this = this;
    function courseKnobCallback(rot){

    _this.knobPosition = Math.min(32, Math.max(rot*100, 8));
// _this.yheight = rot;
            // _this.knobPosition = rot*100;
            // _this.slideBlur = rot;
         _this.update();
    }

    registerKnob("#knobsCoarse", Directions.VERTICAL, courseKnobCallback, 0.16);
  //  addCourseDrag("#knobsCoarse", 0.5);

  }

  enableFineKnob() {
    var _this = this;

    function addFineDrag(coursePart, power) {
      var val = power;

      $(document).mouseup(function() {
          isDown = false;
        })
        .mouseleave(function() {
          isDown = false;
        })
        .mouseenter(function() {
          isDown = false;
        });

      $(coursePart)
        .mousedown(function() {
          isDown = true;
        })
        .mousemove(function(event) {
          if (isDown) {
            // IF THE PREVIOUS Y COORDINATE IS ABOVE THE CURRENT Y COORDINATE
            // AND IF THE CURRENT SLIDEBLUR IS BELOW THE MAXIMUM, THEN DECREMENT THE VALUE OF THE CURRENT SLIDE BLUR
            if (prevY > event.pageY) {
              if (_this.slideBlur < sm_orig["MAX_BLUR"]) {
                _this.slideBlur += val;
              }
              // IF THE PREVIOUS Y IS BELOW THE CURRENT Y
              // AND IF THE CURRENT SLIDEBLUR IS ABOVE THE MINIMUM, THEN DECREMENT THE VALUE OF THE CURRENT SLIDE BLUR
            } else if ((prevY < event.pageY)) {
              if (_this.slideBlur > sm_orig["MIN_BLUR"]) {
                _this.slideBlur -= val;
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
        })
        .mouseenter(function() {
          isDown = false;
        });
    }
    addFineDrag("#knobsFine", 0.2);
  }

  /*Enables functionality for the eyepiece on call.*/
  enableDiaphragmLight() {
    var _this = this;

    function apertureKnobCallback(rot){
      console.log(40 - (rot * 100));
      _this.diaphragmLightPosition = Math.min(sm_orig["MAX_DIAPHRAGM_LIGHT"], Math.max(40 - (rot * 100), 0));
      _this.update();
    }

    registerKnob("#diaphragm, #apertureKnob", Directions.HORIZONTAL, apertureKnobCallback, 0.4)

  }

  enableCaliperBlade() {
    var _this = this;
    $("#caliperBlade").on("click", function() {
      if (_this.caliperBlade > 0) {
        _this.caliperBlade = 0;
      } else {
        _this.caliperBlade = 25;
      }
      _this.update();
    });
  }

  enableCaliper() {
    var _this = this;
    // Low knob
    function addCaliperXDrag(part) {
      registerKnob(part, Directions.HORIZONTAL, function(rotation) {
        var scaledRotation = rotation * 60;
        _this.xcaliper = scaledRotation; //Math.min(10, Math.max(-10, rotation / 10));
        _this.xslide = _this.xcaliper;

        console.log("_this.xcaliper = ", _this.xcaliper)

        ms.xcaliper = Math.min(Math.max(ms.xcaliper, -22), 48);

        _this.update();

        if (ms.xcaliper > 5 && ms.xcaliper < 10 && ms.ycaliper >= -20 && ms.ycaliper <= -12) {
          removeHighlightId("#yCaliperKnobCopy");
          removeHighlightId("#xCaliperKnobCopy");
          updateClonedPosition(null, $(setupCaliper.id));
          setupCaliper.complete();
        }
      }.bind(this), 0);
    }

    function addCaliperYDrag(part) {
      registerKnob(part, Directions.HORIZONTAL, function(rotation) {
        //console.log(getKnob(part));

        var scaledRotation = rotation * 60;
        _this.ycaliper = scaledRotation; //Math.min(35, Math.max(0, rotation * 40));
        //_this.yslide += (scaledRotation / 5);
        //console.log(ms.yheight);

        _this.ycaliper = Math.min(Math.max(ms.ycaliper, caliperYLowerLimit), caliperYUpperLimit);

        //console.log("ms.ycaliper > 16 = ", ms.ycaliper > 16, "ms.ycaliper = ", ms.ycaliper);

        _this.update();

        //                console.log("ms.ycaliper = " + ms.ycaliper);

      }.bind(this), 0);

      if (ms.xcaliper > 10 && ms.xcaliper < 20 && ms.ycaliper >= 16 && ms.ycaliper <= 22) {
        removeHighlightId("#yCaliperKnobCopy");
        removeHighlightId("#xCaliperKnobCopy");
        updateClonedPosition(null, $(setupCaliper.id));
        setupCaliper.complete();
      }
    }
    addCaliperXDrag("#xCaliperKnob");
    addCaliperYDrag("#yCaliperKnob");
  }

  rotateLensesCount(_this, right, forced, testDanger, count) {
    for (var i = 0; i < count; i++) {
      _this.rotateLenses(_this, right, forced, testDanger);
    }
  }

  updateLensesState(_this) {
    // Invoke danger of proceeding to next lense
    console.log(_this)
    if (_this.lenseStates[_this.lensePosition].includes("Red")) {
      $('.slideRect').css("display", "block");
      $('#slideRect2').css("display", "none");
      swapMag(1);
      _this.magnification = 1;
    } else if (_this.lenseStates[_this.lensePosition].includes("Yellow")) {
      $('.slideRect').css("display", "block");
      swapMag(1);
      _this.magnification = 2;
    } else if (_this.lenseStates[_this.lensePosition].includes("White")) {
      $('.slideRect').css("display", "block");
      swapMag(1);
      _this.magnification = 15;
    } else if (_this.lenseStates[_this.lensePosition].includes("Blue")) {
      $('.slideRect').css("display", "block");
      swapMag(1);
      _this.magnification = 8;
    }

    // no viable lense state renders no images
    else {
      _this.zoomSave = _this.zoom;
      swapMag(-1);
      $('.slideRect').css("display", "none");
    }

    _this.update();
  }



  // Rotate the microscope objective towards specified direction
  rotateLenses(_this, right, forced, testDanger) {
    $('.slideRect').css("display", "block");
    $('#slideRect2').css("display", "none");
    var stepNum = game.getCurrentStep().div.split("step")[1];
    //console.log(stepNum)
    console.log(_this.lensePosition)
    if (right) {
      if (!(stepNum >= 9 && stepNum <= 18)) {
        //between steps 9 - 18 you shouldnt be able to go to 100x
        $(_this.lenseStates[_this.lensePosition]).toggle();
        $(_this.sideSlideStates[_this.sideSlidePosition]).toggle();
        _this.lensePosition = (_this.lensePosition + 1) % _this.lenseStates.length;
        _this.sideSlidePosition = this.lensePosition;
        $(_this.lenseStates[_this.lensePosition]).toggle();
        $(_this.sideSlideStates[_this.sideSlidePosition]).toggle();
      } else {
        if (_this.sideSlidePosition != 8) {
          //                    console.log("_this.sideSlidePosition = ", _this.sideSlidePosition)
          $(_this.lenseStates[_this.lensePosition]).toggle();
          $(_this.sideSlideStates[_this.sideSlidePosition]).toggle();
          _this.lensePosition = (_this.lensePosition + 1) % _this.lenseStates.length;
          testDanger();
          _this.sideSlidePosition = this.lensePosition;
          $(_this.lenseStates[_this.lensePosition]).toggle();
          $(_this.sideSlideStates[_this.sideSlidePosition]).toggle();
        }
      }
    } else {
      if (!(stepNum >= 9 && stepNum <= 18)) {
        $(_this.lenseStates[_this.lensePosition]).toggle();
        $(_this.sideSlideStates[_this.sideSlidePosition]).toggle();
        _this.lensePosition = (_this.lensePosition - 1) % _this.lenseStates.length;
        _this.sideSlidePosition = (_this.sideSlidePosition - 1) % _this.sideSlideStates.length;
        if (_this.lensePosition === -1) {
          _this.lensePosition = _this.lenseStates.length - 1;
          _this.sideSlidePosition = _this.sideSlideStates.length - 1;
        }
        $(_this.lenseStates[_this.lensePosition]).toggle();
        $(_this.sideSlideStates[_this.sideSlidePosition]).toggle();
      } else {
        if (_this.sideSlidePosition != 10) {
          $(_this.lenseStates[_this.lensePosition]).toggle();
          $(_this.sideSlideStates[_this.sideSlidePosition]).toggle();
          _this.lensePosition = (_this.lensePosition - 1) % _this.lenseStates.length;
          _this.sideSlidePosition = (_this.sideSlidePosition - 1) % _this.sideSlideStates.length;
          testDanger();
          if (_this.lensePosition === -1) {
            _this.lensePosition = _this.lenseStates.length - 1;
            _this.sideSlidePosition = _this.sideSlideStates.length - 1;
          }
          $(_this.lenseStates[_this.lensePosition]).toggle();
          $(_this.sideSlideStates[_this.sideSlidePosition]).toggle();
        }
      }
    }
    _this.updateLensesState(_this);
    _this.update();
  }

  // Total of 8 states on the lenses
  enableLenses() {
    var _this = this;
    var dangerEnable = false;
    var rollBack = {};

    function testDanger() {
      console.log(dangerEnable);
      //console.log(rollback);
      if (!dangerEnable && (_this.lensePosition + 1 == 9 || _this.lensePosition - 1 === 9)) {
        rollBack = {
          type: $(".popupInstruct").text(),
          text: $("#popupText").text()
        }
        //console.log(rollBack);
        updatePopup("Warning", "Stop! You risk damaging the 100X objective by moving passed the slide. Go the other way.");

        dangerEnable = true;
      } else if (dangerEnable) {
        console.log(rollBack);
        dangerEnable = false;
        console.log("rollBack.type = ", rollBack.type);
        console.log("rollBack.text = ", rollBack.text);
        updatePopup(rollBack.type, rollBack.text);
        //                console.log("rollback.type = ", rollback.type);
        //console.log("rollback.text = ", rollback.text);
        //                console.log("updatePopup")
      }
    }

    function addLenseClick(part) {
      console.log(part);

      //THIS SETS IT SO WE CAN CLICK ON ARROWS TO ROTATE THE LENSES
      $(part).on("mousedown", function() {
        if (part === "#turretRight") {
          _this.rotateLenses(_this, true, false, testDanger);
        } else if (part === "#turretLeft") {
          _this.rotateLenses(_this, false, false, testDanger);
        }
        //Check lense position, if its in a valid spot then display: inline;
        if (ms.lensePosition == 0 || ms.lensePosition == 3 || ms.lensePosition == 6 || ms.lensePosition == 9){
          $("#canvasLeft").css("display", "inline");
          $("#canvasRight").css("display", "inline");
        } else {
          $("#canvasLeft").css("display", "none");
          $("#canvasRight").css("display", "none");
        }
          //change lense position just before we get to the lense
          if (ms.lensePosition == 11 || ms.lensePosition == 1){
            _this.zoomPosition = 0
          }
          if (ms.lensePosition == 2 || ms.lensePosition == 4){
            _this.zoomPosition = .26
          }
          if (ms.lensePosition == 5 || ms.lensePosition == 7){
            _this.zoomPosition = .51
          }
          if (ms.lensePosition == 8 || ms.lensePosition == 10){
            _this.zoomPosition = .76
          }
          console.log(_this.slideBlur)
        _this.update();

      });
    }
    //        addLenseClick("#lensesBasePath");
    addLenseClick("#turretLeft");
    addLenseClick("#turretRight");

  }

  // Enable functionality for the left diopter
  enableDiopter() {
    var _this = this;

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
            console.log(ms.eyepiecePosition + ms.slideBlur2)
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
    var id = "#draggableDiaphragm";
    var callback = function(rotation) {

      //THIS CODE CHANGES THE POSITION OF THE APERTURE AS WELL, ISOLATE THEM
      if ((oldRotation > rotation)) {
        if (this.diaphragmBrightness < sm_orig["MAX_DIAPHRAGM_LIGHT"]) {
          this.condenserBrightness += 1;
        }
      } else if ((oldRotation < rotation)) {
        if (this.condenserBrightness > 0) {
          this.condenserBrightness -= 1;
        }
      }
      oldRotation = rotation;

      this.diaphragmLightBlur = Math.min(Math.max(((rotation * 100) + 4), 0), 100);
      this.diaphragmLightWidth = Math.min(Math.max(rotation + .50, .40), 1);
      this.diaphragmHeightPosition = Math.min(Math.max((rotation * 70), 0), 25);

      this.update();
      subHandler(ms.diaphragmHeightPosition, 0, 4.8, setupCondense, id, null);
    };
    registerKnob(id, Directions.VERTICAL, callback.bind(this), 0.32);
  }



}
