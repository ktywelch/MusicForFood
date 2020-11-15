/* script sets up arrays for images to depict cultures we want to represent on the app and to control the playlists 
because the APIs we looked at for music do not specify culture but rahter music Genre and when searching it is difficult to decern a 
culture (like French from an artist or group with French in the name) so we manually selected the PL from the provider */

// Array to support the dynamic photos and overcome playlist limitation
const cultures = {
	French: {
		images: ["anthony-delanoix-Q0-fOL2nqZc-unsplash.jpg","adrien-tutin-hCh_PHIhoLI-unsplash.jpg",
              "daniele-d-andreti-ud9u7beav2s-unsplash.jpg","leonard-cotte-c1Jp-fo53U8-unsplash.jpg","niclas-illg-prBNNbXvnh4-unsplash.jpg",
            "romain-huneau-sQaOGfoLDNA-unsplash.jpg"], 
		altImage: ["Eiffel Tower Picture taken by Anthony Delanoix","Castle Wall by Adrien Tutin unsplash",
		"Photo of the Louvre by Daniele D Andreti unsplash","Lavendar field by Leonard Cotte unsplash",
		"Macrons by Niclas Illg unsplash","La Rochelle by Romain Huneau unsplash"],
		playlist: [3748969686,6553706304,1737848082,7881922322,5574391562]
	},
	Indian: {
		images: ["annie-spratt-w3CyGs-keEM-unsplash.jpg","debashis-rc-biswas-xAWb6qDCXDU-unsplash.jpg","julian-yu-_WuPjE-MPHo-unsplash.jpg",
		"kirti-kalla-JRhvllDBhzs-unsplash.jpg","martin-jernberg-nE2gf1scItI-unsplash.jpg","sonika-agarwal-BTT3faMmBwQ-unsplash.jpg"], 
		altImage: ["Indian Building taken by Annie Spratt","Festival of Color by Debashis Biswas unsplash",
		"Taj Mahal by Julian Yuyu-_WuPjE-MPHo-unsplash","Walled City of JaiPur by  Kirti Kalla unsplash",
		"Victoria Memorial by Martin Jernberg unsplash","Statue of Ganesh Sonika Agarwal unsplash.jpg"],
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
				"markus-winkler-_B-ahpq0S7c-unsplash.jpg","sam-beasley-eltps1t7gDY-unsplash.jpg",
				 "shane-young-hOwGHmNcncg-unsplash.jpg","victor-he-0xn9T2cEigE-unsplash.jpg",
				"yiranding-aIG78YGhDmM-unsplash.jpg"], 
		altImage: ["Terracotta Army taken by Alexander Schimmeck","The Great Wall of China by Cat Crawford",
				"Chinese Latern by Makus Winkler","Traditioan Fishing by Sam Beasley","Reflected Mountain by Shane Young",
			    "Chinese Temple by Victor He","Oriental Pearl Tower by Yiranding"],
		playlist: [4962135028,6224909624,969940552,6431991064,6885856824,6324317944]
	},
	Italian:  {
		images: ["italian images.jpg","BumperSticker.jpg","Italian-12icons.jpg","ItalianFlag.jpg",
		"ItalianFood.jpg","braden-collum-75XHJzEIeUc-unsplash.jpg","damiano-baschiera-hFXZ5cNfkOk-unsplash.jpg",
		"italian-cuisine-traditional-dishes-and-salads-vector-17293315.jpg","jack-ward-Riomaggiore-unsplash.jpg"], 
		altImage: ["Image of pizza wirh italian flag","Italian Bumper Sticker","Italian popster with 12 food icons",
		"Italian flag projected on building","Poster of Italian Food","Colleseum by Braden Collum unsplash",
		"Venice Canals by Damiano Baschiera","italiancuisine traditional poster","Riomaggiore by Jack Ward"],
		playlist: [4779177244,8146526982,5353448802,6514155104,272400133]
	}
}
// API Variables section 
var recpAPIKey = "070f982d64c543179d48715c5aaa529d";
var rapidApiKey = "62017d8fd9mshd9035f5f87933f1p1f6d2djsn6ef6fec8205b";


