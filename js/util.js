/*
 * modal.js
 *
 * Functionality for popup boxes and modals.
 */


function unbindComponentHover() {
    // Unbind the "Introduction" stuff
    for (var i = 0; i < components.length; i++) {
        $(components[i]).off("mouseenter");
        $(components[i]).off("mouseleave");
    }
}

// Misc. Functions
function popupOn(text, props) {
    $("#popup").show();
    $("#popup").stop(true).animate(props, "fast");
    $("#popupText").text(text);
}

// Takes arg string, type, where type is type of popup to convert to.
// As of now, there should be a unique popup box.
function updatePopup(type, text) {
    if (type == "Instruction") {
        $(".popupInstruct").text("Instruction");
        $(".popupInstruct").css("background-color", "rgba(114, 177, 191, 0.5)");
        $("#popupText").text(text);
    }
    if (type == "Warning") {
        $(".popupInstruct").text("Warning");
        $(".popupInstruct").css("background-color", "rgba(191, 114, 126, 0.8)");
        $("#popupText").text(text);
    }
}

function popupOff() {
    $("#popup").css("display", "none");
    //$("#popup").toggle("fast", function(){});
}


function textSetup(tooltip, lt, tp) {
    popupOn(tooltip, {
        "left": lt,
        "top": tp
    });
}


function toggleVisibility(id) {
    $(id).toggleClass("elementOff");
    $(id).toggleClass("elementOn");
}


String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



// Copies the style of one function and applies it to another.
// Args are jquery elements
function copyAnimation(elem1, elem2, type) {
    var style = css(elem1);
    $(elem2).css(style);
}


//
function updateClonedPosition(cloned, target) {
    if (cloned != null) {
        if (cloned.constructor === Array) {
            cloned.forEach(function (obj) {
                obj.attr('style', target.attr('style'));
            })
        } else {
            cloned.attr('style', target.attr('style'));
        }
    }
}

// Creates bounds for a step within a scene to progress to next steps
// low.js && setup.js dependant on this function
// args:
// property to inspect, lower bound, upper bound, engine piece, div piece, remove listener
function subHandler(prop, low, upper, piece, id, cloned) {
    // For every trigger, move the cloned position to the object position.
    // Called for movable pieces
    updateClonedPosition(cloned, $(id));
    if (prop >= low && prop <= upper) {
        removeHighlightId(id + "Copy");
        piece.complete();

        //SURROUND WITH AN IF STATEMENT
        //        if (handler != null) {
        //            $(document).unbind("mousemove", handler);
        //        }

    }
}

// Utility function to highlight component.
function highlightComponent(id) {
    var origPart = $(id);
    var clonePart = $(id).clone();
    lastPart = clonePart;
    clonePart.attr("pointer-events", "none");
    clonePart.toggleClass("highlightPart");
    clonePart.attr("id", id.replace("#", "") + "Copy");

    clonePart.attr("filter", "url(#blurMe)");
    clonePart.attr("transform", $(id).attr("transform"));
    clonePart.children().attr("fill", "rgba(0,0,0,0)");
    clonePart.insertBefore($(id));
    return clonePart;
}

// Utility function to remove highlight component.
function removeHighlight(elem) {
    elem.remove();
}

function removeHighlightId(id) {
    $(id).remove();
}

function removeHighlightCopy() {
    // FOR EVERY OBJECT WITH AN ID THAT CONTAINS THE WORD "COPY", REMOVE THE OBJECT
    $('*[id*=Copy]:visible').each(function () {
        $(this).remove();
    });

    $("[id$='Copy']").remove();
}

function getFile(name, callback) {
    $.get(name, callback, 'text');
}
