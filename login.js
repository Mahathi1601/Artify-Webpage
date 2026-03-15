function login(){
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value;
    const user = JSON.parse(localStorage.getItem('userData'));
    if(user && user.username===u && user.password===p){
        localStorage.setItem('storedData',JSON.stringify({username : u}));
        alert('Login successful!');
        window.location.href='store.html';
    }else{
        alert("Invalid credentials");
    }
}