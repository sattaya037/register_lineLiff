
  let firebaseConfig = {
    apiKey: "AIzaSyAxKf8G_Bh9zjBKDMBp1nqKQs_F2a3JcHc",
    authDomain: "testlinebot-d64fc.firebaseapp.com",
    databaseURL: "https://testlinebot-d64fc.firebaseio.com",
    projectId: "testlinebot-d64fc",
    storageBucket: "testlinebot-d64fc.appspot.com",
    messagingSenderId: "284787172977",
    appId: "1:284787172977:web:f3de5f29042d3ab3ceddd0",
    measurementId: "G-STXGC4TQCM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const dbRef = firebase.database().ref('group');
//   dbRef.push({
//     startedAt: firebase.database.ServerValue.TIMESTAMP
//   });
  addGroup();

function addGroup(){
    var lineID="dasd";
      dbRef.child("member").on("value", function(snapshot) {
        var hasID = snapshot.hasChild(lineID); // true
        var msg='';
        if(hasID == false){
          msg={
            type: 'text',
            text:  "You haven't queue!! ,Please register first."
          };
        }else{
         
          snapshot.forEach(function(childSnapshot) {
            if(childSnapshot.key ==lineID){
              msg="a"+childSnapshot.val().number

            }
          })
        }
        console.log(msg)
      })
   

}