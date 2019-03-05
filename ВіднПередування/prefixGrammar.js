const EQUEL = "=";
const MORE = ">";
const LESS = "<";


let drawer = new Draw();
let currentLexem;
let isSet;
let lessTemp = [];

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
	//console.log(grammar);
}

function setMoreLess() {
	for (rules in grammar) {
		if (grammar[rules].equels !== undefined) {
			//debugger;
			for (let i = 0; i < grammar[rules].equels.length; i++) {
				setDeepLess(grammar[rules].equels[i], rules, true);
				setDeepMore(rules, grammar[rules].equels[i]);
				thirdRule(rules, grammar[rules].equels[i]);
			}
		}
	}
}

function setDeepLess(equel, rules, first){ // if rules = equel  rules < first(equel)
if (equel === "+") {
	//debugger;
}
	if (grammar[equel].rule !== undefined) {
		if (grammar[rules].less === undefined) {
		grammar[rules].less = [];
		}
		for (let i = 0; i < grammar[equel].rule.length; i++) {
			grammar[rules].less.push(grammar[equel].rule[i][0]);
			if (grammar[equel].rule[i][0] !== equel) {
				setDeepLess(grammar[equel].rule[i][0], rules, false);
			}
		}
	} else if (!first) {
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





function thirdRule(rules, equel, isRecursive = false) {
		console.log(rules);

	if (grammar[rules].rule !== undefined && grammar[equel].rule !== undefined) {
		for (let i = 0; i < grammar[rules].rule.length; i++) {
			let arrLast = grammar[rules].rule[i].length - 1;
			if (grammar[grammar[rules].rule[i][arrLast]].more === undefined) {
				grammar[grammar[rules].rule[i][arrLast]].more = [];
				
			}
			grammar[grammar[rules].rule[i][arrLast]].more = grammar[grammar[rules].rule[i][arrLast]].more.concat(findFirst(equel));
			thirdRule(grammar[rules].rule[i][arrLast], equel, true)
			// if (grammar[rules].more !== undefined && grammar[rules].more.indexOf(equel) === -1) {
			// 	setDeepMore(grammar[rules].rule[i][arrLast], equel);
			// }
		}
	} else if (isRecursive) {
		grammar[rules].more = grammar[rules].more.concat(findFirst(equel));
	}
}


function findFirst(equel, firstValues = []){
	if (grammar[equel].rule !== undefined) {
		for (let i = 0; i < grammar[equel].rule.length; i++) {
			firstValues.push(grammar[equel].rule[i][0]);
			if (grammar[equel].rule[i][0] !== equel) {
				findFirst(grammar[equel].rule[i][0], firstValues);
			}
		}
	} else if (firstValues.length > 0) {
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