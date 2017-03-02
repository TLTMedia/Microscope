/*
 * resize.js
 * Resizes the components inside the window if the window is resized by user.
 *
 **/


// Resize relative from base width (used for responsive and adaptive design on magic numbers)
W_REL = 1325;
// Resize constant ratio
W_RAT = $(window).width()/W_REL; 
// Adjust the magic numbers on resize.

function adjustMagic(){
    for (var key in sm_bd){
        sm_bd[key] = sm_orig[key] * W_RAT; 
    }
}
//adjustMagic();


// Fix aspect ratio of the stage
$(window).resize(function() {
    resizeWindow();
    ms.update();
});

// Resize the window
function resizeWindow() {
    // Get window width and height
    var w = $(window).width();
    var h = $(window).height();

    // If the aspect ratio is greater than or equal to 4:3, fix height and set width based on height
    if ((w / h) >= 4 / 3) {
        stageHeight = h;
        stageWidth = (4 / 3) * h;
        stageLeft = (w - stageWidth) / 2;
        stageTop = 0;
        coverTop = 0;
        coverBottom = 0;
        coverLeft = stageLeft;
        coverRight = stageLeft;
    }
    // If the aspect ratio is less than 4:3, fix width and set height based on width
    else {
        W_RAT = w/W_REL;
        //adjustMagic();
        stageWidth = w;
        stageHeight = (3 / 4) * w;
        stageTop = (h - stageHeight) / 2;
        stageLeft = 0;
        coverTop = stageTop;
        coverBottom = stageTop;
        coverLeft = 0;
        coverRight = 0;
    }

    // Set "screen" object width and height to stageWidth and stageHeight, and center screen
    $(".screen").css({
        width: stageWidth + "px",
    height: stageHeight + "px",
    left: stageLeft + "px",
    top: stageTop + "px"
    });

    // Set "cover" object properties based on properties set above
    $("#coverTop").css({
        'width': w,
        'height': coverTop,
        'top': 0,
        'left': 0,
    });
    $("#coverBottom").css({
        'width': w,
        'height': coverBottom,
        'top': h - coverBottom,
        'left': 0,
    });
    $("#coverLeft").css({
        'width': coverLeft,
        'height': h,
        'top': 0,
        'left': 0,
    });
    $("#coverRight").css({
        'width': coverRight,
        'height': h,
        'top': 0,
        'left': w - coverRight,
    });

    // Resize corner border radii based on stage height
    var cornerSize = .025 * stageHeight;
    $(".rounded").css({
        '-webkit-border-radius': cornerSize + "px",
        '-moz-border-radius': cornerSize + "px",
        'border-radius': cornerSize + "px"
    });

    var cornerSize2 = .05 * stageHeight;
    $(".roundedRight").css({
        '-webkit-border-top-right-radius': cornerSize2 + "px",
        '-webkit-border-bottom-right-radius': cornerSize2 + "px",
        '-moz-border-radius-topright': cornerSize2 + "px",
        '-moz-border-radius-bottomright': cornerSize2 + "px",
        'border-top-right-radius': cornerSize2 + "px",
        'border-bottom-right-radius': cornerSize2 + "px"
    });

    // Resize text based on stage height
    // To give a class a certain font size, assign it the class "fs-X" where X is an integer between 1 and 1000. 1000 is the height of the screen.
    // New font resize loop
    for (var i = 1; i <= 1000; i++) {
        var s = stageHeight * (i / 1000);
        var c = ".fs-" + i;
        $(c).css({
            'font-size': s + "px"
        });
    }

    // Resize the stripes
    var stripeSize = stageHeight * .05;
    var str = stripeSize + "% " + stripeSize + "%"
        $(".stripes").css({
            'background-size': stripeSize
        });


    // Aspect ratio 
    var aspectR = 4/3;
    var whRat = w/h;
    if (whRat > aspectR){
        $("#rotate").css({
            'height': h*0.3 + "px", 
            'width': h*0.3 + "px"
        });

        $("#slideView, #slideView2").css({
            'height': h*0.20 + "px", 
            'width': h*0.20 + "px"
        });

        $("#rotate2 > svg").css({
            "height": h*0.55 + "px",
            "width": h*0.55 + "px"
        });

    }
    else{
        $("#rotate").css({
            'height': w*0.2 + "px", 
            'width': w*0.2 + "px"
        });

        $("#slideView, #slideView2").css({
            'height': w*0.20 + "px", 
            'width': w*0.20 + "px"
        });

        $("#rotate2 > svg").css({
            "height": w*0.55 + "px",
            "width": w*0.55 + "px"
        });
    }

    try{
        // Calibrate knob centers
        for (var i = 0; i < knobs.length; i++) {
            var knobObject = $("#" + knobs[i].divID);
            knobObject.css({
                'transform': ""
            });
            var offset = knobObject.offset();
            //        var w = knobObject.width();
            //        var h = knobObject.height();
            var w = knobObject[0].getBoundingClientRect().width;
            var h = knobObject[0].getBoundingClientRect().height;

            knob = knobs[i];
            knob.width = w;
            knob.height = h;
            knob.center.x = offset.left + w / 2;
            knob.center.y = offset.top + h / 2;
            //console.log(knob.width, knob.height, offset.left, offset.top);
            /*knobObject.css({
              'transform': "rotate(" + knobs[i].rotation + "deg)"
              });
              */
        }
    }
    catch(e){
        console.log("Resize error caught");
    }
}
