/* * startup.js
 * Source provides user with UI to choose start up options.
 * Startup options include the choice between three game modes.
 *
 **/

/* 
   Sets the contents of the feedback box
   */
function largeFeedbackBox(title, body){
    $("#helpBoxHeader").text("Details");
    $("#endText").text(title);
    $("#endSubText").text(body);
    $("#buttonContainer").html("<div class=\"endOption rounded stripes endOptionUnlocked\" id=\"endOption0\" draggable=\"false\"><div class=\"endOptionText fs-24 text\">Continue</div></div>");
    $("#endOption0").click(function(){
        hideMenu();
    });
}

/*
 * Sets the contents of the feedback box and gives user option to select
 * quiz
 * */
function largeFeedbackBoxOptions(title, body){
    largeFeedbackBox(title,body);
    var finalList = "";
    finalList += "<div class=\"endOption rounded stripes endOptionUnlocked\" id=\"endOption1\" draggable=\"false\"><div class=\"endOptionText fs-24 text\">Total Magnification</div></div>"

        finalList += "<br><br>"

        finalList += "<div class=\"endOption rounded stripes endOptionUnlocked\" id=\"endOption2\" draggable=\"false\"><div class=\"endOptionText fs-24 text\">Cell Count</div></div>"


        finalList += "<br><br>"

        finalList += "<div class=\"endOption rounded stripes endOptionUnlocked\" id=\"endOption3\" draggable=\"false\"><div class=\"endOptionText fs-24 text\">Clean Scope</div></div>"

        $("#buttonContainer").html(finalList);

    // Add event listeners
    $("#endOption1").click(function(){
        destroy();
        currentMode = "Total-Magnification";
        startup(loadTotalMag);
    });
}


function largeFeedbackBoxQuiz(title, body){
    largeFeedbackBox(title,body);
    $("#helpBoxHeader").text("Question");  
    //$("#helpBox p").text("What is the magnification that is currently being shown on the slide?");
    $("#answerBox").toggle();
}

function loadMenu(scene) {
    $("#answerBox").css("display", "none");
    switch (scene){
        case "introduction":
            largeFeedbackBox("Introduction", "Welcome to the introduction. In this section, you will learn the parts of the microscope.")
                break;
        case "tutorial":
            largeFeedbackBox("Tutorial","In this section, you will learn how to work with a microscope.");
            break;
        case "introduction-end":
            largeFeedbackBox("Completed", "You can review the parts by hovering over them again. When you're ready, click on \"Tutorial\" on the top bar to proceed.")
                break;
        case "tutorial-end":
            largeFeedbackBox("Completed", "Great work. You learned how to use the microscope. Click on \"Quizzes\" on the top bar to test what you have learned!")
                break;
        case "quiz-start":
            largeFeedbackBoxOptions("Quizzes", "Lets test your knowledge. Select a quiz from the menu below")
                break;
        case "total-magnification":
            largeFeedbackBoxQuiz("Total Magnification", "In this quiz, you will be identifying the magnification for different lens positions.")
                break;

    }
    $("#endSubText").css({opacity: 1});
    $(".endErrorText").css({opacity: 0});
    showMenu();
}


function showOptionMenu() {
    // Make overlay visible
    $("#main-menu").css({
        'opacity': 1,
    'z-index': 100
    });
    // Lock/unlock modes
    lockModes();
    // Show results screen
    $("#results").removeClass("anim_exitResults");
    $("#results").addClass("anim_enterResults");
    $("#overlayBG").removeClass("anim_fadeOutBG");
    $("#overlayBG").addClass("anim_fadeInBG");
}

