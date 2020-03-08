import {mul2Report} from "./group2Functions.js"
import {mul1Report, totalCredit} from "./index.js"
import {fillReport} from "./group3Functions.js"

  export function buildReportCard(){


    let total = mul1Report.correct + mul2Report.correct - mul2Report.mistakes + fillReport.correct
    total<0? total=0: ''
    let totPers = (total / 16) * 100
    $("#main").empty()

    $("#main").append(`
    
    
    
    <div id="sub-main" class="center">




    <div class="container-fluid">
	<div class="row">
        <div class="col-md-12">
        
    <div class="card text-white bg-info mb-3 ml-5"  style="max-width: 21rem;">
    <div class="card-header">Report Card</div>
    <div class="card-body">
      <h5 class="card-title">Maximum Possible Points: <em>16</em> </h5>
      <h5 class="card-title">Minimum Possible Points: <em>0</em> </h5>
      <h5 class="card-title">You Got ${total} out of 16 | ${totPers}% </h5>
    </div>
  </div>
  <h1 class="m-5">Pie Chart Report</h1>
            <div class="row">
            
                <div class="col-md-4">
                

            <section class="m-4">
            <div class="pieID pie">
            
            </div>
            <p>${mul1Report.name}</p>
            <ul class="pieID legend">
            
            <li>
            <em>Correct Answers: </em>
            <span>${mul1Report.correct}</span>
            </li>
            <li>
            <em>Incorrect Answers: </em>
            <span>${mul1Report.incorrect}</span>
            </li>
            
            
            </ul>
            </section>
				</div>
                <div class="col-md-4">
                
            <section class="m-4">
            <div class="pieID2 pie2">
            
            </div>
            <p>${mul2Report.name}</p>
            
            <ul class="pieID2 legend2">
            <li>
            <em>Correct Answers: </em>
            <span>${mul2Report.correct}</span>
            </li>
            <li>
            <em>Incorrect Answers: </em>
            <span> ${mul2Report.incorrect}</span>
            </li>
            
            
            </ul>
            </section>
				</div>
                <div class="col-md-4">
                
            <section class="m-4">
            <div class="pieID3 pie3">
            
            </div>
            <p>${fillReport.name}</p>
            
            <ul class="pieID3 legend3">
            <li>
            <em>Correct Answers: </em>
            <span>${fillReport.correct}</span>
            </li>
            <li>
            <em>Incorrect Answers: </em>
            <span>${fillReport.incorrect}</span>
            </li>
            
            
            </ul>
            </section>
				</div>
			</div>
		</div>
	</div>
</div>










    
    
    
   
            
            </div>
            `)
            
    
  createPie(".pieID.legend", ".pieID.pie");
  createPie(".pieID2.legend2", ".pieID2.pie2");
  createPie(".pieID3.legend3", ".pieID3.pie3");


  }


function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }
  function addSlice(sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append("<div class='slice "+sliceID+"'><span></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
    $("."+sliceID).css({
      "transform": "rotate("+offset+"deg) translate3d(0,0,0)"
    });
    $("."+sliceID+" span").css({
      "transform"       : "rotate("+sizeRotation+"deg) translate3d(0,0,0)",
      "background-color": color
    });
  }

  function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    var sliceID = "s"+dataCount+"-"+sliceCount;
    console.log(sliceID, 'slice id')
    var maxSize = 179;
    if(sliceSize<=maxSize) {
      addSlice(sliceSize, pieElement, offset, sliceID, color);
    } else {
      addSlice(maxSize, pieElement, offset, sliceID, color);
      iterateSlices(sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
    }
  }


  let slices = 0 

  function createPie(dataElement, pieElement) {
    var listData = [];
    $(dataElement+" span").each(function() {
      listData.push(Number($(this).html()));
    });
    var listTotal = 0;
    for(var i=0; i<listData.length; i++) {
      listTotal += listData[i];
    }
    var offset = 0;
    var color = [
      "cornflowerblue", 
      "olivedrab", 
      "orange", 
      "tomato", 
      "crimson", 
      "purple", 
      "turquoise", 
      "forestgreen", 
      "navy", 
      "gray"
    ];
    for(var i=0; i<listData.length; i++, slices++) {
      var size = sliceSize(listData[i], listTotal);
      
      console.log($(`.s${slices}-0`)==true)
    
      iterateSlices(size, pieElement, offset, slices, 0, color[i]);
      $(dataElement+" li:nth-child("+(i+1)+")").css("border-color", color[i]);
      offset += size;
    }
  }
  



