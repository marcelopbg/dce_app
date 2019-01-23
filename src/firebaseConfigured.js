var firebase = require('firebase')
let config = {
    apiKey: "AIzaSyB2mdCoLRLcm1xdELhlTpXqKKzie1mp3tQ",
    authDomain: "akytemcms.firebaseapp.com",
    databaseURL: "https://akytemcms.firebaseio.com",
    projectId: "akytemcms",
    storageBucket: "akytemcms.appspot.com",
    messagingSenderId: "442843252051"
  };
  const db = firebase.initializeApp(config);

  export default db