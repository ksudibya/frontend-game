/*  TO DO
 1. call api from opentdb trivia
 2. place response from API into question/index
 3. create function to pick choices
 4. alert user response (correct or incorrect)
 4. save result correct or incorrect
 5. show result score
 */

const userAction = async () => {
  const displayStart = document.getElementsByClassName("display-start");
  displayStart[0].style.display = "none";
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  );
  const myJson = await response.json(); //extract JSON from the http response

  console.log(myJson);

  const charactersDiv = document.querySelector("#trivia");
  let attempt = 0;
  let score = 0;

  myJson.results.forEach((q, index) => {
    const questionElement = document.createElement("div");
    const titleElement = document.createElement("h1");
    titleElement.innerText = `Question  ${index + 1} `;
    const characterElement = document.createElement("h2");

    characterElement.innerHTML = q.question;
    questionElement.append(titleElement);
    questionElement.append(characterElement);

    //put answers into an array
    let answers = [];
    answers.push(q.correct_answer);
    q.incorrect_answers.forEach((i) => {
      answers.push(i);
    });
    // shuffle answers
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
        const nextQuestion = document.getElementsByClassName("quiz");
        const elementScore = document.getElementsByClassName("score");
        // const elementButton = document
        //   .getElementsByTagName("button")
        //   .contains(i);
        const elementTotalScore =
          document.getElementsByClassName("total-score");
        let tempScore = 0;
        if (attempt == 0) {
          tempScore = 10;
        } else if (attempt == 1) {
          tempScore = 7;
        } else if (attempt == 2) {
          tempScore = 3;
        } else {
          tempScore = 0;
        }
        if (i == q.correct_answer) {
          score = score + tempScore;
          attempt = 0;

          if (index == myJson.results.length) {
             displayStart[0].style.display = "block";
            elementTotalScore[0].style.display = "block";
          }
          console.log(`you get ${tempScore} points, total score ${score}`);

          elementScore[0].innerHTML = score;
          nextQuestion[index].style.display = "none";
          if (index == myJson.results.length) {
            return false;
          } else {
            if (index + 1 < nextQuestion.length)
              nextQuestion[index + 1].style.display = "block";
          }

          return false;
        } else {
          attempt = attempt + 1;
          alert(`Incorrect Answer`);
          // show again when finish or end quiz
          if (index == myJson.results.length) {
            elementTotalScore[0].style.display = "block";
             displayStart[0].style.display = "block";
          }
          // nextQuestion[index].innerHTML += "Incorrect";
          // elementButton.style.backgroundColor = "red";
          console.log(`score incorrect ${indexButton} ${score}`);
          return false;
        }
      };
      questionElement.appendChild(allAnswers);
    });

    questionElement.classList.add("quiz");
    if (index == 0) {
      questionElement.style.display = "block";
    }
    charactersDiv.appendChild(questionElement);
  });
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  //randomize elements.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