function showMenu() {
    // Make overlay visible
    $("#overlay").css({
        'opacity': 1,
    'z-index': 100
    });
    // Lock/unlock modes
    lockModes();
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


function loadIntro(){

    loadMenu("introduction");
    var stepText = [{
        "id": "intro",
            "shortText": "Introduction",
            "steps": [{
                "id": "introLightSwitch",
                "shortText": "Light Switch",
                "longText": "Hover over the highlighted components to learn more about the parts of the microscope.",
                "feedbackText": "click the light switch"
            }]
    }]

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


    /** Introduction **/
    introLightSwitch = game.getGroupStep(0, 0);
    updateSteps();
    introLightSwitch.activate();
}


function loadTutorial() {
    //  Define steps (order doesn't matter here)
    loadMenu("tutorial");
    var stepText = [{
        "id": "setup",
            "shortText": "Setup",
            "steps": [{
                "id": "setupLightSwitch",
                "shortText": "Light Switch",
                "longText": "The light switch is the first thing you should turn on anytime you use a microscope.",
                "feedbackText": "click the light switch"
            }, {
                "id": "setupCaliperBlade",
                "shortText": "Caliper Blade",
                "longText": "Click on the caliper blade to open it. This allows us to have room to put the slide in without damaging it.",
                "feedbackText": "click the light switch"
            },{
                "id": "setupSlide",
                "shortText": "Slide",
                "longText": "The slide should be wedged in place within the caliper.",
                "feedbackText": "click the light switch"
            }, {
                "id": "setupCondenser",
                "shortText": "Condenser",
                "longText": "The condenser allows light to accurately hit the slide, rendering it viewable through the lenses.",
                "feedbackText": "Move the condenser knob."

            }, {
                "id": "setupCaliper",
                "shortText": "Caliper Knob",
                "longText": "Adjust the caliper in both x and y directions until the slide is exactly at the center of the lenses. Otherwise you will not be able to see the specimen at all.",
                "feedbackText": "Move the caliper knob."

            }]
    },

        {
            "id": "lowMag",
            "shortText": "Low Magnification",
            "steps": [{
                "id": "setupLenses",
                "shortText": "Lenses",
                "longText": "Rotating the lenses to low magnification allows you to see the specimen from a larger distance.",
                "feedbackText": "click the lenses"
            }, {
                "id": "setupDiaphragmLight",
                "shortText": "Diaphragm Light",
                "longText": "For low magnification, the diaphragm light should be adjusted so that the slide is visible. However, it should not be put too high, otherwise the light will be blinding. Low magnification needs less light to pass through the slide.",
                "feedbackText": "click the diaphragm"
            },{
                "id": "setupCoarse",
                "shortText": "Coarse Knob",
                "longText": "The coarse knob adjusts the stage platform and lets you zoom in or out of the current slide view. You want to keep adjusting it until the view is clear. Note that the coarse knob should only be moved once, and once it is moved to the correct place it doesn't need to be touched again.",
                "feedbackText": "click the coarse knobs"
            } ]  
        }, {
            "id": "medMag",
            "shortText": "Medium Magnification",
            "steps": [{
                "id": "setupLenses",
                "shortText": "Lenses",
                "longText": "The medium magnification provided a closer view than low magnification.",
                "feedbackText": "click the lenses"
            },{
                "id": "setupCoarse",
                "shortText": "Coarse Knob",
                "longText": "The coarse knob adjusts the stage platform and lets you zoom in or out of the current slide view. You want to keep adjusting it until the view is clear. Note that the coarse knob should only be moved once, and once it is moved to the correct place it doesn't need to be touched again.",
                "feedbackText": "click the coarse knobs"
            },{
                "id": "setupFine",
                "shortText": "Fine Knobs",
                "longText": "Instead of adjusting the coarse knob for clarity, we adjust the fine knob because the coarse knob is already in place from low magnification. The fine knob will blur and unblur the slide view. Keep rotating it until the view becomes clear.",
                "feedbackText": "click the fine knobs"
            },{ 
                "id": "setupDiopter",
                "shortText": "Diopter",
                "longText": "The diopter is responsible for the clarity of view through the left ocular lenses. Adjust it so that the left view becomes clear.",
                "feedbackText": "click the eyepiece"
            },{ 
                "id": "setupEyepiece",
                "shortText": "Eyepiece",
                "longText": "When you look through the microscope, you may see two different views. By adjusting the eyepiece, you can have it so that the views converge and look like a single view.",
                "feedbackText": "click the eyepiece"
            }]

        }, {
            "id": "highMag",
            "shortText": "High Magnification",
            "steps": [{
                "id": "setupLenses",
                "shortText": "Lenses",
                "longText": "This will be the highest magnification that you work with on the microscope. it will give a much more detailed view of the specimen that is on the slide.",
                "feedbackText": "click the lenses"
            },{ 
                "id": "setupAperture",
                "shortText": "Highest Aperture",
                "longText": "Because high magnification is so detailed, more light needs to pass through the slide to clearly show the view. High magnification will result in a loss of light due to its reflective nature.",
                "feedbackText": "click the eyepiece"
            },{
                "id": "setupFine",
                "shortText": "Fine Knobs",
                "longText": "Once more, adjusting the fine knobs will allow you to change the clarity of the image. Keep adjusting it until the view is completely clear.",
                "feedbackText": "click the fine knobs"
            }]
        },{
            "id": "cleanUp",
            "shortText": "Clean Up",
            "steps": [{
                "id": "cleanupLow",
                "shortText": "Lowest Objective",
                "longText": "This will be the highest magnification that you work with on the microscope. it will give a much more detailed view of the specimen that is on the slide.",
                "feedbackText": "click the lenses"
            },{ 
                "id": "cleanupCoarse",
                "shortText": "Lowest Coarse Knob",
                "longText": "Because high magnification is so detailed, more light needs to pass through the slide to clearly show the view. High magnification will result in a loss of light due to its reflective nature.",
                "feedbackText": "click the eyepiece"
            },{
                "id": "cleanupSlide",
                "shortText": "Return Slide",
                "longText": "Once more, adjusting the fine knobs will allow you to change the clarity of the image. Keep adjusting it until the view is completely clear.",
                "feedbackText": "click the fine knobs"
            },{
                "id": "cleanupLight",
                "shortText": "Lights Off",
                "longText": "Once more, adjusting the fine knobs will allow you to change the clarity of the image. Keep adjusting it until the view is completely clear.",
                "feedbackText": "click the fine knobs"
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


    /** Tutorial **/
    setupLightSwitch = game.getGroupStep(0, 0);
    setupCaliperBlade = game.getGroupStep(0,1);
    setupSlide = game.getGroupStep(0, 2);
    setupCondense = game.getGroupStep(0, 3);
    setupCaliper = game.getGroupStep(0, 4);

    // Low Magnification
    lowLenses = game.getGroupStep(1,0);
    lowDiaphragmLight = game.getGroupStep(1, 1);
    lowCoarse = game.getGroupStep(1, 2);

    // Med Magnification
    medLenses = game.getGroupStep(2,0);
    medCoarse = game.getGroupStep(2, 1);
    medFine = game.getGroupStep(2, 2);
    medDiopter = game.getGroupStep(2, 3);
    medOcular = game.getGroupStep(2, 4);

    // High magnification
    highLenses = game.getGroupStep(3,0);
    highAperture = game.getGroupStep(3, 1);
    highFine = game.getGroupStep(3, 2);

    // Cleanup time
    cleanupLow = game.getGroupStep(4,0);
    cleanupCoarse = game.getGroupStep(4,1);
    cleanupSlide = game.getGroupStep(4,2);
    cleanupLight = game.getGroupStep(4,3);

    updateSteps();
    setupLightSwitch.activate();
}


function loadQuizzes(){
    loadMenu("quiz-start");
}


function loadTotalMag(){
    loadMenu("total-magnification");
    var stepText = [{
        "id": "totalMag",
            "shortText": "Total Magnification",
            "steps": [{
                "id": "totalMagQ1",
                "shortText": "Question 1",
                "longText": "What is the magnification that is currently being shown on the slide?",
                "feedbackText": "click the light switch"
            },{
                "id": "totalMagQ2",
                "shortText": "Question 2",
                "longText": "What is the magnification that is currently being shown on the slide?",
                "feedbackText": "click the light switch"
            }]
    }]

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

    /** Introduction **/
    totalMagQ1 = game.getGroupStep(0, 0);
    totalMagQ2 = game.getGroupStep(0, 1);
    updateSteps();
    totalMagQ1.activate();

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

//-1 - no image 0 - first occurence, 1 - low, 2 - med, 3 - high
function swapMag(n){
    var path = 'img/cells/';
    var cell = "";
    var cell2 = "";
    var slideImg = "";
    var slideImg2 = "";
    // setup
    if (n==0){
        slideImg = $('<div class="slideRect"><img id="slideContents"></div>');
        slideImg2 = $('<div class="slideRect" id="slideRect2"><img id="slideContents2"></div>');
        slideImg.appendTo('#slideView');
        slideImg2.appendTo('#slideView2');
        return;
    }
    slideImg = $("#slideContents");
    slideImg2 = $("#slideContents2");
    if (n==1){
        cell = path + 'eyepieceCellsLow-bg.png';
    }
    else if (n==2){
        cell = path + 'eyepieceCellsMedium.png';
        cell2 = path + 'eyepieceCellsMedium.png';
    }
    else if (n==3){
        cell = path + 'eyepieceCellsHigh.png';
        cell2 = path + 'eyepieceCellsHigh.png';
    }
    //var eUpsidedown = path + 'e.png';

    slideImg.attr('src', cell);
    slideImg2.attr('src', cell2);
}


var formerState = $("body").html();

// Unloads everything, used to change game modes
function destroy(){
    //console.log(game);
    $("#steps").html(""); 
    $("#microscope").html("");
    $("rotate").html("");
    $("body").html(formerState);
}


// ====== Frame setup and microscope initialization. ====== //
function startup(fun){
    $("#rotate").load('img/sideview.svg', function () {
        $("#draggableDiaphragm").addClass("knob");
    })

    // image paths
    var microscope = 'img/microscope.svg';

    $('#microscope').load(microscope, function () {
        ms.update();
        //$('#microscope svg').append('<filter id="blurMe"><feGaussianBlur in="SourceGraphic" stdDeviation="1" /></filter>')
        swapMag(0);
        resizeWindow();

        fun();

        $("#endOption0").click(function () {
            // Start Beginner Mode
            newGame(true, false);
        });


        resizeWindow();
    });
}

var currentMode = "Introduction"
//Encapsulation
$(function(){
    // Attach event listeners to buttons on header
    $("#header button").click(function(event){
        $("#header button").each(function(index){
            $(this).removeClass("headerButtonActive"); 
        });
        var id = $(this).toggleClass("headerButtonActive");
        var innerText = $(this).text();
        currentMode = innerText;
        switch(innerText){
            case "Introduction":
                destroy();
                startup(loadIntro);
                break;
            case "Tutorial":
                destroy();
                startup(loadTutorial);
                ms.setup();
                break;
            case "Quizzes":
                destroy();
                startup(loadQuizzes);
                break;
        } 
        ms.update(); 
    });
    startup(loadIntro);
});