// fetchRecipes is a function that does a search from the spoonacular website - once it find the recipes that meet the criteria
// it gets deails on the recipes like description, wine pairing and url of the actual recipe that we will use later
// it also puts all this data in the localStorage for two reasons so during developement we do not exceed our key counts
// and we also give the user time for these async functions to complete 
// verify they exist and send the user an error if the data is not in localStorage 

// created this had to be an async function because we had to use await to wait for the response before going to next

async function fetchRecipes (cuisine){
 //setting up variables that we may need within and between the function
 let num="50";id="",img="",title="",description="",url="",recipes=[],winePair="";
 let dataResponse = [], recp = {},fetches =[];
 // This get the document element place on the page so we can use it 
 let resPg = document.querySelector('#culture-cards')
 	//clear the recipe storage before we start
	 if(localStorage.getItem("recipes")){
		localStorage.removeItem("recipes")
	}	
//------------------fetch 50 recipes from the country of coice (cuisine variable)----------------------------//	
await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=${num}&apiKey=${recpAPIKey}`, {
 })
   .then(function(resp) {
   return resp.json();
})
.then( async response => {
	// the way the json return the results is an array so pulling that out into an array we can use
	recipes = response["results"];
	// set up an array to store array positions of 5 unique recipes
	let randomRec=[];
	// We are getting up to 100 recipes on a culture this one will help is pick up 5 unique random recipes
	for (let j=0;j <5;j++) {
	//get a random array number	
	let w = getRandomInt(recipes.length);
	// this if statement check do we that array position already in our array then decrement counter so it will go again 
    if (randomRec.includes(w)){j--}else{randomRec.push(w)}
	}

	for (let i=0;i < randomRec.length ; i++) {
	let recNo = randomRec[i]	
	id = recipes[recNo]["id"];
	img = recipes[recNo]["image"];
	title = recipes[recNo]["title"];
    await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${recpAPIKey}`, {
	        	})
	  	    .then(function(mresp) {
	  	      return mresp.json();
   		      })
   		      .then(response1 => {	 
			   description = encodeURI(response1["summary"]);
			   url = encodeURI(response1["spoonacularSourceUrl"]);
               winePair=encodeURI(response1["winePairing"]["pairingText"]);
			   recp = `{"id": "${id}","title": "${title}","image": "${img}","winePair": "${winePair}","description": "${description}","recipeUrl": "${url}"}`;			   
			   dataResponse.push(recp)			 		   
			 })
	}
	localStorage.setItem("recipes",JSON.stringify(dataResponse));
	  })
.catch(err => {
console.error(err);
 });

}


