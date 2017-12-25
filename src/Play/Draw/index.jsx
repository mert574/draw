import React, { Component } from 'react';
import {createSensor} from 'snex';
import {createDrawer} from 'lib/draw.js';

import surface from './draw.svg';

import './Draw.css';

class Draw extends Component {
  componentDidMount() {
    this.draw = createDrawer(this.canvas.getContext('2d'));

    this.surface.addEventListener('load', () => {

      this.sensor = createSensor(this.surface);

      this.sensor.listen(data => {
        this.draw(data.state);

        console.log("Sending", data);
        this.props.conn.send({
          type: 'draw',
          draw: data,
        });
      });
    });
  }

  componentWillUnmount() {
      this.sensor.destroy();
  }

  render() {
    const {word} = this.props;

    return (
      <div className="Draw">
        <div className="surface">
          <object
            className="drawInterface"
            data={surface}
            type="image/svg+xml"
            ref={node => this.surface = node}>
          </object>

          <canvas width="800" height="450" ref={node => this.canvas = node}/>

          <div className="subject">
            Draw the word: {word}
          </div>
        </div>
      </div>
    );
  }
}

export default Draw;
