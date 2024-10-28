var reservedSeats = {
	record1: {
		seat: "b19",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record2: {
		seat: "b20",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record3: {
		seat: "b21",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record4: {
		seat: "b22",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	}
};


// const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t" ];

// let html = "";
// let counter = 1;

// // rows.forEach(  row => {
// //     html += `<div class="label">${row}</div>`;
    
// //     for (let i = 0; i < 3; i++) {
// //         html+= `<div id="${row + counter}">${counter}</div>`;
// //         counter++;
// //     }
// //     counter = counter + 12;
// // });

// // document.getElementById('left').innerHTML = html;


// //  html = "";
// // counter = 1;

// // rows.forEach(  row => {
    
// //     counter = counter + 12;
// //     for (let i = 0; i < 3; i++) {
// //         html+= `<div id="${row + counter}">${counter}</div>`;
// //         counter++;
// //     }
// //     html += `<div class="label">${row}</div>`
// // });

// // document.getElementById('right').innerHTML = html;



// // html = "";
// // counter = 1;

// // rows.forEach( row => {
// //  counter = counter + 3;
// //  for (let i = 0; i < 9; i++) {
// //     html += `<div id="${row + counter}">${counter}</div>`;
// //     counter++;

// //  }

// //  counter = counter +3;
// // })

// // document.getElementById('middle').innerHTML = html;



function makeRows(sectionLength, rowLength, placement) {
    const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t" ];

let html = "";
let counter = 1;

rows.forEach( row => {
    switch(placement) {
        case "left": html += `<div class="label">${row}</div>`; break;
        case "right": counter = counter + (rowLength - sectionLength); break;
        default:    counter = counter + ((rowLength - sectionLength) / 2); break;
    }

    for (let i = 0; i < sectionLength; i++) {
        html += `<div class="a" id="${row + counter}">${counter}</div>`;
        counter++;
    }

    switch(placement) {
        case "left": counter = counter + (rowLength - sectionLength); break;
        case "right": html += `<div class="label">${row}</div>`; break;
        default:     counter = counter + ((rowLength - sectionLength)/2); break;
    }
})
 document.getElementById(placement).innerHTML = html;
}

makeRows(3, 15, "left");
makeRows(3, 15, "right");
makeRows(9 ,15, "middle");

( function(){for (const key in reservedSeats) {
	if(reservedSeats.hasOwnProperty(key));

	const obj = reservedSeats[key];

	document.getElementById(obj.seat).className="r";
	// document.getElementById(obj.seat).innerHTML = "R";
}}());


(function(){
	"use strict";

	var selectedSeats = [];
	var seats = document.querySelectorAll('.a');

	seats.forEach(function(seat){
		seat.addEventListener('click', (event) => {
			seatSelectionProcess(seat.id)
			event.preventDefault();
		});
	})

	function seatSelectionProcess(thisSeat){
		if(!document.getElementById(thisSeat).classList.contains('r')){
		var index = selectedSeats.indexOf(thisSeat);

		if(index > -1) {
			selectedSeats.splice(index, 1);
			document.getElementById(thisSeat).className="a";
		}

		else {
			selectedSeats.push(thisSeat);
			document.getElementById(thisSeat).className="s";

		}
		manageconfirmForm();
		}
	}

	// Event listener for the reserve button to open the form...
document.getElementById('reserve').addEventListener('click', (event) => {
	document.getElementById('resform').style.display="block";
	event.preventDefault();
})

// Event listener to close the form if cancel is clicked
document.getElementById('cancel').addEventListener('click', (event)=> {
	document.getElementById('resform').style.display="none";
	event.preventDefault();
})

function manageconfirmForm(){
	if (selectedSeats.length > 0) {
		document.getElementById('confirmres').style.display = "block";

		if(selectedSeats.length === 1){
			document.getElementById("selectedseats").innerHTML = `You have selected seat ${selectedSeats[0]}`;
		}
			else {

				let seatString = selectedSeats.toString();
		seatString = seatString.replace(/,/g,", ");
		seatString = seatString.replace(/, (?=[^,]*$)/, ' and ');
		document.getElementById("selectedseats").innerHTML = `You have selected seats ${seatString}`;
			}
		
	}
	else {
		document.getElementById('confirmres').style.display = "none";

		document.getElementById("selectedseats").innerHTML='You need to select some seats to reserve. <a href="#" id="error">Close</a> this dialog box and pick atleast one seat.';

		document.getElementById('error').addEventListener('click', () => {
			document.getElementById('resform').style.display = "none";
			
		})
	}
}
manageconfirmForm();


document.getElementById('confirmres').addEventListener('submit', (event)=>{
	processReservation();
	event.preventDefault();
});

function processReservation(){
	const hardCodeRecords = Object.keys(reservedSeats).length;
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	let counter = 1;
	let nextRecord = '';

	selectedSeats.forEach( thisSeat => {
		document.getElementById(thisSeat).className="r";

		nextRecord = `record${hardCodeRecords + counter}`;
		reservedSeats[nextRecord] = {
			seat: thisSeat,
			owner: {
				firstName:firstName,
				lastName:lastName
			}
		};
		counter++;
	});

	document.getElementById('resform').style.display="none";
	selectedSeats = [];
	manageconfirmForm();
}
}());



