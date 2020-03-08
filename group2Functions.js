import {currentQuestion , nextQuestion , previuosQuestion, selectedQuiz, addCredit, setCurrentQuestion} from "./index.js"
import {fillTimer, buildFillQuestions} from "./group3Functions.js"

export let mul2Answers = {
    q6:[],
    q7:[],
    q8:[]
}


export let mul2Report= {}

export function updateMul2Answers(){

    let choice = []
    let choices = $(".mul2")

 for(let i = 0 ; i < choices.length; i++) { 

    choices[i].checked? choice.push(choices[i].value) : ''

}
// console.log(choice)
mul2Answers[`q${currentQuestion + 1}`] = choice
// console.log( mul2Answers , "jjjjjjj")


//     console.log(mul1Answers, "all the answers")

}


export function submitMul2(){
    updateMul2Answers()

    let credit = 0

    
    let detailedReport = {
        name: "Second Group",
        correct:0,
        incorrect: 0,
        mistakes:0,
        totalNumberOfAnswers:0

    }



    let qAnsweres = {
        q6: [],
        q7: [],
        q8: []
    }

    for(let i = 5; i < 8; i++){
        qAnsweres[`q${i+1}`] = selectedQuiz.questions[i].correct
        let tmp = qAnsweres[`q${i+1}`]
        let tmp2 = mul2Answers[`q${i+1}`]
        let tmp3 = detailedReport
        let tmpCorrect = 0
        credit += tmp.length - tmp2.length
        // tmp3.incorrect +=  Math.abs( tmp.length - tmp2.length)
        tmp.forEach(e=>{
            if (tmp2.includes(e)){
                credit++ 
                tmpCorrect++
                tmp3.correct++
            } 
            else{
                credit-- 
                tmp3.incorrect++
                tmp3.mistakes++
            }
            })
            
            tmp3.incorrect += tmp2.length - tmpCorrect
            
            
        }
        
        detailedReport.totalNumberOfAnswers = detailedReport.incorrect + detailedReport.correct
        mul2Report = detailedReport
    console.log(credit)
    addCredit(credit)
    
    setCurrentQuestion(8) 
    updateMul2Answers()
    buildFillQuestions(selectedQuiz.questions[currentQuestion])

    clearInterval(mul2TimerId)
    fillTimer()

}



export function buildMul2Questions(q){

    $("#quiz").empty()
    $("#even").empty()
    $(".mid").empty()
    $("#quiz").append(

     `
    <p class="card-text" >${q.text}</p>


              <div class="form-check">
                        <input class="form-check-input mul2" name="answers" type="checkbox" value="1" id="option1">
                        <label class="form-check-label" for="option1">
                        ${q.o1}
                        </label>
                    </div>

                    <div class="form-check">
                    <input class="form-check-input mul2" name="answers" type="checkbox" value="2" id="defaultCheck2">
                    <label class="form-check-label" for="defaultCheck2">
                        ${q.o2}
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input mul2" name="answers" type="checkbox" value="3" id="defaultCheck3">
                    <label class="form-check-label" for="defaultCheck3">
                        ${q.o3}
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input mul2" name="answers" type="checkbox" value="4" id="defaultCheck4">
                    <label class="form-check-label" for="defaultCheck4">
                        ${q.o4}
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input mul2" name="answers" type="checkbox" value="5" id="defaultCheck5">
                    <label class="form-check-label" for="defaultCheck5">
                        ${q.o5}
                    </label>
                </div>
                
              <div id="even">
              
              
              </div>


              `
    )


              $("#even").empty()
              $(".mid").empty()

            if(currentQuestion > 5)
            $("#even").append(`<button type="button" class="btn btn-primary previuos">Previous Question</button>`)
    
            if(currentQuestion < 7)
            $("#even").append(`<button type="button" class="btn btn-primary next">Next Question</button>`)
            
            $(".mid").append(`<button type="button" class="btn btn-danger sub-mul2">Sumbit this group </button>`)

            $(".next").click(()=> nextQuestion())
            $(".previuos").click(()=> previuosQuestion())
            $(".sub-mul2").click(()=> submitMul2())

}


export let mul2TimerId
export function mul2Timer(){

    let i = 60*10
     mul2TimerId = setInterval(() => {
        console.log(Math.floor((i% (1000 * 60 * 60)) / (1000 * 60) * 1000) , "mins " , i % 60, 'secs' , "mul2 timer")
        $("#timer-mins").html(`${Math.floor((i% (1000 * 60 * 60)) / (1000 * 60) * 1000)}mins`)
        $("#timer-secs").html(`${i %60}secs`)
        i--
        if(i<0){
        clearInterval(mul2TimerId)
        submitMul2()
        fillTimer()
        }
    }, 1000);
    
}

