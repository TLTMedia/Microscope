/* * startup.js
 * Source provides user with UI to choose start up options.
 * Startup options include the choice between three game modes.
 *
 **/


function loadStartMenu() {
    $("#endText").text("Microscope Simulator");
    $("#endSubText").text("By the end of the simulation, \nyou will know how to use a microscope.");
    $("#endSubText").css({
        opacity: 1
    });
    $(".endErrorText").css({
        opacity: 0
    });
    showMenu();
}

function loadIntroComplete() {

    $("#endText").text("Great job!");
    $("#endSubText").text("The next phase will teach you how to\n set up the microscope.\n If you forget what each part does, you can go back.")
    $("#endSubText").css({
        opacity: 1
    });
    $(".endErrorText").css({
        opacity: 0
    });
    showMenu();
}

function showMenu() {
    // Make overlay visible
    $("#overlay").css({
        'opacity': 1,
        'z-index': 100
    });
    // Lock/unlock modes
    //    lockModes();
    // Show results screen
    $("#results").removeClass("anim_exitResults");
    $("#results").addClass("anim_enterResults");
    $("#overlayBG").removeClass("anim_fadeOutBG");
    $("#overlayBG").addClass("anim_fadeInBG");
}


function hideMenu() {
    // Make overlay invisible after it fades out
    setTimeout(function () {
        $("#overlay").css({
            'opacity': 0,
            'z-index': -100
        });
    }, 500);
    // Hide results screen
    $("#results").removeClass("anim_enterResults");
    $("#results").addClass("anim_exitResults");
    $("#overlayBG").removeClass("anim_fadeInBG");
    $("#overlayBG").addClass("anim_fadeOutBG");
}


function lockModes() {
    // Intermediate mode: lock if Beginner not yet completed
    if (true) {
        // Unlock
        $("#endOptionDescText2").html("• No hints <br> • 5 dial readings <br> • You lose if you make a mistake.");
        $("#endOption2").removeClass("endOptionLocked");
        $("#endOption2").addClass("endOptionUnlocked");
    } else {
        // Lock
        $("#endOptionDescText2").html("Locked! <br> Complete Beginner mode to unlock.");
        $("#endOption2").removeClass("endOptionUnlocked");
        $("#endOption2").addClass("endOptionLocked");
    }
    // Expert mode: lock if Intermediate not yet completed
    if (true) {
        // Unlock
        $("#endOptionDescText3").html("• No hints, more controls <br> • 7 dial readings <br> • You lose if you make a mistake.");
        $("#endOption3").removeClass("endOptionLocked");
        $("#endOption3").addClass("endOptionUnlocked");
    } else {
        // Lock
        $("#endOptionDescText3").html("Locked! <br> Complete Intermediate mode to unlock.");
        $("#endOption3").removeClass("endOptionUnlocked");
        $("#endOption3").addClass("endOptionLocked");
    }
}


function newGame(guided, manual) {
    hideMenu(); // Hide menu
    updateSteps(); // Update steps

    // Animate in step objects
    enterStepObjects();

    // Record start time
    //testGame();

    resizeWindow(); // Resize window
}

