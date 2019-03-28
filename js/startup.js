/* * startup.js
 * Source provides user with UI to choose start up options.
 * Startup options include the choice between three game modes.
 *
 **/

/*
   Sets the contents of the feedback box
   */

// Title module

var helpText;
var slideZoomInstance
var state;
ms = new StateMachine();
function largeFeedbackBox(title, body, lambdaEnd) {
    $("#helpBoxHeader").text("Details");
    $("#endText").text(title);
    $("#endSubText").text(body);
    $("#buttonContainer").html("<button class=\"endOption rounded stripes endOptionUnlocked\" id=\"endOption0\" draggable=\"false\">Continue</button>");
    $("#endOption0").click(lambdaEnd);
}

// Quiz Module
function enableQuizBox() {
    $("#helpBoxHeader").text("Question");
    $("#answerBox").toggle();
}

// Makes  button
function buttonMaker(id, title) {
    return "<button class=\"endOption rounded stripes endOptionUnlocked\" id=\"endOption" + id + "\" draggable=\"false\">" + title + "</button><br><br>"
}

/*
 * Sets the contents of the feedback box and gives user option to select
 * quiz
 * */
function largeFeedbackBoxOptions(title, body) {
    largeFeedbackBox(title, body);
    var finalList = "";
    finalList += buttonMaker(1, "Total Magnification");
    finalList += buttonMaker(2, "Cell Count");
    finalList += buttonMaker(3, "Clean Scope");
    finalList += buttonMaker(4, "Watch Video");

    $("#buttonContainer").html(finalList);

    // Add event listeners
    $("#endOption1").click(function () {
        destroy();
        currentMode = "Total-Magnification";
        loadMicroscope();
        loadTotalMag();
    });

    $("#endOption2").click(function () {
        destroy();
        currentMode = "Cell-Count";
        loadMicroscope();
        loadCellCount();
    });

    $("#endOption4").click(function () {
        destroy();
        currentMode = "Video";
        loadMicroscope();
        loadVideoQuiz();
    });
}

