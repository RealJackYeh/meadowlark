const e = require("express");

function cardToString(c) {
    const suits = {'H': '\u2665', 'C': '\u2663', 'D': '\u2666', 'S': '\u2660'}
    const values = {1: 'A', 11: 'J', 12: 'Q', 13: 'K'}
    console.log(suits + values)
    for (let i=2; i<=10; i++) values[i] = i;
    return values[c.value] + suits[c.suit]
}
const cards = []
for (let suit of ['H', 'C', 'D', 'S'])
    for (let value=1; value<=13; value++)
        cards.push({ suit, value })
//cards.filter(c => c.value === 2)

console.log(cards.filter(c => c.value ===2)
    .map(cardToString))
console.log(cards.filter(c => c.value > 10 && c.suit === 'H')
    .map(cardToString))
// error object test
function validateEmail(email) {
    return email.match(/@/) ?
        email : 
        new Error(`invalid email: ${email}`)
}
const email = 'null'
try {
    const validatedEmail = validateEmail(email)
  //  if (validatedEmail instanceof Error) {
  //      console.log(`Error: ${validatedEmail.message}`)
  //  } else {
        console.log(`Valid email: ${validatedEmail}`)
  //  }
} catch(err) {
    console.log(`Error: ${err.message}`)
}
