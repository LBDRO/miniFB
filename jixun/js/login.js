/**
 * Created by owen on 2/3/17.
 */

$("#submit").click(function() {
    var username = $("#username").val();
    var password = $("#password").val();
    var query = new AV.Query('Product');
    //LeanCloud login
    AV.User.logIn(username, password).then(function(loginedUser){
        query.find().then(function (products) {
            products.forEach(function(product){
                product.set("username", username);
            });
        });


        window.location.href = "../leancloud 2.html";
    }, function(error){
        alert(JSON.stringify(error));
        alert("there is an Error with your username or password");
    });
});
