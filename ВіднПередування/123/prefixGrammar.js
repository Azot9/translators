const EQUEL = "=";
const MORE = ">";
const LESS = "<";




let drawer = new Draw();
let currentLexem;
let isSet;
let lessTemp = [];
 let firstValues = [];

setEquel();
setMoreLess();
cutRepetedValues();

drawer.drawPrefixGrammarTable(grammar);

function setEquel() {
	for (rules in grammar) {
		if (grammar[rules].rule !== undefined) {
			for (let i = 0; i < grammar[rules].rule.length; i++) {
				for (let j = 0; j < grammar[rules].rule[i].length - 1; j++) {
				currentLexem = grammar[rules].rule[i][j];
				isSet = false;
					if (grammar[currentLexem].equels === undefined) {
						grammar[currentLexem].equels = [];
					}
					
					for (let k = 0; k < grammar[currentLexem].equels.length; k++) {
						if ( grammar[currentLexem].equels[k] === grammar[rules].rule[i][j+1]) {
							isSet = true;
						}
					}
					if (!isSet) {
						grammar[currentLexem].equels.push(grammar[rules].rule[i][j+1]); 	
					}
				}
			}
		}
	}
	console.log(grammar);
}

function setMoreLess() {
	for (rules in grammar) {
		if (grammar[rules].equels !== undefined) {
			//debugger;
			for (let i = 0; i < grammar[rules].equels.length; i++) {
				setDeepLess(grammar[rules].equels[i], rules);
				setDeepMore(rules, grammar[rules].equels[i]);
				thirdRule(rules, grammar[rules].equels[i]);
			}
		}
	}
}

function setDeepLess(equel, rules){ // if rules = equel  rules < first(equel)
	if (grammar[equel].rule !== undefined) {
		if (grammar[rules].less === undefined) {
		grammar[rules].less = [];
		}
		for (let i = 0; i < grammar[equel].rule.length; i++) {
			grammar[rules].less.push(grammar[equel].rule[i][0]);
			if (grammar[equel].rule[i][0] !== equel) {
				setDeepLess(grammar[equel].rule[i][0], rules);
			}
		}
	} else if (grammar[rules].less !== undefined) {
		grammar[rules].less.push(equel);
	}
}


function setDeepMore(rules, equel){  

	if (grammar[rules].rule !== undefined) {
		//debugger
		for (let i = 0; i < grammar[rules].rule.length; i++) {
			let arrLast = grammar[rules].rule[i].length - 1;
			if (grammar[grammar[rules].rule[i][arrLast]].more === undefined) {
				grammar[grammar[rules].rule[i][arrLast]].more = [];
			}
			//console.log(grammar[rules].rule[i][arrLast]);
			grammar[grammar[rules].rule[i][arrLast]].more.push(equel);
			if (grammar[rules].more !== undefined && grammar[rules].more.indexOf(equel) === -1) {
				setDeepMore(grammar[rules].rule[i][arrLast], equel);
			}
		}
	} else if (grammar[rules].more !== undefined) {
		grammar[rules].more.push(equel);
	}
}

function thirdRule(rules, equel) {

	if (grammar[rules].rule !== undefined) {
		for (let i = 0; i < grammar[rules].rule.length; i++) {
			let arrLast = grammar[rules].rule[i].length - 1;
			if (grammar[grammar[rules].rule[i][arrLast]].more === undefined) {
				grammar[grammar[rules].rule[i][arrLast]].more = [];
			}
			if (grammar[grammar[rules].rule[i][arrLast]] === ";") {
				console.log("type");
			}
			firstValues.splice(0, firstValues.length);

			grammar[grammar[rules].rule[i][arrLast]].more = grammar[grammar[rules].rule[i][arrLast]].more.concat(findFirst(equel));

			if (grammar[rules].more !== undefined && grammar[rules].more.indexOf(equel) === -1) {
				setDeepMore(grammar[rules].rule[i][arrLast], equel);
			}
		}
	} else if (grammar[rules].more !== undefined) {
		grammar[rules].more = grammar[rules].more.concat(findFirst(equel));
	}
}


function findFirst(equel){
	
	if (grammar[equel].rule !== undefined) {
		for (let i = 0; i < grammar[equel].rule.length; i++) {
			firstValues.push(grammar[equel].rule[i][0]);
			if (grammar[equel].rule[i][0] === "type") {
				//console.log("type");
			}
			if (grammar[equel].rule[i][0] !== equel) {
				findFirst(grammar[equel].rule[i][0]);
			}
		}
	} else if (firstValues !== undefined) {
		firstValues.push(equel);
	}
	return firstValues;
}

function cutRepetedValues() {
	for (rules in grammar) {
		if (grammar[rules].less !== undefined) {
			grammar[rules].less = Array.from(new Set(grammar[rules].less));
		}
		if (grammar[rules].more !== undefined) {
			grammar[rules].more = Array.from(new Set(grammar[rules].more));
		}
	}
}