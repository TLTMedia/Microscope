var UNLOCK_EVERYTHING = true;

var stageLeft = 0;
var stageTop = 0;
var stageWidth = 0;
var stageHeight = 0;
var coverTop = 0;
var coverBottom = 0;
var coverLeft = 0;
var coverRight = 0;

var knobTest = 0;

var waveStepSize = 5;

// Determines the display
var display = 0; // The actual display that should be shown if calibrated properly
var calibration = 0; // The user's calibration value determined entirely by dials
var error = -5; // The machine's error in the beginning which must be offset by calibration

// Correct reading answer
var reading = 0;

// All reading objects
var readings = [];
var currentReading = 0;
var totalReadings = 3;

var zoomLevel = 1; // Current zoom level
var cuvetteIn = false;

// Clock position
var clockOffset = 0; // Number of minutes to offset the clock; changes during warm up phase

// Showing challenges?
var showingChallenges = false;

var secretEnabled = false;
var secretDoorOpen = false;
var secretDoorCode = [];
var secretButtonsClicked = [false, false, false, false, false, false, false, false, false];
var secretCodeEntered = [];

// All students' data
var allData = [];

var knobs = [
    {
        width: 0,
        height: 0,
        center: {
            x: 0,
            y: 0
        },
        angle: 0,
        rotation: 0,
        link: [0, 2],
        enabled: true,
        bounds: [0, 360]
    },
    {
        width: 0,
        height: 0,
        center: {
            x: 0,
            y: 0
        },
        angle: 0,
        rotation: 0,
        link: [1, 3],
        enabled: true,
        bounds: [0, 360]
    },
    {
        width: 0,
        height: 0,
        center: {
            x: 0,
            y: 0
        },
        angle: 0,
        rotation: 0,
        link: [0, 2],
        enabled: true,
        bounds: [0, 360]
    },
    {
        width: 0,
        height: 0,
        center: {
            x: 0,
            y: 0
        },
        angle: 0,
        rotation: 0,
        link: [1, 3],
        enabled: true,
        bounds: [0, 360]
    },
    {
        width: 0,
        height: 0,
        center: {
            x: 0,
            y: 0
        },
        angle: 0,
        rotation: 0,
        link: [4],
        enabled: true,
        bounds: [0, 270]
    }

];

// Knob controls

// Clicky stuff here
$(function () {
    resizeWindow();

    $.ajax({
        url: "info.php",
        dataType: "json"
    }).done(function (data) {
        netID = data.name;
        firstName = data.firstname;
        getStats = data.stats;
        // Special Case
        if (netID == "pgraziosi" || netID == "japalmeri") firstName = "Jim";
        if (netID == "pstdenis") firstName = "Denis"; // lol
        if (Object.keys(getStats).length == 0) {
            // New file
            // console.log("new file");
        } else {
            stats = getStats;
            // console.log("not a new file");
            // console.log(stats);
        }
        if (stats.secret == undefined) {
            stats.secret = false;
        }
        postData();
        // Get all data
        getAllData();
    }).fail(function () {
        if (UNLOCK_EVERYTHING) {
            startOffline();
        }
        continueLoading();
    });


});

function startOffline() {
    stats = {
        hintsWins: 10,
        noHintsWins: 10,
        expertWins: 10,
        readTransmittance: 20,
        readAbsorbance: 20,
        noHintsWinStreak: 3,
        expertWinStreak: 3,
        challengeStates: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        secret: false
    }
}

