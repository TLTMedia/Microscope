
/*
 * Quiz2.js
 *
 * Quiz on microscope usage (counting cells).
 */

function quiz4Q1(){
    /*answer = "400X";
    ms.rotateLensesCount(ms, true, true, function(){}, 1);
    ms.updateLensesState(ms);
    ms.diaphragmLightPosition = 40;
    ms.slideBlur = 0;
    ms.xcaliper = ms.xslide = -4;
    ms.eyepiecePosition = 0;
    ms.ycaliper = ms.yslide = 20;
    ms.update();
    */



    $("#answerBox button").click(function(){
        inputAnswer = $("#answerBox input").val();
        $.post( "./api/quizzes", { "answer": inputAnswer })
        .done(function( res ) {
            if (inputAnswer == answer){
                $("#answerBox button").unbind();
                videoQ1.complete();
            }
            $("#answerBox input").val("");
        });

    });
}