function loadSubMenu() {
    //  Define steps (order doesn't matter here)
    var stepText = [{
            "id": "intro",
            "shortText": "Introduction",
            "steps": [{
                "id": "introLightSwitch",
                "shortText": "Light Switch",
                "longText": "Click the light switch.",
                "feedbackText": "click the light switch"
            }, {
                "id": "introEyepiece",
                "shortText": "Eyepiece",
                "longText": "Click the eyepiece.",
                "feedbackText": "click the eyepiece"
            }, {
                "id": "introCoarse",
                "shortText": "Coarse Knob",
                "longText": "Click the coarse knobs.",
                "feedbackText": "click the coarse knobs"
            }, {
                "id": "introFine",
                "shortText": "Fine Knobs",
                "longText": "Click the fine knobs.",
                "feedbackText": "click the fine knobs"
            }, {
                "id": "introDiaphragm",
                "shortText": "Diaphragm",
                "longText": "Click the diaphragm.",
                "feedbackText": "click the diaphragm"
            }, {
                "id": "introCaliper",
                "shortText": "Caliper",
                "longText": "Click the caliper.",
                "feedbackText": "click the caliper"
            }, {
                "id": "introLenses",
                "shortText": "Lenses",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            }]
        }, {
            "id": "setup",
            "shortText": "Setup",
            "steps": [{
                "id": "setupLightSwitch",
                "shortText": "Light Switch",
                "longText": "Click the light switch.",
                "feedbackText": "click the light switch"
            }, {
                "id": "setupSlide",
                "shortText": "Slide",
                "longText": "Push in the slide.",
                "feedbackText": "click the light switch"
            }, {
                "id": "setupCondenser",
                "shortText": "Condenser",
                "longText": "Move the aperture knob slightly to the left.",
                "feedbackText": "Move the condensor knob."

            }, {
                "id": "setupCaliper",
                "shortText": "Caliper Knob",
                "longText": "Adjust the caliper knobs.",
                "feedbackText": "Move the caliper knob."

            }]
        },

        {
            "id": "lowMag",
            "shortText": "Low Magnification",
            "steps": [{
                "id": "setupEyepiece",
                "shortText": "Eyepiece",
                "longText": "Click the eyepiece.",
                "feedbackText": "click the eyepiece"
            }, {
                "id": "setupCoarse",
                "shortText": "Coarse Knob",
                "longText": "Click the coarse knobs.",
                "feedbackText": "click the coarse knobs"
            }, {
                "id": "setupFine",
                "shortText": "Fine Knobs",
                "longText": "Click the fine knobs.",
                "feedbackText": "click the fine knobs"
            }, {
                "id": "setupDiaphragmLight",
                "shortText": "Diaphragm Light",
                "longText": "Click the diaphragm.",
                "feedbackText": "click the diaphragm"
            }, {
                "id": "setupDiaphragmHeight",
                "shortText": "Diaphragm Height",
                "longText": "Click the diaphragm.",
                "feedbackText": "click the diaphragm"
            }, {
                "id": "setupCaliper",
                "shortText": "Caliper",
                "longText": "Click the caliper.",
                "feedbackText": "click the caliper"
            }, {
                "id": "setupLenses",
                "shortText": "Lenses",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            }]
        }, {
            "id": "highMag",
            "shortText": "High Magnification",
            "steps": [{
                "id": "lowLight",
                "shortText": "Light",
                "longText": "Press the space bar.",
                "feedbackText": "press the space bar"
            }, {
                "id": "lowLens",
                "shortText": "10x Lens",
                "longText": "Press F to pay respects.",
                "feedbackText": "press the F key"
            }, {
                "id": "lowSlidePlace",
                "shortText": "Place Slide",
                "longText": "Press F to pay respects.",
                "feedbackText": "press the F key"
            }, {
                "id": "lowSlideCenter",
                "shortText": "Center Slide",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            }, {
                "id": "lowCoarse",
                "shortText": "Coarse Knob",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            }, {
                "id": "lowFine",
                "shortText": "Fine Knob",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            }, {
                "id": "lowDiaphragm",
                "shortText": "Diaphragm",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            }]

        }, {
            "id": "quiz",
            "shortText": "Quiz",
            "steps": [{
                "id": "#idname",
                "shortText": "#shortText",
                "longText": "#longText",
                "feedbackText": "#feedbackText"
            }, {
                "id": "pressF",
                "shortText": "Press F",
                "longText": "Press F to pay respects.",
                "feedbackText": "ty for much respects"
            }]
        }

    ];

    game = new Game(true, true);
    var stepCount = -1;
    var groupCount = -1;
    for (i in stepText) {
        groupCount++;
        var newGroup = new StepGroup(stepText[i].id, stepText[i].shortText, "#group" + groupCount, "#groupIcon" + groupCount);
        game.addGroup(newGroup);
        for (j in stepText[i].steps) {
            var cur = stepText[i].steps[j];
            stepCount++;
            var newStep = new Step(cur.id, cur.shortText, cur.longText, cur.feedback, "#step" + stepCount, "#icon" + stepCount);
            game.addStep(newStep);
            newGroup.addStep(newStep);
        }
    }
    game.linkSteps();
    // console.log(game);

    // Intro
    introLightSwitch = game.getGroupStep(0, 0);
    introEyepiece = game.getGroupStep(0, 1);
    introCoarse = game.getGroupStep(0, 2);
    introFine = game.getGroupStep(0, 3);
    introDiaphragm = game.getGroupStep(0, 4);
    introCaliper = game.getGroupStep(0, 5);
    introLenses = game.getGroupStep(0, 6);

    // Setup
    setupLightSwitch = game.getGroupStep(1, 0);
    setupSlide = game.getGroupStep(1, 1);
    setupCondense = game.getGroupStep(1, 2);
    setupCaliper = game.getGroupStep(1, 3);


    //  !!! (´・ω・`)
    // Ocular adjustment should go after diaphragm + before caliper
    
    // Low Magnification
    lowEyepiece = game.getGroupStep(2, 0);
    lowCoarse = game.getGroupStep(2, 1);
    lowFine = game.getGroupStep(2, 2);
    lowDiaphragmLight = game.getGroupStep(2, 3);
    lowDiaphragmHeight = game.getGroupStep(2, 4);
    lowCaliper = game.getGroupStep(2, 5);
    lowLenses = game.getGroupStep(2, 6);

    
    
    /* 
    lowLight = game.getGroupStep(2, 0);
    lowLens = game.getGroupStep(2, 2);
    lowSlidePlace = game.getGroupStep(2, 2);
    lowSlideCenter = game.getGroupStep(2, 3);
    lowCoarse = game.getGroupStep(2, 4);
    lowFine = game.getGroupStep(2, 5);
    lowDiaphragm = game.getGroupStep(2, 6);
*/


    // High Magnification
    // a1 = game.getGroupStep(3, 0);
    // a2 = game.getGroupStep(3, 2);




    updateSteps();
    //enterStepObjects();
    // console.log("Starting game");
    introLightSwitch.activate();
}


