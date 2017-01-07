// JQuery ready function is called once the document gets ready i.e. after creation of DOM sturcutre
$(document).ready(function(){
	// Declare variables loginPopup, loginButtonId
	// Initialize the variable with the over lay container element and login button element respectively
	// document.getElementsByClassName gets the element by class name. It returns an arrys of elements
	// document.getElementById gets the element by the id of the element. It returns a single element
	var loginPopup = document.getElementsByClassName('overlay-container')[0],
	loginButtonId = document.getElementById('login-button');

	// Gets the BLog data using the AJAX call and calls createBlogStructure function
	populateBlog()

	// Display thel login pop up on click of login button
	// Following parameters are passed
	// 1. loginPopup and loginButtonId explained above
	displayLoginPopUp(loginPopup, loginButtonId);
});


//Function to populate the blog
function populateBlog(){
	//Ajax call to get all the blogs
	$.ajax({
		url: 'https://api.myjson.com/bins/c4s2z',
		type:'GET',
		dataType:'json',
		success:function(response){
			blogDataJSON = blogData;
			// Below function creates the blog dynamically using JS
			// Following parameters are passed
			// 1. blogData - All the blog data
			// 2. Div block id which accomodates all the dynamically created blogs
			if(!response){
				blogDataJSON = blogData;
			}
			createBlogStructure(blogDataJSON, 'all-blog', false);	
		},
		error:function(err){
			console.log(err);
		}
	});
}