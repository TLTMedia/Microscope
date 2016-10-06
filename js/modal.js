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
    $("#popup").css(props);
    $("#popupText").text(text);
}

function popupOff() {
    $("#popup").css("display", "none");
}
