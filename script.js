//  TO DO
//  1. call api from opentdb trivia
//  2. place response from API into question/index
//  3. create function to pick choices
//  4. alert user response (correct or incorrect)
//  4. save result correct or incorrect
//  5. show result score

const userAction = async () => {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple"
  );
  const myJson = await response.json(); //extract JSON from the http response

  console.log(myJson);

      const charactersDiv = document.querySelector("#trivia");
      let score = 0;
      myJson.results.forEach((q, index) => {
        const titleElement = document.createElement("h4");
        titleElement.innerText = `Question  ${index + 1} `;
        const characterElement = document.createElement("h2");
        characterElement.innerHTML = q.question;
        charactersDiv.append(titleElement);
        charactersDiv.append(characterElement);

        //put answers into an array
        let answer = [];
        answer.push(q.correct_answer);
        q.incorrect_answers.forEach((i) => {
          answer.push(i);
        });
        shuffle(answer);
        answer.forEach((i) => {
          const incorrectElement = document.createElement("button");
          incorrectElement.innerHTML = i;
          incorrectElement.onclick = function () {
            if (i == q.correct_answer) {
              score = score + 10;
              alert(`Correct ${i}`);
              return false;
            } else {
              alert(`Incorrect ${i}`);
              return false;
            }
          };
          charactersDiv.appendChild(incorrectElement);
        });
      });
    };

    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // randomize elements.
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
};
