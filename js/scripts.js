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

for (let i = 0; i < pokemonList.length; i++){
	if (pokemonList[i].height > 50) {
		document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}") - I am a tall Pokemon! </p>`);
	} else {
		document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}")</p>`);
	}
}