function continueLoading() {
    // Clock
    setClock();
    setInterval(setClock, 1000);

    // Broken for now
    // initKnobs(4);

    initSecretBox();

    // Knob rotation controls
    for (var i = 0; i < knobs.length; i++) {
        knobControls(i);
    }
    $("body").mouseup(function () {
        $(".knob").off("mousemove touchmove");
    });

    $("#holder_cover").click(function () {
        if (!coverLocked) {
            if (coverOpen) {
                closeHolder();
            } else {
                openHolder();
            }
            coverOpen = !coverOpen;
        }
        if (insertBlank.isActive() || insertSample.isActive() || !game.isGuided()) {
            enableClicks(false);
            if (!insertBlank.isActive() && !insertSample.isActive()) {
                lockInput = true;
                failGame("clicked the holder cover", "");
            } else if (insertBlank.isActive()) {
                openHolder();
                $("#smallBlank").removeClass("anim_selectSmallBlank");
                $("#smallBlank").addClass("anim_insertCuvette");
                insertBlank.prepComplete();
                setTimeout(function () {
                    insertBlank.complete();
                }, 2000);
            } else if (insertSample.isActive()) {
                openHolder();
                $("#smallSample").removeClass("anim_selectSmallSample");
                $("#smallSample").addClass("anim_insertCuvette");
                insertSample.prepComplete();
                setTimeout(function () {
                    insertSample.complete();
                }, 2000);
            }
        }
    });

    $("#cuvetteOld").click(function () {
        if (cleanHolder.isActive()) {
            if (holderStatus == "old") {
                enableClicks(false);
                $("#cuvetteOld").addClass("anim_cuvetteExit");
                holderStatus = "empty";
                cleanHolder.prepComplete();
                setTimeout(function () {
                    closeHolder();
                }, 1500);
            }
        }
    });

    $("#cuvetteNew").click(function () {
        if (removeBlank.isActive()) {
            enableClicks(false);
            if (holderStatus == "blank") {
                $("#cuvetteNew").removeClass("anim_cuvetteEnter");
                $("#cuvetteNew").addClass("anim_cuvetteExit");
                holderStatus = "empty";
                removeBlank.prepComplete();
                setTimeout(function () {
                    removeBlank.complete();
                }, 1500);
            }
        }
    });

    $("#cuvetteBlank").click(function () {
        if (selectBlank.isActive() || !game.isGuided()) {
            enableClicks(false);
            openHolder();
            $("#cuvetteNew").addClass("animBlank");
            $("#cuvetteNew").addClass("anim_cuvetteEnter");
            $("#cuvetteBlank").css({
                opacity: 0
            });
            holderStatus = "blank";
            if (!selectBlank.isActive()) {
                lockInput = true;
                setTimeout(function () {
                    failGame("selected the LB-Media blank", "");
                }, 1000);
            } else {
                selectBlank.prepComplete();
                setTimeout(function () {
                    selectBlank.complete();
                }, 2000);
            }
        }
    });

    $("#cuvetteSample").click(function () {
        if (insertSample.isActive() || !game.isGuided()) {
            enableClicks(false);
            openHolder();
            $("#cuvetteNew").addClass("animSample");
            $("#cuvetteNew").addClass("anim_cuvetteEnter");
            $("#cuvetteSample").css({
                opacity: 0
            });
            holderStatus = "sample";
            if (!insertSample.isActive()) {
                lockInput = true;
                setTimeout(function () {
                    failGame("selected the bacteria sample", "");
                }, 1000);
            } else {
                insertSample.prepComplete();
                setTimeout(function () {
                    insertSample.complete();
                }, 2000);
            }
        }
    });

    $("#numpadOK").click(function () {
        if (readSample.isActive() && !lockInput) {
            submitEntry();
        }
    });

    $("#endOption1").click(function () {
        // Start Beginner Mode
        newGame(true, false);
    });

    $("#endOption2").click(function () {
        // Start Intermediate Mode
        if (stats.challengeStates[0])
            newGame(false, false);
    });

    $("#endOption3").click(function () {
        // Start Expert Mode
        if (stats.challengeStates[1])
            newGame(false, true);
    });

    $("#zoomCircle1").click(function () {
        if (game.isManual()) {
            setSelectedCircle(1);
            if (zoomLevel == 3) {
                zoom(1);
            } else if (zoomLevel == 4) {
                zoom(5);
            }
        }
    });

    $("#zoomCircle2").click(function () {
        if (game.isManual()) {
            setSelectedCircle(2);
            if (zoomLevel == 1) {
                zoom(3);
            } else if (zoomLevel == 4) {
                zoom(5);
                setTimeout(function () {
                    zoom(3);
                }, 250);
            }
        }
    });

    $("#zoomCircle3").click(function () {
        if (game.isManual()) {
            setSelectedCircle(3);
            if (zoomLevel == 1) {
                zoom(4);
            } else if (zoomLevel == 3) {
                zoom(1);
                setTimeout(function () {
                    zoom(4);
                }, 250);
            }
        }
    });

    $("#okButton").click(function () {
        if (!game.isGuided()) {
            if (setWavelength.isActive()) {
                if (currentWavelength == goalWavelength) {
                    setWavelength.complete();
                } else {
                    waveZoomOut();
                    failGame("set the wavelength to " + currentWavelength + " nm", "set the wavelength to " + goalWavelength + " nm");
                }
            }
        }
    });

    $("#challengeButton").click(function (event) {
        if (showingChallenges) {
            hideChallengeScreen();
        } else {
            showChallengeScreen();
        }
    });

    // Prep challenges
    prepChallenges();

    $(".cellSelected").hover(function (e) {
        // Mouse over cell
        var id = betterParseInt($(e.target).attr('id'));
        if ($(e.target).attr('id') == "viewLeaderboardSelected") {
            id = 100;
        }
        setCurrentChallenge(id);
        $("#currentChallenge").css({
            "opacity": 1
        });
        if (id != 100) {
            // Mark challenge as not new
            challenges.getChallenge(id).setAsNew(false);
        }
    }, function () {
        // Leave cell
        $("#currentChallenge").css({
            "opacity": 0
        });
    });

    $(".cellSelected").click(function (e) {
        // Mouse over cell
        var id = betterParseInt($(e.target).attr('id'));
        //challenges.getChallenge(id).complete();
    });

    for (var i = 1; i <= 3; i++) {
        initEndOptionHover(i);
    }

    $("#smallBlank").click(function () {
        if (selectBlank.isActive() || removeBlank.isActive() || !game.isGuided()) {
            enableClicks(false);
            if (removeBlank.isActive()) {
                if (holderStatus == "blank") {
                    $("#smallBlank").removeClass("anim_insertCuvette");
                    $("#smallBlank").addClass("anim_returnSmallBlank");
                    holderStatus = "empty";
                    removeBlank.prepComplete();
                    setTimeout(function () {
                        removeBlank.complete();
                    }, 1500);
                }
            } else if (selectBlank.isActive()) {
                $("#smallBlank").addClass("anim_selectSmallBlank");
                holderStatus = "blank";
                selectBlank.prepComplete();
                setTimeout(function () {
                    selectBlank.complete();
                }, 1000);
            } else {
                lockInput = true;
                failGame("selected the blank", "");
            }
        }

    });

    $("#smallSample").click(function () {
        if (selectSample.isActive() || !game.isGuided()) {
            enableClicks(false);
            if (!selectSample.isActive()) {
                lockInput = true;
                failGame("selected the sample", "");
            } else {
                $("#smallSample").addClass("anim_selectSmallSample");
                holderStatus = "sample";
                selectSample.prepComplete();
                setTimeout(function () {
                    selectSample.complete();
                }, 1000);
            }
        }
    });

    $("#wipes").click(function () {
        if (wipeBlank.isActive() || wipeSample.isActive() || !game.isGuided()) {
            enableClicks(false);
            if (!wipeBlank.isActive() && !wipeSample.isActive()) {
                lockInput = true;
                failGame("clicked the wipes", "");
            } else if (wipeBlank.isActive()) {
                $("#wipe").addClass("anim_wipeTube");
                wipeBlank.prepComplete();
                setTimeout(function () {
                    $("#wipe").removeClass("anim_wipeTube");
                    wipeBlank.complete();
                }, 2000);
            } else if (wipeSample.isActive()) {
                $("#wipe").addClass("anim_wipeTube");
                wipeSample.prepComplete();
                setTimeout(function () {
                    $("#wipe").removeClass("anim_wipeTube");
                    wipeSample.complete();
                }, 2000);
            }
        }
    });

    updateWipes();
    checkSecretAccess();

    // Count clicks
    $("body").click(function () {
        hintsModeClicks++;
    });

    $("#viewLeaderboardSelected").click(function () {
        window.open("https://apps.tlt.stonybrook.edu/bio/leaderboard", "_self");
    });

    $(".secret_door").click(function () {
        activateSecretDoor();
    });

    $(window).keypress(function () {

    });

    $(document).keydown(function (objEvent) {
        if (objEvent.keyCode == 9) { //tab pressed
            objEvent.preventDefault(); // stops its action
        }
    });

    $(document).keypress(function (e) {
        if (e.which == 13 && (readSample.isActive() && !lockInput)) {
            submitEntry();
        }
    });

    // Load menu
    resizeWindow();
    loadStartMenu();
}

