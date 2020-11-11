const cultures = {
	French: {
		images: ["anthony-delanoix-Q0-fOL2nqZc-unsplash.jpg"], 
		altImage: ["Eiffel Tower Picture taken by Anthony Delanoix"],
		playlist: [3748969686,6553706304,1737848082,7881922322,5574391562]
	},
	Indian: {
		images: ["annie-spratt-w3CyGs-keEM-unsplash.jpg"], 
		altImage: ["Indian Building taken by Annie Spratt"],
		playlist: [808923603,7723841822,5397210322,2484275588,6124514764]
	},
	Mexican:  {
		images: ["jimmy-baum-NjdpeYDHNrQ-unsplash.jpg","2-mexican-fiesta-sushobha-jenner-canvas-print.jpg",
		 "38-15-12-5-17-49-3m.jpg","4d8cc8f0e7eaa9ee0de0837645cce7ec.jpg","62527921-cartoon-cute-doodles.jpg",
		"flag-800.png","images.jpeg"], 
		altImage: ["Mayan Temple taken by Jimmy Baum","Mexican Fiesta on Canvas Print","Painting man in sombrero sleeping in desert",
		"taco burrito chips and salsa print","cartoon doodles hand drawn mexican food illustration from Doodles Vector Art",
	    "Mexican Flag","Mexican food images"],
		playlist: [5212851564,4923634428,3712532246,4522361286,7987112122]
	},
	Chinese:  {
		images: ["alexander-schimmeck-gUtcrNunbCM-unsplash.jpg","cat-crawford-FRSSDv3mAy8-unsplash.jpg",
				"markus-winkler-_B-ahpq0S7c-unsplash.jpc","sam-beasley-eltps1t7gDY-unsplash.jpg",
				 "shane-young-hOwGHmNcncg-unsplash.jpg","victor-he-0xn9T2cEigE-unsplash.jpg",
				"yiranding-aIG78YGhDmM-unsplash.jpg"], 
		altImage: ["Terracotta Army taken by Alexander Schimmeck","The Great Wall of China by Cat Crawford",
				"Chinese Latern by Makus Winkler","Traditioan Fishing by Sam Beasley","Reflected Mountain by Shane Young",
			    "Chinese Temple by Victor He","Oriental Pearl Tower by Yiranding"],
		playlist: [4962135028,6224909624,969940552,6431991064,6885856824,6324317944]
	},
	Italian:  {
		images: ["italian images.jpg"], 
		altImage: ["Image of pizza wirh italian flag"],
		playlist: [4779177244,8146526982,5353448802,6514155104,272400133]
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
	//clear the recipe storage before we start
	if(localStorage.getItem("recipes")){
		localStorage.removeItem("recipes")
	}
	let dataRespone = [], recp = {};
	let newR = document.createElement("row");
	let recipes = response["results"];
	console.log(recipes);
	for (let i=0;i < recipes.length; i++) {
	let id = recipes[i]["id"];
	let img = recipes[i]["image"];
	let title = recipes[i]["title"];
	let url = 	`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=862113360871404295a6f02d2778f8ed`
	let newA=document.createElement("p")
	newA.innerHTML = `<a href="${url}"><img src=${img} style="width:100px;height:100px;" alt="${title}"</a>${title}`;
	resPg.appendChild(newA);
	let recp = `{id: ${id},title: ${title},image: ${img},recipeUrl: ${url}}`;
	dataRespone.push(recp);
	}
	localStorage.setItem("recipes",JSON.stringify(dataRespone));
})
.catch(err => {
	console.error(err);
});
}

function fetchPlaylist(){
//Use RapidAPI to get playlists from Deezer
console.log(cultures, country);
if(localStorage.getItem("playlists")){
	localStorage.removeItem("playlists")
}


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
	let image = cultures[keys[i]]["images"][0];
	let altimage = cultures[keys[i]]["altImage"][0];
	let playlist = cultures[keys[i]]["playlist"][0];
	let newD = document.createElement("row");
	newD.innerHTML = `<img  src="../images/${lc}/${image}" id=${culture} alt="${altimage}" style="padding:10px;width:200px;height:200px;">`;
	newF.appendChild(newD);
 }	
 //add the listeners
 abc.appendChild(newF);
 console.log("WY1")
 let btnSelect = document.querySelector(`#selectCulture`);
  btnSelect.addEventListener('click', (event) => {
	console.log(event.target.id);
	country = event.target.id;
	event.preventDefault();
	fetchPlaylist(country);
	fetchRecipes(country);
	let myObj = document.querySelector('#selectCulture');
	myObj.remove();
	});   
 
}

createButtons(cultures);

