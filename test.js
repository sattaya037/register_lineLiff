export function CheckIfFriendsPending(id2) {
    return new Promise(function (resolve, reject) {
      var userID = getFirebase().auth().currentUser.uid;
      var indicator = false;
      getFirebase().database().ref('members/' + userID + '/PendingFR').once('value')
        .then(function (snap) {
          function userMatch(user) {
            if (!!user.From && user.From === userID && (user.To === id2 || user.To === userID)) {
              return resolve();
            }
          }
          snap.forEach(function (childSnapshot) {
            var childObject = childSnapshot.val();
            userMatch(childObject);
          });
          return reject();
        });
    });
  }