function Game(guided, manual) {
    this.guided = guided;
    this.manual = manual;
    this.steps = [];
    this.groups = [];
    this.addStep = function(step) {
        this.steps.push(step);
    }
    this.addGroup = function(group) {
        this.groups.push(group);
    }
    this.linkSteps = function() {
        for (var i = 0; i < this.steps.length - 1; i++) {
            this.steps[i].successor = this.steps[i + 1];
        }
        this.makeStepObjects();
    }
    this.makeStepObjects = function() {
        // console.log("Making steps");
        // Make group objects
        for (var i = 0; i < this.groups.length; i++) {
            $("#steps").append("<div id='group" + i + "' class='group'></div>");
            $("#group" + i).append("<div class='icon_bg'></div>");
            $("#group" + i).append("<div id='groupIcon" + i + "' class='icon'></div>");
            $("#group" + i).append("<div id='groupPanel" + i + "' class='groupPanel'></div>");
            $("#groupPanel" + i).append("<div id='groupText" + i + "' class='stepText fs-18'></div>");
            //            $("#group" + i).css({
            //                'top': (10 * i) + "%"
            //            });
        }
        // Make step objects
        var that = this //l ol
            for (var i = 0; i < this.steps.length; i++) {
                $("#steps").append("<div id='step" + i + "' class='step'></div>");
                $("#step" + i).append("<div class='icon_bg'></div>");
                $("#step" + i).append("<div id='icon" + i + "' class='icon'></div>");
                $("#step" + i).append("<div id='panel" + i + "' class='stepPanel'></div>");
                $("#panel" + i).append("<div id='stepText" + i + "' class='stepText fs-18'></div>");
                $("#step" + i).append("<div id='stepTextHint" + i + "' class='stepTextHint fs-12'>" + this.steps[i].longText +"</div>");

                var stepStr = ("#step" + i);
                // Enable scroll down hints on steps.
                $(stepStr).click(function(){
                    var stepId = $(this).attr("id");
                    var stepIndex = parseInt(stepId.replace("step", ""));
                    //console.log(stepId);
                    //console.log($(this).prop('style')['top']);
                    var j=that.steps.length;
                    var stepPerc = parseInt(($(this).prop('style')['top']).replace("%",""));

                    // Locate Step object
                    var expandedState = null;
                    that.steps.forEach(function(elem){
                        if (elem.div == stepStr) {
                            expandedState = elem.expanded
                            elem.expanded = !elem.expanded
                    
                            // Toggle hint visibility
                            $("#stepTextHint" + stepIndex).toggle("fast", function(){
                            });
                        }
                    });

                    // Set offset value
                    var offsetValue = "+=0";
                    if (!expandedState) offsetValue = "+=100";
                    else offsetValue = "-=100";

                    that.groups.forEach(function(elem){
                        var groupPerc = parseInt(($(elem.div).prop('style')['top']).replace("%",""));
                        if (stepPerc < groupPerc){
                            //$(elem.div).css("margin-top", offsetValue);

                            $(elem.div).animate({
                                "margin-top": offsetValue
                            }, "fast", function(){});
                            
                            //console.log(groupPerc);
                        }
                    })

                    that.steps.forEach(function(elem){
                        var groupPerc = parseInt(($(elem.div).prop('style')['top']).replace("%",""));
                        if (stepPerc < groupPerc){
                            //$(elem.div).css("margin-top", offsetValue);
                            //console.log(groupPerc);
                            //
                            $(elem.div).animate({
                                "margin-top": offsetValue
                            }, "fast", function(){});
                        }
                    })
                });

            }

    }
    this.getSteps = function() {
        return this.steps;
    }
    this.getGroups = function() {
        return this.groups;
    }
    this.getGroupStep = function(i, j) {
        return this.groups[i].steps[j];
    }
    this.getCurrentStep = function() {
        for (var i = 0; i < this.getSteps().length; i++) {
            if (this.getSteps()[i].state == 1)
                return this.getSteps()[i];
        }
    }
    this.isGuided = function() {
        return this.guided;
    }
    this.isManual = function() {
        return this.manual;
    }

    // Expands/collapses the appropriate step objects
    this.updateStepExpansion = function() {
        // Assign a base to each of the steps
        var currentLine = 0;
        for (var i = 0; i < this.getGroups().length; i++) {
            // For each group...
            var currentGroup = this.getGroups()[i];
            currentGroup.animateToPosition(currentLine);
            if (currentGroup.state != 1) {
                // Either inactive or complete; collapse it
                for (var j = 0; j < currentGroup.steps.length; j++) {
                    var currentStep = currentGroup.steps[j];
                    currentStep.animateToPosition(currentLine);
                }
                // New line
                currentLine++;
            } else {
                // Active; expand it
                for (var j = 0; j < currentGroup.steps.length; j++) {
                    var currentStep = currentGroup.steps[j];
                    currentLine++;
                    currentStep.animateToPosition(currentLine);
                }
                currentLine++;
            }
        }
    }
}

