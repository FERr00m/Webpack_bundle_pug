const jq = () => {
  console.log('JQuery is working! ', $('nav'));
  myFunctions.importScript(
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js'
  );
  console.log(myFunctions.classof({}));
};

export default jq;
