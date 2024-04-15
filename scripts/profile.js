signOut(auth)
  .then(() => {
    console.log("successful");
  }).catch(error => {
    console.log(error.message);
  })