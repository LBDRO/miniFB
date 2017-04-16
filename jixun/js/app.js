var APP_ID = 'KC8khQfC8nT3dIpaEIOmnMjO-gzGzoHsz';
var APP_KEY = 'YmGO0DyfHHndNzN2TjSnqBwr';
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});


Post = AV.Object.extend("Post");


function showError(error){
	alert(error);
}

$(function () {
    var query = new AV.Query('Product');
    query.include("User");
    var source = $("#send").html();
	var template = Handlebars.compile(source);
    var user = AV.User.current();
	context.name = user.get("username");
    var html = template(context);
	$("#loginArea").html(html);
});
function onSubmitPost(e){
	var post = new Post();
    var user = AV.User.current();
    var name = user.get("username");
	post.set("content", document.getElementById(name+"-input").value);
	post.set("user",user);

	post.save().then(function(o){
		context.posts.unshift({
            username: user.get("username"),
			content: o.get("content"),
			time: o.get("createdAt")
		});

		refreshPosts();

	},function(error){
		showError(error);
	});
}

var context = {
	posts: []
};

function refreshPosts(){
	var source = $("#posts-list").html();
	var template = Handlebars.compile(source);
	var html = template(context);
	$("#posts").html(html);
}

$( document ).ready(function() {

	$( "#student-submit" ).click(onSubmitPost);

	var query = new AV.Query("Post");
	query.include("user");
	query.descending("createdAt");
	query.find().then(function(posts){
		
		posts.forEach(function(p){
			context.posts.push({
				username: p.get("user").get("name"),
				content: p.get("content"),
				time: p.get("createdAt")
			})
		});

		refreshPosts();

	});

});