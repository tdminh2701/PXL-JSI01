document.getElementById("signup-form").addEventListener(`submit`, function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const user = {
    email,
    password,
    phone,
    address,
  };

  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(function (response) {
      Swal.fire({
        title: "Success!",
        text: "Đăng ky thanh cong",
        html: `
        <button class="btn btn-warning" >
          <a href="login.html">Go to log in page</a>
        </button>
      `,
        icon: "success",
        showConfirmButton: false,
      });
      console.log(response.user);
      db.collection("user").add({
        email,
        phone,
        address,
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
  console.log("submit button", user);
});