function initEndOptionHover(id) {
    $("#endOption" + id).hover(function () {
        // Mouse over cell
        setCurrentChallenge(id);
        $("#endOptionDesc" + id).removeClass("anim_exitEndOptionDesc");
        $("#endOptionDesc" + id).addClass("anim_enterEndOptionDesc");

    }, function () {
        // Leave cell
        $("#endOptionDesc" + id).removeClass("anim_enterEndOptionDesc");
        $("#endOptionDesc" + id).addClass("anim_exitEndOptionDesc");
    });
}

/*
    Post data to the server!
    ALL HAIL KING SERVER
*/
function postData() {
    var str = JSON.stringify(stats);
    $.ajax({
        type: "POST",
        url: "writer.php",
        data: {
            'stats': str
        }
    }).done(function (msg) {
        //alert("Data Saved: " + msg);
    }).fail(function () {
        //alert("There was an error with the server :(");
    });
}

function getAllData() {
    $.ajax({
        url: "info_allScores.php",
        dataType: "json"
    }).done(function (data) {
        allData = data;
        continueLoading();
    }).fail(function () {

    });
}

function openHolder() {
    $("#holder_cover").removeClass("holder_cover_closed");
    $("#holder_cover").addClass("holder_cover_open");
}

function closeHolder() {
    $("#holder_cover").removeClass("holder_cover_open");
    $("#holder_cover").addClass("holder_cover_closed");
    if (cleanHolder.isActive() && holderStatus == "empty") {
        cleanHolder.complete();
    }
}

