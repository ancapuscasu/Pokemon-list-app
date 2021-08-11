let pokemonRepository = (function(){
	let pokemonList = [
// height = inches
{
	name: 'Bulbasaur',
	height: 28,
	types: ['grass', 'poison']
},

{
	name: 'Charizard',
	height: 67,
	types: ['fire', 'flying']
},

{
	name: 'Butterfree',
	height: 43,
	types: ['bug', 'flying']
},

{
	name: 'Dugtrio',
	height: 28,
	types: ['ground']
}
];

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


	function showDetails(pokemon){
		console.log(pokemon);
	}

	function add(pokemon){
		pokemonList.push(pokemon);
	}

	function getAll () {
		return pokemonList;
	}

	function removeLast () {
		pokemonList.pop();
	}

	return {
		add: add,
		getAll: getAll,
		removeLast:removeLast,
		addListItem: addListItem
	};
}) ();

	
pokemonRepository.getAll().forEach(function(pokemon){
	pokemonRepository.addListItem(pokemon);
})