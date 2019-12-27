window.onload = function() {
    const useNodeJS = true;   // if you are not using a node server, set this value to false
    const defaultLiffId = "1553436015-04nm9w1G";   // change the default LIFF value if you are not using a node server
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
    registerButtonHandlers();
    var profileProm = new Promise(function(resolve, reject) {
            liff.getProfile().then(profile => { 
            resolve(profile)
        }).catch((err) => {
            console.log('error', err);
        });
    });

    profileProm.then(function(value) {
        vote(value);
        view();
      });

    // liff.getProfile()
    // .then(profile => {
    //     const lineID = profile.userId;
    //       console.log(lineID)
          
    //       // displayLiffData();
    //     vote();
    //     registerButtonHandlers();
    // })
    // .catch((err) => {
    //   console.log('error', err);
    //   registerButtonHandlers();
    // });
  
    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
        document.getElementById('liffLoginButton').disabled = true;
    } else {
        document.getElementById('liffLogoutButton').disabled = true;
    }
  }

  
function vote(value){
    console.log(value.userId)
    var uid=value.userId;
    const dbRef = firebase.database().ref('HPY')
    dbRef.child("choice").on("child_added", function(snapshot) {
        var snapKey =snapshot.key;
        var content = '';
        content +='<div class="one_fourth">';
        content +='<div class="button-container">';
        content +='<a id="'+snapshot.key+'" onclick="onSubmit(\'' + snapKey + '\')" value="'+uid+'"  >'+snapshot.key+'</a>';
        content +='<img src="'+snapshot.val().image+'">';
        content +='</div>';
        content +='</div>   ';

        content +='<button id="'+snapshot.key+'" onclick="onSubmit(\'' + snapKey + '\')" class="w3-button w3-black" value="'+uid+'" >'+snapshot.key+'</button>';
        var theDiv = document.getElementById("btn");
        theDiv.innerHTML += content; 

               
       
    })

}


function view(){
    const voteRef = firebase.database().ref('HPY/voters')
    voteRef.orderByChild('vote').on("value", function(snapshot) {
        console.log(snapshot.val())
        var arrObj =[];
        snapshot.forEach(function(childsnapshot){
            console.log(childsnapshot.val().vote)
            arrObj.push(childsnapshot.val().vote)
        })
        render(arrObj);
    })
}

function render(arrObj){
    console.log(arrObj)
    sortedArr = [],
    count = 1;
    sortedArr = arrObj.sort();
    var data1=[];
    var data2=[];

    for (var i = 0; i < sortedArr.length; i = i + count) {
        count = 1;
        for (var j = i + 1; j < sortedArr.length; j++) {
        if (sortedArr[i] === sortedArr[j])
            count++;
        }
            data1.push(sortedArr[i])
            data2.push(count)
    }
    console.log(data1 + " = " + data2 )
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: {
            labels: data1,
            datasets: [{
                label: data1,
                backgroundColor: ["#3498DB", "#1ABC9C", "#F1C40F", "#E74C3C", "#EB984E"],
                data:data2
            }]
        },

        // Configuration options go here
        options: {}
    });



    // var obj = {};
    // arrObj.forEach(function(item) {
    // if (typeof obj[item] == 'number') {
    //     obj[item]++;

    // } else {
    //     obj[item] = 1;
    // }
    // });
    
    
    // document.getElementById('output').innerHTML = Object.keys(obj).map(function(item) {
    //     console.log(arrObj.length)
    //     var content2 = '';
    //      content2 +=item+'<div class="progress">';
    //      content2 +='<div class="progress-bar" role="progressbar" style="width:'+obj[item]+'%;" aria-valuenow="'+obj[item]+'" aria-valuemin="" aria-valuemax="'+arrObj.length+'">'+obj[item]+'</div>';
    //      content2 +='</div>';
    //      content2 +='<br>';

    //     // console.log(item)
    //     // console.log(obj[item])

    // return content2 ;
    // }).join('\n'); 
    }

function onSubmit(snapKey){
    console.log(snapKey)
    var lineID = document.getElementById(snapKey).value;
    const voteRef = firebase.database().ref('HPY/voters')
    voteRef.child(lineID).set({
        vote:snapKey
      });
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