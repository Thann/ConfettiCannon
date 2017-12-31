'use strict';

const TweenLite = require('gsap/TweenLite');
const _ = require('lodash');
require('./Physics2DPlugin');

// utilities
function getLength(x0, y0, x1, y1) {
	// returns the length of a line segment
	const x = x1 - x0;
	const y = y1 - y0;
	return Math.sqrt(x * x + y * y);
}

function getDegAngle(x0, y0, x1, y1) {
	const y = y1 - y0;
	const x = x1 - x0;
	return Math.atan2(y, x) * (180 / Math.PI);
}

class ConfettiCannon {
	constructor(canvas, options) {
		if (canvas.length) canvas = canvas[0];
		if (!canvas) throw "must pass canvas";
		this.canvas = canvas;

		this.options = _.extend({
			debug: false,
			resize: true,
			trigger: this.canvas,
			forceCanvasSize: false,
			// default fire options
			decay: 4,
			spread: 60,
			gravity: 1200,
			color: {
				red: [0, 255],
				blue: [0, 255],
				green: [0, 255],
			},
		}, options);

		// setup canvas
		this.dpr = window.devicePixelRatio || 1;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.scale(this.dpr, this.dpr);

		// add confetti here
		this.confettiSpriteIds = [];
		this.confettiSprites = {};

		// vector line representing the firing angle
		this.drawVector = false;
		this.vector = [{
			x: window.innerWidth,
			y: window.innerHeight * 1.25,
		}, {
			x: window.innerWidth,
			y: window.innerHeight * 2,
		}];

		this.pointer = {};

		// bind methods
		this.render = this.render.bind(this);
		this.handleMousedown = this.handleMousedown.bind(this);
		this.handleMouseup = this.handleMouseup.bind(this);
		this.handleMousemove = this.handleMousemove.bind(this);
		this.handleTouchstart = this.handleTouchstart.bind(this);
		this.handleTouchmove = this.handleTouchmove.bind(this);
		this.setCanvasSize = this.setCanvasSize.bind(this);

		// Use TweenLite tick event for the render loop
		TweenLite.ticker.addEventListener('tick', this.render);

		this.setCanvasSize();
		if (this.options.trigger)
			this.setupListeners(this.options.trigger);
		if (this.options.resize)
			window.addEventListener('resize', this.setCanvasSize);
	}

	setupListeners(target) {
		// bind events
		target.addEventListener('mousedown', this.handleMousedown);
		target.addEventListener('mouseup', this.handleMouseup);
		target.addEventListener('mousemove', this.handleMousemove);
		target.addEventListener('touchstart', this.handleTouchstart);
		target.addEventListener('touchend', this.handleMouseup);
		target.addEventListener('touchmove', this.handleTouchmove);
	}

	setCanvasSize() {
		this.canvas.width = window.innerWidth * this.dpr;
		this.canvas.height = window.innerHeight * this.dpr;
		if (!this.options.forceCanvasSize) {
			this.canvas.style.width = window.innerWidth + 'px';
			this.canvas.style.height = window.innerHeight + 'px';
		}
	}

	handleMousedown(event) {
		clearTimeout(this.timer);
		const x = event.clientX * this.dpr;
		const y = event.clientY * this.dpr;

		this.vector[0] = {
			x,
			y,
		};
		this.drawVector = true;
	}

	handleTouchstart(event) {
		clearTimeout(this.timer);
		event.preventDefault();
		//TODO: why is X DPI-adjustment not necessary for touch??
		const x = event.touches[0].clientX //* this.dpr;
		const y = event.touches[0].clientY * this.dpr;
		this.vector[0] = {
			x,
			y,
		};

		this.drawVector = true;
		//NOTE: mousedown implies mousemove, but not for touch
		this.handleTouchmove(event);
	}

	handleMouseup(event) {
		this.drawVector = false;

		const x0 = this.vector[0].x;
		const y0 = this.vector[0].y;
		const x1 = this.vector[1].x;
		const y1 = this.vector[1].y;

		const length = getLength(x0, y0, x1, y1);
		const angle = getDegAngle(x0, y0, x1, y1) + 180;

		const amount = length / 5 + 5;
		const velocity = length * 10;
		this.addConfettiParticles({
			amount, angle, velocity, x: x0, y: y0, dpr: 1});
	}

	handleMousemove(event) {
		const x = event.clientX * this.dpr;
		const y = event.clientY * this.dpr;
		this.vector[1] = {
			x,
			y,
		};
		this.pointer = this.vector[1];
	}

	handleTouchmove(event) {
		event.preventDefault();
		const x = event.changedTouches[0].clientX //* this.dpr;
		const y = event.changedTouches[0].clientY * this.dpr;
		this.vector[1] = {
			x,
			y,
		};
		this.pointer = this.vector[1];
	}

	drawVectorLine() {
		this.ctx.strokeStyle = 'pink';
		this.ctx.lineWidth = 2 * this.dpr;

		const x0 = this.vector[0].x;
		const y0 = this.vector[0].y;
		const x1 = this.vector[1].x;
		const y1 = this.vector[1].y;

		this.ctx.beginPath();
		this.ctx.moveTo(x0, y0);
		this.ctx.lineTo(x1, y1);
		this.ctx.stroke();
	}