function initEndOptionHover(id) {
    $("#endOption" + id).hover(function () {
        // Mouse over cell
        $("#endOptionDesc" + id).removeClass("anim_exitEndOptionDesc");
        $("#endOptionDesc" + id).addClass("anim_enterEndOptionDesc");

    }, function () {
        // Leave cell
        $("#endOptionDesc" + id).removeClass("anim_enterEndOptionDesc");
        $("#endOptionDesc" + id).addClass("anim_exitEndOptionDesc");
    });
}



// ====== Frame setup and microscope initialization. ====== //
$(function () {

    $("#rotate2").load('img/sideview.svg', function () {

        $("#draggableDiaphragm").addClass("knob");
//        $("#").addClass("knob");
//        $("#").addClass("knob");
        
    })
    
    
    
    var slideImg = $('<img id="slideContents">');
    var slideImg2 = $('<img id="slideContents2">');
    
    // image paths
    var microscope = 'img/microscope.svg';
    var path = 'img/cells/'
    var cellLowMag = path + 'eyepieceCellsLow-bg.png';
    var cellHighMag = path + 'eyepieceCellsHigh.png';
    var eUpsidedown = path + 'e.png';
    
    slideImg.attr('src', cellLowMag);
    slideImg.appendTo('#slideContentsContainer');

    slideImg2.attr('src', cellLowMag);
    slideImg2.appendTo('#slideContentsContainer2');
    
    $('#microscope').load(microscope, function () {
        updateAnimation();

        //$('#microscope svg').append('<filter id="blurMe"><feGaussianBlur in="SourceGraphic" stdDeviation="1" /></filter>')

        resizeWindow();
        loadStartMenu();
        loadSubMenu();

        $("#endOption1").click(function () {
            // Start Beginner Mode
            newGame(true, false);
        });
        
        
        resizeWindow();

    });
    
    



});
