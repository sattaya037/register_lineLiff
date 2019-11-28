window.onload = function() {
    const useNodeJS = true;   // if you are not using a node server, set this value to false
    const defaultLiffId = "1553436015-04nm9w1G";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/vote-id')
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
        document.getElementById("liffIdErrorMessage").classList.remove('invisible');
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
            apiKey: "AIzaSyAH1pTXZy4XxpS0DfRVLwC93aZhWRnYiPQ",
            authDomain: "ics-vote.firebaseapp.com",
            databaseURL: "https://ics-vote.firebaseio.com",
            projectId: "ics-vote",
            storageBucket: "ics-vote.appspot.com",
            messagingSenderId: "88696350608",
            appId: "1:88696350608:web:780899d63f1cebc33cb515",
            measurementId: "G-PLXJ6VBZ8D"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          firebase.analytics();
        //   var fireHeading =  document.getElementById("fireHeading");
          const dbRef = firebase.database().ref('HPY');
          
          // displayLiffData();
        displayIsInClientInfo();
        registerButtonHandlers();
        PromiseHandlers(dbRef,lineID);
        firebaseHandlers(dbRef,lineID);
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


function PromiseHandlers(dbRef,lineID) {
    var promise1 = new Promise(function(resolve, reject) { 
        dbRef.on("child_added", function(snapshot) {
            var voteValue = snapshot.key;
            var key = dbRef.child(voteValue).child("result");
            key.orderByKey().equalTo("test").once("value", snapshot => { 
                // console.log(snapshot.exists())
                if (snapshot.exists()) {
                    snapshot.forEach(childSnapshot => {
                        var truth = childSnapshot.exists();
                        resolve(truth)
                    })
                }else{
                  
                    resolve(false)

                }
            
          }) 
        });        
      });

      promise1.then(function(value) {
        // console.log(value);
      });


}
function firebaseHandlers(dbRef,lineID) {
          dbRef.on("child_added", function(snapshot) {
          var voteValue = snapshot.key;
          var content = '';
          var button ='<button id="'+snapshot.key+'" onClick="AlertFn(this.id)" type="button" class="btn btn-primary">Vote</button>';
          content +='<div class="card">';
          content +='<img class="card-img-top"'; 
          content +=  'src='+snapshot.val().image +'alt="Card image cap"  >';
          content +='<div class="card-body">';
          content +='<h5 class="card-title">';
          content +=snapshot.key;
          content +='</h5>';
          content +='<p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>';
          content +='</div>';
          content +='<div class="card-footer">';
          content +=button;
          content +='</div>';
          content +='</div>';
          var key = dbRef.child(voteValue).child("result");
          var promise1 = new Promise(function(resolve, reject) { 
            var check =[];
            key.orderByKey().equalTo("test").once("value",  snapshot => {
                  var truth = snapshot.exists();
                  console.log(truth)
                  console.log(snapshot)
                  resolve(truth)
              // })
             })
            });

            promise1.then(function(value) {
                check.push(value);
                console.log(check);
           
                // var theDiv = document.getElementById("ex-table");
                // theDiv.innerHTML += content;  

              });
       
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
}

function AlertFn(clicked_id){
    console.log(clicked_id)
        liff.getProfile().then(function(profile) {
            var lineID =profile.userId;
            var lineName =profile.displayName;
            const dbRef = firebase.database().ref('HPY');
            dbRef.orderByKey().equalTo(clicked_id).once("value", function (snapshot) {
                console.log(snapshot.val());
                const usersRef = dbRef.child(clicked_id).child("result").child(lineID);
                usersRef.set({
                    lineName : lineName
                  });
      
            })

        }).catch(function(error) {
            window.alert('Error getting profile: ' + error);
        });
   
    
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
* Toggle access token data field
*/
// function toggleAccessToken() {
//     toggleElement('accessTokenData');
// }

/**
* Toggle profile info field
*/
function toggleProfileData() {
    toggleElement('profileInfo');
}

/**
* Toggle scanCode result field
*/
// function toggleQrCodeReader() {
//     toggleElement('scanQr');
// }

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