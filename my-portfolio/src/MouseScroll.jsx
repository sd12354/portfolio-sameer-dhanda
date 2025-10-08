import { motion } from "framer-motion";
import "./MouseScroll.css";

export default function MouseScroll() {
  return (
    <div className="mouse-scroll-container">
      <div className="mouse">
        <motion.div
          className="wheel"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}