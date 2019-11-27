var getArticle = getArticlePromise(id);
// After we get the article, automatically fetch the profile picture
var getProfilePic = getArticle.then(function(article) {
  return getProfilePicPromise(article.author);
});

// We can find out whether the article is starred without waiting on any other task.
var getIsStarred = false;
var authData = ref.getAuth();
if (authData) {
  var isStarredRef = ref.child('userStars').child(authData.uid).child(id);
  getIsStarred = isStarredRef.once('value').then(function(snapshot) {
    return snapshot.val() != null;
  });
}

// Run all the requests then render the results.
Promise.all([getArticle, getProfilePic, getIsStarred]).then(function(results) {
  renderBlog({
    article: results[0],
    profilePic: results[1],
    isStarred: results[2],
  });

  // We’ve fetched everything; increment the read count.
  return ref.child('blogposts').child(id).child('readCount').transaction(function(current) {
    return (current || 0) + 1;
  });
});