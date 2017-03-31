/*
 * Quiz.js
 *
 * Quiz on microscope usage.
 */

function quizMag1(){
    answer = "400X";
    ms.rotateLensesCount(ms, true, true, function(){}, 1); 
    $("#answerBox button").click(function(){
        inputAnswer = $("#answerBox input").val();
        $.post( "./api/quizzes", { "answer": inputAnswer })
        .done(function( res ) {
            if (inputAnswer == answer){
                $("#answerBox button").unbind();
                totalMagQ1.complete(); 
            }
            $("#answerBox input").val("");
        });

    });
}


function quizMag2(){
    answer = "100X";
    ms.rotateLensesCount(ms, false,  true, function(){}, 3); 
    $("#answerBox button").click(function(){
        inputAnswer = $("#answerBox input").val();
        $.post( "./api/quizzes", { "answer": inputAnswer })
        .done(function( res ) {
            if (inputAnswer == answer){
                $("#answerBox button").unbind();
                totalMagQ2.complete(); 
            }
            $("#answerBox input").val("");
        });

    });
}


function quizMag3(){
    answer = "40X";
    ms.rotateLensesCount(ms, true, true, function(){}, 9); 
    $("#answerBox button").click(function(){
        inputAnswer = $("#answerBox input").val();
        $.post( "./api/quizzes", { "answer": inputAnswer })
        .done(function( res ) {
            if (inputAnswer == answer){
                $("#answerBox button").unbind();
                totalMagQ3.complete(); 
            }
            $("#answerBox input").val("");
        });

    });
}
