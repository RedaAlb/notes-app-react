import { motion } from "framer-motion"


const Animate = ({ animation, children }) => {
  return (
    <motion.div variants={animation} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

export default Animate;