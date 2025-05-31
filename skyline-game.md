# Skyline game — Planning Notes

## Description of the project

A quiz game in which users try to guess the city based on a photo of its skyline (or similar wide angle photo of it). There will likely be multiple modes, but the default would be a daily game in which you are shown 5 photos, and try to guess the city in a free entry field (but only valid city names are allowed). If you get it wrong, depending on the difficulty mode, you would be given a hint, such as (in est. decreasing difficulty: [no hint, semantic difference between guess and target based on word vector embeddings, physical distance between the two, physical distance and a direction indicator]. You would be given some number of guesses based on playtesting to tune the difficulty. If you get it, that is your score for that question, if not, the answer is revealed so you can learn. Then you move to the next question. At the end you are given some score (questions you got right, avg. attempts, something). Eventually, you should be able to see your historical scores, copy a text string containing your results for the day (like wordle), and compare results with your friends’ accounts for that day.

Eventually, more modes or variants could be added such as:
- different modes based on geographies (europe, usa, americas, asia, india, etc)
- play historical dailies
- infinite mode
- etc…

## Features I want

- sets of photos for a large number of cities
- some metadata about those cities (coordinates, country, population, etc)
- a database to store this in
- api to retrieve quizzes
- static json files for city comparisons (distance, semantic distance, etc)
- frontend website to play the game
- user accounts system
- user historical score view
- user friends system
- multiple difficulty modes
- ability to compare distances, directions, and semantic distances of cities (precomputed)
- data for at least 500 cities

## Essentials

- photos for the top 50 American cities
	- scraping script for this
- api to set the quiz each day
	- database setup to generate the dailies
- frontend website to view the quiz
	- at first a functional minimal version
- client side list for valid cities
	- generate from list of cities (not all have to be actual possible answers
	
## Gameplan

0. Reorganize my docker setup to simplify deployment and follow best practice.
1. Write the image scraper and get a few images for each of top 50 US MSAs
2. Set up an organization structure for how to store those images and the metadata files
3. Create a minimal frontend
4. Create a MWE with a dummy API response
5. Create an API that can send such a response.
6. Design and implement a database schema to store and fetch this information
7. Update frontend and finalize the layout and look.
8. Replan





- Daily Quizzes
	- 5ish questions
	- Shown a photo of a skyline
	- Free-entry field, place a guess
	- Dependent on difficulty