/*
Proxy function to delegate scene construction of quizzes appropriately.
*/
function loadMenu(scene) {
    var hide = function () {
        hideMenu();
    }

    $("#answerBox").css("display", "none");
    switch (scene) {
        case "introduction":
            largeFeedbackBox("Introduction", "Welcome to the introduction. In this section, you will learn the parts of the microscope.", hide)
            break;
        case "tutorial":
            largeFeedbackBox("Tutorial", "In this section, you will learn how to use a compound microscope.", hide);
            break;
        case "introduction-end":
            largeFeedbackBox("Completed", "You can review the parts by hovering over them again. When you're ready, click on \"Tutorial\" on the top bar to proceed.", hide)
            break;
        case "tutorial-end":
            largeFeedbackBox("Completed", "Great work. You learned how to use the microscope. Click on \"Quizzes\" on the top bar to test what you have learned!", hide)
            break;
        case "quiz-start":
            largeFeedbackBoxOptions("Quizzes", "Lets test your knowledge. Select a quiz from the menu below", hide)
            break;
        case "total-magnification":
            largeFeedbackBox("Total Magnification", "In this quiz, you will be identifying the magnification for different lens positions.", hide);
            enableQuizBox();
            break;
        case "cell-count":
            largeFeedbackBox("Total Magnification", "In this quiz, you will be identifying the magnification for different lens positions.", hide)
            enableQuizBox();
            break;
        case "video":
            largeFeedbackBox("Video Quiz", "In this quiz, you will be identifying issues in the microscope usage.",
                function () {
                    setTimeout(function () {
                        showMenu();
                        $("#results").css({
                            "left": "5%",
                            "height": "70%"
                        })

                        $("#overlay").css({
                            "pointer-events": "none"
                        })

                        $("#results").html('<iframe style="margin-top:0%;" width="100%" height="100%" src="https://www.youtube.com/embed/D-UmfqFjpl0" frameborder="0" allowfullscreen></iframe>');
                        $("#endSubText").text('');
                        $("#buttonContainer").html("<button class=\" rounded stripes endOptionUnlocked\" id=\"endOption0\" draggable=\"false\">Continue</button>");
                    }, 1000);
                })
            enableQuizBox();
            break;
    }
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

    // Show results screen
    $("#results").removeClass("anim_exitResults");
    $("#results").addClass("anim_enterResults");
    $("#overlayBG").removeClass("anim_fadeOutBG");
    $("#overlayBG").addClass("anim_fadeInBG");
    // console.log("Show Menu")
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


function newGame(guided, manual) {
    hideMenu(); // Hide menu
    updateSteps(); // Update steps
    enterStepObjects();
    // console.log("aa")

    resizeWindow(); // Resize window
}


function loadIntro() {
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

    game = createGame(stepText);


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
                    "shortText": helpText["setupLightSwitch"].shortText,
                    "longText": helpText["setupLightSwitch"].longText,
                    "feedbackText": helpText["setupLightSwitch"].feedbackText,
                    "logic": function () {
                        $("#light").addClass("elementOff");
                        toggleVisibility("#slide");
                        $("#popupType").html(stepText[0].steps[0].shortText);
                        textSetup(stepText[0].steps[0].feedbackText, "60%", "60%")
                        $("#helpBox p").html(stepText[0].steps[0].longText);
                        setupEnableSwitch();
                        ms.enableLightSwitch();
                    },
                    "completeSettings": function () {
                        // $("#switch").off();
                    }

            }, {
                    "id": "setupStage",
                    "shortText": helpText["setupStage"].shortText,
                    "longText": helpText["setupStage"].longText,
                    "feedbackText": helpText["setupStage"].feedbackText,
                    "logic": function () {
                        $("#popupType").html(stepText[0].steps[1].shortText);
                        textSetup(stepText[0].steps[1].feedbackText, "66%", "58%")
                        $("#helpBox p").html(stepText[0].steps[1].longText);
                        setupEnableStage();
                        ms.enableCoarseKnob();

                    },
                    "completeSettings": function () {
                      // $("#knobsCoarse").off();
                    }
            },
                {
                    "id": "setupCaliperBlade",
                    "shortText": helpText["setupCaliperBlade"].shortText,
                    "longText": helpText["setupCaliperBlade"].feedbackText,
                    "feedbackText": helpText["setupCaliperBlade"].feedbackText,
                    "logic": function () {
                        //$("#popupType").html(stepText[0].steps[2].shortText);
                        textSetup(stepText[0].steps[2].longText, "64%", "45%");
                        //$("#helpBox p").html(stepText[0].steps[2].feedbackText);
                        ms.enableCaliperBlade();
                        setupEnableBlade();
                    },
                    "completeSettings": function () {
                        // $("#caliperBlade").off();
                    }

            }, {
                    "id": "setupSlide",
                    "shortText": helpText["setupSlide"].shortText,
                    "longText": helpText["setupSlide"].longText,
                    "feedbackText": helpText["setupSlide"].feedbackText,
                    "logic": function () {
                        //$("#popupType").html(stepText[0].steps[3].shortText)
                        textSetup(stepText[0].steps[3].longText, "64%", "45%");
                        //$("#helpBox p").html(stepText[0].steps[3].feedbackText);
                        setupEnableSlide();
                    },
                    "completeSettings": function () {
                        // ms.enableCaliperBlade();
                    }

            }, {
                    "id": "setupCondenser",
                    "shortText": helpText["setupCondenser"].shortText,
                    "longText": helpText["setupCondenser"].longText,
                    "feedbackText": helpText["setupCondenser"].feedbackText,
                    "logic": function () {
                        $("#frameSide").show();
                        //$("#popupType").html(stepText[0].steps[4].shortText)
                        textSetup(stepText[0].steps[4].longText, "8%", "45%");
                        //$("#helpBox p").html(stepText[0].steps[4].feedbackText);
                        setupCondenser();
                        ms.enableSideDiaphragmRotate();
                    },
                    "completeSettings": function () {
                        // $("#caliperBlade").off();
                        // $("#draggableDiaphragm").off();
                        $("#frameSide").hide();
                    }

            }, {
                    "id": "setupCaliper",
                    "shortText": helpText["setupCaliper"].shortText,
                    "longText": helpText["setupCaliper"].longText,
                    "feedbackText": helpText["setupCaliper"].feedbackText,
                    "logic": function () {
                        //$("#popupType").html(stepText[0].steps[5].shortText)
                        textSetup(stepText[0].steps[5].longText, "62%", "60%");
                        //$("#helpBox p").html(stepText[0].steps[5].feedbackText);
                        setupAdjustCaliper();
                        ms.enableCaliper();
                    },
                    "completeSettings": function () {
                        // $("#xCaliperKnob").off();
                        // $("#yCaliperKnob").off();
                    }

            }]
        },

        {
            "id": "lowMag",
            "shortText": "Low Magnification",
            "steps": [{
                "id": "setupLenses",
                "shortText": helpText["setupLenses"].shortText,
                "longText": helpText["setupLenses"].longText,
                "feedbackText": helpText["setupLenses"].feedbackText,
                "logic": function () {
                    //$("#popupType").html(stepText[1].steps[0].shortText);
                    textSetup(stepText[1].steps[0].longText, "15%", "35%");
                    //$("#helpBox p").html(stepText[1].steps[0].feedbackText);
                    lowAdjustLenses();
                    ms.enableLenses();
                },
                "completeSettings": function () {
                    // $("#turretLeft").off();
                    // $("#turretRight").off();
                }

            }, {
                "id": "setupDiaphragmLight",
                "shortText": helpText["setupDiaphragmLight"].shortText,
                "longText": helpText["setupDiaphragmLight"].longText,
                "feedbackText": helpText["setupDiaphragmLight"].feedbackText,
                "logic": function () {
                    //$("#popupType").html(stepText[1].steps[1].shortText);
                    textSetup(stepText[1].steps[1].longText, "18%", "70%");
                    //$("#helpBox p").html(stepText[1].steps[1].feedbackText);
                    lowDLight();
                    ms.enableDiaphragmLight();
                },
                "completeSettings": function () {
                    var knob = getKnob("#knobsCoarse")
                    console.log(knob.rotation)
                    prevRotation = knob.rotation;
                    $("#diaphragm").off();
                    $("#apertureKnob").off();
                }

            }, {
                "id": "setupCoarse",
                "shortText": helpText["setupCoarse"].shortText,
                "longText": helpText["setupCoarse"].longText,
                "feedbackText": helpText["setupCoarse"].feedbackText,
                "logic": function () {
                    //$("#popupType").html(stepText[1].steps[2].shortText);
                    textSetup(stepText[1].steps[2].longText, "60%", "64%");
                    //$("#helpBox p").html(stepText[1].steps[2].feedbackText);
                    lowAdjustCoarse();
                    // ms.enableCoarseKnob();
                },
                "completeSettings": function () {
                    // $("#knobsCoarse").off();
                }

            }]
        }, {
            "id": "medMag",
            "shortText": "Medium Magnification",
            "steps": [{
                    "id": "setupLenses2",
                    "shortText": helpText["setupLenses2"].shortText,
                    "longText": helpText["setupLenses2"].longText,
                    "feedbackText": helpText["setupLenses2"].feedbackText,
                    "logic": function () {
                        //$("#popupType").html(stepText[2].steps[0].shortText);
                        textSetup(stepText[2].steps[0].longText, "15%", "35%");
                        //$("#helpBox p").html(stepText[2].steps[0].feedbackText);
                        medAdjustLenses();
                        // ms.enableLenses();
                    },
                    "completeSettings": function () {
                      // $("#turretLeft").off();
                      // $("#turretRight").off();
                    }

            }, {
                    "id": "setupAperture",
                    "shortText": helpText["setupAperture"].shortText,
                    "longText": helpText["setupAperture"].longText,
                    "feedbackText": helpText["setupAperture"].feedbackText,
                    "logic": function () {
                        //$("#popupType").html(stepText[2].steps[1].shortText);
                        textSetup(stepText[2].steps[1].longText, "60%", "60%");
                        //$("#helpBox p").html(stepText[2].steps[1].feedbackText);
                        medAdjustAperture();
                        ms.enableDiaphragmLight();
                    },
                    "completeSettings": function() {
                      // $("#diaphragm").off();
                      // $("#apertureKnob").off();
                    }
            }, {
                    "id": "setupCoarse",
                    "shortText": helpText["setupCoarse"].shortText,
                    "longText": helpText["setupCoarse"].longText,
                    "feedbackText": helpText["setupCoarse"].feedbackText,
                    "logic": function () {
                        //$("#popupType").html(stepText[2].steps[2].shortText);
                        textSetup(stepText[2].steps[2].longText, "60%", "64%");
                        //$("#helpBox p").html(stepText[2].steps[2].feedbackText);
                        medAdjustCoarse();
                        // ms.enableCoarseKnob();
                    },
                    "completeSettings": function () {
                      // $("#knobsCoarse").off();
                    }
            },
                {
                    "id": "setupDiopter",
                    "shortText": helpText["setupDiopter"].shortText,
                    "longText": helpText["setupDiopter"].longText,
                    "feedbackText": helpText["setupDiopter"].feedbackText,
                    "logic": function () {
                        //$("#popupType").html(stepText[2].steps[3].shortText);
                        textSetup(stepText[2].steps[3].longText, "20%", "30%");
                        //$("#helpBox p").html(stepText[2].steps[3].feedbackText);
                        medAdjustDiopter();
                        ms.enableDiopter();
                    },
                    "completeSettings": function () {
                        // $("#friend").off();
                    }
            }, {
                    "id": "setupEyepiece",
                    "shortText": helpText["setupEyepiece"].shortText,
                    "longText": helpText["setupEyepiece"].longText,
                    "feedbackText": helpText["setupEyepiece"].feedbackText,
                    "logic": function () {
                        //$("#popupType").html(stepText[2].steps[4].shortText);
                        textSetup(stepText[2].steps[4].longText, "60%", "30%");
                        //$("#helpBox p").html(stepText[2].steps[4].feedbackText);
                        medAdjustEyepiece();
                        ms.enableEyepiece();
                    },
                    "completeSettings": function () {
                        // $("#ocularRight").off();
                        // $("#ocularLeft").off();
                    }
            }]

        }, {
            "id": "highMag",
            "shortText": "High Magnification",
            "steps": [{
                "id": "setupLenses3",
                "shortText": helpText["setupLenses3"].shortText,
                "longText": helpText["setupLenses3"].longText,
                "feedbackText": helpText["setupLenses3"].feedbackText,
                "logic": function () {
                    //$("#popupType").html(stepText[3].steps[0].shortText);
                    textSetup(stepText[3].steps[0].longText, "15%", "35%");
                    //$("#helpBox p").html(stepText[3].steps[0].feedbackText);
                    highAdjustLenses();
                    // ms.enableLenses();
                },
                "completeSettings": function () {
                  // $("#turretLeft").off();
                  // $("#turretRight").off();
                }

            }, {
                "id": "setupAperture2",
                "shortText": helpText["setupAperture2"].shortText,
                "longText": helpText["setupAperture2"].longText,
                "feedbackText": helpText["setupAperture2"].feedbackText,
                "logic": function () {
                    //$("#popupType").html(stepText[3].steps[1].shortText);
                    textSetup(stepText[3].steps[1].longText, "60%", "60%");
                    //$("#helpBox p").html(stepText[3].steps[1].feedbackText);
                    highAdjustAperture();
                    // ms.enableDiaphragmLight();
                },
                "completeSettings": function () {
                  // $("#diaphragm").off();
                  // $("#apertureKnob").off();
                }
            }, {
                "id": "setupFine",
                "shortText": helpText["setupFine"].shortText,
                "longText": helpText["setupFine"].longText,
                "feedbackText": helpText["setupFine"].feedbackText,
                "logic": function () {
                    //$("#popupType").html(stepText[3].steps[2].shortText);
                    textSetup(stepText[3].steps[2].longText, "60%", "64%");
                    //$("#helpBox p").html(stepText[3].steps[2].feedbackText);
                    highAdjustFine();
                    ms.enableFineKnob();
                },
                "completeSettings": function () {
                    // $("#knobsFine").off();
                }
            }]
        }, {
            "id": "cleanUp",
            "shortText": "Clean Up",
            "steps": [{
                "id": "cleanupLow",
                "shortText": helpText["cleanupLow"].shortText,
                "longText": helpText["cleanupLow"].longText,
                "feedbackText": helpText["cleanupLow"].feedbackText,
                "logic": function () {
                    //$("#popupType").html(stepText[4].steps[0].shortText);
                    textSetup(stepText[4].steps[0].longText, "15%", "35%");
                    cleanAdjustLenses();
                    // ms.enableLenses();
                },
                "completeSettings": function () {
                    // $("#turretLeft").off();
                    // $("#turretRight").off();
                }
            }, {
                "id": "cleanupCoarse",
                "shortText": helpText["cleanupCoarse"].shortText,
                "longText": helpText["cleanupCoarse"].longText,
                "feedbackText": helpText["cleanupCoarse"].feedbackText,
                "logic": function () {
                    //$("#popupType").html(stepText[4].steps[1].shortText);
                    textSetup(stepText[4].steps[1].longText, "60%", "64%");
                    //$("#helpBox p").html(stepText[4].steps[1].feedbackText);
                    cleanAdjustCoarse();
                    // ms.enableCoarseKnob();
                },
                "completeSettings": function () {
                    // $("#knobsCoarse").off();
                }
            }, {
                "id": "cleanupSlide",
                "shortText": helpText["cleanupSlide"].shortText,
                "longText": helpText["cleanupSlide"].longText,
                "feedbackText": helpText["cleanupSlide"].feedbackText,
                "logic": function () {
                    //$("#popupType").html(stepText[4].steps[2].shortText);
                    textSetup(stepText[4].steps[2].longText, "64%", "45%");
                    //$("#helpBox p").html(stepText[4].steps[2].feedbackText);
                    cleanRemoveSlide();
                },
                "completeSettings": function () {

                }
            }, {
                "id": "cleanupLight",
                "shortText": helpText["cleanupLight"].shortText,
                "longText": helpText["cleanupLight"].longText,
                "feedbackText": helpText["cleanupLight"].feedbackText,
                "logic": function () {
                    //$("#popupType").html(stepText[4].steps[3].shortText);
                    textSetup(stepText[4].steps[3].longText, "60%", "73%");
                    //$("#helpBox p").html(stepText[4].steps[3].feedbackText);
                    cleanDisableSwitch();
                    // ms.enableLightSwitch();
                },
                "completeSettings": function () {
                  // $("#switch").off();
                }
            }]
        }
    ];

    game = createGame(stepText);

    console.log(game)
    /** Tutorial **/
    setupLightSwitch = game.getGroupStep(0, 0);
    setupStage = game.getGroupStep(0, 1);
    setupCaliperBlade = game.getGroupStep(0, 2);
    setupSlide = game.getGroupStep(0, 3);
    setupCondense = game.getGroupStep(0, 4);
    setupCaliper = game.getGroupStep(0, 5);

    // Low Magnification
    lowLenses = game.getGroupStep(1, 0);
    lowDiaphragmLight = game.getGroupStep(1, 1);
    lowCoarse = game.getGroupStep(1, 2);

    // Med Magnification
    medLenses = game.getGroupStep(2, 0);
    medAperture = game.getGroupStep(2, 1);
    medCoarse = game.getGroupStep(2, 2);
    //medFine = game.getGroupStep(2, 3);
    medDiopter = game.getGroupStep(2, 3);
    medOcular = game.getGroupStep(2, 4);

    // High magnification
    highLenses = game.getGroupStep(3, 0);
    highAperture = game.getGroupStep(3, 1);
    highFine = game.getGroupStep(3, 2);

    // Cleanup time
    cleanupLow = game.getGroupStep(4, 0);
    cleanupCoarse = game.getGroupStep(4, 1);
    cleanupSlide = game.getGroupStep(4, 2);
    cleanupLight = game.getGroupStep(4, 3);

    updateSteps();
    setupLightSwitch.activate();

    jumpToStep();

}


