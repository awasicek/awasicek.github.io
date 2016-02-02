// $('#game-hex-1 *').click(function(){console.log('clicked game-hex-1')})
// $('#game-hex-2 *').click(function(){console.log('clicked game-hex-2')})

var hexagons = $('.hex-container')

hexagons.click(function(){
  var i = hexagons.index($(this))
  console.log('clicked on game hex ' + (i+1))
})

var turn = 0

// This function puts a player piece in a given hex as long as that hex has not already been used and marks that hex with the given color for the game logic's scoring
hexagons.click(function(){
  if ((turn % 2 === 0) && !($(this).hasClass('played'))) {
    $(this).children('.hex-center').append('<img class="blue_game_piece" src="art/blue_sphere_piece.jpg" alt="blue game piece" />');
    turn += 1;
    $(this).addClass('blue-marker')
    // getScoreBlue()
    // updateScoreBlue()
    $(this).toggleClass('played')
  }
  else if ((turn % 2 === 1) && !($(this).hasClass('played'))) {
    $(this).children('.hex-center').append('<img class="red_game_piece" src="art/red_sphere_piece.png" alt="red game piece" />')
    turn += 1;
    $(this).addClass('red-marker')
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

//GAME LOGIC FOR SCORING -- SIMPLIFY THIS TO AN ALGORIHTIM AFTER ALPHA FINISHED


// function checkHex2Blue() {
//   $('#game-hex-2').hasClass('blue-marker')
// }
//
// var checkHex3Blue = $('#game-hex-3').hasClass('blue-marker')
// var checkHex4Blue = $('#game-hex-4').hasClass('blue-marker')
// var checkHex5Blue = $('#game-hex-5').hasClass('blue-marker')
// var checkHex6Blue = $('#game-hex-6').hasClass('blue-marker')
// var checkHex7Blue = $('#game-hex-7').hasClass('blue-marker')
// var checkHex8Blue = $('#game-hex-8').hasClass('blue-marker')
// var checkHex9Blue = $('#game-hex-9').hasClass('blue-marker')
// var checkHex10Blue = $('#game-hex-10').hasClass('blue-marker')
// var checkHex11Blue = $('#game-hex-11').hasClass('blue-marker')
//
// var checkHex2Red = $('#game-hex-2').hasClass('red-marker')
// var checkHex3Red = $('#game-hex-3').hasClass('red-marker')
// var checkHex4Red = $('#game-hex-4').hasClass('red-marker')
// var checkHex5Red = $('#game-hex-5').hasClass('red-marker')
// var checkHex6Red = $('#game-hex-6').hasClass('red-marker')
// var checkHex7Red = $('#game-hex-7').hasClass('red-marker')
// var checkHex8Red = $('#game-hex-8').hasClass('red-marker')
// var checkHex9Red = $('#game-hex-9').hasClass('red-marker')
// var checkHex10Red = $('#game-hex-10').hasClass('red-marker')
// var checkHex11Red = $('#game-hex-11').hasClass('red-marker')

// $('game-hex-2').hasClass('blue-marker') || $('game-hex-6').hasClass('blue-marker') || $('game-hex-7').hasClass('blue-marker')

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
function alreadyScored(x, y) {
  return $(x, y).hasClass('scored')
  // returns true if that hex has already been scored and false if it hasn't been scored
}

function markScoredBlue(x, y) {
  $(x, y).addClass('scored')
//This will mark a hex as already scored
}

function checkForBlue(x, y) {
  if (alreadyScored(x, y)) {
    return;
  }
  if (checkForBlue(x-1, y-1)) {
//Hex one row up and to the left
    scoreBlue(x, y);
    markScoredBlue(x, y);
    return;
  }
  if (checkForBlue(x+1, y-1)) {
//Hex one row up and to the right
    scoreBlue(x, y);
    markScoredBlue(x, y);
    return;
  }
  if (checkForBlue(x-2, y)) {
//Hex on same row and to the left
    scoreBlue(x, y);
    markScoredBlue(x, y);
    return;
  }
  if (checkForBlue(x+2, y)) {
//Hex on same row and to the right
    scoreBlue(x, y);
    markScoredBlue(x, y);
    return;
  }
  if (checkForBlue(x-1, y+1)) {
//Hex one row down and to the left
    scoreBlue(x, y);
    markScoredBlue(x, y);
    return;
  }
  if (checkForBlue(x+1, y+1)) {
//Hex one row down and to the right
    scoreBlue(x, y);
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
//
// function updateScoreRed() {
//   $('#red-score').text('Red Score: ' + redScore)
// }
