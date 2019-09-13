const signIn = document.getElementById("signinBtn");

signIn.addEventListener("click", e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = {
    username,
    password,
  };

  fetch('/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user),
    redirect: 'follow'
  }).then(response => {
    if (response.redirected) {
      console.log(response.url);
      window.location.href = response.url;
    }
  })
  .catch(err => console.log(err));
});