function enterNumpad() {
    $("#numpad").removeClass("anim_numpadOut");
    $("#numpad").addClass("anim_numpadIn");
}

function exitNumpad() {
    $("#numpad").removeClass("anim_numpadIn");
    $("#numpad").addClass("anim_numpadOut");
}

function submitEntry() {
    // Get text from the text field
    var entry = $("#numInput").val();
    if (entry == "") {
        return;
    }
    // Get current reading
    var obj = readings[currentReading];
    //allow for % transmittance
    if(readings[currentReading].type == "t") {
	entry=entry.replace("%","");
    }

    // Check to see if it is correct
    if (Math.abs(obj.reading - entry) < .00001) {
        // Correct
        fadeSuccess();
        $("#numInput").val("");
        // Increment correct reading total
        if (readings[currentReading].type == "t") {
            stats.readTransmittance++;
        } else if (readings[currentReading].type == "a") {
            stats.readAbsorbance++;
        }
        if (currentReading < readings.length - 1) {
            // More to go
            currentReading++;
            showReading();
        } else {
            // Finished, complete game
            readSample.complete();
        }
    } else {
        fadeFail();
        if (game.isGuided()) {
            hintsModeMistakes++;
        }
        if (!game.isGuided()) {
            lockInput = true;
            $("#numInput").prop("disabled", true);
            setTimeout(function () {
                zoom(1);
                exitNumpad();
                failGame("entered " + entry, "enter " + (Math.floor(10000 * obj.reading)) / 10000);
            }, 1000);
        }
    }
    // Easter egg
    if (entry == "Paul") {
        $("title").text("Photospectrometer");
    }
}

function initKnobs(numKnobs) {
    knobs = [];
    for (var i = 0; i < numKnobs; i++) {
        knobs[i] = {
            width: 0,
            height: 0,
            center: {
                x: 0,
                y: 0
            },
            angle: 0,
            rotation: 0,
            link: [],
            enabled: true
        };
    }
}

function Knob() {
    this.width = 0;
    this.height = 0;
    this.center = {
        x: 0,
        y: 0
    };
    this.angle = 0;
    this.rotation = 0;
    this.link = 0;
    this.enabled = true;
}

function knobControls(i) {
    $("#knob" + i).bind('mousedown', function (e) {
        var knob = knobs[i];
        if (knob.enabled || !game.isGuided()) {
            var x = knob.center.x - e.pageX;
            var y = knob.center.y - e.pageY;
            knob.angle = getAngle(x, y);
            $("#knob" + i).bind('mousemove', function (e) {
                e.preventDefault();
                var x = knob.center.x - e.pageX;
                var y = knob.center.y - e.pageY;
                var angle = getAngle(x, y);
                var delta = angleDistance(knob.angle, angle);
                var links = knob.link;
                for (var j = 0; j < links.length; j++) {
                    knobRotate(links[j], delta);
                }
                knob.angle = angle;
                // console.log(angle);
            });
        }
    });
    $("#knob" + i).bind('touchstart', function (e) {
        var knob = knobs[i];
        if (knob.enabled || !game.isGuided()) {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            var x = knob.center.x - touch.pageX;
            var y = knob.center.y - touch.pageY;
            knob.angle = getAngle(x, y);
            $("#knob" + i).bind('touchmove', function (e) {
                e.preventDefault();
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                var x = knob.center.x - touch.pageX;
                var y = knob.center.y - touch.pageY;
                var angle = getAngle(x, y);
                var delta = angleDistance(knob.angle, angle);
                var links = knob.link;
                for (var j = 0; j < links.length; j++) {
                    knobRotate(links[j], delta);
                }
                knob.angle = angle;
                // console.log(angle);
            });
        }
    });
}

// Returns the difference between two angles, accounting for 0 to 360 jump.
function angleDistance(from, to) {
    var delta = to - from;
    if (delta < -180) delta += 360;
    if (delta > 180) delta -= 360;
    return delta;
}

