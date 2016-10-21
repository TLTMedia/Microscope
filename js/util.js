/**
 * modal.js
 *
 * Functionality for popup boxes and modals.
 */

// Misc. Functions
function popupOn(text, props) {
    // console.log("debug2");
    $("#popup").css("display", "inline-block");
    $("#popup").show();
    $("#popup").addClass("elementOn");
    $("#popup").removeClass("elementOff");
    $("#popup").css(props);
    $("#popupText").text(text);
}

function popupOff() {
    $("#popup").css("display", "none");
}


function textSetup(tooltip, lt, tp){
    popupOn(tooltip, {"left": lt, "top": tp});
}


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Creates bounds for a step within a scene to progress to next steps
// low.js && setup.js dependant on this function
// args: 
// property to inspect, lower bound, upper bound, engine piece, div piece, remove listener
function subHandler(prop, low, upper, piece, doc, handler, id){
    if(prop > low && prop < upper){ 
        piece.complete();
        if (id != null) {
            removeHighlight(id);
        } 
        $(doc).unbind("mousemove", handler);               
    }
}

// Utility function to highlight component.
function highlightComponent(id){
    var origPart = $(id)
    var clonePart = $(id).clone();
    clonePart.attr("pointer-events", "none")
    origPart.toggleClass("highlightPart")
    clonePart.attr("id", id+"Copy");
    origPart.attr("filter","url(#blurMe)");
    origPart.children().attr("fill", "rgba(0,0,0,0)");
    clonePart.appendTo($(id).parent())
//        $(id).remove();
 //   origPart.appendTo($(clonePart).parent())
}

// Utility function to remove highlight component.
// Best hacky solution I could think of..
// Since append guarantees
function removeHighlight(id){
    $(id+"Copy").last().remove(); // This is broken.. 
    $(id).toggleClass("highlightPart")
    $(id).css("filter", "none");
}
