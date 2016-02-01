
$('#game-hex-1 *').click(function(){console.log('clicked game-hex-1')})
$('#game-hex-2 *').click(function(){console.log('clicked game-hex-2')})


for (i=1; i<45; i+=1) {
  $('#game-hex-' + i + ' *').click(function(){console.log('clicked game-hex-' + i)})
}
