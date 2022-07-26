const other = () => {
  console.log('I am Other module');
  gsap.to(".title", {duration: 3, rotation: 360});
  gsap.to("button", {duration: 4.3, rotation: 360});
};

export default other;
