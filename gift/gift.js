window.onload = function() {
  const useNodeJS = true;   // if you are not using a node server, set this value to false
  const defaultLiffId = "1553436015-xYLMNo5k";   // change the default LIFF value if you are not using a node server

  // DO NOT CHANGE THIS
  let myLiffId = "";

  // if node is used, fetch the environment variable and pass it to the LIFF method
  // otherwise, pass defaultLiffId
  if (useNodeJS) {
      fetch('/gift-id')
          .then(function(reqResponse) {
              return reqResponse.json();
          })
          .then(function(jsonResponse) {
              myLiffId = jsonResponse.id;
              initializeLiffOrDie(myLiffId);
          })
          .catch(function(error) {
              document.getElementById("liffAppContent").classList.add('invisible');
              document.getElementById("nodeLiffIdErrorMessage").classList.remove('invisible');
          });
  } else {
      myLiffId = defaultLiffId;
      initializeLiffOrDie(myLiffId);
  }
};

/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
  if (!myLiffId) {
      document.getElementById("liffAppContent").classList.add('invisible');
   } else {
      initializeLiff(myLiffId);
  }
}

/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
  liff
      .init({
          liffId: myLiffId
      })
      .then(() => {
          // start to use LIFF's api
          initializeApp();
      })
      .catch((err) => {
          document.getElementById("liffAppContent").classList.add('invisible');
          document.getElementById("liffInitErrorMessage").classList.remove('invisible');
      });
}

/**
* Initialize the app by calling functions handling individual app components
*/
function initializeApp() {
  liff.getProfile()
  .then(profile => {
      const lineID = profile.userId
      var firebaseConfig = {
        apiKey: "AIzaSyCHQ4DM7_CqftwNk8hwM6AHTzXoT543n4g",
        authDomain: "match-699cf.firebaseapp.com",
        databaseURL: "https://match-699cf.firebaseio.com",
        projectId: "match-699cf",
        storageBucket: "match-699cf.appspot.com",
        messagingSenderId: "496105033351",
        appId: "1:496105033351:web:ddc576483480e68e10f222",
        measurementId: "G-XX1B260S6W"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
        const dbRef = firebase.database().ref('HPY');
        dbRef.child(lineID).on("value", function(snapshot) {
          var match =snapshot.val().match;
          // document.getElementById('displaynamefield').innerHTML=profile.displayName;
          // document.getElementById('match').innerHTML=match;


        })
        
        // displayLiffData();
      displayIsInClientInfo();
      registerButtonHandlers();
  })
  .catch((err) => {
    console.log('error', err);
    registerButtonHandlers();
  });

  // check if the user is logged in/out, and disable inappropriate button
  if (liff.isLoggedIn()) {
      document.getElementById('liffLoginButton').disabled = true;
  } else {
      document.getElementById('liffLogoutButton').disabled = true;
  }
}



function displayIsInClientInfo() {
  if (liff.isInClient()) {
      liff.getProfile()
      .then(profile => {
          document.getElementById('liffLoginButton').classList.toggle('invisible');
          document.getElementById('liffLogoutButton').classList.toggle('invisible');
          document.getElementById('displaynamefield').innerHTML=profile.displayName;
          document.getElementById("image").src=profile.pictureUrl; 
          console.log('profile');
      })
      .catch((err) => {
        console.log('error', err);
      });
     
      // document.getElementById('isInClientMessage').textContent = 'You are opening the app in the in-app browser of LINE.';
  } else {
      
      // document.getElementById('isInClientMessage').textContent = 'You are opening the app in an external browser.';
  }
}

/**
* Register event handlers for the buttons displayed in the app
*/
function registerButtonHandlers() {

  // login call, only when external browser is used
  document.getElementById('liffLoginButton').addEventListener('click', function() {
      if (!liff.isLoggedIn()) {
          // set `redirectUri` to redirect the user to a URL other than the front page of your LIFF app.
          liff.login();
      }
  });

  // logout call only when external browse
  document.getElementById('liffLogoutButton').addEventListener('click', function() {
      if (liff.isLoggedIn()) {
          liff.logout();
          window.location.reload();
      }
  });
}

/**
* Alert the user if LIFF is opened in an external browser and unavailable buttons are tapped
*/

function sendAlertIfNotInClient() {
  alert('This button is unavailable as LIFF is currently being opened in an external browser.');
}


/**
* Toggle specified element
* @param {string} elementId The ID of the selected element
*/
function toggleElement(elementId) {
  const elem = document.getElementById(elementId);
  if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
      elem.style.display = 'none';
  } else {
      elem.style.display = 'block';
  }
}