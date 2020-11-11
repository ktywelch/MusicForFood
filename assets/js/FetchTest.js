var testVar=""
const cultures = {
	French: {
		images: ["anthony-delanoix-Q0-fOL2nqZc-unsplash.jpg","adrien-tutin-hCh_PHIhoLI-unsplash.jpg",
              "daniele-d-andreti-ud9u7beav2s-unsplash.jpg","leonard-cotte-c1Jp-fo53U8-unsplash.jpg","niclas-illg-prBNNbXvnh4-unsplash.jpg",
            "romain-huneau-sQaOGfoLDNA-unsplash.jpg"], 
		altImage: ["Eiffel Tower Picture taken by Anthony Delanoix","Castle Wall by Adrien Tutin unsplash",
		"Photo of the Louvre by Daniele D Andreti unsplash","Lavendar field by Leonard Cotte unsplash",
		"Macrons by Niclas Illg unsplash","La Rochelle by Romain Huneau unsplash"],
		playlist: [3748969686,6553706304]//,1737848082,7881922322,5574391562]
	},
	Indian: {
		images: ["annie-spratt-w3CyGs-keEM-unsplash.jpg","debashis-rc-biswas-xAWb6qDCXDU-unsplash.jpg","julian-yu-_WuPjE-MPHo-unsplash.jpg",
		"kirti-kalla-JRhvllDBhzs-unsplash.jpg","martin-jernberg-nE2gf1scItI-unsplash.jpg","sonika-agarwal-BTT3faMmBwQ-unsplash.jpg"], 
		altImage: ["Indian Building taken by Annie Spratt","Festival of Color by Debashis Biswas unsplash",
		"Taj Mahal by Julian Yuyu-_WuPjE-MPHo-unsplash","Walled City of JaiPur by  Kirti Kalla unsplash",
		"Victoria Memorial by Martin Jernberg unsplash","Statue of Ganesh Sonika Agarwal unsplash.jpg",],
		playlist: [808923603,7723841822]//,5397210322,2484275588,6124514764]
	},
	Mexican:  {
		images: ["jimmy-baum-NjdpeYDHNrQ-unsplash.jpg","2-mexican-fiesta-sushobha-jenner-canvas-print.jpg",
		 "38-15-12-5-17-49-3m.jpg","4d8cc8f0e7eaa9ee0de0837645cce7ec.jpg","62527921-cartoon-cute-doodles.jpg",
		"flag-800.png","images.jpeg"], 
		altImage: ["Mayan Temple taken by Jimmy Baum","Mexican Fiesta on Canvas Print","Painting man in sombrero sleeping in desert",
		"taco burrito chips and salsa print","cartoon doodles hand drawn mexican food illustration from Doodles Vector Art",
	    "Mexican Flag","Mexican food images"],
		playlist: [5212851564,4923634428]//,3712532246,4522361286,7987112122]
	},
	Chinese:  {
		images: ["alexander-schimmeck-gUtcrNunbCM-unsplash.jpg","cat-crawford-FRSSDv3mAy8-unsplash.jpg",
				"markus-winkler-_B-ahpq0S7c-unsplash.jpg","sam-beasley-eltps1t7gDY-unsplash.jpg",
				 "shane-young-hOwGHmNcncg-unsplash.jpg","victor-he-0xn9T2cEigE-unsplash.jpg",
				"yiranding-aIG78YGhDmM-unsplash.jpg"], 
		altImage: ["Terracotta Army taken by Alexander Schimmeck","The Great Wall of China by Cat Crawford",
				"Chinese Latern by Makus Winkler","Traditioan Fishing by Sam Beasley","Reflected Mountain by Shane Young",
			    "Chinese Temple by Victor He","Oriental Pearl Tower by Yiranding"],
		playlist: [4962135028,6224909624]//,969940552,6431991064,6885856824,6324317944]
	},
	Italian:  {
		images: ["italian images.jpg","BumperSticker.jpg","Italian-12icons.jpg","ItalianFlag.jpg",
		"ItalianFood.jpg","braden-collum-75XHJzEIeUc-unsplash.jpg","damiano-baschiera-hFXZ5cNfkOk-unsplash.jpg",
		"italian-cuisine-traditional-dishes-and-salads-vector-17293315.jpg","jack-ward-Riomaggiore-unsplash.jpg"], 
		altImage: ["Image of pizza wirh italian flag","Italian Bumper Sticker","Italian popster with 12 food icons",
		"Italian flag projected on building","Poster of Italian Food","Colleseum by Braden Collum unsplash",
		"Venice Canals by Damiano Baschiera","italiancuisine traditional poster","Riomaggiore by Jack Ward"],
		playlist: [4779177244,8146526982]//,5353448802,6514155104,272400133]
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
	let newA=document.createElement("row")
	newA.innerHTML = `<a href="${url}"><img src=${img} style="width:100px;height:100px;" alt="${title}"</a>${title}`;
	resPg.appendChild(newA);
	let recp = `{id: ${id},title: ${title},image: ${img},recipeUrl: ${url}}`;
	dataRespone.push(recp);
	}
	localStorage.setItem("recipes",JSON.stringify(dataRespone));
	testVar=img;
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

let listOfPl = cultures[`${country}`]["playlist"];
let dataPlaylist = [];
localStorage.setItem("playlist",dataPlaylist)

for (let i=0;i < listOfPl.length; i++) {
let pl=listOfPl[i]; 
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
			dataPlaylist = JSON.parse(localStorage.getItem("playlist"))
			let id = response["id"]
			let url = response["link"]
			let imgLink = response["picture_small"]
			let title = response["title"]
            let plDet= `{id: ${id},title: ${title},image: ${imgLink},recipeUrl: ${url}}`;
			dataPlaylist.push(plDet);
			localStorage.setItem("playlist",dataPlaylist)
	        console.log("pl",response); 
	})
	.catch(err => {
	console.error(err);
	});
}
console.log(dataPlaylist,typeof(dataPlaylist));

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
	let l1 = cultures[keys[i]]["images"].length;
	let imgNo = getRandomInt(l1)
	let image = cultures[keys[i]]["images"][imgNo];
	let altimage = cultures[keys[i]]["altImage"][imgNo];
	let plNo = getRandomInt(cultures[keys[i]]["playlist"].length);
	let playlist = cultures[keys[i]]["playlist"][plNo];
	let newD = document.createElement("row");
	newD.innerHTML = `<div><div class="cont"><img src="../images/${lc}/${image}" id=${culture} alt="${altimage}" 
	style="padding:10px;width:200px;height:200px;display:inline;"> <div class="middle"><div class="text">${culture}</div></div>`;
	newF.appendChild(newD);
 }	
 //add the listeners
 abc.appendChild(newF);
 let btnSelect = document.querySelector(`#selectCulture`);
  btnSelect.addEventListener('click', (event) => {
	console.log(event.target.id);
	country = event.target.id;
	event.preventDefault();
	fetchPlaylist(country);
	fetchRecipes(country);
	console.log(testVar);
	let myObj = document.querySelector('#selectCulture');
	myObj.remove();
	});   
 
}

//supporitng functions - getRandomInt from MDN
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
  }


createButtons(cultures);

