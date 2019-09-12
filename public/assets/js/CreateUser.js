const signIn = document.getElementById("signinBtn");

signIn.addEventListener("click", e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const secret = document.getElementById("secretQuestion").value;
  const user = {
    username,
    password,
    secret
  };

  fetch("/api/createuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then((data) => data.json())
  .then((data) => {
      if (data.message === 'Username exists!') {
          alert('Username exists');
      }
  })
  .catch(err => console.log(err));
});
