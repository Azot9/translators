function Draw(){
	this.drawCode = function(text){
		let textDiv = document.getElementById("FormCode");
		textDiv.appendChild(document.createTextNode(text));
	}

	this.drawLexemTable = function(lexemes){
		let row;
		let numberColumn, lineColumn, lexemCodeColumn, lexemValueColumn, lexemIdnCodeColumn, lexemConCodeColumn;
		let tbody;
		for (let j = 0; j < lexemes.length; j++) {
			tbody = document.getElementById("tbodyLexem");
			row = document.createElement("tr")

			numberColumn = document.createElement("td");
			lineColumn = document.createElement("td");
			lexemCodeColumn = document.createElement("td");
			lexemValueColumn = document.createElement("td");
			lexemIdnCodeColumn = document.createElement("td");
			lexemConCodeColumn = document.createElement("td");

			numberColumn.appendChild(document.createTextNode(j));
			lineColumn.appendChild(document.createTextNode(lexemes[j].line));
			lexemCodeColumn.appendChild(document.createTextNode(lexemes[j].lexemCode));
			lexemValueColumn.appendChild(document.createTextNode(lexemes[j].val));
			lexemIdnCodeColumn.appendChild(document.createTextNode(lexemes[j].idnCode));
			lexemConCodeColumn.appendChild(document.createTextNode(lexemes[j].conCode));

			row.appendChild(numberColumn);
			row.appendChild(lineColumn);
			row.appendChild(lexemCodeColumn);
			row.appendChild(lexemValueColumn);
			row.appendChild(lexemIdnCodeColumn);
			row.appendChild(lexemConCodeColumn);
			tbody.appendChild(row);
		}
	}

	this.drawIDNTable = function(idns){
		let row;
		let numberColumn, idnValueColumn, idnTypeColumn;
		let tbody;
		for (let j = 0; j < idns.length; j++) {
			tbody = document.getElementById("tbodyIDN");
			row = document.createElement("tr")

			numberColumn = document.createElement("td");
			idnValueColumn = document.createElement("td");
			idnTypeColumn = document.createElement("td");

			numberColumn.appendChild(document.createTextNode(idns[j].idnCode));
			idnValueColumn.appendChild(document.createTextNode(idns[j].val));
			idnTypeColumn.appendChild(document.createTextNode(idns[j].type));

			row.appendChild(numberColumn);
			row.appendChild(idnValueColumn);
			row.appendChild(idnTypeColumn);
			tbody.appendChild(row);
		}
	}
	this.drawConTable = function(cons){
		let row;
		let numberColumn, conValueColumn;
		let tbody;
		console.log(cons);
		for (let j = 0; j < cons.length; j++) {
			tbody = document.getElementById("tbodyCON");
			row = document.createElement("tr")

			numberColumn = document.createElement("td");
			conValueColumn = document.createElement("td");

			numberColumn.appendChild(document.createTextNode(cons[j].conCode));
			conValueColumn.appendChild(document.createTextNode(cons[j].val));

			row.appendChild(numberColumn);
			row.appendChild(conValueColumn);
			tbody.appendChild(row);
		}
	}
}