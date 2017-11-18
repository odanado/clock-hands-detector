import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.squareSize = 150;
    this.startVideo = this.startVideo.bind(this);
    this.drawSquare = this.drawSquare.bind(this);
    this.calcSquare = this.calcSquare.bind(this);
    this.cutImage = this.cutImage.bind(this);
  }

  calcSquare(parentWidth, parentHeight, size) {
    let width = size;
    let height = size * parentHeight / parentWidth;
    let x = (parentWidth - width) / 2;
    let y = (parentHeight - height) / 2;

    return [x, y, width, height];
  }

  drawSquare(strokeSize) {
    let videoWidth = this.refs.localVideo.videoWidth;
    let videoHeight = this.refs.localVideo.videoHeight;

    let square = this.refs.square;
    let ctx = square.getContext('2d');
    square.width = videoWidth;
    square.height = videoHeight;
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.lineWidth = strokeSize;

    let [x, y, width, height] = this.calcSquare(videoWidth, videoHeight, this.squareSize);

    ctx.rect(x, y, width, height);
    ctx.stroke();
  }

  startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.refs.localVideo.src = window.URL.createObjectURL(stream);
        setTimeout(() => this.drawSquare(5), 1000);
      }).catch(function (error) {
        console.error('mediaDevice.getUserMedia() error:', error);
        alert(error);
        return;
      });
  }
  cutImage() {
    let videoWidth = this.refs.localVideo.videoWidth;
    let videoHeight = this.refs.localVideo.videoHeight;
    let [srcX, srcY, srcWidth, srcHeight] = this.calcSquare(videoWidth, videoHeight, this.squareSize);

    let canvas = this.refs.canvas;
    let context = this.refs.canvas.getContext('2d');
    canvas.width = this.squareSize;
    canvas.height = this.squareSize;
    context.drawImage(this.refs.localVideo, srcX, srcY, srcWidth, srcHeight, 0, 0, this.squareSize, this.squareSize);
  }
  render() {
    return (
      <div className="App">
        <div style={{ margin: "15px auto", top: "100px" }}>
          <canvas id="square" ref="square" style={{ position: "absolute", width: "480px", height: "480px" }}></canvas>
          <video id="localVideo" ref="localVideo" autoPlay style={{ width: "480px", height: "480px", solid: "black" }}></video>
        </div>

        <button onClick={this.startVideo}>Start</button>
        <button onClick={this.cutImage}>Cut</button>
        <canvas ref="canvas" style={{ width: "120px", height: "120px" }}></canvas>
      </div>
    );
  }
}

export default App;
