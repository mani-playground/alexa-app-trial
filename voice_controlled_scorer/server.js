// Load the Violet Module
const violet = require('violet').script();

violet.addInputTypes({
  'score': 'number',
  'player': 'firstName'
}
);

//Hard-coding players for trial. Need to get it from users and store it in an array.
var model = {
    john_total: 0,
    sam_total: 0
}

// The Controller
var app = {
  resetScore: (response)=>{
    model.john_total = 0;
    model.sam_total = 0;
  },
  addScore: (response)=>{
    score = parseInt(response.get('score'));
    if(response.get('player') == 'john') {
        model.john_total = model.john_total + score;
    } else if(response.get('player') == 'sam') {
        model.sam_total = model.sam_total + score;
    } else {
        response.say('Sorry. Player not found');
    }
    
  },
  getTotals: (response)=>{
    response.say('john got ' + model.john_total);
    response.say('sam got ' + model.sam_total);    
  },
  getResults: (response)=>{
    response.say('john got ' + model.john_total);
    response.say('sam got ' + model.sam_total);
    if(model.john_total > model.sam_total) {
        response.say('john won the game');
    } else if(model.john_total < model.sam_total) {
        response.say('sam won the game');
    } else {
           response.say('It is a draw');
    }
  }
}

// The Conversation Flow (with a pointer to the app logic)
violet.addFlowScript(`<app>
 <choice id="launch">
  <expecting>What can you do?</expecting>
  <say>I can help you with scoring your games</say>
</choice>
<choice id="start_game">
  <expecting>Start a new game</expecting>
  <say>Ok, starting a new game. Good luck.</say>
  <resolve value="app.resetScore(response)"/>    
</choice>
<choice id="add_score">
  <expecting>[[player]] got [[score]]</expecting>
  <say>Adding [[score]] for [[player]]</say>
  <resolve value="app.addScore(response)"/>
</choice>
<choice id="get_totals">
  <expecting>What's the score?</expecting>
  <resolve value="app.getTotals(response)"/>
</choice>
<choice id="get_result">
  <expecting>What's the result?</expecting>
  <resolve value="app.getResults(response)"/>
</choice>
</app>`, {app});
