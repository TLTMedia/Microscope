/*
 * Quiz.js
 *
 * Quiz on microscope usage.
 */

function quizMag1(){
    answer = "100X"
    $("#answerBox button").click(function(){
        inputAnswer = $("#answerBox input").val();
        if (inputAnswer == answer){
            totalMagQ1.complete(); 
        }
        $("#answerBox input").val("");
    });
}
