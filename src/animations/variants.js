  // Animation variants for the toggle button
  export const buttonVariants = {
    hover: {
      scale: 1.1,
      rotate: 180,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Animation variants for the icon
 export const iconVariants = {
    initial: {
      rotate: 0,
      opacity: 0,
      scale: 0
    },
    animate: {
      rotate: 360,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      rotate: -360,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };