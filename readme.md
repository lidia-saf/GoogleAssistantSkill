# Google Assistant Basic Voice Skill "What is IMDB Rating of the movie?"

Developed using Google Action's Dialogflow Console and webhooks deployed using Firebase Functions.

This repository contains two folders:

1. functions

- This folder contains small Node.js app containing webhooks for Default Welcome and imdbRating intents.
- Webhooks are deployed into Firebase Functions.

2. movieDataParser

- This folder contains the movie data from Kaggle used to create the "@movie" entity to train Google Action to recognize movie as a parameter in the natural speech processing. @movie is a title.
- The parser transforms CSV format into json and creates the object that can be later imported into the Dialogflow.

Restriction of Google Actions Dialogflow:
- for action to be tested in a simulator the entity items cannot exceed 10,000.

