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
    $(this).toggleClass('played')
    $(this).addClass('blue-marker')
  }
  else if ((turn % 2 === 1) && !($(this).hasClass('played'))) {
    $(this).children('.hex-center').append('<img class="red_game_piece" src="art/red_sphere_piece.png" alt="red game piece" />')
    turn += 1;
    $(this).toggleClass('played')
    $(this).addClass('red-marker')
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
