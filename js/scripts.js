let pokemonRepository = (function(){
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';



	function add(pokemon){
		pokemonList.push(pokemon);
	}

	function getAll () {
		return pokemonList;
	}

	function removeLast () {
		pokemonList.pop();
	}


	// -- Function To Add Item And Buttons to Pokedex 

	function addListItem(pokemon){
		let list = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('fancyButton');
		listItem.appendChild(button);
		list.appendChild(listItem);
		button.addEventListener('click', function(event){
			showDetails(pokemon);
		});
	}


	// -- Function to load list of Pokemon from url (pokeapi.co)

	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function(json) {
			json.results.forEach(function (item) {
				let pokemon = {
					name:item.name,
					detailsUrl:item.url 
				};
				add (pokemon);
			});
		}).catch(function(e){
			console.error(e);
		})
	}

	function loadDetails(item){
		let url=item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details){
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types;
		}).catch(function(e){
			console.error(e);
		});
	}
 
 
	function showDetails(pokemon){
		loadDetails(pokemon).then(function () {
			console.log(pokemon);
		});
	}



	return {
		add: add,
		getAll: getAll,
		removeLast:removeLast,
		addListItem: addListItem,
		loadList:loadList,
		loadDetails:loadDetails
	};
}) ();


pokemonRepository.loadList().then(function(){
	pokemonRepository.getAll().forEach(function(pokemon){
		pokemonRepository.addListItem(pokemon);
	});
});