
const dataSrc=[
	{
			"previewImage": "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			"title": "cat.jpeg"
	},
	{
			"previewImage": "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			"title": "a man and a woman trying to cook a meal together in a modern kitchen.jpg"
	},
	{
			"previewImage": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			"title": "bali-kelingking-beach-plastic-removal-drive.key"
	},
	{
			"previewImage": "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			"title": "NextByk Investor Pitch 2022.ppt"
	},
	{
			"previewImage": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
			"title": "interns-performance-report-may-2022.key"
	}
]
//keyCnt will keep track of the index of current button to traverse via arrow keys
var keyCnt=0;
//to map the buttons to their index
const map = new Map();
//the selected button
var currButton=null;

const imgCollection = document.querySelector(".imgOptions");
const label = document.querySelector("#lname");
const imgEle = document.querySelector(".imgClass");

function setCurrButton(button){
	if(currButton){
		currButton.style.backgroundColor="rgb(239, 239, 239)";
		currButton.style.color="black";
	}
	
	button.style.backgroundColor="blue";
	button.style.color="white";
	//console.log(button);
	currButton=button;

}

//string after editing middle part with ... to reduce size
function getShortenedString(s){
	let n=s.length;
	let shortenedTitle=s;
	if(n>39)shortenedTitle=s.substring(0,11)+"..."+s.substring(n-10,n);
	return shortenedTitle;
}

//to handle input titles
const formInput=document.querySelector("form");
formInput.addEventListener('submit',function(event){
	event.preventDefault();
	//console.log(label.value);
	let tempLabel=document.querySelector("#lname");
	let txt=currButton.querySelector("span");
	txt.innerHTML=getShortenedString(tempLabel.value);
	dataSrc[keyCnt].title=tempLabel.value;
	//label.value=getShortenedString(label.value);
	//currButton.click();

});

//to store buttons(for index based retrieval)
var buttonArray=[];

//html inside the buttons
function getButtonContent(text,src){
	var content=`
		<img src=${src} class="buttonIcon">
		<span>${text}</span>
		`
	;
	return content;
}


//create buttons
dataSrc.forEach(imgObject => {
	let newEle = document.createElement("button");
	newEle.innerHTML=getButtonContent(getShortenedString(imgObject.title),imgObject.previewImage);
	imgCollection.appendChild(newEle);

	//map button to index
	map.set(newEle,buttonArray.length);

	buttonArray.push(newEle);

	//this is only to set an intial value for current button, when the site is loaded
	if(!currButton){
		imgEle.setAttribute("src",imgObject.previewImage);
		label.setAttribute("value",imgObject.title);
		setCurrButton(newEle);
	}

	//add event listener to the buttons

	newEle.addEventListener("click",function(){
		keyCnt=map.get(newEle);
		imgEle.setAttribute("src",imgObject.previewImage);
		//console.log(newEle);
		document.querySelector("#lname").value=dataSrc[keyCnt].title;
		setCurrButton(newEle);

	});
});

// Set up a key event handler for the document
document.addEventListener("keydown", function(event){
	let sz=buttonArray.length;
	switch(event.keyCode){
		case 38: // Up arrow    
			keyCnt=(keyCnt -1 + sz)%sz;
			buttonArray[keyCnt].click();
			//console.log("up");
			 break;
		case 40: // Down arrow
			keyCnt=(keyCnt+1)%sz;
			buttonArray[keyCnt].click();
			//console.log("down");
			break;    
	}
});




