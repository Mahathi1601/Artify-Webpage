function getSession(){
    return JSON.parse(localStorage.getItem('storedData'));
}
function setSession(username){
    localStorage.setItem('storedData',JSON.stringify({username}));
}
function clearSession(){
    localStorage.removeItem('storedData');
}
function getUSer(){
    return JSON.parse(localStorage.getItem('userData'));
}
function isLoggedIn(){
    const s = getSession();
    return !!(s && s.username);
}
function requireAuth(){
    if(!isLoggedIn()){
        window.location.href='login.html';
    }
}
function logout(){
    clearSession();
    window.location.href='index.html';
}