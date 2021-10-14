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

	function loadDetails(item) {
		let url = item.detailsUrl;
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
			showModal(pokemon);
		});
	}

	// -- show modal function -- 
	let modalContainer = document.querySelector('#modal-container');

	function showModal(pokemon) {
		
		// Clear all existing modal content
		modalContainer.innerHTML = ' ';

		let modal = document.createElement('div');
		modal.classList.add('modal');

		//Add the new modal content 
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'X';
		closeButtonElement.addEventListener('click', hideModal);

		let nameElement = document.createElement('h1');
		nameElement.innerText = pokemon.name;

		let contentElement=document.createElement('p');
		contentElement.innerText = "height:" + pokemon.height;

		let pokemonPic = document.createElement('img');
		pokemonPic.src = pokemon.imageUrl;
		pokemonPic.setAttribute('alt', "Image of " + pokemon.name);

		modal.appendChild(closeButtonElement);
		modal.appendChild(nameElement);
		modal.appendChild(contentElement);
		modal.appendChild(pokemonPic);
		modalContainer.appendChild(modal);

		modalContainer.classList.add('is-visible');
	}

		document.querySelector('#show-modal').addEventListener('click', () => {
			showModal("pokemon.name", 'This is the modal content');
		});

	function hideModal () {
		let modalContainer= document.querySelector('#modal-container');
		modalContainer.classList.remove('is-visible');
	}

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
			hideModal();
		}
	});

	modalContainer.addEventListener('click', (e) => {
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});


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