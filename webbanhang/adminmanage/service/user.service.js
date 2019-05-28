myAdmin.service("user", function () {
    var username;
    var authority;
    var loggedin = false;
    var id;
    
    this.getName = function () {
        return username;
    };
    this.getAuthority = function () {
        return authority;
    };
    this.setId = function (userID) {
        id = userID;
    };
    this.getID = function () {
        return id;
    };
    this.isUserLoggedIn = function () {
        if(!!localStorage.getItem('login')){
            loggedin = true;
            var data = JSON.parse(localStorage.getItem('login'));
            username=data.username;
            id=data.id;
            authority=data.authority;
        }
        return loggedin;
    };
    
    this.saveData = function (data) {
        username = data.user;
        id = data.id;
        authority=data.authority;
        console.log(username,id);
        loggedin = true;
        localStorage.setItem('login',JSON.stringify({
            username:username,
            id:id,
            authority:authority
        }))
    };
    this.clearData=function(){
        localStorage.removeItem('login');
        username='';
        id='';
        authority='';
        loggedin = false;
    }
});