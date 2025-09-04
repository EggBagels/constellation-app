import { motion } from "framer-motion";

const ConstellationBackground = () => {
  return (
    <div className="constellation-bg">
      <motion.div
        className="absolute top-20 left-20 w-2 h-2 rounded-full bg-cosmic-purple opacity-60"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-32 w-1 h-1 rounded-full bg-ethereal-blue opacity-50"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-32 left-1/3 w-1.5 h-1.5 rounded-full bg-astral-cyan opacity-40"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full bg-cosmic-purple opacity-30"
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
};

export default ConstellationBackground;