function knobRotate(id, delta) {
    var knob = knobs[id];
    knobTest += delta;
    // Apply rotation
    knob.rotation += delta;
    // Constrain knob rotation to its bounds
    if (knob.rotation < knob.bounds[0]) {
        knob.rotation = knob.bounds[0];
    }
    if (knob.rotation > knob.bounds[1]) {
        knob.rotation = knob.bounds[1];
    }
    $("#knob" + id).css({
        'transform': "rotate(" + knob.rotation + "deg)"
    });
    // Check for events
    // Turning on
    if (turnOn.isActive()) {
        // If rotation of knob 0 is 90, complete the task
        if (knobs[0].rotation == 90) {
            $(".knob").off("mousemove touchmove");
            turnOn.complete();
        }
    }
    // Zero with power knob
    if (id == 0) {
        if (zeroLeft.isActive()) {
            currentCalibration = ((knobs[2].rotation - 90) * 10 / 360);
            setNeedle(display + currentCalibration + error);
            // If calibrated, go to next event
            if (Math.abs(currentCalibration + error) < .2) {
                if (stableCheckEvent == 0) {
                    stableCheckEvent = setTimeout(function () {
                        if (Math.abs(currentCalibration + error) < .2) {
                            $(".knob").off("mousemove touchmove");
                            zeroLeft.complete();
                        }
                    }, 1000);
                }
            } else {
                clearTimeout(stableCheckEvent);
                stableCheckEvent = 0;
            }
        } else if (turnOn.isActive() || warmUp.isActive()) {

        } else if (!game.isGuided()) {
            if (zoomLevel != 1) {
                zoom(1);
            }
            failGame("adjusted the power control knob", "");
        }
    }
    // Zero with light control knob
    if (id == 3) {
        if (zeroRight.isActive()) {
            blankAdjust = ((knobs[3].rotation) * 10 / 360);
            setNeedle(display + currentCalibration + error + blankAdjust + 95);
            // If calibrated, go to next event
            if (Math.abs(100 - (display + currentCalibration + error + blankAdjust + 95)) < .2) {
                if (stableCheckEvent == 0) {
                    stableCheckEvent = setTimeout(function () {
                        if (Math.abs(100 - (display + currentCalibration + error + blankAdjust + 95)) < .2) {
                            $(".knob").off("mousemove touchmove");
                            zeroRight.complete();
                        }
                    }, 1000);
                }
            } else {
                clearTimeout(stableCheckEvent);
                stableCheckEvent = 0;
            }
        } else if (!game.isGuided()) {
            if (zoomLevel != 1) {
                zoom(1);
            }
            failGame("adjusted the light control knob", "");
        }
    }
    // Set wavelength
    if (setWavelength.isActive()) {
        setWaveWheel(waveStepSize);
        if (game.isGuided()) {
            if (currentWavelength == goalWavelength) {
                if (stableCheckEvent == 0) {
                    stableCheckEvent = setTimeout(function () {
                        if (currentWavelength == goalWavelength) {
                            setWavelength.complete();
                        }
                    }, 1000);
                }
            } else {
                clearTimeout(stableCheckEvent);
                stableCheckEvent = 0;
            }
        }
    }
}

function setNeedle(t) {
    var rotation = "rotate(" + ((0.9 * t - 45)) + "deg)";
    $("#needle").css({
        'transform': rotation
    });
}

