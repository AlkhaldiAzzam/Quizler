import {currentQuestion , nextQuestion , previuosQuestion, selectedQuiz, addCredit, setCurrentQuestion, fillAnswers} from "./index.js"
import {buildReportCard} from "./report.js"


export let fillReport = {
    name:"Third Group",
    correct:0,
    incorrect:0,
    totalNumberOfAnswers: 0
}


export function buildFillQuestions(q){

    console.log(`this is question # ${q.q}`)

    $("#quiz").empty()
    $("#even").empty()
    $(".mid").empty()
    $("#quiz").append(

     `

     
     
     <div  id="div3"> 

         <p draggable="true"  id="1" class="options-div" data-target="iii"> ${q.o1} </p>


         
         
             <p draggable="true"  id="2" class="options-div">${q.o2} </p>
         

         
             <p draggable="true"  id="3" class="options-div">${q.o3}</p>
         

         
             <p draggable="true"  id="4" class="options-div">${q.o4}</p>
         

     </div>


     <h3>${q.text}</h3>

     <h6>${q.text2}</h6>


     

              `
    )

    document.getElementById('1').addEventListener('dragstart',()=> drag(event))
    document.getElementById('2').addEventListener('dragstart',()=> drag(event))
    document.getElementById('3').addEventListener('dragstart',()=> drag(event))
    document.getElementById('4').addEventListener('dragstart',()=> drag(event))


    document.getElementById('div3').addEventListener('dragover', ()=>allowDrop(event))
    document.getElementById('div3').addEventListener('drop', ()=> drop(event))

    document.getElementById('answer').addEventListener('dragover',()=> allowDrop(event))
    document.getElementById('answer').addEventListener('drop',()=> drop(event))
        console.log($("#answer"))

              $("#even").empty()
              $(".mid").empty()

            if(currentQuestion == 9)
            $("#even").append(`<button type="button" class="btn btn-primary previuos">Previous Question</button>`)
    
            if(currentQuestion == 8)
            $("#even").append(`<button type="button" class="btn btn-primary next">Next Question</button>`)
            
            $(".mid").append(`<button type="button" class="btn btn-danger sub-fill">Sumbit this group </button>`)

            $(".next").click(()=> nextQuestion())
            $(".previuos").click(()=> previuosQuestion())
            $(".sub-fill").click(()=>submitFill())


}




export function updateFillAnswers(){
    if($("#answer").children()[0])
    fillAnswers[`q${currentQuestion + 1}`] = $("#answer").children()[0].id

    else
    fillAnswers[`q${currentQuestion + 1}`] = ''
    console.log(fillAnswers)
}






function submitFill(){
    updateFillAnswers()

    let correctAns = {
        q9:'',
        q10:''
    }

    let quiz = selectedQuiz.questions
    let credit = 0

    if(fillAnswers["q9"] && quiz[8].correct == fillAnswers["q9"]){

            credit++
            fillReport.correct++
            fillReport.totalNumberOfAnswers++
        
    }
    else{
    fillReport.incorrect++
    fillReport.totalNumberOfAnswers++
    }

    
    if(fillAnswers["q10"] && quiz[9].correct == fillAnswers["q10"]){
        fillReport.correct++
        fillReport.totalNumberOfAnswers++

    }
    else {
        fillReport.incorrect++
        fillReport.totalNumberOfAnswers++
    }


    console.log(fillReport, "the fill credit")
    addCredit(credit)


    clearInterval(fillTimerId)
    // console.log(fillTimerId , 'the fill timer id')

    $("#timer-mins").text('TIMER')
    $("#timer-secs").text('')
    buildReportCard()
}


export let fillTimerId
export function fillTimer(){

    let i = 60* 4
     fillTimerId = setInterval(() => {
        console.log(Math.floor((i% (1000 * 60 * 60)) / (1000 * 60) * 1000) , "mins " , i % 60, 'secs' ,"fill timer")
        $("#timer-mins").html(`${Math.floor((i% (1000 * 60 * 60)) / (1000 * 60) * 1000)}mins`)
        $("#timer-secs").html(`${i %60}secs`)
        i--
        if(i<0){
            console.log(fillTimerId , 'timer is fill')
        clearInterval(fillTimerId)
        submitFill()
        
        }
    }, 1000);
    
}



function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function dragExit(ev) {
    // ev.preventDefault();
    console.log(ev.target.innerText)
    // if(ev.target.innerText == '')
    ev.target.innerText = '___________'
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
      ev.preventDefault();
    //   console.log(ev.dragEvent, 'event is')
      var data = ev.dataTransfer.getData("text");

      if(ev.target.id != 'div3')
      ev.target.innerHTML = ''


      $(`#${ev.target.id}`).append($(`#${data}`))
    //   ev.target.appendChild(document.getElementById(data));


    if($("#answer").children()[0])
      console.log($("#answer").children()[0].id)

    //   console.log($("#answer").text())
      if($("#answer").text() == '')
      $("#answer").text('_____________')
  }

