
// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {

  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = 'letter-box';

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "Java", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Egypt", "Germany", "Croatia", "France", "Belgium", "Italy", "Netherlands",]
}

// Get Random Property
let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;
console.log(randomValueValue);

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {

  // Create Empty Span
  let emptySpan = document.createElement("span");

  // If Letter Is Space
  if (letter === ' ') {
    // Add Class To The Span
    emptySpan.className = 'with-space';
  }

  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// NEW: Add a counter for correct letters
let correctLettersCount = 0;

// NEW: Calculate the total number of letters to be guessed (excluding spaces)
let totalLettersToGuess = Array.from(randomValueValue.toLowerCase()).filter(letter => letter !== ' ').length;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {

  // Set The Choose Status
  let theStatus = false;

  if (e.target.className === 'letter-box') {

    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, WordIndex) => {

      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {

        // Set Status To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {

          if (WordIndex === spanIndex) {
            // Only count if the span was empty before
            if (span.innerHTML === '') {
              span.innerHTML = theClickedLetter;
              // NEW: Increment correct letters count
              correctLettersCount++;
            }
          }
        });
      }
    });

    // Outside Loop

    // --- THIS IS THE FIXED LOGIC ---

    // If Letter Is Wrong
    if (theStatus !== true) {

      // Increase The Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();;

      // NEW: Check for 4 mistakes
      if (wrongAttempts === 4) {
        showWarningPopup(); // Call the new warning function
      }

      // Check for 8 mistakes (Game Over)
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    }
    else {
      // If Letter Is Correct
      
      // Play Success Sound
      document.getElementById("success").play();

      // NEW: Check for win condition
      if (correctLettersCount === totalLettersToGuess) {
        SuccessGame();
        lettersContainer.classList.add("finished");
      }
    }
  }
});

// End Game Function
function endGame() {

  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = 'popup';

  // Append To The Body
  document.body.appendChild(div);
}

// Success Game Function
function SuccessGame() {

  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(`You Win, The Word Is ${randomValueValue}`);

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = 'poup-Succsess'; // Using your class name

  // Append To The Body
  document.body.appendChild(div);
}

// NEW: Function to show a warning at 4 mistakes
function showWarningPopup() {

  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode("Be Careful! You have 4 wrong attempts.");

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div (You can use 'popup' for the same style)
  div.className = 'popup'; // Using the 'popup' class for styling

  // Append To The Body
  document.body.appendChild(div);

  // Automatically remove the warning after 3 seconds
  setTimeout(() => {
    if (document.body.contains(div)) {
      document.body.removeChild(div);
    }
  }, 1500); // 3000 milliseconds = 1.5 seconds
}