
function postUserLogin(event){
   
    var xhr = new XMLHttpRequest()
    const email = $('#email').val();
    const password = $('#password').val();

    xhr.open('POST','http://localhost:5200/user/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    email,password
}))
    // console.log('login user after post: ',login);
}