window.onload = function() {
    const useNodeJS = true;   // if you are not using a node server, set this value to false
    const defaultLiffId = "1553436015-g2jwRx3G";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("liffAppContent").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
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
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
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
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    // displayLiffData();
    displayIsInClientInfo();
    registerButtonHandlers();

    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
        document.getElementById('liffLoginButton').disabled = true;
    } else {
        document.getElementById('liffLogoutButton').disabled = true;
    }
}

/**
* Display data generated by invoking LIFF methods
*/
// function displayLiffData() {
//     document.getElementById('browserLanguage').textContent = liff.getLanguage();
//     document.getElementById('sdkVersion').textContent = liff.getVersion();
//     document.getElementById('isInClient').textContent = liff.isInClient();
//     document.getElementById('isLoggedIn').textContent = liff.isLoggedIn();
//     document.getElementById('deviceOS').textContent = liff.getOS();
// }

/**
* Toggle the login/logout buttons based on the isInClient status, and display a message accordingly
*/
function displayIsInClientInfo() {
    if (liff.isInClient()) {
        liff.getProfile()
        .then(profile => {
            document.getElementById('liffLoginButton').classList.toggle('hidden');
            document.getElementById('liffLogoutButton').classList.toggle('hidden');
            document.getElementById('displaynamefield').innerHTML=profile.displayName;
            document.getElementById("image").src=profile.pictureUrl; 
          
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
    // openWindow call
    // document.getElementById('openWindowButton').addEventListener('click', function() {
    //     liff.openWindow({
    //         url: 'https://line.me',
    //         external: true
    //     });
    // });

    // closeWindow call
    document.getElementById('closeWindowButton').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.closeWindow();
        }
    });

    // sendMessages call
    // document.getElementById('sendMessageButton').addEventListener('click', function() {
    //     if (!liff.isInClient()) {
    //         sendAlertIfNotInClient();
    //     } else {
    //         liff.sendMessages([{
    //             'type': 'text',
    //             'text': "You've successfully sent a message! Hooray!"
    //         }]).then(function() {
    //             window.alert('Message sent');
    //         }).catch(function(error) {
    //             window.alert('Error sending message: ' + error);
    //         });
    //     }
    // });

    // scanCode call
    // document.getElementById('scanQrCodeButton').addEventListener('click', function() {
    //     if (!liff.isInClient()) {
    //         sendAlertIfNotInClient();
    //     } else {
    //         liff.scanCode().then(result => {
    //             // e.g. result = { value: "Hello LIFF app!" }
    //             const stringifiedResult = JSON.stringify(result);
    //             document.getElementById('scanQrField').textContent = stringifiedResult;
    //             toggleQrCodeReader();
    //         }).catch(err => {
    //             document.getElementById('scanQrField').textContent = "scanCode failed!";
    //         });
    //     }
    // });

    // get access token
    // document.getElementById('getAccessToken').addEventListener('click', function() {
    //     if (!liff.isLoggedIn() && !liff.isInClient()) {
    //         alert('To get an access token, you need to be logged in. Please tap the "login" button below and try again.');
    //     } else {
    //         const accessToken = liff.getAccessToken();
    //         document.getElementById('accessTokenField').textContent = accessToken;
    //         toggleAccessToken();
    //     }
    // });

    // get profile call
    document.getElementById('getProfileButton').addEventListener('click', function() {
        liff.getProfile().then(function(profile) {
            document.getElementById('userIdProfileField').textContent = profile.userId;
            document.getElementById('displayNameField').textContent = profile.displayName;

            const profilePictureDiv = document.getElementById('profilePictureDiv');
            if (profilePictureDiv.firstElementChild) {
                profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
            }
            const img = document.createElement('img');
            img.src = profile.pictureUrl;
            img.alt = 'Profile Picture';
            profilePictureDiv.appendChild(img);

            document.getElementById('statusMessageField').textContent = profile.statusMessage;
            // toggleProfileData();
            console.log(profile.userId)

            pushFirebase(profile);
        }).catch(function(error) {
            window.alert('Error getting profile: ' + error);
        });
    });

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
// function sendAlertIfNotInClient() {
//     alert('This button is unavailable as LIFF is currently being opened in an external browser.');
// }

function pushFirebase(profile){
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
      console.log(profile.userId)
      var lineID =profile.userId;
      var lineName =profile.displayName;
      var Fullname = document.getElementById("getfullName").value;

      const dbRef = firebase.database().ref('HPY');
    dbRef.orderByKey().equalTo(lineID).on("value", function (snapshot) {
        if(snapshot.val()==null){
            const usersRef = dbRef.child(lineID);
            usersRef.set({
                lineName : lineName,
                Fullname : Fullname,
                match : 0,
                gift : 0

              });
        }else{
            console.log("not null");

        }

      })



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