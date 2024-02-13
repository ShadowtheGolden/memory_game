const gameContainer = document.getElementById("game");
let clickCounter = 0;
let clickFirst;
let clickSecond;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (clickCounter === 0){
    console.log('clickFirst', event.target.className);
    clickFirst = event;
    event.target.style.backgroundColor = event.target.className;
    clickFirst.target.classList.add("flipped");
    setTimeout(function () {
      clickCounter += 1;
    }, 200);
  } else {
      clickSecond = event;
      console.log('clickSecond', event.target.className);
      if (clickSecond.target.classList.contains("flipped")){
        console.log('same card');
        clickSecond.target.classList.remove("flipped");
        clickSecond.target.style.backgroundColor = "";
        clickCounter = 0;	  
        return;
      }
      clickFirst.target.classList.remove("flipped");
      clickSecond.target.classList.remove("flipped");
      event.target.style.backgroundColor = event.target.className;
      console.log(clickFirst.target.className, clickSecond.target.className);
      if (clickFirst.target.className !== clickSecond.target.className){
        console.log('different cards');
        setTimeout(function () {
          clickFirst.target.style.backgroundColor = "";
          clickSecond.target.style.backgroundColor = "";
        }, 1000);
      } else {
        console.log('match');
        clickFirst.target.removeEventListener("click", handleCardClick);
        clickSecond.target.removeEventListener("click", handleCardClick);
      }
      clickCounter = 0; 
  } 
}

// when the DOM loads
createDivsForColors(shuffledColors);
