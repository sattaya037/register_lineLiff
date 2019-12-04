let firebaseConfig = {
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

let names,
  pairedName,
  count;


function main() {
      const dbRef = firebase.database().ref('HPY');
        dbRef.once("value", function(snapshot) {
            var people =[];
            snapshot.forEach(childSnapshot => {
                var name =childSnapshot.val().Fullname;
                people.push(name) 
            })
            exchang(people);
          })
   }

   function exchang(people) {
    names =people;
    pairedName = shuffle(people); 
    count =0
    while (names.length) {
      count++
      let name1 = names.pop(),
          name2 = pairedName[0] == name1 ? pairedName.pop() : pairedName.shift();
              var content = '<li class="list-group-item">'+'('+count+')'+name1+'</li>'; 
              var content2 = '<li class="list-group-item">'+'('+count+')'+name2+'</li>'; 

              var theDiv = document.getElementById("gift");
              theDiv.innerHTML += content;  

              var theDiv = document.getElementById("recive");
              theDiv.innerHTML += content2;
              // document.getElementById("assignments").appendChild(`<li>${name1} gets ${name2}`);     // Append <li> to <ul> with id="myList"
    }
   }

   function shuffle(array) {
     console.log(array)
    var list = array.slice(0),
      copy = [],
      n = list.length,
      i;
  
    // While there remain elements to shuffle…
    while (n) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * list.length);
  
      // If not already shuffled, move it to the new array.
      if (i in list) {
        copy.push(list[i]);
        delete list[i];
        n--;
      }
    }
  
    return copy;
  }
  
   