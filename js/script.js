var cancelButton = $('#cancel-button')
var cover = $('#cover')
var newGameButton = $('#newGameButton')
var hexagons = $('.hex-container')
var redScoreContainer = $('#red-score-container')
var blueScoreContainer = $('#blue-score-container')
var blueScore = 0
var redScore = 0
var blueLength = 0
var redLength = 0
var turn = 0

//Cancel button for exiting out of the game winner overlay

cancelButton.click(function(){
    cover.css("display", "none")
    cancelButton.css("display", "none")
})

//New game functionality

newGameButton.click(function(){
  newGame()
})

function newGame() {
  turn = 0
  // console.log('new game working')
  clearScoredTags()
  blueLength = 0
  redLength = 0
  blueScore = 0
  redScore = 0
  for (i=1; i<45; i +=1) {
    $('#game-hex-' + i).removeClass('homeMarkerBlue')
    $('#game-hex-' + i).removeClass('homeMarkerRed')
    $('#game-hex-' + i).removeClass('blue-marker')
    $('#game-hex-' + i).removeClass('red-marker')
    $('#game-hex-' + i).removeClass('played')
    $('#game-hex-' + i).children('.hex-center').empty()
    $('#game-hex-' + i).children('.hex-top').css("border-bottom", "20px solid #666564")
    $('#game-hex-' + i).children('.hex-center').css("background-color", "#666564")
    $('#game-hex-' + i).children('.hex-bottom').css("border-top", "20px solid #666564")
  }
  updateScoreBlue()
  updateScoreRed()
  cover.children('p').html(cover.children('p').html().replace('Blue Wins!!!', ''))
  cover.children('p').html(cover.children('p').html().replace('Red Wins!!!', ''))
  cover.children('p').html(cover.children('p').html().replace("It's a Tie!!!", ''))
  cover.children('p').css({'font-size': '100px'})
}

//This function is used to console.log the a clicked hex's number and x,y coordinates.  Mostly used for debugging and reference
hexagons.click(function(){
  var i = hexagons.index($(this))
  // console.log('This is game hex ' + (i+1) + '.')
  // console.log('The x coordinate is ' + getXCoord(this) + ' and the y coordinate is ' + getYCoord(this) + '.')
})


//MAIN GAME LOGIC FUNCTION
//The game is primarily driven on player clicks on the hexes.  Turns will automatically alternate.  Various functions will run after each click to tally the score, animate things accordingly, and play sound effects.
// This function puts a player piece in a given hex as long as that hex has not already been used and marks that hex with the given color for the game logic's scoring.
hexagons.click(function(){
  if ((turn % 2 === 0) && !($(this).hasClass('played'))) {
    if (turn > 0) {
    $(this).children('.hex-center').append('<img class="blue_game_piece" src="art/blue_sphere_piece.jpg" alt="blue game piece" />');}
    if (turn === 0) {
      $(this).addClass('homeMarkerBlue')
      $(this).children('.hex-center').append('<img class="blue_small_house" src="art/blue-small-house.png" alt="blue house piece" />')
    }
    turn += 1;
    $(this).addClass('blue-marker')
    document.getElementById('click2').play()
    checkHexBlue(xCoordBlueHome(), yCoordBlueHome())
    updateScoreBlue()
    checkWinCondition()
    clearScoredTags()
    $(this).toggleClass('played')
    blueLength = 0
    highlightPlayer()
    // console.log('It is turn number ' + turn)
  }
  else if ((turn % 2 === 1) && !($(this).hasClass('played'))) {
    if (turn > 1) {$(this).children('.hex-center').append('<img class="red_game_piece" src="art/red_sphere_piece.png" alt="red game piece" />')}
    if (turn === 1) {
      $(this).addClass('homeMarkerRed')
      $(this).children('.hex-center').append('<img class="red_small_house" src="art/red-small-house.png" alt="red house piece" />')
    }
    turn += 1;
    $(this).addClass('red-marker')
    document.getElementById('click1').play()
    checkHexRed(xCoordRedHome(), yCoordRedHome())
    updateScoreRed()
    checkWinCondition()
    clearScoredTags()
    $(this).toggleClass('played')
    redLength = 0
    highlightPlayer()
    // console.log('It is turn number ' + turn)
  }
})
  
// This function is utilizes animation to change the color of the hexes as they are used
hexagons.click(function(){
    $(this).children('.hex-top').animate({
      'borderBottomColor': 'black'
    })
    $(this).children('.hex-center').animate({
      'background-color': 'black'
    })
    $(this).children('.hex-bottom').animate({
      'borderTopColor': 'black'
    })
})

