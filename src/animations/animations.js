// animations JS file
import Token from '../token';
// import suqash from './squash';

class Animations {
  constructor(props){
    this.token = props.token
  }

  render(){
    setInterval(this.token.squash, 50);
  }
}

export default Animations;