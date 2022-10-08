const wheelHandler = (section, goTo) => {
  if (section.current.scrollTop < 700) return goTo(false);
  goTo(true);
};

export default wheelHandler;
