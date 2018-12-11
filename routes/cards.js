const express = require('express');
const router = express.Router(); // router instance
const { data } = require('../data/flashcardData.json');
// separate out cards because this is the main data we will use
const { cards } = data; // same as cards = data.cards

router.get('/', (req, res) => { // routing cut out the /cards, because all traffic for /cards will be sent to this file
  const numberOfCards = cards.length;
  const flashCardId = Math.floor(Math.random() * numberOfCards);
  res.redirect(`/cards/${flashCardId}`)
});


// using url parameters :id -> req.params.id
router.get('/:id', (req, res) => {

  // Here, we're setting either the string "answer" or the string "question" to a variable called side
  const { side } = req.query; // if there is something in the query property of the request, then store if in a variable "side" (req.query.side)

  // Here, we're setting the index of the client's desired "card" to a variable called id
  const { id } = req.params; // store the route parameter as "id" (req.params.id)

  if (!side) {
    return res.redirect(`/cards/${id}?side=question`); // Need this return statement to stop execution of the function
  }

  const name = req.cookies.username;


  // This step has two parts: we're getting the specific "card" from the "cards" array using the id variable as an index number
  // Then, once we have a "card" object, we're grabbing the string of text inside of its "answer" property and assigning it to the variable "text"
  // We get the string of text inside of "answer" — instead of "question" — because that's what the value of "side" above happens to be
  const text = cards[id][side]; // bracket notation for the side

  // Similarily, "hint" will contain the the string of text inside of the "hint" property of the the selected "card" object
  const { hint } = cards[id]; // store a reference to the hint

  // This step is really for readability and is arguably unnecessary
  // Basically, you're setting "templateData" with {text: "Something, something, answer", hint: "hint for the question"}
  // const templateData = { text, hint };
  const templateData = { id, text, name } // wrap the text and the hint into an object that can be passed into the template

  if (side === 'question') {
    // Finally, we build our card.pug template using the contents of templateData, and send the resulting HTML to the client
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if (side === 'answer') {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = "Question"
  }

  res.render('card', templateData);
})

module.exports = router;
