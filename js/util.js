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


function textSetup(tooltip, lt, tp) {
    popupOn(tooltip, {
        "left": lt,
    "top": tp
    });
}


function toggleVisibility(id){
    $(id).toggleClass("elementOff");
    $(id).toggleClass("elementOn");
}


String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



// Copies the style of one function and applies it to another.
// Args are jquery elements
function copyAnimation(elem1,elem2, type){
    var style = css(elem1);
    $(elem2).css(style);
}

// Creates bounds for a step within a scene to progress to next steps
// low.js && setup.js dependant on this function
// args: 
// property to inspect, lower bound, upper bound, engine piece, div piece, remove listener
function subHandler(prop, low, upper, piece, doc, handler, id, cloned) {
    // For every trigger, move the cloned position to the object position.
    if (cloned != null){
        target = $(id);
        x = (parseFloat(target.attr('data-x')) || 0) + event.dx,
        y = (parseFloat(target.attr('data-y')) || 0) + event.dy;
        if (cloned.constructor === Array){
            cloned.forEach(function(obj){
                obj.attr('data-x', x);
                obj.attr('data-y', y);
            })
        }
        else{
            cloned.position(target.position());
        }
    }
    if (prop > low && prop < upper) {
        removeHighlightCopy();
        piece.complete();
        $(doc).unbind("mousemove", handler);
    }
}

// Brings an element to the front of the page (z-index workaround)
function bringToFront(elem) {
    //elem.appendTo(elem.parent());
}



// Utility function to highlight component.
function highlightComponent(id) {
    //return;
    var origPart = $(id)
        var clonePart = $(id).clone();
    lastPart = clonePart;
    clonePart.attr("pointer-events", "none")
        clonePart.toggleClass("highlightPart")
        clonePart.attr("id", id.replace("#", "") + "Copy");
    clonePart.attr("style", "border:10px solid blue");
    clonePart.attr("filter", "url(#blurMe)");
    clonePart.children().attr("fill", "rgba(0,0,0,0)");
    clonePart.insertBefore($(id))
        return clonePart

}

// Utility function to remove highlight component.
function removeHighlight(elem) {
    elem.remove();
}

function removeHighlightId(id){
    $(id).remove();
}

function removeHighlightCopy(){
    $('*[id*=Copy]:visible').each(function() {
        $(this).remove();
    }); 

    $("[id$='Copy']").remove();
}