function animateNeedle(from, to, time) {
    var angleFrom = ((0.9 * from - 45));
    var angleTo = ((0.9 * to - 45));
    var $elem = $('#needle');
    $({
        deg: angleFrom
    }).animate({
        deg: angleTo
    }, {
        duration: time,
        step: function (now) {
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}

function setWaveWheel(stepSize) {
    var rot = knobs[4].rotation;
    var wave = (rot * (61 / 27)) + 340;
    wave = Math.round(wave / stepSize) * stepSize;
    rot = (wave - 340) * (27 / 61);
    $("#waveWheel").css({
        'transform': "rotate(" + (rot - 180) + "deg)"
    });
    currentWavelength = wave;
    return wave;
}

function waveZoomIn() {
    $("#wavelength").css({
        'z-index': 1000
    });
    $("#wavelength").removeClass("anim_waveOut");
    $("#wavelength").addClass("anim_waveIn");
    if (game.isManual()) {
        showExtraButtons(false);
    }
    setTimeout(resizeWindow, 300);
}

function waveZoomOut() {
    $("#wavelength").removeClass("anim_waveIn");
    $("#wavelength").addClass("anim_waveOut");
    if (game.isManual()) {
        showExtraButtons(true);
    }
    setTimeout(function () {
        $("#wavelength").css({
            'z-index': -1000
        });
    }, 300);
}

function cuvettePanelIn() {
    $("#cuvettePanel").removeClass("anim_cuvettePanelOut");
    $("#cuvettePanel").addClass("anim_cuvettePanelIn");
    cuvetteIn = true;
}

function cuvettePanelOut() {
    $("#cuvettePanel").removeClass("anim_cuvettePanelIn");
    $("#cuvettePanel").addClass("anim_cuvettePanelOut");
    cuvetteIn = true;
}

function prepareReading(type) {
    var obj = {};
    obj.type = type;
    if (type == "t") {
        var t = Math.round(200 * Math.random()) / 2;
        obj.display = t;
        obj.reading = t;
    } else if (type == "a") {
        var a = 0;
        var r = 1.5 * Math.random();
        if (r < .5) {
            range = 0;
        } else if (r < .7) {
            range = 1;
        } else if (r < 1) {
            range = 2;
        } else if (r <= 1.5) {
            range = 3;
        }
        var range = Math.floor(4 * Math.random());
        if (range == 0) {
            a = .005 * Math.floor(100 * Math.random());
        }
        if (range == 1) {
            a = .5 + .01 * Math.floor(20 * Math.random());
        }
        if (range == 2) {
            a = .7 + .05 * Math.floor(6 * Math.random());
        }
        if (range == 3) {
            a = 1 + .05 * Math.floor(11 * Math.random());
        }
        var t = Math.pow(10, 2 - a);
        obj.display = t;
        obj.reading = a;
    }
    return obj;
}

function prepareReadings(count) {
    readings = [];
    currentReading = 0;
    for (var i = 0; i < count; i++) {
        var type = "t";
        if (Math.random() < .5) {
            type = "a";
        }
        var obj = prepareReading(type);
        readings.push(obj);
    }
    readings.sort(function (a, b) {
        return b.display - a.display;
    })
    showReading(0);
}

function showReading() {
    var obj = readings[currentReading];
    if (currentReading > 0) {
        var objOld = readings[currentReading - 1];
        animateNeedle(objOld.display, obj.display, 2000);
    } else {
        animateNeedle(100, obj.display, 2000);
    }
    if (obj.type == "t") {
        $("#inputText").text("Enter Transmittance");
    } else if (obj.type == "a") {
        $("#inputText").text("Enter Absorbance");
    }
    $("#readingCountText").text("Reading " + (currentReading + 1) + " of " + totalReadings);
    setTimeout(function () {
        $("#numInput").focus();
    }, 300);
}

// Better than parseInt() in that it detects the first integer in a string even if it starts with something that is not a number.  Still returns NaN if no integers are found.
function betterParseInt(s) {
    var str = s + "";
    while (isNaN(parseInt(str)) && str.length > 0) {
        str = str.substring(1, str.length);
    }
    return parseInt(str);
}

// Returns the angle (from 0 to 360 degrees) determined by the given offset (x, y)
function getAngle(x, y) {
    return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}

// Fix aspect ratio of the stage
$(window).resize(function () {
    resizeWindow();
});

// Resize the window
function resizeWindow() {
    // Get window width and height
    var w = $(window).width();
    var h = $(window).height();
    // If the aspect ratio is greater than or equal to 4:3, fix height and set width based on height
    if ((w / h) >= 4 / 3) {
        stageHeight = h;
        stageWidth = (4 / 3) * h;
        stageLeft = (w - stageWidth) / 2;
        stageTop = 0;
        coverTop = 0;
        coverBottom = 0;
        coverLeft = stageLeft;
        coverRight = stageLeft;
    }
    // If the aspect ratio is less than 4:3, fix width and set height based on width
    else {
        stageWidth = w;
        stageHeight = (3 / 4) * w;
        stageTop = (h - stageHeight) / 2;
        stageLeft = 0;
        coverTop = stageTop;
        coverBottom = stageTop;
        coverLeft = 0;
        coverRight = 0;
    }

    // Set "screen" object width and height to stageWidth and stageHeight, and center screen
    $(".screen").css({
        width: stageWidth + "px",
        height: stageHeight + "px",
        left: stageLeft + "px",
        top: stageTop + "px"
    });

    // Set "cover" object properties based on properties set above
    $("#coverTop").css({
        'width': w,
        'height': coverTop,
        'top': 0,
        'left': 0,
    });
    $("#coverBottom").css({
        'width': w,
        'height': coverBottom,
        'top': h - coverBottom,
        'left': 0,
    });
    $("#coverLeft").css({
        'width': coverLeft,
        'height': h,
        'top': 0,
        'left': 0,
    });
    $("#coverRight").css({
        'width': coverRight,
        'height': h,
        'top': 0,
        'left': w - coverRight,
    });

    // Resize corner border radii based on stage height
    var cornerSize = .025 * stageHeight;
    $(".rounded").css({
        '-webkit-border-radius': cornerSize + "px",
        '-moz-border-radius': cornerSize + "px",
        'border-radius': cornerSize + "px"
    });

    var cornerSize2 = .05 * stageHeight;
    $(".roundedRight").css({
        '-webkit-border-top-right-radius': cornerSize2 + "px",
        '-webkit-border-bottom-right-radius': cornerSize2 + "px",
        '-moz-border-radius-topright': cornerSize2 + "px",
        '-moz-border-radius-bottomright': cornerSize2 + "px",
        'border-top-right-radius': cornerSize2 + "px",
        'border-bottom-right-radius': cornerSize2 + "px"
    });

    // Resize text based on stage height
    // To give a class a certain font size, assign it the class "fs-X" where X is an integer between 1 and 1000. 1000 is the height of the screen.
    // New font resize loop
    for (var i = 1; i <= 1000; i++) {
        var s = stageHeight * (i / 1000);
        var c = ".fs-" + i;
        $(c).css({
            'font-size': s + "px"
        });
    }

    // Resize the stripes
    var stripeSize = stageHeight * .05;
    var str = stripeSize + "% " + stripeSize + "%"
    $(".stripes").css({
        'background-size': stripeSize
    });

    // Calibrate knob centers
    for (var i = 0; i < knobs.length; i++) {
        $("#knob" + i).css({
            'transform': ""
        });
        var offset = $("#knob" + i).offset();
        var w = $("#knob" + i).width();
        var h = $("#knob" + i).height();
        knob = knobs[i];
        knob.width = w;
        knob.height = h;
        knob.center.x = offset.left + w / 2;
        knob.center.y = offset.top + h / 2;
        $("#knob" + i).css({
            'transform': "rotate(" + knobs[i].rotation + "deg"
        });
    }
}

function updateSteps() {
    for (var i = 0; i < game.getSteps().length; i++) {
        var step = game.getSteps()[i];
        if (game.isGuided()) {
            $("#stepText" + i).text(step.shortText);
        } else {
            if (step.isComplete() || step.isFailed()) {
                $("#stepText" + i).text(step.shortText);
            } else {
                $("#stepText" + i).text("? ? ? ? ?");
            }
        }
    }
}

function testGame() {
    if (true) {
        readSample.activate();
        currentCalibration = -1 * error;
        prepareReadings(3);
    }
}

function setClock() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes() + clockOffset;
    var carry = (min - (min % 60)) / 60;
    hour += carry;
    min = min % 60;
    $("#clockHand1").css({
        "transform": "rotate(" + (30 * ((12 + hour) % 12) + (.5 * min)) + "deg)"
    });
    $("#clockHand2").css({
        "transform": "rotate(" + (6 * min) + "deg)"
    });
}

function fastForward(min) {
    for (var i = 0; i < min; i++) {
        setTimeout(function () {
            clockOffset++;
            setClock();
        }, 300 * i);
    }
}

function setCurrentChallenge(id) {
    if (id != 100) {
        // Icon
        var challenge = challenges.getChallenge(id);
        var cell = $("#currentState")
        cell.removeClass("unknownIcon");
        cell.removeClass("knownIcon");
        cell.removeClass("finishedIcon");
        if (challenge.isUnknown()) {
            cell.addClass("unknownIcon");
        } else if (challenge.isKnown()) {
            cell.addClass("knownIcon");
        } else if (challenge.isComplete()) {
            cell.addClass("finishedIcon");
        }
        if (challenge.isKnown() || challenge.isComplete()) {
            // Title
            $("#currentTitle").text(challenge.title);
            // Description
            $("#currentDesc").text(challenge.desc);
        } else {
            // Title
            $("#currentTitle").text("???");
            // Description
            $("#currentDesc").text("???");
        }
        if (challenge.isComplete()) {
            // Flavor text
            // $("#currentFlavor").text(challenge.flavor);
            $("#currentFlavor").text("Completed by " + (Math.floor((challenge.completionCount / allData.length) * 1000) / 10) + "% of players (" + challenge.completionCount + " / " + allData.length + ").");
        } else {
            // Flavor text
            $("#currentFlavor").text("");
        }
    } else {
        var cell = $("#currentState");
        cell.removeClass("unknownIcon");
        cell.removeClass("knownIcon");
        cell.addClass("finishedIcon");
        $("#currentTitle").text("Leaderboard");
        $("#currentDesc").text("View challenges and statistics for other lab games.");
        $("#currentFlavor").text("");
    }
}

function showChallengeScreen() {
    showingChallenges = true;
    $("#overlayBox").removeClass("anim_toLeft");
    $("#overlayBox").removeClass("snapToRight");
    $("#overlayBox").addClass("anim_toRight");
}

function hideChallengeScreen() {
    showingChallenges = false;
    $("#overlayBox").removeClass("snapToRight");
    $("#overlayBox").removeClass("anim_toRight");
    $("#overlayBox").addClass("anim_toLeft");
}

function showChallengeScreenInstant() {
    showingChallenges = true;
    $("#overlayBox").removeClass("anim_toLeft");
    $("#overlayBox").removeClass("anim_toRight");
    $("#overlayBox").addClass("snapToRight");
}

function setSelectedCircle(n) {
    $(".zoomCircle").css("opacity", 0);
    $("#zoomCircle" + n).css("opacity", 1);
}

function updateWipes() {
    // Easter egg: enable Jimwipes if the secret has been found
    if (stats.secret) {
        $("#wipes").removeClass("genericWipes");
        $("#wipes").addClass("jimWipes");
    } else {
        $("#wipes").removeClass("jimWipes");
        $("#wipes").addClass("genericWipes");
    }
}

function activateSecretDoor() {
    secretDoorOpen = !secretDoorOpen;
    if (secretDoorOpen) {
        $("#secret_door1").removeClass("anim_secret_door1_close");
        $("#secret_door2").removeClass("anim_secret_door2_close");
        $("#secret_door1").addClass("anim_secret_door1_open");
        $("#secret_door2").addClass("anim_secret_door2_open");
    } else {
        $("#secret_door1").removeClass("anim_secret_door1_open");
        $("#secret_door2").removeClass("anim_secret_door2_open");
        $("#secret_door1").addClass("anim_secret_door1_close");
        $("#secret_door2").addClass("anim_secret_door2_close");
    }
    if (secretDoorCode.length == 0) {
        // Get a random good permutation
        secretDoorCode = generateGoodPermutation();
        secretCursorSetup();
    }
}

function initSecretBox() {
    // Make button divs
    for (var i = 0; i < 9; i++) {
        $("#secret").append("<div id='secret_button" + i + "' class='secret_button'></div>");
        $("#secret_button" + i).css({
            'left': (22.5 * (i % 3) + 20) + "%",
            'top': (22.5 * Math.floor(i / 3) + 20) + "%"
        });
        $("#secret_button" + i).click(i, function (id) {
            secretButtonClicked(id.data);
        });
    }
}

function secretCursorSetup() {
    for (var i = 0; i < 9; i++) {
        var x1 = secretDoorCode[i] % 3;
        var y1 = Math.floor(secretDoorCode[i] / 3);
        var x2 = secretDoorCode[i + 1] % 3;
        var y2 = Math.floor(secretDoorCode[i + 1] / 3);
        if (i < 8) {
            var cursorTypes = [["nw", "n", "ne"], ["w", "x", "e"], ["sw", "s", "se"]];
            var cursorType = cursorTypes[y2 - y1 + 1][x2 - x1 + 1] + "-resize";
            $("#secret_button" + secretDoorCode[i]).css({
                'cursor': cursorType
            });
        } else {
            $("#secret_button" + secretDoorCode[i]).css({
                'cursor': "crosshair"
            });
        }
    }
}

function secretButtonClicked(id) {
    if (!secretButtonsClicked[id]) {
        // Record click
        secretButtonsClicked[id] = true;
        secretCodeEntered.push(id);
        // Light up clicked button
        $("#secret_button" + id).removeClass("anim_secretButtonFail");
        $("#secret_button" + id).addClass("anim_secretButtonOn");
        if (secretCodeEntered.length == 9) {
            // Check if code is correct TODO
            var isCorrect = true;
            for (var i = 0; i < 9; i++) {
                if (secretCodeEntered[i] != secretDoorCode[i]) {
                    isCorrect = false;
                }
            }
            if (isCorrect) {
                // Code correct
                $(".secret_button").removeClass("anim_secretButtonFail");
                $(".secret_button").removeClass("anim_secretButtonOn");
                $(".secret_button").addClass("anim_secretButtonSuccess");
                // Fade to madness
                $("#view").addClass("anim_madness");
                $("#fadeScreen").addClass("anim_fadeMadness");
                $("#secretMessage").addClass("anim_showSecretMessage");
                hideHints();
                // Record secret completion
                stats.secret = true;
                postData();
            } else {
                // Code incorrect
                $(".secret_button").removeClass("anim_secretButtonOn");
                $(".secret_button").addClass("anim_secretButtonFail");
                // Clear entry
                secretButtonsClicked = [false, false, false, false, false, false, false, false, false];
                secretCodeEntered = [];
            }
        }
    }
}

function generateGoodPermutation() {
    var goodPermutations = [];
    function pathPermutations(path, bank) {
        if (path.length == 9) {
            goodPermutations.push(path);
            return;
        }
        for (var i = 0; i < bank.length; i++) {
            var ok = false;
            if (path.length == 0) {
                ok = true;
            } else {
                if (isNextTo(path[path.length - 1], bank[i])) {
                    ok = true;
                }
            }
            if (ok) {
                var newPath = path.slice();
                newPath.push(bank[i]);
                var newBank = [];
                for (var k = 0; k < bank.length; k++) {
                    if (i != k) {
                        newBank.push(bank[k]);
                    }
                }
                pathPermutations(newPath, newBank);
            }
        }
    }

    function isNextTo(a, b) {
        if (Math.abs((a % 3) - (b % 3)) < 1.5 && Math.abs(Math.floor(a / 3) - Math.floor(b / 3)) < 1.5) {
            return true;
        }
        return false;
    }
    pathPermutations([], [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    return goodPermutations[Math.floor(Math.random() * goodPermutations.length)];
}

function enableClicks(bool) {
    console.log(bool);
    if (bool) {
        $("body").css("pointer-events", "auto");
    } else {
        $("body").css("pointer-events", "none");
    }
}
