let names,
	pairedName;

function shuffle(array) {
    console.log(array)

	var list = array.slice(0),
		copy = [],
		n = list.length,
		i;

	// While there remain elements to shuffle…
	while (n) {

		// Pick a remaining element…
		i = Math.floor(Math.random() * list.length);

		// If not already shuffled, move it to the new array.
		if (i in list) {
			copy.push(list[i]);
			delete list[i];
			n--;
		}
	}

	return copy;
}
function assign(){
    names =document.getElementById("names").value.split("\n");
    console.log(names);
	pairedName = shuffle(names);

    document.getElementById("assignments").innerHTML = "";
	while (names.length) {
		let name1 = names.pop(),
			name2 = pairedName[0] == name1 ? pairedName.pop() : pairedName.shift();
            console.log(name1+" "+ name2)
            // document.getElementById("assignments").appendChild(`<li>${name1} gets ${name2}`);     // Append <li> to <ul> with id="myList"
	}
}
// $('#assign').on('click', function() {
// 	names = $('#names').val().split("\n");
// 	pairedName = shuffle(names);

// 	$('#assignments').html('');
// 	while (names.length) {
// 		let name1 = names.pop(),
// 			name2 = pairedName[0] == name1 ? pairedName.pop() : pairedName.shift();

// 		$('#assignments').append(`<li>${name1} gets ${name2}`);
// 	}
// });