function loadQuizzes() {
    loadMenu("quiz-start");
}

function loadTotalMag() {
    loadMenu("total-magnification");
    var stepText = [{
        "id": "totalMag",
        "shortText": "Total Magnification",
        "steps": [{
            "id": "totalMagQ1",
            "shortText": "Question 1",
            "longText": "What is the magnification that is currently being shown on the slide?",
            "feedbackText": "click the light switch",
            "logic": function () {
                quizMag(1);
            }
        }, {
            "id": "totalMagQ2",
            "shortText": "Question 2",
            "longText": "What is the magnification that is currently being shown on the slide?",
            "feedbackText": "click the light switch",
            "logic": function () {
                quizMag(2);
            }
        }, {
            "id": "totalMagQ3",
            "shortText": "Question 3",
            "longText": "What is the magnification that is currently being shown on the slide?",
            "feedbackText": "click the light switch",
            "logic": function () {
                quizMag(3);
            }
        }]
    }]
    game = createGame(stepText);


    /** Introduction **/
    totalMagQ1 = game.getGroupStep(0, 0);
    totalMagQ2 = game.getGroupStep(0, 1);
    totalMagQ3 = game.getGroupStep(0, 2);
    updateSteps();
    totalMagQ1.activate();

}

function loadCellCount() {
    loadMenu("cell-count");
    var stepText = [{
        "id": "cellCount",
        "shortText": "Cell Count",
        "steps": [{
            "id": "cellCountQ1",
            "shortText": "Question 1",
            "longText": "How many cells appear in the slide?",
            "feedbackText": "click the light switch",
            "logic": function () {
                quiz2Q1();
            }
        }]
    }]

    game = createGame(stepText);
    /** Introduction **/
    cellCountQ1 = game.getGroupStep(0, 0);
    updateSteps();
    cellCountQ1.activate();

}

