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
                "id": "setupLenses",
                "shortText": "Lenses",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            }, {
                "id": "setupDiaphragmLight",
                "shortText": "Diaphragm Light",
                "longText": "Click the diaphragm.",
                "feedbackText": "click the diaphragm"
            },{
                "id": "setupCoarse",
                "shortText": "Coarse Knob",
                "longText": "Click the coarse knobs.",
                "feedbackText": "click the coarse knobs"
            } ]  
        }, {
            "id": "medMag",
            "shortText": "Medium Magnification",
            "steps": [{
                "id": "setupLenses",
                "shortText": "Lenses",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            },{
                "id": "setupFine",
                "shortText": "Fine Knobs",
                "longText": "Click the fine knobs.",
                "feedbackText": "click the fine knobs"
            },{ 
                "id": "setupDiopter",
                "shortText": "Diopter",
                "longText": "Adjust the diopter (left ocular)",
                "feedbackText": "click the eyepiece"
            },{ 
                "id": "setupEyepiece",
                "shortText": "Eyepiece",
                "longText": "Click the eyepiece.",
                "feedbackText": "click the eyepiece"
            }]

        }, {
            "id": "highMag",
            "shortText": "High Magnification",
            "steps": [{
                "id": "setupLenses",
                "shortText": "Lenses",
                "longText": "Click the lenses.",
                "feedbackText": "click the lenses"
            },{
                "id": "setupFine",
                "shortText": "Fine Knobs",
                "longText": "Click the fine knobs.",
                "feedbackText": "click the fine knobs"
            },{ 
                "id": "setupDiopter",
                "shortText": "Diopter",
                "longText": "Adjust the diopter (left ocular)",
                "feedbackText": "click the eyepiece"
            },{ 
                "id": "setupEyepiece",
                "shortText": "Eyepiece",
                "longText": "Click the eyepiece.",
                "feedbackText": "click the eyepiece"
            }]
        },{

            "id": "quiz",
            "shortText": "Quiz",
            "steps": [{
                "id": "#idname",
                "shortText": "Q1",
                "longText": "#longText",
                "feedbackText": "#feedbackText"
            }, {
                "id": "pressF",
                "shortText": "Q2",
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
    lowLenses = game.getGroupStep(2,0)
    lowDiaphragmLight = game.getGroupStep(2, 1);
    lowCoarse = game.getGroupStep(2, 2);

    // Med Magnification
    medLenses = game.getGroupStep(3,0)
    medFine = game.getGroupStep(3, 1);
    medDiopter = game.getGroupStep(3, 2);
    medOcular = game.getGroupStep(3, 3);


    // High magnification
    highLenses = game.getGroupStep(4,0)
    highFine = game.getGroupStep(4, 1);
    highDiopter = game.getGroupStep(4, 2);
    highOcular = game.getGroupStep(4, 3);


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

// 0 - first occurence, 1 - low, 2 - med, 3 - high
function swapMag(n){
    var path = 'img/cells/';
    var cell = "";
    var slideImg = ""
    var slideImg2 = ""

    if (n==0){
        slideImg = $('<img id="slideContents">');
        slideImg2 = $('<img id="slideContents2">');
        slideImg.appendTo('#slideContentsContainer');
        slideImg2.appendTo('#slideContentsContainer2');
        return;
    }
    slideImg = $("#slideContents");
    slideImg2 = $("#slideContents2");
    if (n==1)
        cell = path + 'eyepieceCellsLow-bg.png';
    else if (n==2 || n==3)
        cell = path + 'eyepieceCellsHigh.png';
    //var eUpsidedown = path + 'e.png';

    slideImg.attr('src', cell);
    slideImg2.attr('src', cell);
}

// ====== Frame setup and microscope initialization. ====== //
$(function () {
    $("#rotate2").load('img/sideview.svg', function () {
        $("#draggableDiaphragm").addClass("knob");
        //        $("#").addClass("knob");
        //        $("#").addClass("knob");

    })

    // image paths
    var microscope = 'img/microscope.svg';

$('#microscope').load(microscope, function () {
    updateAnimation();

    //$('#microscope svg').append('<filter id="blurMe"><feGaussianBlur in="SourceGraphic" stdDeviation="1" /></filter>')
    swapMag(0);


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