	// color should be {red: [0,255], green: [0,255], blue: [0,255]} or a fn that returns one
	addConfettiParticles(options) {
		options = _.extend({
			angle: 270,
			amount: 100,
			velocity: 2000,
			dpr: this.dpr,
			x: this.canvas.width / this.dpr /2,
			y: this.canvas.height/ this.dpr /2,
			color: this.options.color,
			decay: this.options.decay,
			spread: this.options.spread,
			gravity: this.options.gravity,
		}, options);

		options.x *= options.dpr;
		options.y *= options.dpr;

		let i = 0;
		while (i < options.amount) {
			// sprite
			const r = _.random(4, 6) * this.dpr;
			const d = _.random(15, 25) * this.dpr;

			if (this.options.debug) console.log("Adding Particle:", i, options);
			let color = _.isFunction(options.color)? options.color.apply() : options.color;
			const cr = _.isArray(color.red)? _.random(...color.red) : color.red;
			const cb = _.isArray(color.blue)? _.random(...color.blue) : color.blue;
			const cg = _.isArray(color.green)? _.random(...color.green) : color.green;
			color = `rgb(${cr}, ${cg}, ${cb})`;

			const tilt = _.random(10, -10);
			const tiltAngleIncremental = _.random(0.07, 0.05);
			const tiltAngle = 0;

			const id = _.uniqueId();
			const sprite = {
				[id]: {
					r,
					d,
					tilt,
					color,
					tiltAngle,
					tiltAngleIncremental,
					x: options.x,
					y: options.y,
					angle: options.angle,
					velocity: options.velocity,
				},
			};

			Object.assign(this.confettiSprites, sprite);
			this.confettiSpriteIds.push(id);
			this.tweenConfettiParticle(id, options);
			i++;
		}
	}

	fire() {
		return this.addConfettiParticles.apply(this, arguments);
	}

	tweenConfettiParticle(id, options) {
		const minAngle = this.confettiSprites[id].angle - options.spread / 2;
		const maxAngle = this.confettiSprites[id].angle + options.spread / 2;

		const minVelocity = this.confettiSprites[id].velocity / 4;
		const maxVelocity = this.confettiSprites[id].velocity;

		// Physics Props
		const velocity = _.random(minVelocity, maxVelocity);
		const angle = _.random(minAngle, maxAngle);
		const gravity = options.gravity;
		const friction = (options.friction || _.random(0.1, 0.25)) / this.dpr;
		const d = 0;

		TweenLite.to(this.confettiSprites[id], options.decay, {
			physics2D: {
				velocity,
				angle,
				gravity,
				friction,
			},
			d,
			ease: TweenLite.Power4.easeIn,
			onComplete: () => {
				// remove confetti sprite and id
				_.pull(this.confettiSpriteIds, id);
				delete this.confettiSprites[id];
			},
		});
	}

	updateConfettiParticle(id) {
		const sprite = this.confettiSprites[id];

		const tiltAngle = 0.0005 * sprite.d;

		sprite.angle += 0.01;
		sprite.tiltAngle += tiltAngle;
		sprite.tiltAngle += sprite.tiltAngleIncremental;
		sprite.tilt = (Math.sin(sprite.tiltAngle - (sprite.r / 2))) * sprite.r * 2;
		sprite.y += Math.sin(sprite.angle + sprite.r / 2) * 2;
		sprite.x += Math.cos(sprite.angle) / 2;
	}

	drawConfetti() {
		this.confettiSpriteIds.map(id => {
			const sprite = this.confettiSprites[id];

			this.ctx.beginPath();
			this.ctx.lineWidth = sprite.d / 2;
			this.ctx.strokeStyle = sprite.color;
			this.ctx.moveTo(sprite.x + sprite.tilt + sprite.r, sprite.y);
			this.ctx.lineTo(sprite.x + sprite.tilt, sprite.y + sprite.tilt + sprite.r);
			this.ctx.stroke();

			this.updateConfettiParticle(id);
		});
	}

	drawPointer() {
		const centerX = this.pointer.x;
		const centerY = this.pointer.y;
		const radius = 15 * this.dpr;

		this.ctx.beginPath();
		this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = 'transparent';
		this.ctx.fill();
		this.ctx.lineWidth = 2 * this.dpr;
		this.ctx.strokeStyle = '#ffffff';
		this.ctx.stroke();
	}

	drawPower() {
		const x0 = this.vector[0].x;
		const y0 = this.vector[0].y;
		const x1 = this.vector[1].x;
		const y1 = this.vector[1].y;

		const length = getLength(x0, y0, x1, y1);
		const centerX = x0;
		const centerY = y0;
		const radius = 1 * this.dpr * length / 20;

		this.ctx.beginPath();
		this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = 'transparent';
		this.ctx.fill();
		this.ctx.lineWidth = 2 * this.dpr;
		this.ctx.strokeStyle = '#333333';
		this.ctx.stroke();
	}

	render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// only draw the vector when the drawVector flag is on
		this.drawVector && this.drawVectorLine();
		this.drawVector && this.drawPower();

		this.drawPointer();
		this.drawConfetti();
	}
}

module.exports = ConfettiCannon;
