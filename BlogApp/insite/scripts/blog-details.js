$(document).ready(function() {
	var blogIdFromQueryString = getQueryString('blog-id');

	// Iterate over the blog data to find the blog with the passed blog id
	Object.keys(blogData).forEach(function(key){
		if(blogData[key].blog_id === blogIdFromQueryString){
			// Populate the blog details page with the blog data
			populateBlogDetailsPage(blogData[key]);
		}
	});

	var loginPopup = document.getElementById('myModal'),
		loginButtonId = document.getElementById('login-button');
		
	displayLoginPopUp(loginPopup, loginButtonId);
});

//Populates the blog details page
populateBlogDetailsPage = function(response) {
	// Get the blog titile elemet using class name and populate it with blog tilte text
	document.getElementsByClassName("bd-title")[0].innerHTML = response.blog_title;

	var date = new Date(Date(response.blog_created_date));
	var blogDateStr = date.getDate() + " " + date.toLocaleString("en-us", { month: "long" }) + " " + date.getFullYear();
	
	// Get the blog date element and populate it with blog created date 
	document.getElementsByClassName("bd-date")[0].innerHTML = blogDateStr;

	// Get the blog content element and populate it blog content
	document.getElementsByClassName(" __text")[0].innerHTML = response.blog_content;

	// Get the blog user name element and populate the blog author date
	document.getElementById('author-name').innerHTML = response.user_name;
}

// Get the query string from the url
var getQueryString = function ( field, url) {
	// if URL is not passed fetch the current URL 
	var href = url ? url : window.location.href;
	//Regular expression to fetch the query string
	
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(href);
	return string ? string[1] : null;
};