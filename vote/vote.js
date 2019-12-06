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
          const dbRef = firebase.database().ref('HPY');
      
          
          // displayLiffData();
        displayIsInClientInfo();
        registerButtonHandlers();
        PromiseHandlers(dbRef,lineID);
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
        dbRef.child("Voters").orderByKey().equalTo(lineID).once("value", function(snapshot) {
            var check = snapshot.exists();
            console.log(check)
             firebaseHandlers(dbRef,check);
          })        
  }
  
  function firebaseHandlers(dbRef,check) {
    console.log(check);
          dbRef.child("choice").on("child_added", function(snapshot) {
            var content = ''; 
            var button ='';
            var count = snapshot.child("result").numChildren();
            if(check == true){
                button ='<button id="voted" onClick="Vote(this.id)" type="button"  class="list-group-item list-group-item-dark"><div class="float-left"><h5>'+snapshot.key+'</h5></div><div class="float-right"><span class="badge badge-light">'+count+'</span></div> </button>';

            }else{
                button ='<button id="'+snapshot.key+'" onClick="Vote(this.id)" type="button" data-toggle="modal" data-target="#voteModel" class="list-group-item list-group-item-action"><div class="float-left"><h5>'+snapshot.key+'</h5></div><div class="float-right"><span class="badge badge-primary">'+count+'</span></div> </button>';

            }         
            content+=button;
            // content +='<li class="list-group-item">'+snapshot.key;
            // content +='<div class="float-right">'+button+'</div>';
            // content +='</li>'; 
            // content +='<div class="card">';
            // // content +='<img class="card-img-top"'; 
            // // content +=  'src='+snapshot.val().image +'alt="Card image cap">';
            // content +='<div class="card-body">';
            // content +='<h5 class="card-title">';
            // content +=snapshot.key;
            // content +='</h5>';
            // content +='</div>';
            // content +='<div class="card-footer">';
            // content +=button;
            // content +='</div>';
            // content +='</div>';
          var theDiv = document.getElementById("ex-table");
          theDiv.innerHTML += content;  
    
       
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
  }
  
  function Vote(clicked_id){
  
    if(clicked_id =="voted" ){
  
        alert('Voted.');
  
    }else{
        document.getElementById("voteName").innerHTML = clicked_id;
        document.getElementById("confirmVote").value = clicked_id;
  
    }
  }
  
  function confirm(){
    var name_element = document.getElementById('confirmVote');
    var voteId = name_element.value;
    liff.getProfile().then(function(profile) {
        var lineID =profile.userId;
        var dbRef = firebase.database().ref('HPY');
        dbRef.child("choice").orderByKey().equalTo(voteId).once("value", function (snapshot) {
            console.log(snapshot.val());
           dbRef.child("choice").child(voteId).child("result").child(lineID).set(voteId);
           dbRef.child("Voters").child(lineID).set(voteId);
           liff.closeWindow();
  
  
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
  function addOption(){
   var option = document.getElementById("Option1").value;
   if(option){
       console.log(option)
    var dbRef = firebase.database().ref('HPY');
    dbRef.child("choice").child(option).set(option);
    alert(option+" added")

   }else{
    alert("Please specify Option.")
   }
  

  }

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