// $('#game-hex-1 *').click(function(){console.log('clicked game-hex-1')})
// $('#game-hex-2 *').click(function(){console.log('clicked game-hex-2')})

var newGameButton = $('#newGameButton')

newGameButton.click(function(){
  newGame()
})

function newGame() {
  turn = 0
  console.log('new game working')
  clearScoredTags()
  blueLength = 0
  redLength = 0
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
}

var hexagons = $('.hex-container')

hexagons.click(function(){
  var i = hexagons.index($(this))
  console.log('This is game hex ' + (i+1) + '.')
  console.log('The x coordinate is ' + getXCoord(this) + ' and the y coordinate is ' + getYCoord(this) + '.')
})

var turn = 0

// This function puts a player piece in a given hex as long as that hex has not already been used and marks that hex with the given color for the game logic's scoring
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
    // scoringLogicBlue(getXCoord(this), getYCoord(this))
    // scanAll()
    checkHexBlue(xCoordBlueHome(), yCoordBlueHome())
    updateScoreBlue()
    clearScoredTags()
    $(this).toggleClass('played')
    blueLength = 0
    highlightPlayer()
    console.log('It is turn number ' + turn)
  }
  else if ((turn % 2 === 1) && !($(this).hasClass('played'))) {
    if (turn > 1) {$(this).children('.hex-center').append('<img class="red_game_piece" src="art/red_sphere_piece.png" alt="red game piece" />')}
    if (turn === 1) {
      $(this).addClass('homeMarkerRed')
      $(this).children('.hex-center').append('<img class="red_small_house" src="art/red-small-house.png" alt="red house piece" />')
    }
    turn += 1;
    $(this).addClass('red-marker')
    // scoringLogicRed(getXCoord(this), getYCoord(this))
    // scanAll()
    checkHexRed(xCoordRedHome(), yCoordRedHome())
    updateScoreRed()
    clearScoredTags()
    $(this).toggleClass('played')
    redLength = 0
    highlightPlayer()
    console.log('It is turn number ' + turn)
  }
})
  
// This function uses animation to change the color of the hexes as they are used
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

var redScoreContainer = $('#red-score-container')
var blueScoreContainer = $('#blue-score-container')

