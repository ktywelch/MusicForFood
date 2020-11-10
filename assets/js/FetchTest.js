const cultures = {
	French: {
		images: ["anthony-delanoix-Q0-fOL2nqZc-unsplash.jpg"], 
		altImage: ["Eiffel Tower Picture taken by Anthony Delanoix"],
		playlist: [7881922322, 5574391562]
	},
	Indian: {
		images: ["annie-spratt-w3CyGs-keEM-unsplash.jpg"], 
		altImage: ["Indian Building taken by Annie Spratt"],
		playlist: [2484275588, 5397210322]
	},
	Mexican:  {
		images: ["jimmy-baum-NjdpeYDHNrQ-unsplash.jpg"], 
		altImage: ["Mayan Temple taken by Jimmy Baum"],
		playlist: [5212851564, 4522361286]
	},
	Chinese:  {
		images: ["alexander-schimmeck-gUtcrNunbCM-unsplash.jpg"], 
		altImage: ["Terracotta Army taken by Alexander Schimmeck"],
		playlist: [6224909624, 969940552]
	},
	Italian:  {
		images: ["italian images.jpg"], 
		altImage: ["Image of pizza wirh italian flag"],
		playlist: [4779177244, 6514155104]
	}
}

// //Fetch 10 italian cuise Recipes
function fetchRecipes (cuisine){
 //let cuisine="Italian";
 let num=10;
 let resPg = document.querySelector('#culture-cards')
fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=${num}&apiKey=862113360871404295a6f02d2778f8ed`, {
 })
   .then(function(resp) {
   return resp.json();
})
.then(response => {
	console.log("this is the first: ",response);
	let newR = document.createElement("row");
	let recipes = response["results"];
	console.log(recipes);
	for (let i=0;i < recipes.length; i++) {
	let id = recipes[i]["id"];
	let img = recipes[i]["image"];
	console.log(img);
	let title = recipes[i]["title"];	
	let newA=document.createElement("p")
	newA.innerHTML = `<a href="https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=862113360871404295a6f02d2778f8ed">
	<img src=${img} style="width:100px;height:100px;" alt="${title}>"</a>${title}`;
	resPg.appendChild(newA);
	}
	
})
.catch(err => {
	console.error(err);
});
}

function fetchPlaylist(){
//Use RapidAPI to get playlists from Deezer
//let pl="794838881"
console.log(cultures, country);

let pl = cultures[`${country}`]["playlist"][0];

fetch(`https://deezerdevs-deezer.p.rapidapi.com/playlist/${pl}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "d9fe07b658msh64dfa59e41a536cp11dc80jsnf2dd2327a120",
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
	}
})
.then(function(resp) {
   return resp.json();
})
.then(response => {
	console.log("this is the second",response);
})
.catch(err => {
	console.error(err);
});
}

//setup array of cultures


function createButtons(cultures){
//add image buttons one for each food type (starting with static will change later)
let abc = document.querySelector('#culture-cards');
const keys = Object.keys(cultures)
let culture ="";
let newF = document.createElement("form");
newF.setAttribute("id","selectCulture")
for( let i = 0; i < keys.length; i++){
	culture = keys[i];
	let lc = culture.toLowerCase();
	console.log(lc);
	let image = cultures[keys[i]]["images"][0];
	let altimage = cultures[keys[i]]["altImage"][0];
	let playlist = cultures[keys[i]]["playlist"][0];
	let newD = document.createElement("row");
	newD.setAttribute("class","colums is-one-third")
    newD.setAttribute("id",culture)
	newD.innerHTML = `<img  src="../images/${lc}/${image}" alt="${altimage}" style="padding:10px;width:200px;height:200px;">`;
	newF.appendChild(newD);
 }	
 //add the listeners
 abc.appendChild(newF);
 console.log("WY1")
 let btnSelect = document.querySelector(`#selectCulture`);
  btnSelect.addEventListener('click', (event) => {
	console.log(event.target.nodeName, event.path[1].id);
	console.log(this);
	event.preventDefault();
	country = event.path[1].id;
	console.log(country);
	fetchPlaylist(country);
	fetchRecipes(country);
//	window.open ('FT2.html','_self',false);
	let myObj = document.querySelector('#selectCulture');
	myObj.remove();
	});   
 
}

createButtons(cultures);