function createGame(stepText) {
    var game = new Game(true, true);
    var stepCount = -1;
    var groupCount = -1;
    for (i in stepText) {
        groupCount++;
        var stepID = stepText[i].id;
        var newGroup = new StepGroup(stepText[i].id, stepText[i].shortText, "#group" + groupCount, "#groupIcon" + groupCount);
        game.addGroup(newGroup);
        for (j in stepText[i].steps) {
            var cur = stepText[i].steps[j];
            stepCount++;
            var newStep = new Step(cur.id, helpText[cur.id].shortText, helpText[cur.id].longText, helpText[cur.id].feedback, "#step" + stepCount, "#icon" + stepCount, cur.logic || {}, cur.completeSettings || {});
            game.addStep(newStep);
            newGroup.addStep(newStep);
        }
    }
    game.linkSteps();

    return game;

}


function loadVideoQuiz() {
    loadMenu("video");
    var stepText = [{
        "id": "video",
        "shortText": "Video Quiz",
        "steps": [{
            "id": "videoQ1",
            "shortText": "Question 1",
            "longText": "Placeholder question?",
            "feedbackText": "",
            "answers": ["A1", "A2", "A3", "A4"],
            "logic": function () {
                quiz4Q1();
            }
        }]
    }]

    game = createGame(stepText);
    videoQ1 = game.getGroupStep(0, 0);
    updateSteps();
    videoQ1.activate();
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
function swapMag(n) {
    // console.log(n)
    var path = 'img/cells/';
    var cell = "";
    var cell2 = "";
    var slideImg = "";
    var slideImg2 = "";
    // setup
    if (n == 0) {
        //slideImg = $('<div class="slideRect"><img id="slideContents"></div>');
        slideImg2 = $('<div class="slideRect" id="slideRect2"><img id="slideContents2"></div>');
        //slideImg.appendTo('#slideView');
        slideImg2.appendTo('#slideView2');
        return;
    }
    slideImg = $("#slideContents");
    slideImg2 = $("#slideContents2");
    if (n == 1) {
        //cell = path + 'dummyCellImageCompressed.png';
        //cell2 = path + 'dummyCellImageCompressed.png';
    }

    slideImg.attr('src', cell);
    slideImg2.attr('src', cell2);
}


var formerState = $("body").html();

// Unloads everything, used to change game modes
function destroy() {
    //console.log(game);
    $("#steps").html("");
    //$("#microscope").html("");
    $("rotate").html("");
    $("body").html(formerState);
    swapMag(0);
    ms.update();
}


// ====== Frame setup and microscope initialization. ====== //


function loadMicroscope() {
    var promise = $.Deferred();

    $('#microscope').load('img/microscope.svg', function (data) {
        ms.update();
        var filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filter.setAttribute("id", "blurMe");
        var gaussianFilter = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
        gaussianFilter.setAttribute("in", "SourceGraphic");
        gaussianFilter.setAttribute("stdDeviation", "2");
        filter.appendChild(gaussianFilter);
        $('#microscope svg').prepend(filter)
        $("#draggableDiaphragm").addClass("knob");
        swapMag(0);
        resizeWindow();

        //fun()


        resizeWindow();
        promise.resolve()
    });

    return promise;

}

function addUIEventListeners() {
    $("#endOption0").on("click", function () {
        // Start Beginner Mode
        newGame(true, false);
    });


    $('body').on("click", function (evt) {

            //            console.log($(evt.target).closest("[id]"), game.getCurrentStep())

        }

    )
    // Attach event listeners to buttons on header
    $("#header button").on("click", function (event) {
        $("#header button").each(function (index) {
            $(this).removeClass("headerButtonActive");
        });
        var id = $(this).toggleClass("headerButtonActive");
        var innerText = $(this).text();
        currentMode = innerText;
        switch (innerText) {
            case "Introduction":
                destroy();
                loadIntro();
                break;
            case "Tutorial":
            // window.location=".";
                destroy();
                loadTutorial();
                ms.setup();
                break;
            case "Quizzes":
                destroy();
                loadQuizzes();
                ms.setup();
                break;
        }
        ms.update();
    });


    $("#tutorial").trigger("click");

}




var currentMode = "Introduction"
//Encapsulation
$(function () {
  var state = {
    zoom: 1,
    row: 1,
    col: 1,
    index: 1,
    brightness: 0,
    focus: 0
  }
  // console.log(state)


$('.screen').on("mouseout",function(){

//$('.screen *').off("mousedown");

}).on('click',function(evt){

// console.log(jQuery._data( evt.currentTarget, "events" ))



})

    helpText = {};

    $.when(getData()).then(function (result) {
        loadMicroscope().done(
            function () {
                // console.log("before logic")
                slideZoomInstance = new slideZoom("#slideViewContainer");
                slideZoomInstance.showSlide(state);

                addUIEventListeners();
            }
        );

        for (var i = 0; i < result.length; i++) {
            helpText[result[i].key] = {
                longText: result[i].longText,
                shortText: result[i].shortText,
                feedbackText: result[i].feedbackText
            }
        }
        // console.log(helpText)

    })

});
