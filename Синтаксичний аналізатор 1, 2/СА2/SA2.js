var syntaxTable = [];
let checkState;

class CheckState{
	constructor (number, lexem, state, stack2){
		this.number = number;
		this.lexem = lexem;
		this.state = state;
		this.stack2 = stack2;
	}
}



class SA{
	constructor(states){
		this.stateNum = 1;
		this.iterator = 0;
		this.states = states;
		this.stack = [];
	}

	program() {
		let move;
		let lexemName;
		let flag;
		
		//outer:
		while(this.iterator < lexemes.length) {
		if (this.iterator === 74) {
			//debugger;
		}
					
			for(let j = 0; j < this.states[this.stateNum].length; j++) {
				flag = false;
				move = this.states[this.stateNum][j];

				if (lexemes[this.iterator].lexemCode === 100) {
					lexemName = "idn";
				} else if (lexemes[this.iterator].lexemCode === 101) {
					lexemName = "con";
				} else {
					lexemName = lexemes[this.iterator].val;
				}
				 
				if (move.name === lexemName) {
					this.iterator++;
					this.stateNum = move.nextState;
					if (typeof(move.stack) === "number" ) {
						this.stack.push(move.stack);
					}
					break;
				} 

				if (typeof(move.semPP) === "number") {
					this.stateNum = move.semPP;
					this.stack.push(move.stack);
					break;
				}

				flag = true;
			}
			checkState = new CheckState(this.iterator, lexemName, this.stateNum, this.stack.slice(0));
			syntaxTable.push(checkState);
			if (flag) {
				if (move.semPP === EXIT) {
						this.stateNum = this.stack.pop();
						continue;
				}
				if (typeof(move.semPP) === "object") {
					this.stateNum = move.semPP[0];
					this.stack.push(move.semPP[1]);
					continue;
				}
				if (typeof(move.semPP) === "number") {
					this.stateNum = move.semPP;
					continue;
				}
				console.log("ERROR" + lexemes[this.iterator].line);
				return 0;
			}
			//console.log("ERROR" + lexemes[this.iterator].line);
		}
		console.log("beautiful");
	}
}