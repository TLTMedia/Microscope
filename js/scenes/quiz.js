/*
 * Quiz.js
 *
 * Quiz on microscope usage.
 */
/*
function quizMag1(){
    answer = "400X";
    ms.rotateLensesCount(ms, true, true, function(){}, 1); 
    ms.updateLensesState(ms);
    ms.diaphragmLightPosition = 40;
    ms.slideBlur = 0;
    ms.xcaliper = ms.xslide = -4;
    ms.eyepiecePosition = 0;
    ms.ycaliper = ms.yslide = 20;
    ms.update();

    $("#answerBox button").click(function(){
        inputAnswer = $("#answerBox input").val();
        $.post( "./api/quizzes", { "answer": inputAnswer })
        .done(function( res ) {
            if (inputAnswer == answer){
                console.log("1");
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
    ms.updateLensesState(ms);
    ms.slideBlur = 0;
    ms.update();
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
    ms.updateLensesState(ms);
    ms.slideBlur = 0;
    ms.update();
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
*/


   var quiz = [{
            "answer": "400X"
            , "setup": function () {
                ms.diaphragmLightPosition = 40;
                ms.xcaliper = ms.xslide = -4;
                ms.eyepiecePosition = 0;
                ms.ycaliper = ms.yslide = 20;
                setup(true, true, 1)
              
            }}
            , {
                "answer": "100X", "setup": function(){setup(false, true, 3)}
            }
            , {
                "answer": "40X"
                , "setup": function(){setup(true, true, 9)}
            }]





function setup(bool1,bool2,lensPosition){

  ms.rotateLensesCount(ms, bool1, bool2, function(){}, lensPosition); 
    ms.updateLensesState(ms);
    ms.slideBlur = 0;
    ms.update();

}


function quizMag(questionNum){
 
   var answer= quiz[questionNum-1].answer
   quiz[questionNum-1].setup();
    $("#answerBox button").click(function(){
        inputAnswer = $("#answerBox input").val();
        $.post( "./api/quizzes", { "answer": inputAnswer })         // This is to be modified
        .done(function( res ) {                                     // to be at the end
                           console.log(inputAnswer , answer)
            if (inputAnswer == answer){

                $("#answerBox button").unbind();
                //make totalMaqQ and array instead 
                eval("totalMagQ"+questionNum+".complete()"); 
            }
            $("#answerBox input").val("");
        });

    });
}
