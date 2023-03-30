/*  TO DO
 1. call api from opentdb trivia
 2. place response from API into question/index
 3. create function to pick choices
 4. alert user response (correct or incorrect)
 4. save result correct or incorrect
 5. show result score
 */
//display start button
const userAction = async () => {
  const displayStart = document.getElementsByClassName("display-start");
  displayStart[0].style.display = "none";

  // Call API from opendb trivia
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  );
  // extract JSON from the http response
  const myJson = await response.json();
  // to confirm we get data from the API
  console.log(myJson);

  const charactersDiv = document.querySelector("#trivia");

  let attempt = 0;
  let score = 0;

  //function to loop results from API
  myJson.results.forEach((q, index) => {
    const elementTotalScore = document.getElementsByClassName("total-score");
    //to hide return button
    elementTotalScore[0].style.display = "none";
    const elementScore = document.getElementsByClassName("score");
    // to set elementScore to nothing when start
    elementScore[0].innerHTML = "";
    // create element div as a place holder [q]
    const questionElement = document.createElement("div");
    // create element [h1]
    const h1 = document.createElement("h1");
    h1.innerText = `Question  ${index + 1} `;
    questionElement.append(h1);
    //create element h2 to show questions
    const h2 = document.createElement("h2");
    h2.innerHTML = q.question;
    questionElement.append(h2);

    let answers = [];
    answers.push(q.correct_answer);

    q.incorrect_answers.forEach((i) => {
      answers.push(i);
    });

    shuffle(answers);

    //create buttons for answers
    answers.forEach((i, indexButton) => {
      const allAnswers = document.createElement("button");

      let identifierButton;
      if (indexButton === 0) {
        identifierButton = "a.";
      } else if (indexButton === 1) {
        identifierButton = "b.";
      } else if (indexButton === 2) {
        identifierButton = "c.";
      } else {
        identifierButton = "d.";
      }

      allAnswers.innerHTML = `${identifierButton} ${i}`;

      allAnswers.onclick = function () {
        const currentQuestion = document.getElementsByClassName("quiz");

        let tempScore = 0;
        // correct on the first try, assign score = 10
        if (attempt == 0) {
          tempScore = 10;
          // correct on the second try, assign score = 7
        } else if (attempt == 1) {
          tempScore = 7;
          // correct on the third try, assign score = 3
        } else if (attempt == 2) {
          tempScore = 3;
          // correct on the fourth try, assign score = 0
        } else {
          tempScore = 0;
        }
        //when user choose the correct answer add score
        if (i == q.correct_answer) {
          score = score + tempScore;
          //reset attempt to 0
          attempt = 0;

          if (index == 9) {
            elementTotalScore[0].style.display = "block";
          }

          console.log(`you get ${tempScore} points, total score ${score}`);

          elementScore[0].innerHTML = `You get ${tempScore} points. Your total score is: ${score} pts`;
          //hide current question
          currentQuestion[index].style.display = "none";
          //when we get to last index do not show anything
          if (index == myJson.results.length) {
            return false;
          } else {
            //when index + 1 is less than numbers of questions
            if (index + 1 < currentQuestion.length)
              //show next question
              currentQuestion[index + 1].style.display = "block";
          }

          return false;
        } else {
          attempt = attempt + 1;

          alert(`Incorrect Answer`);

          //console.log(`score incorrect ${indexButton} ${score}`);

          return false;
        }
      };
      //show answer button in the questionElement
      questionElement.appendChild(allAnswers);
    });
    //add class "quiz" css into questionElement
    questionElement.classList.add("quiz");
    //when question at first index change display none to block
    if (index == 0) {
      questionElement.style.display = "block";
    }
    //show questionElement
    charactersDiv.appendChild(questionElement);
  });
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap currentIndex with randomIndex.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  //return array;
}
