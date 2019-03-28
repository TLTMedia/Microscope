function slideZoom(el) {


this.state={};
 var slideTableSize = 4;
//$(el).css('z-index',"100000");
 var loadedCount=slideTableSize*slideTableSize;
 var tileSize = 256;
 var canvasSize=1024;
   var previousState={}
      var canvasLeft, canvasRight, ctxLeft, ctxRight, buffer,bufferctx;
      var canvasContainerLeft = $("<div/>", {"id": "slideView", class:"sview"});
      var canvasContainerRight = $("<div/>", {"id": "slideView2", class: "sview"});
      var canvasJqueryLeft = $("<canvas/>", {width: canvasSize/2, height: canvasSize/2, id: "canvasLeft"})
      var canvasJqueryRight = $("<canvas/>", {width: canvasSize/2, height: canvasSize/2, id: "canvasRight"})
      canvasContainerLeft.append(canvasJqueryLeft)
      canvasContainerRight.append(canvasJqueryRight)
      canvasLeft =canvasJqueryLeft[0]
      canvasRight =canvasJqueryRight[0]
      $(el).append([canvasContainerLeft, canvasContainerRight])
      //$(el+" canvas").css({width:"10%",height:"10%"});
      ctxLeft = canvasLeft.getContext('2d');
      ctxRight = canvasRight.getContext('2d');

      buffer=document.createElement("canvas");
      buffer.width= canvasSize/2;
      buffer.height= canvasSize/2;
      bufferctx =buffer.getContext('2d');

 this.showSlide = function (state){
if (!isEquivalent(state,previousState) && loadedCount==slideTableSize*slideTableSize ){
    showSlideRun(state)
    }
  }
function showSlideRun(state) {
  //console.log(state)
   this.state=state;
   loadedCount=0;
   var numberOfColumns = Math.pow(2, Math.floor(parseFloat(state.zoom) * 4) + 1);
   // console.log(numberOfColumns)
   //            var slideOffsetRow = (state.row * tileSize) % tileSize;
   //            var slideOffsetColumn = (state.col * tileSize) % tileSize;
   var folder = numberOfColumns / 2;
   // console.log(Math.floor(parseFloat(state.zoom) * 4),state)
   var currentRowFloat = numberOfColumns * state.row+(.5*numberOfColumns);
   var currentColumnFloat = numberOfColumns * (1 - state.col)+(.5*numberOfColumns);

   var currentRow = Math.floor(currentRowFloat);
   var currentColumn = Math.floor(currentColumnFloat);
   var rowRecenter = (.75*tileSize)
   var colRecenter = (.75*tileSize);

   var slideOffsetRow = tileSize * (currentRow - currentRowFloat)- rowRecenter;
   var slideOffsetColumn = tileSize * (currentColumn - currentColumnFloat)- colRecenter;
   //console.log(state)
   var illuminationBrightness = state.brightness;

   var illumination = `rgb(${Math.min(232, 232* illuminationBrightness)}, ${Math.min(224, 224*illuminationBrightness)}, ${Math.min(152, 152*illuminationBrightness)})`;
      //console.log(illuminationBrightness)

    bufferctx.fillStyle=illumination
    bufferctx.fillRect(0,0,canvasLeft.width,canvasLeft.height);
   var focus = state.focus;
   //  console.log(slideOffsetRow, slideOffsetColumn)


 //  $("#slide table").attr("style", `left: ${slideOffsetColumn}px;top: ${slideOffsetRow}px`);
   //  ctx.clearRect(0, 0,  canvas.width,  canvas.height);
   //$(".slideTile").attr("src", "")
   for (rowOffset = 0; rowOffset < slideTableSize; rowOffset++) {

     for (colOffset = 0; colOffset < slideTableSize; colOffset++) {
       var image;
       var rowWithOffset = currentRow + rowOffset - 1;
       var colWithOffset = currentColumn + colOffset - 1;
       var quadIndex = (colOffset + (rowOffset * slideTableSize));
       var imgIndex = colWithOffset + (rowWithOffset * numberOfColumns);



       image = "img/cells/" + folder + "/cell" + imgIndex.toString().padStart(4, "0") + ".png"
       if (rowWithOffset >= numberOfColumns || colWithOffset >= numberOfColumns || colWithOffset < 0 || rowWithOffset < 0) {
         image = "img/blankImage.png"
       }


         displayTile(image, colOffset*tileSize+slideOffsetColumn,rowOffset*tileSize+slideOffsetRow,state)
        // ctxLeft.rect(colOffset*tileSize+slideOffsetColumn,rowOffset*tileSize+slideOffsetRow,tileSize,tileSize);
         //ctxLeft.stroke();
         //bufferctx.rect(colOffset*tileSize+slideOffsetColumn,rowOffset*tileSize+slideOffsetRow,tileSize,tileSize);
         //bufferctx.stroke();
     }

   }


 }

  function displayTile(tile, xPos, yPos,state) {
    var img = new Image();
    img.src =tile

  img.onload = function() {
      loadedCount++;
      //console.log( loadedCount)
      bufferctx.drawImage(img, xPos, yPos);
      if(loadedCount==(slideTableSize*slideTableSize)){
      ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
          ctxRight.fillRect(0,0,canvasRight.width,canvasRight.height);
          //ctx.beginPath();
         // ctx.arc(100,75,50,0,2*Math.PI);
         //console.log(loadedCount)
          //ctx.clip();
          var filter = "brightness("+state.brightness*100+"%)";
          //console.log(filter)
          ctxLeft.drawImage(buffer,0,0);
          ctxRight.drawImage(buffer,0,0);
          ctxLeft.filter= filter;
          ctxRight.filter= filter;
      }
 }
}



   function isEquivalent(a, b) {
 // Create arrays of property names
 var aProps = Object.getOwnPropertyNames(a);
 var bProps = Object.getOwnPropertyNames(b);

 // If number of properties is different,
 // objects are not equivalent
 if (aProps.length != bProps.length) {
     return false;
 }

 for (var i = 0; i < aProps.length; i++) {
     var propName = aProps[i];

     // If values of same property are not equal,
     // objects are not equivalent
     if (a[propName] !== b[propName]) {
         return false;
     }
 }

 // If we made it this far, objects
 // are considered equivalent
 return true;
}
}
