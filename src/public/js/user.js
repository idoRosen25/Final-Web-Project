function postUserLogin(event) {
  var xhr = new XMLHttpRequest();
  const email = $("#email").val();
  const password = $("#password").val();

  xhr.open("post", "http://localhost:5200/login");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      email,
      password,
    })
  );
  // console.log('login user after post: ',login);
}
