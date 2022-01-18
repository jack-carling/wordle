# Wordle

I was inspired by the popular game [Wordle](https://www.powerlanguage.co.uk/wordle/) and wanted to create my own version. I've mostly used Vue options API when building projects so this was the first time trying out Vue 3 using the composition API.

## Demo

[Play on Heroku](https://wordle-game.herokuapp.com/)

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

## Screenshot

![](https://user-images.githubusercontent.com/72305598/149930761-843cbd58-b2ff-4c04-98f5-a951885e095f.png)

## Setup

```bash
# Install dependencies
$ npm install

# Run development server
$ npm run dev
```
