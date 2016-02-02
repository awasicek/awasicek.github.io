// $('#game-hex-1 *').click(function(){console.log('clicked game-hex-1')})
// $('#game-hex-2 *').click(function(){console.log('clicked game-hex-2')})

var hexagons = $('.hex-container')

hexagons.click(function(){
  var i = hexagons.index($(this))
  console.log('This is game hex ' + (i+1) + '.')
})

var turn = 0

// This function puts a player piece in a given hex as long as that hex has not already been used and marks that hex with the given color for the game logic's scoring
hexagons.click(function(){
  if ((turn % 2 === 0) && !($(this).hasClass('played'))) {
    $(this).children('.hex-center').append('<img class="blue_game_piece" src="art/blue_sphere_piece.jpg" alt="blue game piece" />');
    turn += 1;
    $(this).addClass('blue-marker')
    console.log('The x coordinate is ' + getXCoord(this) + ' and the y coordinate is ' + getYCoord(this) + '.')
    // scoringLogicBlue(getXCoord(this), getYCoord(this))
    // getScoreBlue()
    // updateScoreBlue()
    $(this).toggleClass('played')
  }
  else if ((turn % 2 === 1) && !($(this).hasClass('played'))) {
    $(this).children('.hex-center').append('<img class="red_game_piece" src="art/red_sphere_piece.png" alt="red game piece" />')
    turn += 1;
    $(this).addClass('red-marker')
    console.log('The x coordinate is ' + getXCoord(this) + ' and the y coordinate is ' + getYCoord(this) + '.')
    // getScoreRed()
    // updateScoreRed()
    $(this).toggleClass('played')
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

function scoringLogicBlue(x, y) {
  if (alreadyScored(x, y)) {
    return;
  }
  if (checkForBlue(x-1, y-1)) {
    blueScore += 1;
    markScoredBlue(x, y);
    return;
  }
  if (checkForBlue(x+1, y-1)) {
    blueScore += 1;
    markScoredBlue(x, y);
    return;
  }
  if (checkForBlue(x-2, y)) {
    blueScore += 1;
    markScoredBlue(x, y);
    return;
  }
  if (checkForBlue(x+2, y)) {
    blueScore += 1;
    markScoredBlue(x, y);
    return;
  }
  if (checkForBlue(x-1, y+1)) {
    blueScore += 1;
    markScoredBlue(x, y);
    return;
  }
  if (checkForBlue(x+1, y+1)) {
    blueScore += 1;
    markScoredBlue(x, y);
    return;
  }



// function getScoreBlue() {
//   if (($('#game-hex-1').hasClass('blue-marker')) && !($('#game-hex-1').hasClass('scored'))) {
//     blueScore += 1
//     $('#game-hex-1').addClass('scored')
//   }
//   if (($('#game-hex-2').hasClass('blue-marker')) && !($('#game-hex-2').hasClass('scored'))) {
//     blueScore += 1
//     $('#game-hex-2').addClass('scored')
//   }
//   if (($('#game-hex-3').hasClass('blue-marker')) && !($('#game-hex-3').hasClass('scored'))) {
//     blueScore += 1
//     $('#game-hex-3').addClass('scored')
//   }
//   if (($('#game-hex-4').hasClass('blue-marker')) && !($('#game-hex-4').hasClass('scored'))) {
//     blueScore += 1
//     $('#game-hex-4').addClass('scored')
//   }
//   if (($('#game-hex-5').hasClass('blue-marker')) && !($('#game-hex-5').hasClass('scored'))) {
//     blueScore += 1
//     $('#game-hex-5').addClass('scored')
//   }
//   if (($('#game-hex-6').hasClass('blue-marker')) && !($('#game-hex-6').hasClass('scored'))) {
//     blueScore += 1
//     $('#game-hex-6').addClass('scored')
//   }
//   if (($('#game-hex-7').hasClass('blue-marker')) && !($('#game-hex-7').hasClass('scored'))) {
//     blueScore += 1
//     $('#game-hex-7').addClass('scored')
//   }
//   if (($('#game-hex-8').hasClass('blue-marker')) && !($('#game-hex-8').hasClass('scored'))) {
//     blueScore += 1
//     $('#game-hex-8').addClass('scored')
//   }
//   if (($('#game-hex-9').hasClass('blue-marker')) && !($('#game-hex-9').hasClass('scored'))) {
//     blueScore += 1
//     $('#game-hex-9').addClass('scored')
//   }
//   if (($('#game-hex-10').hasClass('blue-marker')) && !($('#game-hex-10').hasClass('scored'))) {
//     blueScore += 1
//     $('#game-hex-10').addClass('scored')
//   }
//   if (($('#game-hex-11').hasClass('blue-marker')) && !($('#game-hex-11').hasClass('scored'))) {
//     blueScore += 1
//     $('#game-hex-11').addClass('scored')
//   }
// }
//
// function getScoreRed() {
//   if (($('#game-hex-1').hasClass('red-marker')) && !($('#game-hex-1').hasClass('scored'))) {
//     redScore += 1
//     $('#game-hex-1').addClass('scored')
//   }
//   if (($('#game-hex-2').hasClass('red-marker')) && !($('#game-hex-2').hasClass('scored'))) {
//     redScore += 1
//     $('#game-hex-2').addClass('scored')
//   }
//   if (($('#game-hex-3').hasClass('red-marker')) && !($('#game-hex-3').hasClass('scored'))) {
//     redScore += 1
//     $('#game-hex-3').addClass('scored')
//   }
//   if (($('#game-hex-4').hasClass('red-marker')) && !($('#game-hex-4').hasClass('scored'))) {
//     redScore += 1
//     $('#game-hex-4').addClass('scored')
//   }
//   if (($('#game-hex-5').hasClass('red-marker')) && !($('#game-hex-5').hasClass('scored'))) {
//     redScore += 1
//     $('#game-hex-5').addClass('scored')
//   }
//   if (($('#game-hex-6').hasClass('red-marker')) && !($('#game-hex-6').hasClass('scored'))) {
//     redScore += 1
//     $('#game-hex-6').addClass('scored')
//   }
//   if (($('#game-hex-7').hasClass('red-marker')) && !($('#game-hex-7').hasClass('scored'))) {
//     redScore += 1
//     $('#game-hex-7').addClass('scored')
//   }
//   if (($('#game-hex-8').hasClass('red-marker')) && !($('#game-hex-8').hasClass('scored'))) {
//     redScore += 1
//     $('#game-hex-8').addClass('scored')
//   }
//   if (($('#game-hex-9').hasClass('red-marker')) && !($('#game-hex-9').hasClass('scored'))) {
//     redScore += 1
//     $('#game-hex-9').addClass('scored')
//   }
//   if (($('#game-hex-10').hasClass('red-marker')) && !($('#game-hex-10').hasClass('scored'))) {
//     redScore += 1
//     $('#game-hex-10').addClass('scored')
//   }
//   if (($('#game-hex-11').hasClass('red-marker')) && !($('#game-hex-11').hasClass('scored'))) {
//     redScore += 1
//     $('#game-hex-11').addClass('scored')
//   }
// }

// function updateScoreBlue() {
//   $('#blue-score').text('Blue Score: ' + blueScore)
// }

// function updateScoreRed() {
//   $('#red-score').text('Red Score: ' + redScore)
// }
