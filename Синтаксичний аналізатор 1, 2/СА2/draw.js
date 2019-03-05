function Draw(){
	this.drawCode = function(text){
		let textArea = document.getElementById("exampleFormControlTextarea1");
		textArea.appendChild(document.createTextNode(text));
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
	this.removeAll = function(){
		let tbodyLexem = document.getElementById("tbodyLexem");
		for (let k = 0; k < tbodyLexem.childNodes.length; ) {
      		tbodyLexem.childNodes[k].remove(); 
  	  	}
  	  	let tbodyIDN = document.getElementById("tbodyIDN");
  	  	for (let j = 0; j < tbodyIDN.childNodes.length;) {
      		tbodyIDN.childNodes[j].remove(); 
  	  	}
  	  	let tbodyCON = document.getElementById("tbodyCON");
  	  	for (let j = 0; j < tbodyCON.childNodes.length;) {
      		tbodyCON.childNodes[j].remove(); 
  	  	}
	}
		this.drawSyntaxTable = function(syntaxTable){
		let row;
		let numberColumn, lexemColumn, stateColumn, stackColumn;
		let tbodySyn;
		for (let j = 0; j < syntaxTable.length; j++) {
			tbodySyn = document.getElementById("tbodySyn");
			row = document.createElement("tr")

			numberColumn = document.createElement("td");
			lexemColumn = document.createElement("td");
			stateColumn = document.createElement("td");
			stackColumn = document.createElement("td");

			numberColumn.appendChild(document.createTextNode(syntaxTable[j].number));
			lexemColumn.appendChild(document.createTextNode(syntaxTable[j].lexem));
			stateColumn.appendChild(document.createTextNode(syntaxTable[j].state));
			stackColumn.appendChild(document.createTextNode(syntaxTable[j].stack2));

			row.appendChild(numberColumn);
			row.appendChild(lexemColumn);
			row.appendChild(stateColumn);
			row.appendChild(stackColumn);
			tbodySyn.appendChild(row);
			//console.log(syntaxTable);
		}
	}
}