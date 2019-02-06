// animations JS file
import Token from '../token';

class Animations {
  constructor(props){
    this.token = props.token
  }

  render(){
    this.token.render()
  }
}

export default Animations;