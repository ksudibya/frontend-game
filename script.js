

// let result = document.querySelector('.result')
// let correct =document.querySelectorAll('.correct')

/**  TO DO
 1. call api from opentdb trivia
 2. place response from API into question/index
 3. create function to pick choices
 4. handle result (alert) correct or incorrect
 4. save result correct or incorrect
 5. show result score
 */
const userAction = async () => {
  
  const response = await fetch(
    "https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple"
  );
  const myJson = await response.json(); //extract JSON from the http response
  
  console.log(myJson);

   }
  
  