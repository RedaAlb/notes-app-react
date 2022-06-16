import { animated } from 'react-spring';


const Animate = (props) => {
  return (
    <animated.div style={props.animation}>
      {props.children}
    </animated.div>
  )
}

export default Animate;