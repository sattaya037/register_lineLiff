// baguetteBox.run('.compact-gallery', { animation: 'slideIn'});
 
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
  onload();
  function add(){
    var TIMESTAMP =new Date().getTime();
    dbRef.child("member").child(TIMESTAMP).set({
      lineName:"lineID",
      group:1,
      pic:"https://profile.line-scdn.net/0hr6p51jnTLRlNTAe7qSxSTnEJI3Q6YitRNS02eThOIyphe2McdCNqLzgccSpnfj5IIS1qLGBIeylk"
    })
  }
  function onload(){
  // let getFirebase = new Promise(function(resolve, reject) {
    dbRef.child("member").on("child_added", function(snapshot) {
      console.log(snapshot.val().pic)
      var div='';
      var div2='';
      var div3='';
      var div4='';
      if(snapshot.val().group ==1){
          div+='<li>';
          div+='<a href="#">';
          div+=' <img src="'+snapshot.val().pic+'">';
          div+='</a>';
          div+='</li>';
      }else if(snapshot.val().group ==2){
          div2+='<li>';
          div2+='<a href="#">';
          div2+=' <img src="'+snapshot.val().pic+'">';
          div2+='</a>';
          div2+='</li>';
      }else if(snapshot.val().group ==3){
          div3+='<li>';
          div3+='<a href="#">';
          div3+=' <img src="'+snapshot.val().pic+'">';
          div3+='</a>';
          div3+='</li>';
      }else if(snapshot.val().group ==4){
          div4+='<li>';
          div4+='<a href="#">';
          div4+=' <img src="'+snapshot.val().pic+'">';
          div4+='</a>';
          div4+='</li>';
      }
      var theDiv = document.getElementById("main");
      theDiv.innerHTML += div; 
      var theDiv2 = document.getElementById("main2");
      theDiv2.innerHTML += div2;
      var theDiv3 = document.getElementById("main3");
      theDiv3.innerHTML += div3;  
      var theDiv4 = document.getElementById("main4");
      theDiv4.innerHTML += div4; 

    })
// })
  }

