# Tic Tac Toe

Site Link: https://blue0206.github.io/tic-tac-toe/

The main focus of this project is to use Factory Functions and IIFEs to organise
JavaScript code, i.e., to have as little global code as possible.

Out of all the projects I've made till now, this one was the most time consuming
for me. I realised that organising code is not an easy job and there's a lot to
take care of.

I did succeed in my target of having as little global code as possible. In fact,
the only global code there is is the code for attaching event listeners to buttons.
If I wanted I could just put them inside IIFE as well and it would still work for me!
However, I think that would be going overboard so I won't.

#### Making a console playable game

I spent a lot of time thinking about how I should go around this. But in the end, the
difficulty only existed because I had only studied about factory functions and wasn't
comfortable working with them.

Throughout this project, after working with factory functions I have realised that they
are SUPER FUN and MUCH MUCH MUCH MUCH better than object constructors and prototypes!
Not taking into account the known upsides of factories over constructors, I prefer
factories solely because they are SO EASY to work with!

Once I understood what I had to do, all I had to do was code and see it for myself!
Initially, I used `prompt()` for taking in user response (as there is no other way
because this game is supposed to be played by user) and the output was of course,
logged in console.

I did not go for a 2D array to create my gameboard, I thought it would be too much of
a hassle, so I stayed with 1D array and used index number for input.

After a lot of struggling with factories, I managed to pull off a working console
game.

#### Refactoring the console game script to work with DOM

Now this was very difficult. I was just confused about where to do what and I ended
up controlling the gameplay and DOM from a single factory (which is not what I wanted
and not ideal as well.)

THIS WAS SO CONFUSING!

Ultimately, after a lot of trial and error and after literally going like over 10 commits
in the wrong direction, I finally understood what I had to do. 

I came up with a set of rules:

1. `ScreenController` IIFE should ONLY handle the DOM. NOTHING ELSE. Earlier I had flooded
    it with everything but NO MORE.

2. `GameController` IIFE should ONLY handle the working of the game, i.e., the creation of
   player instances, their moves, the checks of the moves, etc.

3. `Player` factory should define the player itself and its attributes and return functions
   to change those attributes (hence making the attribute variables private.) For example,
   name, choice, and score.

4. `Gameboard` IIFE should handle everything about the Gameboard (in array form in memory.)
   All the methods for updating game-board, resetting game-board, etc were defined in this
   IIFE.

After coming up with these rules, my dilemma was C-L-E-A-R! Of course coming up with the code
and deciding what method will be used where was not easy to come up with but since my BIGGEST
obstacle was gone, things went much smoothly afterwards.

#### Using `transform` CSS Property

My first time using this property was to rotate and scale the `<hr>` element to show diagonal
strikethrough upon wins.

#### Conclusion

The project was an amazing experience. I don't have much to mention here not because it was
not that significant. I did try new things and I did struggle. But since most of it was because
of my lack of understanding, I was able to tackle this project quite easily after some playing
and learning. 
This project was a really valuable experience and I had so much fun when I finished it. It was
really was satisfying.