//This function will highlight the current player
function highlightPlayer() {
//On blue turn --
  if (turn % 2 === 0){
    // console.log("It is blue's turn so highlighting blue player.")
    blueScoreContainer.children('#blue-score-top').animate({
      'borderBottomColor': 'rgba(0,0,255,0.9)'})
    blueScoreContainer.children('#blue-score').animate({
      'background-color': 'rgba(0,0,255,0.9)'})
    blueScoreContainer.children('#blue-score-bottom').animate({
      'borderTopColor': 'rgba(0,0,255,0.9)'})
    redScoreContainer.children('#red-score-top').animate({
      'borderBottomColor': 'rgba(255,0,0,0.5)'})
    redScoreContainer.children('#red-score').animate({
      'background-color': 'rgba(255,0,0,0.5)'})
    redScoreContainer.children('#red-score-bottom').animate({
      'borderTopColor': 'rgba(255,0,0,0.5)'})
  }
//On red turn --
  if (turn % 2 === 1) {
    // console.log("It is red's turn so highlighting red player.")
    redScoreContainer.children('#red-score-top').animate({
      'borderBottomColor': 'rgba(255,0,0,0.9)'})
    redScoreContainer.children('#red-score').animate({
      'background-color': 'rgba(255,0,0,0.9)'})
    redScoreContainer.children('#red-score-bottom').animate({
      'borderTopColor': 'rgba(255,0,0,0.9)'})
    blueScoreContainer.children('#blue-score-top').animate({
      'borderBottomColor': 'rgba(0,0,255,0.5)'})
    blueScoreContainer.children('#blue-score').animate({
      'background-color': 'rgba(0,0,255,0.5)'})
    blueScoreContainer.children('#blue-score-bottom').animate({
      'borderTopColor': 'rgba(0,0,255,0.5)'})
  }
}


//GAME LOGIC FOR SCORING

//Where x and y are the coordinates of the hex

function getXCoord(el) {
  if ($(el).hasClass('x1')) {
    // console.log("x coord is 1")
    return 1
  }
  if ($(el).hasClass('x2')) {
    // console.log("x coord is 2")
    return 2
  }
  if ($(el).hasClass('x3')) {
    // console.log("x coord is 3")
    return 3
  }
  if ($(el).hasClass('x4')) {
    // console.log("x coord is 4")
    return 4
  }
  if ($(el).hasClass('x5')) {
    // console.log("x coord is 5")
    return 5
  }
  if ($(el).hasClass('x6')) {
    // console.log("x coord is 6")
    return 6
  }
  if ($(el).hasClass('x7')) {
    // console.log("x coord is 7")
    return 7
  }
  if ($(el).hasClass('x8')) {
    // console.log("x coord is 8")
    return 8
  }
  if ($(el).hasClass('x9')) {
    // console.log("x coord is 9")
    return 9
  }
  if ($(el).hasClass('x10')) {
    // console.log("x coord is 10")
    return 10
  }
  if ($(el).hasClass('x11')) {
    // console.log("x coord is 11")
    return 11
  }
  if ($(el).hasClass('x12')) {
    // console.log("x coord is 12")
    return 12
  }
  if ($(el).hasClass('x13')) {
    // console.log("x coord is 13")
    return 13
  }
  if ($(el).hasClass('x14')) {
    // console.log("x coord is 14")
    return 14
  }
  if ($(el).hasClass('x15')) {
    // console.log("x coord is 15")
    return 15
  }
}
//This will output the x coordinate

function getYCoord(el) {
  if ($(el).hasClass('y1')) {
    // console.log("y coord is 1")
    return 1
  }
  if ($(el).hasClass('y2')) {
    // console.log("y coord is 2")
    return 2
  }
  if ($(el).hasClass('y3')) {
    // console.log("y coord is 3")
    return 3
  }
  if ($(el).hasClass('y4')) {
    // console.log("y coord is 4")
    return 4
  }
  if ($(el).hasClass('y5')) {
    // console.log("y coord is 5")
    return 5
  }
  if ($(el).hasClass('y6')) {
    // console.log("y coord is 6")
    return 6
  }
  if ($(el).hasClass('y7')) {
    // console.log("y coord is 7")
    return 7
  }
  if ($(el).hasClass('y8')) {
    // console.log("y coord is 8")
    return 8
  }
  if ($(el).hasClass('y9')) {
    // console.log("y coord is 9")
    return 9
  }
  if ($(el).hasClass('y10')) {
    // console.log("y coord is 10")
    return 10
  }
  if ($(el).hasClass('y11')) {
    // console.log("y coord is 11")
    return 11
  }
  if ($(el).hasClass('y12')) {
    // console.log("y coord is 12")
    return 12
  }
  if ($(el).hasClass('y13')) {
    // console.log("y coord is 13")
    return 13
  }
  if ($(el).hasClass('y14')) {
    // console.log("y coord is 14")
    return 14
  }
  if ($(el).hasClass('y15')) {
    // console.log("y coord is 15")
    return 15
  }
}
//This will output the y coordinate

function alreadyScored(x, y) {
  return $('.x'+x+'.y'+y).hasClass('scored')
//Returns true if the hex at position (x, y) has already been scored and false if it hasn't been scored
}

