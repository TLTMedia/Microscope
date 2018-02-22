/*
 * Quiz.js
 *
 * Quiz on microscope usage.
 */
   var quiz = [{
            "answer": "400X"
            , "setup": function () {
                ms.diaphragmLightPosition = 40;
                ms.xcaliper = ms.xslide = -4.5;
                ms.eyepiecePosition = 0;
                ms.ycaliper = ms.yslide = 20;
                setup(true, true, 13);

            }}
            ,{
                "answer": "100X"
                , "setup": function(){setup(false, true, 3)}
            }
            , {
                "answer": "40X"
                , "setup": function(){setup(true, true, 9)}
            }]





function setup(bool1, bool2, lensPosition){

  ms.rotateLensesCount(ms, bool1, bool2, function(){}, lensPosition);
    ms.updateLensesState(ms);
    ms.slideBlur = 0;
    //ms.update();

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
