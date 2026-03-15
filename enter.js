function signup(){
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    if(!email||!username||!password){
        alert('Please fill all fields');
        return;
    }
    const user = { email , username , password};
    localStorage.setItem('userData',JSON.stringify(user));
    localStorage.setItem('storedData',JSON.stringify({username}));
    alert('Account created successfully!');
    window.location.href = 'profile.html';
}