// animations JS file
import Token from '../token';
import Squash from './squash';

class Animations {
  constructor(props){
    this.token = props.token
    this.squash = new Squash({token: this.token});
  }

  render(){
    // setInterval(this.token.squash, 1000);
    this.squash.render()
  }
}

export default Animations;