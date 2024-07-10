let canvas, ctx, w, h;
let units, pointer;
let area = {
	distance: 20,
	padding: 30
}

function init() {
	canvas = document.querySelector("#canvas");
	ctx = canvas.getContext("2d");

	resizeReset();
	animationLoop();
}

function mousemove(e) {
	pointer.x = e.x;
	pointer.y = e.y;
}

function resizeReset() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;

	area.cols = Math.floor((w - area.padding * 2) / area.distance);
	area.rows = Math.floor((h - area.padding * 2) / area.distance);

	pointer = {
		x: area.distance * (area.cols / 2) + area.padding,
		y: area.distance * (area.rows / 2) + area.padding
	}

	units = [];

	for (let i = 0; i < area.rows; i++) {
		for (let j = 0; j < area.cols; j++) {
			units.push(new Unit(j, i));
		}
	}
}

function animationLoop() {
	ctx.clearRect(0, 0, w, h);
	drawScene();
	requestAnimationFrame(animationLoop);
}

function drawScene() {
	units.map((unit) => {
		unit.update();
		unit.draw();
	});
}

class Unit {
	constructor(col, row) {
		this.x = area.distance * (col + 0.5) + area.padding;
		this.y = area.distance * (row + 0.5) + area.padding;
		this.w = 18;
		this.h = 3;
		this.spins = false;
	}
	draw() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.scale(this.scale, this.scale);
		ctx.fillStyle = `rgba(70, 80, 130, ${this.alpha})`;
		ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
		ctx.restore();
	}
	update() {
		if (this.spins === false) {
			this.angle = Math.atan2(pointer.y - this.y, pointer.x - this.x);
			this.distance = Math.sqrt(Math.pow(this.x - pointer.x, 2) + Math.pow(this.y - pointer.y, 2));
			this.alpha = Math.max(0.2, 1 - this.distance / (w * 0.5));
			this.scale = Math.max(0.5, 1 - this.distance / (w * 0.5));
		} else {
			this.angle += 0.3;
		}		
	}
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("click", click);