function markScoredBlue(x, y) {
  $('.x'+x+'.y'+y).addClass('scored')
//This will mark the hex at position (x, y) as scored
}

function checkForBlue(x, y) {
  return $('.x'+x+'.y'+y).hasClass('blue-marker')
//This will check the hex at position (x, y) to see if there is a blue piece on it
//and it will return true if there is a blue piece there and false if there is no blue piece there
}

function xCoordBlueHome() {
  return getXCoord('.homeMarkerBlue')
}

function yCoordBlueHome() {
  return getYCoord('.homeMarkerBlue')
}

function xCoordRedHome() {
  return getXCoord('.homeMarkerRed')
}

function yCoordRedHome() {
  return getYCoord('.homeMarkerRed')
}

//This is a recursive algorithm for finding the size/length of connected hexes given a starting hex.  This is essential to the scoring process.
function checkHexBlue(x, y) {
  if (checkForBlue(x, y) && !alreadyScored(x, y)) {
    // console.log("looking at surrounding hexes")
    if (checkForBlue(x-1, y-1) || checkForBlue(x+1, y-1) || checkForBlue(x-2, y) || checkForBlue(x+2, y) || checkForBlue(x-1, y+1) || checkForBlue(x+1, y+1))  {
      markScoredBlue(x, y)
      blueLength += 1
      blueScore += 1
      // console.log('blueLength incremented because of ' + '(' + x + ',' + y +')')
      checkHexBlue(x-1, y-1)
      checkHexBlue(x+1, y-1)
      checkHexBlue(x-2, y)
      checkHexBlue(x+2, y)
      checkHexBlue(x-1, y+1)
      checkHexBlue(x+1, y+1)
    }
  }
  else {return}
}

function checkHexRed(x, y) {
  if (checkForRed(x, y) && !alreadyScored(x, y)) {
    // console.log("looking at surrounding hexes")
    if (checkForRed(x-1, y-1) || checkForRed(x+1, y-1) || checkForRed(x-2, y) || checkForRed(x+2, y) || checkForRed(x-1, y+1) || checkForRed(x+1, y+1))  {
      markScoredRed(x, y)
      redLength += 1
      redScore += 1
      // console.log('redLength incremented because of ' + '(' + x + ',' + y +')')
      checkHexRed(x-1, y-1)
      checkHexRed(x+1, y-1)
      checkHexRed(x-2, y)
      checkHexRed(x+2, y)
      checkHexRed(x-1, y+1)
      checkHexRed(x+1, y+1)
    }
  }
  else {return}
}

function clearScoredTags() {
  for (i=1; i<45; i +=1) {
    $('#game-hex-' + i).removeClass('scored')
  }
}

function markScoredRed(x, y) {
  $('.x'+x+'.y'+y).addClass('scored')
//This will mark the hex at position (x, y) as scored
}

function checkForRed(x, y) {
  return $('.x'+x+'.y'+y).hasClass('red-marker')
//This will check the hex at position (x, y) to see if there is a red piece on it
//and it will return true if there is a red piece there and false if there is no red piece there
}

function updateScoreBlue() {
  $('#blue-score').text(blueLength)
}

function updateScoreRed() {
  $('#red-score').text(redLength)
}

//Audio
$(".my_audio").trigger('load');
var audio = document.getElementById('my_audio')
audio.play();
 $('.music').click(function(){
  //  console.log('music click working')
   $('.music').toggleClass('mute')
   $('.music').toggleClass('unmute')
   if ($('.music').hasClass('mute')) {
     document.getElementById('my_audio').muted = true;
   }
   if ($('.music').hasClass('unmute')) {
     document.getElementById('my_audio').muted = false;
   }
 })

//Win Condition
function checkWinCondition(){
  if (turn === 44) {
    cover.css("display", "table")
    document.getElementById('applause').play()
    $('#cancel-button').css("display", "block")
    if (blueScore > redScore) {
      cover.children('p').css("color", "blue")
      cover.children('p').append('Blue Wins!!!')
      cover.children('p').animate({'font-size': '+=30'})
      console.log("BLUE WINS!")
    }
    if (redScore > blueScore) {
      cover.children('p').css("color", "red")
      console.log("RED WINS!")
      cover.children('p').append('Red Wins!!!')
      cover.children('p').animate({'font-size': '+=30'})
    }
    if (blueScore === redScore) {
      cover.children('p').css("color", "white")
      console.log("IT IS A TIE!!")
      cover.children('p').append("It's a Tie!!!")
      cover.children('p').animate({'font-size': '+=30'})
    }
  }
}

//Tooltips
$('#red-score').tooltip({
    content: 'Red home plus connected red pieces.',
    tooltipClass: "info-tooltip"
})
$('#blue-score').tooltip({
    content: 'Blue home plus connected blue pieces.',
    tooltipClass: "info-tooltip"
  })
