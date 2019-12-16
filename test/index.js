
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
  const dbRef = firebase.database().ref('people');
  const height = document.body.clientHeight;
  const width = document.body.clientWidth;
  const SCROLL_SPEED = 0.3;
  const CANVAS_WIDTH = 2800;

  freshImage();

 
function freshImage(){
  var Obj =[];
  var div = document.getElementById("main"); 
  while(div.firstChild) { 
    div.removeChild(div.firstChild); 
} 
  dbRef.on("value", function(snapshot) {
    Obj = [];
    snapshot.forEach(function(childSnapshot) {
      console.log(childSnapshot.val().picUrl)
      var imgUrl= childSnapshot.val();

      // var div = document.createElement("div");
      // var divsize = ((Math.random()*100) + 50).toFixed();
      // var posx = (Math.random() * (width - divsize)).toFixed();
      // var posy = (Math.random() * (height - divsize)).toFixed();
  
  
      // div.className = "ani-bubble";
      // div.style.position = "absolute";
      // div.style.left = posx+"px";
      // div.style.top = posy+"px";
      // div.style.width = divsize+"px";
      // div.style.height = divsize+"px";
      // div.style.marginRight = "20px";
      // div.style.background = "white";
      // div.style.borderRadius = "50%";
      // div.style.boxShadow = "  0 15px 35px  black , 0 3px 10px black";
      // div.style.backgroundImage = "url("+imgUrl+")";
      // div.style.backgroundSize="contain";
      // div.style.backgroundRepeat="no-repeat";
      
      Obj.push(imgUrl)
      // console.log(childSnapshot.val().picUrl)
      // console.log(childSnapshot.key)

    })
    makeDiv(Obj); 
    // document.getElementById("main").appendChild(div);

    // div.style.animation="mynewmove 5s ";    
    
    // document.body.appendChild(div)



      // Does not match anything

    // document.getElementById("main").animate([
    //   // keyframes
    //   { transform: 'translateY(0px)' }, 
    //   { transform: 'translateY(-100px)' }
    // ], { 
    //   // timing options
    //   duration: 5000,
    //   iterations: Infinity
    // });

    // makeDiv(); 

  })
}

function makeDiv(Obj){
  for(var j = 0; j < Obj.length; j++) {
    var c = Obj[j].picUrl;
      var div = document.createElement("div");
      var divsize = ((Math.random()*100) + 50).toFixed();
      var posx = (Math.random() * (width - divsize)).toFixed();
      var posy = (Math.random() * (height - divsize)).toFixed();

      div.className = "ani-bubble";
      div.style.position = "relative";
      div.style.left = posx+"px";
      div.style.top = posy+"px";
      div.style.width = divsize+"px";
      div.style.height = divsize+"px";
      div.style.marginRight = "20px";
      div.style.background = "white";
      div.style.borderRadius = "50%";
      div.style.boxShadow = "  0 15px 35px  black , 0 3px 10px black";
      div.style.backgroundImage = "url("+c+")";
      div.style.backgroundSize="contain";
      div.style.backgroundRepeat="no-repeat";
      // div.style.animationDuration ="3s";

      document.getElementById("main").appendChild(div);

      // document.getElementById("main").animate([
      //   { transform: 'translateX('+posx+'px)' }, 
      //   { transform: 'translateY('+(posy-100)+'px)' }
      // ], { 
      //   duration: 10000,
      //   iterations: Infinity
        
      // });
  }
}

// setInterval(freshImage, 10000);


