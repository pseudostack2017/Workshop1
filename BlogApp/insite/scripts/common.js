// Creates the blog structure dynamically using the response dara
// Id of the element inside which the blogs data will be appended
function createBlogStructure(response, divBlockId, isUserBlogsRequest){
	// Get the element using its id
	var allBlogContainerId = document.getElementById(divBlockId);
	// Iterate over the resonse using forEach and create the blog structure dynamically for each response data
	response.forEach(function(blog){
		// Get the blog id
		var blogId = blog.blog_id;
		// Create a blog container div
		// <div id='id of the blog' class="blog-node"></div>
		var blogContainerDiv = createElement('div', '', {
			'id': blog.blog_id,
			'class': "blog-node"
		});

		// <div class="blog-wrap"></div>
		var blogWrap = createElement('div', '', {'class': "blog-wrap"});
		// <div class="blog-addons"></div>
		var blogAddOns = createElement('div', '', {'class': "blog-addons"});

		// Blog wrap childs
		// <div class="blog-heading"></div>
		var blogHeading = createElement('div', '', {'class': "blog-heading"});
		// <div class="blog-contents">blog content</div>
		var blogContents = createElement('div', blog.blog_content, {'class': "blog-contents"});

		// Heading childs
		//  <div class="blog-title">blog title</div>
		var blogTitle = createElement('div', blog.blog_title, {'class': "blog-title"});

		/* Adding onclick event listener to blog title */
		// addEventListener registers the event on the element. Function is called on click of blog title 
		blogTitle.addEventListener('click', function() {
			window.location = "../pages/blog-details.html?blog-id=" + blogId;
		}); 
		
		// <div class="blog-author">Written by blog author</div>
		var blogAuthor = createElement('div', 'Written by ' + blog.user_name, {'class': "blog-author"});

		// Appends blog title as child of blog heading
		blogHeading.appendChild(blogTitle);
		// Appends blog author as child of blog heading and sibling of blog title
		blogHeading.appendChild(blogAuthor);

		// Appends blog heading as child of blog wrap
		blogWrap.appendChild(blogHeading);
		// Appends blog contents as child of blog wrap and sibling of blog heading
		blogWrap.appendChild(blogContents);

		//Addons child
		//Make a readable data format
		//date.getDate() - Get the current date
		//Date(blog.blog_created_date) - Converts the string from response to data
		//var date = new Date(Date(blog.blog_created_date)) - Create a new data object
		var date = new Date(Date(blog.blog_created_date));
		// Create a readable data 
		var blogDateStr = date.getDate() + " " + date.toLocaleString("en-us", { month: "long" }) + " " + date.getFullYear();
		
		// <div class="__date"> Date of the blog creation</div>
		var dateDiv = createElement('div', blogDateStr, {'class': "__date"});
		// <div class="__likes"> </div>
		var likeDiv = createElement('div', '', {'class': "__likes"});

		blogAddOns.appendChild(dateDiv);
		blogAddOns.appendChild(likeDiv);
		
		//Like div child
		var likeCounter = createElement('span', blog.likes, {'class': "like-counter"});
		var likeAction = createElement('span', 'LIKES', {'class': "like-action-element"});
		//Add on click event to the like action
		likeAction.addEventListener('click', function(){
			updateLikeCount(blogId, likeCounter);
		})
		
		likeDiv.appendChild(likeCounter);
		likeDiv.appendChild(likeAction);

		//Append blog wrap and blog add ons the the blog container div
		blogContainerDiv.appendChild(blogWrap);
		blogContainerDiv.appendChild(blogAddOns);

		allBlogContainerId.appendChild(blogContainerDiv);
	})
}

// Creates the HTML element dynamically
// Folloqing parameters are passed
// 1. element - Element tag to be creted dynamically
// 2. If any content needs to be displayed in the element 
// 3. Attributes which needs to be added to the element
function createElement(element,content, attrs){
	// document.createElement - create the element
	var newElement = document.createElement(element);
	// If content need to be appended to the element, add the content
	if (content){
		// Creates a  text node for the content
		var t = document.createTextNode(content);
		// Appends the content to the element
		newElement.appendChild(t);
	}
	// Appends any attribtes passed to the element
	// Parameters to be passed
	// 1. HTML element 
	// 2. Attributes JSON object
	setAttributes(newElement, attrs);
	return newElement
}

// Appends the attributes to the elment
function setAttributes(element, attrs){
	// Iterates throuh the object and add the attribute to the element
	for(var key in attrs){
		element.setAttribute(key, attrs[key]);
	}
}


//Function to display the login pop up
function displayLoginPopUp(loginPopup, loginButtonId){
	//Display logn pop up
	loginButtonId.onclick = function(){
		loginPopup.style.display = "block";
	}

	//Close the pop up on click of 'X' on the pop up
	var closeXElement = document.getElementsByClassName("close")[0];
	closeXElement.onclick = function() {
    	loginPopup.style.display = "none";
	}

	//Close the pop up on click of any where on the window
	window.onclick = function(event) {
	    if (event.target == loginPopup) {
	        loginPopup.style.display = "none";
	    }
	}	
}