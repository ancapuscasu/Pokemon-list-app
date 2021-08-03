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
]


pokemonList.forEach(function(pokemon){
	if (pokemon.height>50) {
		document.write(`<p> ${pokemon.name} (height: ${pokemon.height}") - I am a tall Pokemon! </p>`);
	} else {
		document.write(`<p> ${pokemon.name} (height: ${pokemon.height}")</p>`);
	}
})

