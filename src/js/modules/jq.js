const jq = () => {
  $(function () {
    $('.sidenav').sidenav();
    $('.parallax').parallax();
  });
  console.log(myFunctions.classof({}));

  const lazyLoadInstance = new LazyLoad();
};

export default jq;
