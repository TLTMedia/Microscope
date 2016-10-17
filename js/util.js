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