async function fetchPlaylist(listOfPl){
//Use RapidAPI to get playlists from Deezer need to wait for last function to finish 
// Going to save all the data into LocalStorage so we can use that to generate the page
var id="",imgLink
  if(localStorage.getItem("playlist")){
	localStorage.removeItem("playlist")
  }
  // creating an empty array so I can put the music Details there
  let dataPlaylist = [];

  //fetch the playlists for the country
   for (let i=0;i < listOfPl.length; i++) {
	let pl=listOfPl[i]; 
	
    await fetch(`https://deezerdevs-deezer.p.rapidapi.com/playlist/${pl}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key":  + rapidApiKey ,
			"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
		}
	})
	.then(function(resp) {
	  return resp.json();
	  })
	  //Parsing the response so that we can store the individual values
		.then(response => {
			let id = response["id"]
			let url = encodeURI(response["link"]);
		    let imgLink = encodeURI(response["picture_small"]);
			let title = response["title"]
            let plDet= `{"id": "${id}","title": "${title}","image": "${imgLink}","link": "${url}"}`;
			dataPlaylist.push(plDet);
    	})
	.catch(err => {
	console.error(err);
	});
	localStorage.setItem("playlist",JSON.stringify(dataPlaylist));
   }
}

// This will draw the screen with the 5 recipes with descriptions 
async function createDetailRecipeButtons(){
	let resPg = document.querySelector('#culture-cards');
	var myRecipes = [], myPlaylists = [], newtd1="",newtd2="",newimg="";
	//going to check if my playlist and recipe list is there waits up to 40 second
	// do not think we need this anymore because we moved everything to await but will leave in case other issues
	for ( let i = 0; i < 40; i++){	
		if(localStorage.getItem("recipes") && localStorage.getItem("playlist")){
			myRecipes = JSON.parse(localStorage.getItem("recipes"));
			myPlaylists = JSON.parse(localStorage.getItem("playlist"));
			i = 41;
		} else {
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}

      if( myRecipes.length === 0 ){
		//create an error on the screen and the user know there is a problem with the fetch 
		newP = document.createElement("p");
		newP.innerHTML="<p>The Fetch Failed Please Check Your Network</p>";
		resPg.appendChild(newP);
		return;
	  } else {
		let newT = document.createElement("table");
		newT.setAttribute("class","table is-fullwidth is-hoverable");
		newT.setAttribute("id","selectRecipe");
		for(let i=0;i < myRecipes.length;i++){
			//because we store it as an object we need to do a second JSON.parse
			let myRecipes1 = JSON.parse(myRecipes[i])
			// we needed to encode the link and the description or we had a JSON parse error so decoding itet desc = decodeURI(myRecipes1.description);	
			let title = myRecipes1.title;
			let recpId = myRecipes1.id;
			let link = decodeURI(myRecipes1.recipeUrl);
			let image = myRecipes1.image;
			let winePair =  decodeURI(myRecipes1.winePair);
			if (winePair == "undefined") {
				winePair = "We are sorry the full text for your recipe is not available. \
				The play list feature is still available. We apologize for the inconvience."
			}
			newR = document.createElement("tr");
			newR.setAttribute("id",recpId);
			newtd1 = document.createElement("td");
			let newp1 = document.createElement("p");
			newp1.setAttribute("class","text has-text-weight-bold")
            newp1.textContent = title
			let newp2 = document.createElement("p");
			newp2.textContent =  winePair;
			newtd1.appendChild(newp1);
			newtd1.appendChild(newp2);
			newtd2 = document.createElement("td");
			newimg = document.createElement("img")
			newimg.setAttribute("src",image)
			newtd2.appendChild(newimg)
			if(i % 2 === 0){
				newR.appendChild(newtd1)
				newR.appendChild(newtd2)
			} else {
				newR.appendChild(newtd2)
				newR.appendChild(newtd1)
			}
			//newR.appendChild(new1)	
			newT.appendChild(newR)
		}
		resPg.appendChild(newT);
		 //add the listener for the recipe (on row for now)
		 let btnSelect = document.querySelector(`#selectRecipe`);
          btnSelect.addEventListener('click', (event) => {
		  //stop the default click behavior
		   event.preventDefault();  
		  var parent = getClosest(event.target, 'tr');
		 	  
	      //had to use the parent div because the if you click on the paragraph in the row that was the object id 
		  let recp = parent.id;
		
	      event.preventDefault();
		  finalPage(recp);
		  //cleaning up the page after button is clicked
	      let myObj = document.querySelector('#selectRecipe');
	      myObj.remove();
	      });  
	  }

}

function finalPage(recId){
	// get the place where we are going to put the page
	let resPg = document.querySelector('#culture-cards');
	// get music and playlist from local memory
	let myRecipes = JSON.parse(localStorage.getItem("recipes"));
	let myMusic = JSON.parse(localStorage.getItem("playlist"));
	let rdesc="",rtitle="",recpId="",rlink="",rimage="",mhtml="",rhtml="";
	let newC =document.createElement("div");
	newC.setAttribute("class","columns" );
	let newT = document.createElement("div");
	newT.setAttribute("class","column");
     for (let i = 0;i < myRecipes.length; i++){
	let myRecipes1 = JSON.parse(myRecipes[i]);
	// //Process the recipe so we have all the links (we have this but think @Geo going to try iframe)
	if(myRecipes1.id == recId){
	   rlink = decodeURI(myRecipes1.recipeUrl);
	         }
	}
	// this adds the iframe to the page for the recipe
	rhtml = `<figure class="image is-3by5">  
	<iframe class="has-ratio" style="width:500px;height:750px;" src="${rlink}" 
	frameborder="0"></iframe></figure>`;
	newT.innerHTML=rhtml
	newC.appendChild(newT);

    // parse out playlists
	myMusic = JSON.parse(localStorage.getItem("playlist"));
	let myMusic1=[];
	let mDiv = document.createElement("div");
	mDiv.setAttribute("class","column");

    let i = getRandomInt(myMusic.length)
		myMusic1 = JSON.parse(myMusic[i]); 
		let plid = decodeURI(myMusic1.id);
		let mtitle = myMusic1.title;
		let mlink = decodeURI(myMusic1.link);
		mhtml = `<iframe scrolling="no" frameborder="0" allowTransparency="true" title=${mtitle}
		src="https://www.deezer.com/plugins/player?format=square&autoplay=true&playlist=false&width=500&height=500&color=EF5466&layout=&size=medium&type=playlist&id=${plid}&app_id=1" 
		width="500" height="500"></iframe>`
		
		let dhtml = `<div cless="m-4"><button class="button is-large" id="music-link" onclick="window.open(location.href='${mlink}','_blank')">
                 <p class="content is-medium">Click here to listen to complete <br> ${mtitle} playlist</p></button></div>`
	
	mDiv.innerHTML =  mhtml + dhtml;
	newC.appendChild(mDiv);
	resPg.appendChild(newC);
	// Place holder to clear the local storage don't need it now everthing is done but while in dev not executing this
	// 	localStorage.removeItem("recipes");
	// 	localStorage.removeItem("playlist");
}	


//setup array of cultures
function createButtons(cultures){
// gets the element from the web page where we are going to put our new elements
let cards = document.querySelector('#culture-cards');
// Get the keys which are the Countries for cuise
const keys = Object.keys(cultures)
let culture ="",pl="";
//creates a document form element because we will be choosing a cuisine based country
let newF = document.createElement("form");
newF.setAttribute("id","selectCulture")
//Go through the array 
for( let i = 0; i < keys.length; i++){
	// extrates the key because that is the country
	let ck = keys[i];
	// makes a lower case because our asset images directory is lower
	let lc = ck.toLowerCase();
	// this one gets the number of images per country 
	let l1 = cultures[ck]["images"].length;
    // rferences a function we created that returns a random number where the max is the number passed 
	let imgNo = getRandomInt(l1)
	// here we grab a random image name from our cultures array 
	let image = cultures[ck]["images"][imgNo];
	// and the associated alt text that goes with the image
	let altimage = cultures[ck]["altImage"][imgNo];
    //this is the HTML to create the buttons one by one ..... and in a div called row
	let newD = document.createElement("div");
	newD.setAttribute("class","row")
	newD.innerHTML = `<div class="overlay-image"><a href="../"><img src="../images/${lc}/${image}"  alt="${altimage}" style="padding:10px;width:200px;height:200px;">
	<div class=" normal "></div><div class="hover" id=${ck}><img class="image" /><div class="text">${ck}</div></a></div>`
	newF.appendChild(newD);
 }
 // this adds the cards to our form to display on the screen 	
 cards.appendChild(newF);

 //section to add the listeners for the first page that will check for a click in form we created called selectCulture
 // select the element with id  selectCulture (our form) and assign it to btnSelect
 let btnSelect = document.querySelector(`#selectCulture`);
 // add the listener to that object (which is the section on the form btnSelect is the variable) and passes the event 
 // to the local event  
  btnSelect.addEventListener('click', (event) => {
	// we don't want the click to refresh the page so we stop the default click behavior
	event.preventDefault();  
    // because we used the lower case keys (country lower case) as the id for each image 
	// make sure we are clicking in a one of the hover buttons otherwise we wait!
	if(event.target.className == "hover"){	  
	// it will assign variable country to the name 	
	country = event.target.id;
	pl = cultures[country].playlist;
	// this executes async function to fetch recipes passing the country variable 
	fetchRecipes(country);
	// this executes async function to fetch music details passing the country variable 
	fetchPlaylist(pl);
	// this executes function create the details which relies on the fetching functions success 
	createDetailRecipeButtons();
	//cleaning up the created form so the document page culture-cards section can be used for the rest of the application 
	let myObj = document.querySelector('#selectCulture');
	myObj.remove();
	}
	});   
 
}

//supporitng functions - getRandomInt from MDN
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
  }
// borrowed this code from gomakethings because Ineeded to go back to find the closets tr to click 
var getClosest = function (elem, selector) {
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;
};


// this function loads when the html is loaded 
createButtons(cultures);

