
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

  let getLast = new Promise(function(resolve, reject) {
        dbRef.child("register").limitToLast(1).once("value", function(snapshot) {
            snapshot.val()
            resolve(snapshot.val());
        })
  });
  let getMember = new Promise(function(resolve, reject) {
    dbRef.once("child_added", function(snapshot) {
        var childKey = snapshot.child("member").hasChildren(); // "last"
        resolve(childKey);
    })
  });


Promise.all([getLast, getMember]).then(function(values) {
    addGroup(values); 

});

function addGroup(values){
    var lineID="ertger";
    var TIMESTAMP =new Date().getTime();
    if(values[0] == null && values[1]==false){
        dbRef.child("register").child(TIMESTAMP).set({
                lineID:lineID,
                group:1,
        })

        dbRef.child("member").child(lineID).set({
                lineName:"lineName",
                group:1,
        })
        console.log(false)
    }else{
        console.log(true)
        dbRef.child("member").once("value", function(snapshot) {
            var hasName = snapshot.hasChild(lineID);
            var count = snapshot.numChildren()+1;
         if(hasName == false){
            console.log('not regis')
            dbRef.child("register").limitToLast(1).once("value", function(snapshot) {
                console.log(snapshot.val())
                snapshot.forEach(function(childSnapshot) {
                    if(childSnapshot.val().group == 1){
                        dbRef.child("register").child(TIMESTAMP).set({
                            lineID:lineID,
                            group:2,
                          })
                          dbRef.child("member").child(lineID).set({
                            lineName:"lineName",
                            group:2,
                          })
                    }else if(childSnapshot.val().group == 2){
                        dbRef.child("register").child(TIMESTAMP).set({
                            lineID:lineID,
                            group:3,
                          })
                          dbRef.child("member").child(lineID).set({
                            lineName:"lineName",
                            group:3,
                          })
                    }else if(childSnapshot.val().group == 3){
                        dbRef.child("register").child(TIMESTAMP).set({
                            lineID:lineID,
                            group:4,
                          })
                          dbRef.child("member").child(lineID).set({
                            lineName:"lineName",
                            group:4,
                          })
                    }else if(childSnapshot.val().group == 4){
                        dbRef.child("register").child(TIMESTAMP).set({
                            lineID:lineID,
                            group:1,
                          })
                          dbRef.child("member").child(lineID).set({
                            lineName:"lineName",
                            group:1,
                          })
                    }
                })
                
          })

         }else{

            console.log('registed')

         }

        })
    }
    // dbRef.once("child_added", function(snapshot) {
    //     var lineID="adasdds";
    //     var childKey = snapshot.child("member").hasChildren(); // "last"
    //     var hasName = snapshot.hasChild(lineID);
    //   })
}


    // dbRef.child("register").limitToLast(1).once("value", function(snapshot) {
    //     if(childKey == false && snapshot.val() == null ){
    //         console.log(false)
    //         dbRef.child("register").child("1").set({
    //             lineID:lineID,
    //             group:1,
    //         })
    //         dbRef.child("member").child("lineID").set({
    //             lineName:"lineName",
    //             group:1,
    //         })
    
    //     }else{
      
    //     }

    // })


    // var childKey = snapshot.child(lineID).hasChild("a"); // "last"
    // var j=1;
    // var count = snapshot.numChildren()+1;
    // var childKey = snapshot.child("member").hasChild("a"); // "last"
    // j++
    // console.log(j)
    // console.log(childKey)
    // if(childKey == 0){
    //     dbRef.child("register").child("2").set({
    //         LineID:"aadasdda",    
    //         group:2,
    //         LineName:"fwefsd",
    //     })
    //     dbRef.child("member").child("aaa").set({
    //         group:1,
    //     })
    //     console.log("sucess")
    // }else{
    //     // console.log("not 0")
    //     if(childKey !== "aaa"){
    //         // console.log("new regis")

    //     }
    // }


  

