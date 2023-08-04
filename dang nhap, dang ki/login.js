document.getElementById("signup-form").addEventListener(`submit`, function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    email,
    password,
  };

  console.log(user);
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(function (response) {
      db.collection("users")
        .where("email", "==", user.email)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((item) => {
            // chuyển về data
            const user = item.data();

            localStorage.setItem("address", JSON.stringify(user.address));
          });
          window.location.href = "../index.html";
        });
    })
    .catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      console.log(error);
    });
});