function Step(id, shortText, longText, feedbackText, div, iconDiv) {
    this.id = id;
    this.shortText = shortText;
    this.longText = longText;
    this.feedbackText = feedbackText;
    this.div = div;
    this.iconDiv = iconDiv;
    this.successor;
    this.expanded = false; // Toggle expansion state for extra hints
    this.state = 0; // 0 if inactive and not complete, 1 if active and not complete, 2 if complete (cannot be active anymore), 3 if failed
    this.hintTimeout = 0;
    this.hintShowing = false;
    this.position = 0;
    this.isActive = function() {
        return this.state == 1;
    };
    this.isComplete = function() {
        return this.state == 2;
    };
    this.isFailed = function() {
        return this.state == 3;
    }
    this.complete = function() {
        if (this.state == 1) {
            endStep(this);
            this.state = 2;
            animateCompleteObject(this);
            if (this.successor != null) {
                this.successor.activate();
            }
            this.prepComplete();
            updateSteps();
        }
    };
    this.activate = function() {
        if (this.state == 0) {
            this.state = 1;
            animateActivateObject(this, false);
            startStep(this);
            // Start timer to show hint
            if (game.isGuided()) {
                this.hintTimeout = setTimeout(function(t) {
                    t.hintShowing = true;
                    $("#box_" + t.id).removeClass("anim_hintFadeOut")
                    $("#box_" + t.id).addClass("anim_hintFadeIn")
                }, 2000, this);
            }
        }

        //console.log(div);
    }
    this.reset = function() {
        this.state = 0;
    };
    this.setSuccessor = function(successor) {
        this.successor = successor;
    };
    this.fail = function() {
        this.state = 3;
        animateFailObject(this);
        updateSteps();
        setTimeout(function() {
            endGame("lose");
        }, 1000);
    }
    this.getFeedbackText = function() {
        return this.feedbackText;
    }
    this.prepComplete = function() {
        // Hide hint
        if (this.hintShowing) {
            $("#box_" + this.id).removeClass("anim_hintFadeIn");
            $("#box_" + this.id).addClass("anim_hintFadeOut");
            setTimeout(function() {
                $("#box_" + this.id).removeClass("anim_hintFadeOut");
            }, 250);
            this.hintShowing = false;
        }
        clearTimeout(this.hintTimeout);
        this.hintTimeout = 0;
    }
    this.animateToPosition = function(line) {
        this.position = line;
        $(this.div).animate({
            'top': (10 * line) + "%"
        }, 250);
    }
}

// Object representing a collapsable group of steps
function StepGroup(id, shortText, div, iconDiv) {
    this.id = id;
    this.shortText = shortText;
    this.div = div;
    this.iconDiv = iconDiv;
    this.steps = [];
    this.position = 0;
    this.state = 0; // 0 = inactive, 1 = active, 2 = complete
    this.addStep = function(newStep) {
        this.steps.push(newStep);
    }
    this.checkState = function() {
        var newState = 2;
        for (var i = 0; i < this.steps.length; i++) {
            // console.log(this.steps[i].state);
            if (this.steps[i].state == 1) {
                if (this.state != 1) {
                    this.activate();
                }
                return;
            }
            if (this.steps[i].state == 0) {
                newState = 0;
            }
        }
        if (newState == 2) {
            this.complete();
        }
        this.state = newState;
    }
    this.animateToPosition = function(line) {
        this.position = line;
        $(this.div).animate({
            'top': (10 * line) + "%"
        }, 250);
    }
    this.isActive = function() {
        return this.state == 1;
    };
    this.isComplete = function() {
        return this.state == 2;
    };
    this.isFailed = function() {
        return this.state == 3;
    }
    this.complete = function() {
        if (this.state == 1) {
            this.state = 2;
            animateCompleteObject(this);
        }
    };
    this.activate = function() {
        if (this.state == 0) {
            this.state = 1;
            animateActivateObject(this, true);
        }
    }
    this.fail = function() {
        this.state = 3;
        animateFailObject(this);
    }
    this.reset = function() {
        this.state = 0;
    };
}

