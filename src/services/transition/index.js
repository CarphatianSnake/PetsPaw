const transitions = (duration, type) => {

  const defaultStyle = {
    transition: `opacity ${duration}ms ${type}`,
    opacity: 0,
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };

  return {duration, defaultStyle, transitionStyles}
}

export default transitions