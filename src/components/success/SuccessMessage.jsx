import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const SuccessMessage = ({ message, show }) => {
  const [showMessage, setShowMessage] = useState(show);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

const variants = {
  visible: { scale: 1, opacity: 1 },
  hidden: { scale: 0.5, opacity: 0, transition: { duration: 0.3, type: "spring", bounce: 0.25 } },
};

  return (
    <div>
      {showMessage && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="success-message"
        >
      
          <Image
            className="success-image"
            src="https://th.bing.com/th/id/R.bae8cc04f9529d2680ea51ab1a3de65e?rik=x%2boNY4waHUZACA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fsuccess-transparent%2fsuccess-transparent-3.png&ehk=iFAwGY7pWBMJ3CoZuQogn5J1LZCSGXckYQF7fjZMGZo%3d&risl=&pid=ImgRaw&r=0"
            alt="Success"
            width={50}
            height={50}
          />
          <div className="success-text">{message}</div>
        </motion.div>
      )}
    </div>
  );
};

export default SuccessMessage;
