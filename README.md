# ConfettiCannon
Confetti Cannon stolen from https://codepen.io/jscottsmith/pen/VjPaLO

Requires [Physics2DPlugin](https://greensock.com/physics2d-as),
a Club GreenSock membership benefit; You must have a valid membership to use

## Usage
`const confetti = ConfettiCannon($('canvas'), {options...})`

`confetti.fire({amount, angle, velocity, x, y, color, options...})`

`$(window).resize(function() { confetti.setCanvasSize(); })`
