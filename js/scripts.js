let pokemonRepository = (function(){

	//Collection of Pokemon
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


	//Function to add individual Pokemon to pokemonList
	function add(pokemon){
		pokemonList.push(pokemon);
	}

	//Function to return all pokemon from pokemonList 
	function getAll () {
		return pokemonList;
	}


	// -- Function To Add Item And Buttons to Pokedex 

	function addListItem(pokemon){

		//Selecting unordered list from index.html
		let list = document.querySelector('.pokemon-list');

		//Creating list items to go inside ul
		let listItem = document.createElement('li');
		listItem.classList.add('group-list-item', 'col-lg-4', 'col-md-6');

		//Creating buttons for list items 
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('btn', 'btn-warning', 'btn-block');

		//Linking buttons to modal
		button.setAttribute("data-target", "#pokemonModalContainer");
		button.setAttribute('data-toggle', 'modal');

		//EVENT: open modal on click
		button.addEventListener('click', function(event){
			showDetails(pokemon);
		});


		//append button to listItem
		listItem.appendChild(button);
		//append listItem to list
		list.appendChild(listItem);

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


	// Function to load details of each pokemon 
	function loadDetails(pokemon) {
		let url = pokemon.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details){
			pokemon.imageUrl = details.sprites.front_default;
			pokemon.height = details.height;
			pokemon.types = details.types;
		}).catch(function(e){
			console.error(e);
		});
	}
 
 
	function showDetails(pokemon){
		loadDetails(pokemon).then(function () {
			showModal(pokemon);
		});
	}

	// -- show modal function -- 
	let modalContainer = document.querySelector('#pokemonModalContainer');

	function showModal(pokemon) {
		let modalTitle = $('.modal-title');
		let modalBody = $('.modal-body');

		modalTitle.empty();
		modalBody.empty();

		//create element for name in modal
		let nameElement = $("<h1>" + pokemon.name + "</h1>");
		//create img in modal content
		let imageElement = $('<img class = "modal-img">');
		imageElement.attr("src", pokemon.imageUrl);
		//create element for height in modal content
		let heightElement = $('<p>' + "height : " + pokemon.height + "</p>");
		//create element for pokemon in modal content
		let typesNames = [];
		
			Object.keys(pokemon.types).forEach(key => {
				typesNames.push(pokemon.types[key].type.name);
			});

		let typesElement = $('<p>' + "types : " + typesNames + "</p>");


		modalTitle.append(nameElement);
		modalBody.append(imageElement);
		modalBody.append(heightElement);
		modalBody.append(typesElement); 

		modalContainer.classList.add('is-visible');
	}


	// Function to hide modal 
	function hideModal () {
		modalContainer.classList.remove('is-visible');
	}

	// Function to hide modal when Escape key is pressed
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
			hideModal();
		}
	});

	//Function to hide modal when clicking outside of modal
	modalContainer.addEventListener('click', (e) => {
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});

	// Function to search for pokemon using search bar

	let pokemonSearchBar = document.querySelector('#filter');

	pokemonSearchBar.addEventListener('input', function() {
		let pokeListItem = document.querySelectorAll('li');
		let value = pokemonSearchBar.value.toUpperCase();

		pokeListItem.forEach(function(pokemon){
			if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
				pokemon.style.display = 'block';
			} else {
				pokemon.style.display = 'none';
			}
		});
	});


	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList:loadList,
		loadDetails:loadDetails,
		showDetails: showDetails,
        showModal: showModal,
        hideModal:hideModal,
	};
}) ();


pokemonRepository.loadList().then(function(){
	pokemonRepository.getAll().forEach(function(pokemon){
		pokemonRepository.addListItem(pokemon);
	});
});