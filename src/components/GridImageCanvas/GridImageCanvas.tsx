'use client';

// trying out object oriented approach without library
// from tutorial: https://www.youtube.com/watch?v=UeZ1pTg_nMo&list=PLnI9y4ynerRW49UuLx5Mw0fr6ETwSrfi0&index=29

import React, { useEffect, useRef } from 'react';
import img from '../../app/assets/img/alireza-dolati-OVS3rqXq9gg-unsplash.png';
import Image from 'next/image';

class Cell {
  effect: Effect;
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  slideX: number;
  slideY: number;
  vx: number;
  vy: number;
  ease: number;
  friction: number;
  positionX: number;
  positionY: number;
  speedX: number;
  speedY: number;
  constructor(effect: Effect, x: number, y: number) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.positionX = 0;
    this.positionY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.width = this.effect.width;
    this.height = this.effect.height;
    this.image = document.getElementById('canvasIMG') as HTMLImageElement;
    this.slideX = 0;
    this.slideY = 0;
    this.vx = 0;
    this.vy = 0;
    // ease: how fast the push force decays
    this.ease = 0.01;
    // friction: the push force
    this.friction = 0.8;
  }
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.x + this.slideX,
      this.y + this.slideY,
      this.width,
      this.height,
      this.x,
      this.y,
      //   this.positionX,
      //   this.positionY,
      this.width,
      this.height
    );
    // context.strokeRect(this.x, this.y, this.width, this.height);
  }
  update() {
    // cell position
    // console.log(this.positionX);

    // this.speedX = (this.x - this.positionX) / 10;
    // this.speedX = (this.y - this.positionY) / 10;
    // this.positionX += this.speedX;
    // this.positionY += this.speedY;
    // crop/resize Effect
    if (this.effect.mouse.x && this.effect.mouse.y) {
      const dx = this.effect.mouse.x - this.x;
      const dy = this.effect.mouse.y - this.y;
      const distance = Math.hypot(dx, dy);

      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = distance / this.effect.mouse.radius;
        this.vx = force * Math.cos(angle);
        this.vy = force * Math.sin(angle);
      }
      //    else {
      //     this.vx = 0;
      //     this.vy = 0;
      //   }
      this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
      this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
    }

    // console.log(this.slideX);
  }
}

class Effect {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  cellWidth: number;
  cellHeight: number;

  imageGrid: Cell[];
  mouse: {
    x: number | undefined;
    y: number | undefined;
    radius: number;
  };
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 32;
    this.cellHeight = this.height / 48;
    this.imageGrid = [];
    this.createGrid();
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 100,
    };
  }

  createGrid() {
    for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
        this.imageGrid.push(new Cell(this, x, y));
      }
    }
    // console.log(this.imageGrid);
  }
  render(context: CanvasRenderingContext2D) {
    this.imageGrid.forEach((cell) => {
      cell.update();
      cell.draw(context);
    });
  }
}

const GridImageCanvas = () => {
  const ref = useRef<HTMLImageElement>();
  useEffect(() => {
    const canvas: HTMLCanvasElement = document.getElementById(
      'canvas1'
    ) as HTMLCanvasElement;

    const ctx = canvas.getContext('2d');

    // console.log('canvas.clientWidth', canvas.clientWidth);
    // console.log('canvas.clientWidth', canvas.clientHeight);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // canvas.width = 500;
    // canvas.height = 500;
    const effect = new Effect(canvas);
    effect.canvas.addEventListener('mousemove', (e) => {
      effect.mouse.x = e.offsetX;
      effect.mouse.y = e.offsetY;
    });
    function animate() {
      if (ctx) {
        effect.render(ctx);

        requestAnimationFrame(animate);
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    const anim = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(anim);
    };
  });

  return (
    <div className='border relative w-auto inline-block'>
      <Image id='canvasIMG' src={img} alt='' className='invisible' />

      <canvas id='canvas1' className='h-full w-full border absolute top-0' />
    </div>
  );
};

export default GridImageCanvas;