function updateSteps() {
    // Group status
    for (var i = 0; i < game.groups.length; i++) {
        game.groups[i].checkState();
    }
    // Step text
    // Steps
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
    // Groups
    for (var i = 0; i < game.groups.length; i++) {
        var group = game.groups[i];
        if (game.isGuided()) {
            $("#groupText" + i).text(group.shortText);
        } else {
            if (step.isComplete() || group.isFailed()) {
                $("#groupText" + i).text(group.shortText);
            } else {
                $("#groupText" + i).text("? ? ? ? ?");
            }
        }
    }
    // Position
    game.updateStepExpansion();
}

function enterStepObjects() {
    for (var i = 0; i < game.groups.length; i++) {
        var cur = game.groups[i];
        setTimeout(function(cur) {
            $(cur.div).removeClass("anim_exitStepObject");
            $(cur.div).addClass("anim_enterStepObject");
        }, 40 * cur.position, cur);
    }
    for (var i = 0; i < game.steps.length; i++) {
        var cur = game.steps[i];
        setTimeout(function(cur) {
            $(cur.div).removeClass("anim_exitStepObject");
            $(cur.div).addClass("anim_enterStepObject");
        }, 40 * cur.position, cur);
    }
}

function exitStepObjects() {
    for (var i = game.groups.length - 1; i >= 0; i--) {
        var cur = game.groups[i];
        setTimeout(function(cur) {
            $(cur.div).removeClass("anim_enterStepObject");
            $(cur.div).addClass("anim_exitStepObject");
        }, 40 * cur.position, cur);
    }
    for (var i = game.steps.length - 1; i >= 0; i--) {
        var cur = game.steps[i];
        setTimeout(function(cur) {
            $(cur.div).removeClass("anim_enterStepObject");
            $(cur.div).addClass("anim_exitStepObject");
        }, 40 * cur.position, cur);
    }
}

function animateActivateObject(obj, isGroup) {
    var div = obj.iconDiv;
    // console.log(div);
    $(div).addClass("inactiveIcon");
    $(div).addClass("anim_stepExit");
    setTimeout(function() {
        $(div).removeClass("anim_stepExit");
        $(div).removeClass("inactiveIcon");
        $(div).addClass("anim_stepEnter");
        if (isGroup) {
            $(div).addClass("activeGroupIcon");
        } else {
            $(div).addClass("activeIcon");
        }
    }, 125);
    setTimeout(function() {
        $(div).removeClass("anim_stepEnter");
    }, 500);
}

function animateCompleteObject(obj) {
    var div = obj.iconDiv;
    // console.log(div);
    $(div).removeClass("inactiveIcon");
    $(div).addClass("activeIcon");
    $(div).addClass("anim_stepExit");
    setTimeout(function() {
        $(div).removeClass("anim_stepExit");
        $(div).removeClass("activeIcon");
        $(div).addClass("anim_stepEnterBig");
        $(div).addClass("completeIcon");
    }, 125);
    setTimeout(function() {
        $(div).removeClass("anim_stepEnterBig");
    }, 500);
}

function animateFailObject(obj) {
    var div = obj.iconDiv;
    console.log(div);
    $(div).removeClass("inactiveIcon");
    $(div).addClass("activeIcon");
    $(div).addClass("anim_stepExit");
    setTimeout(function() {
        $(div).removeClass("anim_stepExit");
        $(div).removeClass("activeIcon");
        $(div).addClass("anim_stepEnterBig");
        $(div).addClass("failIcon");
    }, 125);
    setTimeout(function() {
        $(div).removeClass("anim_stepEnterBig");
    }, 500);
}
