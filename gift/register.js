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

  let getFirebase = new Promise(function(resolve, reject) {
    dbRef.child("member").on("value", function(snapshot) {
        // console.log(snapshot.val())
        var obj=[];
        snapshot.forEach(function(childSnapshot) {
            obj.push(childSnapshot)
        })
        resolve(obj)

      })
  })

  Promise.all([getFirebase]).then(function(values) {
    freshImage(values); 
  });
//   freshImage();

 function freshImage(values){
    
    for(var j = 0; j < values[0].length; j++) {
        console.log(values[0][j].child('pic').val())
    

        if(values[0][j].child('group').val()==1){
            var div = '';
            div+='<li>';
            div+='<a href="#">';
            div+=' <img src="'+values[0][j].child('pic').val()+'">'
            div+='</a>'
            div+='</li>'
            var theDiv = document.getElementById("main");
            theDiv.innerHTML += div; 
        }else if(values[0][j].child('group').val()==2){
            var div2 = '';
            div2+='<li>';
            div2+='<a href="#">';
            div2+=' <img src="'+values[0][j].child('pic').val()+'">'
            div2+='</a>'
            div2+='</li>'
            var theDiv2 = document.getElementById("main2");
            theDiv2.innerHTML += div2; 
        }else if(values[0][j].child('group').val()==3){
            var div3 = '';
            div3+='<li>';
            div3+='<a href="#">';
            div3+=' <img src="'+values[0][j].child('pic').val()+'">'
            div3+='</a>'
            div3+='</li>'
            var theDiv3 = document.getElementById("main3");
            theDiv3.innerHTML += div3; 
        }else if(values[0][j].child('group').val()==4){
            var div4 = '';
            div4+='<li>';
            div4+='<a href="#">';
            div4+=' <img src="'+values[0][j].child('pic').val()+'">'
            div4+='</a>'
            div4+='</li>'
            var theDiv4 = document.getElementById("main4");
            theDiv4.innerHTML += div4; 
        }

   

 
    }

}

function makeDiv(Obj){
  for(var j = 0; j < Obj.length; j++) {
    var c = Obj[j].picUrl;
      var div = document.createElement("div");
      console.log(Obj[j])
 
      // div.style.animationDelay =animateTIme;


 

      // div.style.animationDuration ="3s";

      document.getElementById("main").appendChild(div);   

      // document.getElementById("main").animate([
      //   { transform: 'translateX('+posx+'px)' }, 
      //   { transform: 'translateY('+(posy-100)+'px)' }
      // ], { 
      //   duration: 1000*j,
      //   iterations: Infinity
        
      // });
  }
  // console.log(container)

}



// setInterval(freshImage, 20000);