//This function will highlight the current player
function highlightPlayer() {
//On blue turn --
  if (turn % 2 === 0){
    console.log("It is blue's turn so highlighting blue player.")
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
    console.log("It is red's turn so highlighting red player.")
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
var blueScore = 0
var redScore = 0

//GAME LOGIC FOR SCORING

// function floodFill(x, y){
// 	if(alreadyFilled(x, y)) return;
// 	fill(x, y);
//
// 	floodFill(x,   y-1);
// 	floodFill(x+1, y  );
// 	floodFill(x,   y+1);
// 	floodFill(x-1, y  );
// }
//

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

//Scan all hexes for unscored blue pieces
function scanAll() {
  scanLogic(1, 1)
  scanLogic(1, 2)
  scanLogic(1, 3)
  scanLogic(1, 4)
  scanLogic(1, 5)
  scanLogic(1, 6)
  scanLogic(1, 7)
  scanLogic(2, 1)
  scanLogic(2, 2)
  scanLogic(2, 3)
  scanLogic(2, 4)
  scanLogic(2, 5)
  scanLogic(2, 6)
  scanLogic(2, 7)
  scanLogic(3, 1)
  scanLogic(3, 2)
  scanLogic(3, 3)
  scanLogic(3, 4)
  scanLogic(3, 5)
  scanLogic(3, 6)
  scanLogic(3, 7)
  scanLogic(4, 1)
  scanLogic(4, 2)
  scanLogic(4, 3)
  scanLogic(4, 4)
  scanLogic(4, 5)
  scanLogic(4, 6)
  scanLogic(4, 7)
  scanLogic(5, 1)
  scanLogic(5, 2)
  scanLogic(5, 3)
  scanLogic(5, 4)
  scanLogic(5, 5)
  scanLogic(5, 6)
  scanLogic(5, 7)
  scanLogic(6, 1)
  scanLogic(6, 2)
  scanLogic(6, 3)
  scanLogic(6, 4)
  scanLogic(6, 5)
  scanLogic(6, 6)
  scanLogic(6, 7)
  scanLogic(7, 1)
  scanLogic(7, 2)
  scanLogic(7, 3)
  scanLogic(7, 4)
  scanLogic(7, 5)
  scanLogic(7, 6)
  scanLogic(7, 7)
  scanLogic(8, 1)
  scanLogic(8, 2)
  scanLogic(8, 3)
  scanLogic(8, 4)
  scanLogic(8, 5)
  scanLogic(8, 6)
  scanLogic(8, 7)
  scanLogic(9, 1)
  scanLogic(9, 2)
  scanLogic(9, 3)
  scanLogic(9, 4)
  scanLogic(9, 5)
  scanLogic(9, 6)
  scanLogic(9, 7)
  scanLogic(10, 1)
  scanLogic(10, 2)
  scanLogic(10, 3)
  scanLogic(10, 4)
  scanLogic(10, 5)
  scanLogic(10, 6)
  scanLogic(10, 7)
  scanLogic(11, 1)
  scanLogic(11, 2)
  scanLogic(11, 3)
  scanLogic(11, 4)
  scanLogic(11, 5)
  scanLogic(11, 6)
  scanLogic(11, 7)
  scanLogic(12, 1)
  scanLogic(12, 2)
  scanLogic(12, 3)
  scanLogic(12, 4)
  scanLogic(12, 5)
  scanLogic(12, 6)
  scanLogic(12, 7)
  scanLogic(13, 1)
  scanLogic(13, 2)
  scanLogic(13, 3)
  scanLogic(13, 4)
  scanLogic(13, 5)
  scanLogic(13, 6)
  scanLogic(13, 7)
  scanLogic(14, 1)
  scanLogic(14, 2)
  scanLogic(14, 3)
  scanLogic(14, 4)
  scanLogic(14, 5)
  scanLogic(14, 6)
  scanLogic(14, 7)
  scanLogic(15, 1)
  scanLogic(15, 2)
  scanLogic(15, 3)
  scanLogic(15, 4)
  scanLogic(15, 5)
  scanLogic(15, 6)
  scanLogic(15, 7)
}

function scanLogic(x, y) {
  if (checkForBlue(x, y) && !alreadyScored(x,y)) {
    if (checkForBlue(x-1, y-1) || checkForBlue(x+1, y-1) || checkForBlue(x-2, y) || checkForBlue(x+2, y) || checkForBlue(x-1, y+1) || checkForBlue(x+1, y+1)) {
      blueScore +=1;
      markScoredBlue(x, y);
    }
  }
  if (checkForRed(x, y) && !alreadyScored(x,y)) {
    if (checkForRed(x-1, y-1) || checkForRed(x+1, y-1) || checkForRed(x-2, y) || checkForRed(x+2, y) || checkForRed(x-1, y+1) || checkForRed(x+1, y+1)) {
      redScore +=1;
      markScoredRed(x, y);
    }
  }
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

//This is a recursive algorithm for finding the size/length given a starting hex
var blueLength = 0
var redLength = 0

function checkHexBlue(x, y) {
  if (checkForBlue(x, y) && !alreadyScored(x, y)) {
    console.log("looking at surrounding hexes")
    if (checkForBlue(x-1, y-1) || checkForBlue(x+1, y-1) || checkForBlue(x-2, y) || checkForBlue(x+2, y) || checkForBlue(x-1, y+1) || checkForBlue(x+1, y+1))  {
      markScoredBlue(x, y)
      blueLength += 1
      console.log('blueLength incremented because of ' + '(' + x + ',' + y +')')
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
    console.log("looking at surrounding hexes")
    if (checkForRed(x-1, y-1) || checkForRed(x+1, y-1) || checkForRed(x-2, y) || checkForRed(x+2, y) || checkForRed(x-1, y+1) || checkForRed(x+1, y+1))  {
      markScoredRed(x, y)
      redLength += 1
      console.log('redLength incremented because of ' + '(' + x + ',' + y +')')
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

// function scoringLogicBlue(x, y) {
//   if (alreadyScored(x, y)) {
//     return;
//   }
//   if (checkForBlue(x-1, y-1)) {
//     blueScore += 1;
//     markScoredBlue(x, y);
//     return;
//   }
//   if (checkForBlue(x+1, y-1)) {
//     blueScore += 1;
//     markScoredBlue(x, y);
//     return;
//   }
//   if (checkForBlue(x-2, y)) {
//     blueScore += 1;
//     markScoredBlue(x, y);
//     return;
//   }
//   if (checkForBlue(x+2, y)) {
//     blueScore += 1;
//     markScoredBlue(x, y);
//     return;
//   }
//   if (checkForBlue(x-1, y+1)) {
//     blueScore += 1;
//     markScoredBlue(x, y);
//     return;
//   }
//   if (checkForBlue(x+1, y+1)) {
//     blueScore += 1;
//     markScoredBlue(x, y);
//     return;
//   }
// }

function markScoredRed(x, y) {
  $('.x'+x+'.y'+y).addClass('scored')
//This will mark the hex at position (x, y) as scored
}

function checkForRed(x, y) {
  return $('.x'+x+'.y'+y).hasClass('red-marker')
//This will check the hex at position (x, y) to see if there is a red piece on it
//and it will return true if there is a red piece there and false if there is no red piece there
}

// function scoringLogicRed(x, y) {
//   if (alreadyScored(x, y)) {
//     return;
//   }
//   if (checkForRed(x-1, y-1)) {
//     redScore += 1;
//     markScoredRed(x, y);
//     return;
//   }
//   if (checkForRed(x+1, y-1)) {
//     redScore += 1;
//     markScoredRed(x, y);
//     return;
//   }
//   if (checkForRed(x-2, y)) {
//     redScore += 1;
//     markScoredRed(x, y);
//     return;
//   }
//   if (checkForRed(x+2, y)) {
//     redScore += 1;
//     markScoredRed(x, y);
//     return;
//   }
//   if (checkForRed(x-1, y+1)) {
//     redScore += 1;
//     markScoredRed(x, y);
//     return;
//   }
//   if (checkForRed(x+1, y+1)) {
//     redScore += 1;
//     markScoredRed(x, y);
//     return;
//   }
// }

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
   console.log('music click working')
   $('.music').toggleClass('mute')
   $('.music').toggleClass('unmute')
   if ($('.music').hasClass('mute')) {
     document.getElementById('my_audio').muted = true;
   }
   if ($('.music').hasClass('unmute')) {
     document.getElementById('my_audio').muted = false;
   }
 })
