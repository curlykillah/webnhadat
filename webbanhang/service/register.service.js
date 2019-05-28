myApp.service("register", function () {
    var name;
    var email;
    var phone;
    var regist=false;
    
    this.getName = function () {
        return name;
    };
    this.getEmail = function () {
        return email;
    };
    this.getPhone = function () {
        return phone;
    };
    this.isUserRegist = function () {
        if(!!localStorage.getItem('register')){
            regist=true;
            var data = JSON.parse(localStorage.getItem('register'));
            name=data.name;
            email=data.email;
            phone=data.phone;
        }
        return regist;
    };
    
    this.saveData = function (data) {
        name=data.name;
        email=data.email;
        phone=data.phone;
        localStorage.setItem('register',JSON.stringify({
            name:name,
            email:email,
            phone:phone
        }))
    };
    this.clearData=function(){
        localStorage.removeItem('register');
        name='';
        email='';
        dt='';
        regist=false;
    }
});