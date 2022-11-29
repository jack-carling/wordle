# Wordle

I was inspired by the popular game [Wordle](https://www.powerlanguage.co.uk/wordle/) and wanted to create my own version. I've mostly worked with Vue options API when building projects before so this was my first time trying the composition API.

The game contains 483 common words and chooses a random word each round. The words played are checked against a dictionary containing 12,923 words.

**PWA:** Using the `vite-plugin-pwa` and self hosting both the fonts and dictionaries makes the game fully playable offline!

Compared to the original Wordle game I've also added a hint for a correctly placed letter but indicating when the word contains more than one of that particular letter.

The score is based on how well each round is played and reset when the player leaves the site (i.e. not saved in localStorage). Guessing the word on the first try gives 100 points, second try 80 points and so on (reducing by 20 each row) until the last row which gives no points. The game also tracks number of wins/losses and a streak (consecutive wins in a row which is reset if a round is lost).

In development mode the word of the round is logged in the console.

## Description

Guess the word in 6 tries.

Each guess must be a valid 5 letter word. Hit the enter button to submit.

<img src="https://user-images.githubusercontent.com/72305598/149928651-b08d53fa-bd84-4a85-82f4-0ffb735dd428.png" width="360"/>

After each guess, the color of the tiles will change to show how close your guess was to the word.

<img src="https://user-images.githubusercontent.com/72305598/149939733-c67ffde1-b4fe-48a2-99da-f9733b526c86.png" width="360" />

A green letter is in the word and in the correct spot. The word is not image but it starts with an I.

<img src="https://user-images.githubusercontent.com/72305598/149939804-0b8cc2e7-4ea9-4b7d-824a-970ef6212206.png" width="360" />

A yellow letter is in the word but in the wrong spot. The letter D exists in the word but not right there.

<img src="https://user-images.githubusercontent.com/72305598/149939866-262fb831-6250-4594-b90f-4b7ae9597093.png" width="360" />

This double colored letter will give you a hint. The letter A is in the correct spot, but the word contains more than one letter A.

And all the other dark gray letters indicate that they are not in the word in any spot.

## Preview

![](https://user-images.githubusercontent.com/72305598/152695034-b5500020-93fb-4912-8e57-bbc8058a5346.gif)

## Setup

```bash
# Install dependencies
$ npm install

# Run development server
$ npm run dev
```
