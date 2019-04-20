function goGet(url, stat) {
fetch(url)
.then(response => response.json())
.then(json => {
  let nonZero = json.players.filter(obj =>{
return obj.stats[stat]
  })
let sorted = nonZero.sort(function sortBy(a, b) {
  return b.stats[stat] - a.stats[stat]
})
let most = sorted[0].stats[stat]
let result = sorted.filter(player => player.stats[stat] === most)
console.log(result)
})
}

function watchSuperlative() {
  $('#superlative').submit(event => {
    event.preventDefault();
    let position = $('#superlative-position').val();
    /*let mostLeast = $('#superlative-most-least').val();*/
    let stat = $('#superlative-stat').val();
    let season = $('#superlative-season').val();
    let url = 'https://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=' + season + '&position=' + position + '&format=json';
    goGet(url, stat)
  })
}

function watchForSelect () {
  $('#superlative-range-type').change(function name() {
    $('#superlative-range').empty()
    opt = $('#superlative-range-type').val()
    if (opt === 'one-game') {
      $('#superlative-range').html('Season: <input type="number" id="superlative-season"><br>Week: <input type="number" id="superlative-week">')
    }
    if (opt === 'one-season') {
      $('#superlative-range').html('Season: <input type="number" id="superlative-season">')
    }
    if (opt === 'multiple-games') {
      $('#superlative-range').html('Season: <input type="number" id="superlative-season"><br>Weeks: <input type="number" id="superlative-week">&ndash;<input type="number" id="superlative-week-end">')
    }
    if (opt === 'multiple-seasons') {
      $('#superlative-range').html('Seasons: <input type="number" id="superlative-season">&ndash;<input type="number" id="superlative-season-end">')
    }
  })
}

function watchMostRecent() {
  $('#most-recent').submit(event => {
    event.preventDefault();
    let playerTeam = $('#most-recent-player-team').val()
    let number = $('#most-recent-number').val()
    let stat = $('#most-recent-stat').val()
    let gameSeason = $('#most-recent-game-season').val()
    let url = "https://api.fantasy.nfl.com/v1/"
    console.log(playerTeam + number + stat + gameSeason)
  })
}

function gidderDone() {
  watchForSelect()
  watchMostRecent()
  watchSuperlative()
}

gidderDone()
//The endpoint "https://api.fantasy.nfl.com/v1/docs/service?serviceName=gameStats" contains a key for all of the stats returned by the other endpoints. Unfortunately, that specific endpoint doesn't support CORS, and as such I have reproduced the key in an abridged form here.
let stats = {
    1: 'Games played',
    2: 'Passing Attempts',
    3: 'Passing Completions',
    4: 'Incomplete Passes',
    5: 'Passing Yards',
    6: 'Passing Touchdowns',
    7: 'Interceptions Thrown',
    8: 'Every Time Sacked',
    9: '300-399 Passing Yard Bonus',
    10: '400+ Passing Yard Bonus',
    11: '40+ Passing Yard TD Bonus',
    12: '50+ Passing Yard TD Bonus',
    13: 'Rushing Attempts',
    14: 'Rushing Yards',
    15: 'Rushing Touchdowns',
    16: '40+ Rushing Yard TD Bonus',
    17: '50+ Rushing Yard TD Bonus',
    18: '100-199 Rushing Yards Bonus',
    19: '200+ Rushing Yards Bonus',
    20: 'Receptions',
    21: 'Receiving Yards',
    22: 'Receiving Touchdowns',
    23: '40+ Receiving Yard TD Bonus',
    24: '50+ Receiving Yard TD Bonus',
    25: '100-199 Receiving Yards Bonus',
    26: '200+ Receiving Yard Bonus',
    27: 'Kickoff and Punt Return Yards',
    28: 'Kickoff and Punt Return Touchdowns',
    29: 'Fumble Recovered for TD',
    30: 'Fumbles Lost',
    31: 'Fumble',
    32: '2-Point Conversions',
    33: 'PAT Made',
    34: 'PAT Missed',
    35: 'FG Made 0-19',
    36: 'FG Made 20-29',
    37: 'FG Made 30-39',
    38: 'FG Made 40-49',
    39: 'FG Made 50+',
    40: 'FG Missed 0-19',
    41: 'FG Missed 20-29',
    42: 'FG Missed 30-39',
    43: 'FG Missed 40-49',
    44: 'FG Missed 50+',
    45: 'Sacks',
    46: 'Interceptions',
    47: 'Fumbles Recovered',
    48: 'Fumbles Forced',
    49: 'Safeties',
    50: 'Touchdowns',
    51: 'Blocked Kicks',
    52: 'Kickoff and Punt Return Yards',
    53: 'Kickoff and Punt Return Touchdowns',
    54: 'Points Allowed',
    55: 'Points Allowed 0',
    56: 'Points Allowed 1-6',
    57: 'Points Allowed 7-13',
    58: 'Points Allowed 14-20',
    59: 'Points Allowed 21-27',
    60: 'Points Allowed 28-34',
    61: 'Points Allowed 35+',
    62: 'Yards Allowed',
    63: 'Less than 100 Total Yards Allowed',
    64: '100-199 Yards Allowed',
    65: '200-299 Yards Allowed',
    66: '300-399 Yards Allowed',
    67: '400-449 Yards Allowed',
    68: '450-499 Yards Allowed',
    69: '500+ Yards Allowed',
    70: 'Tackle',
    71: 'Assisted Tackles',
    72: 'Sack',
    73: 'Defense Interception',
    74: 'Forced Fumble',
    75: 'Fumbles Recovery',
    76: 'Touchdown (Interception Return)',
    77: 'Touchdown (Fumble Return)',
    78: 'Touchdown (Blocked Kick)',
    79: 'Blocked Kick (punt, FG, PAT)',
    80: 'Safety',
    81: 'Pass Defended',
    82: 'Interception Return Yards',
    83: 'Fumble Return Yards',
    84: 'Tackles for Loss Bonus',
    85: 'QB Hit',
    86: 'Sack Yards',
    87: '10+ Tackles Bonus',
    88: '2+ Sacks Bonus',
    89: '3+ Passes Defended Bonus',
    90: '50+ Yard INT Return TD Bonus',
    91: '50+ Yard Fumble Return TD Bonus'
}

/*fetch(url)
.then(res => res.json())
.then(json => {
  console.log(json.players[0].stats)
  let obj = json.players[0].stats
// json.players.forEach(player => { // console.log(player.name) // }) // json.players[0].stats.forEach(stat => { // console.log(stat) // }) 
for(let stat in obj) { console.log(stats[stat], obj[stat]) }

})*/


