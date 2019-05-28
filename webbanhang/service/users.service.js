myApp.service("users", function () {
    var username;
    var loggedin = false;
    var id;
    var vip;
    
    this.getName = function () {
        return username;
    };
    this.getVip = function () {
        return vip;
    };
    this.setVip = function (uservip) {
        localStorage.setItem('userlogin',JSON.stringify({ 
            username:username,
            id:id,
            vip:uservip
        }))
    };
    this.setId = function (userID) {
        id = userID;
    };
    this.getId = function () {
        return id;
    };
    this.isUserLoggedIn = function () {
        if(!!localStorage.getItem('userlogin')){
            loggedin = true;
            var data = JSON.parse(localStorage.getItem('userlogin'));
            vip=data.vip;
            username=data.username;
            id=data.id;
        }
        return loggedin;
    };
    
    this.saveData = function (data) {
        console.log(data);
        username = data.name;
        id = data.id;
        vip=data.vip;
        console.log(username,id,data.vip);
        loggedin = true;
        localStorage.setItem('userlogin',JSON.stringify({ 
            username:username,
            id:id,
            vip:vip
        }))
    };
    this.clearData=function(){
        localStorage.removeItem('userlogin');
        username='';
        id='';
        vip='';
        loggedin = false;
    }
});