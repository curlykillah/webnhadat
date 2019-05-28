myApp.controller('myHeaderController',function(users){
    if(users.isUserLoggedIn()){
        document.getElementById('home').innerHTML=" ";
    } else {
        document.getElementById('vip').innerHTML=" ";
    };
    
})