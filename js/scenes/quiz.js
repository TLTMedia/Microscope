/*
   Quiz on microscope usage.
 */

function quizMag1(){
    $("#answerBox button").click(function(){
            inputAnswer = $("answerBox input").value();
            console.log(inputAnswer);
            totalMagQ1.complete(); 
            
            });


}
