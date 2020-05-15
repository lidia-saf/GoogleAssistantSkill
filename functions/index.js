const functions = require('firebase-functions');

// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {
    dialogflow,
} = require('actions-on-google');
const axios = require('axios');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});
const key='';


// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent('Default Welcome Intent', (conv) => {
    // Asks the user's permission to know their name, for personalization.
    conv.ask(`Welcome here, what movie you want IMDB rating for?`);
  });


// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('imdbRating', async (conv, {movie}) => {
    try {
        let param = encodeURI(movie);
        let result = await axios.get(`http://omdbapi.com/?apikey=${key}&t=${param}`);
    } catch(err) {
        conv.close(`Sorry, we have some network problem - ${err.message}.`);
        return;
    }

    if (result.imdbRating) {
        conv.close(`Imdb rating for ${movie} is ${result.imdbRating}`);
    }
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.fulfillment = functions.https.onRequest(app);
