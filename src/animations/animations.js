// animations JS file
import Token from '../token';
import Squash from './squash';

class Animations {
  constructor(props){
    this.token = props.token
    this.squash = new Squash({token: this.token});
  }

  render(){
    this.token.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.squash.render()
  }
}

export default Animations;