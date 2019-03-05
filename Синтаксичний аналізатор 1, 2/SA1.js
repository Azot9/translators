//SyntaxAnaliz
		const TYPE_ERROR = "unexpected type";
		const MISSED_8 = "missed '{'";
		const MISSED_9 = "missed '}'";
		const MISSED_10 = "missed '('";
		const MISSED_11 = "missed ')'";
		const MISSED_13 = "missed ','";
		const MISSED_14 = "missed ';'";
		const MISSED_20 = "missed '='";
		const MISSED_22 = "missed '<<'";
		const MISSED_23 = "missed '>>'";
		const MISSED_100 = "missed identificator";
		const MISSED_101 = "missed constanta";
		const MISSED_100_101 = "missed identificator or constanta";
		const MISSED_MATH_OPERATOR = "missed math operator";
		const MISSED_EQUAL_OPERATOR = "missed equal operator";
		const OPERATOR_ERROR= "unexpected operator";
		const END_CODE = "You have code after end of program";


 class SA{
 
    constructor(){
		this.iterator = 0;
		this.errorMessage = "";
		this.errorCatcher = false;
		this.figureBracketIterator = 0;
		this.arcBracketIterator = 0;
        //console.log(lexemes);
       // console.log(idns);
    	//console.log(cons);
    }

	error(notice) {
		console.log(`line   ${lexemes[this.iterator].line}:  ${notice}`);
		this.errorCatcher = true;
	}

	program(){
		if (this.declarationList()) {
			if (lexemes[this.iterator].val === "{") {
				this.figureBracketIterator++;
				this.iterator++;
			} else {
				this.error(MISSED_8);
				return false;
			}
			
			if (this.operatorsList()){
				if ((lexemes[this.iterator].val === "}" && this.figureBracketIterator > 0)) {
					this.figureBracketIterator--;
					this.iterator++;
					if (lexemes[this.iterator] !== undefined && this.figureBracketIterator === 0) {
						this.error(END_CODE);
					}
					console.log("End compiling");
				} else {
					this.error(MISSED_9);
						return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

/*
	declarationList(){	
		if (this.declaration()) {
			while(this.declaration()) {}
			return true;
		} else {
			return false;
		}
	}
*/
	declarationList(){	
		if (this.declaration()) {
			while(lexemes[this.iterator].val === "int" || lexemes[this.iterator].val === "float") {
				if (!this.declaration()) return false;
			}
			return true;
		} else {
			return false;
		}
	}


	declaration(){
		if (this.type()) {
			if (this.idnDeclaration()) {
				if (lexemes[this.iterator].val === ";") {
					this.iterator++;
					return true;
				} else {
					this.error(MISSED_14);
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	type(){
		if (lexemes[this.iterator].val === "int" || lexemes[this.iterator].val === "float") {
			this.iterator++;
			return true;
		} else {
			this.error(TYPE_ERROR);
			return false;
		}
	}

	idnDeclaration(){
		if (lexemes[this.iterator].lexemCode === 100) {
			this.iterator++;
			while (lexemes[this.iterator].val === ",") {
				this.iterator++;
				if (lexemes[this.iterator].lexemCode === 100) {
					this.iterator++;
				} else {
					this.error(MISSED_100);
					return false;
				}
			}
		return true;	
		} else {
			this.error(MISSED_100);
			return false;
		}
	}

	operatorsList(){
		if (this.operator()) {
			if (lexemes[this.iterator].val === ";") {
				this.iterator++;
				while (this.figureBracketIterator > 0 && lexemes[this.iterator].val !== "}") {
					if (this.operator()) {
						if (lexemes[this.iterator].val === ";") {
							this.iterator++;
						} else {
							this.error(MISSED_14);
							return false;
						}
					} else {
						return false;
					}	
				}
				//this.iterator++;
				return true;
			} else {
				this.error(MISSED_14);
				return false;			
			}
		} else {
			return false;
		}
	}

	operator() {
		if (this.conditionalTransition()) {
			return true;
		} else if (this.input())  {
			return true;
		} else 	if (this.output()) {
			return true;
		} else if (this.appropriation()) {
			return true;
		} else if (this.goto()) {
			return true;
		} else if (this.label()) {
			return true;
		} else if (this.cycle()) {
			return true;
		} 

		this.error(OPERATOR_ERROR);
		return false;
	}

	cycle() {
		if (lexemes[this.iterator].val === "for") {
			this.iterator++;

			if (lexemes[this.iterator].val !== "(") {
				this.error(MISSED_10);
				return false;
			}
			this.iterator++;

			if (!this.appropriation()) return false;

			if (lexemes[this.iterator].val !== ";") {
				this.error(MISSED_14);
				return false;
			}
			this.iterator++;

			if (!this.relation()) return false;

			if (lexemes[this.iterator].val !== ";") {
				this.error(MISSED_14);
				return false;
			}
			this.iterator++;

			if (!this.E()) return false;

			if (lexemes[this.iterator].val !== ")") {
				this.error(MISSED_11);
				return false;
			}
			this.iterator++;

			if (lexemes[this.iterator].val === "{") {
				this.figureBracketIterator++;
				this.iterator++;
				if (this.operatorsList()) {
					if (lexemes[this.iterator].val === "}" && this.figureBracketIterator > 1) {
						this.figureBracketIterator--;
						this.iterator++;
						return true;
					} else {
						this.error(MISSED_9);
						return false;
					}
				}
			} else if (this.operator()) {
				return true;
			} else {
			return false;
			//this.error(OPERATOR_ERROR);
			}
		}
		return false;
	}

	conditionalTransition() {
		if (lexemes[this.iterator].val === "if") {
		this.iterator++;

			if (lexemes[this.iterator].val !== "(") {
				this.error(MISSED_10);
				return false;
			}
			this.iterator++;

			if (!this.relation()) return false;

			if (lexemes[this.iterator].val !== ")") {
				this.error(MISSED_11);
				return false;
			}
			this.iterator++;

			if (lexemes[this.iterator].val === "{") {
				this.figureBracketIterator++;
				this.iterator++;
				if (this.operatorsList()) {
					if (lexemes[this.iterator].val === "}" && this.figureBracketIterator > 1) {
						this.figureBracketIterator--;
						this.iterator++;
						return true;
					} else {
						this.error(MISSED_9);
						return false;
					}
				}
			} else if (this.operator()) {
				return true;
			} else {
			return false;
			//this.error(OPERATOR_ERROR);
			}

		}
		return false;
	}

	input() {
		if (lexemes[this.iterator].val === "cin") {
			this.iterator++;
			do {
				if (lexemes[this.iterator].val !== ">>") {
					this.error(MISSED_23);
					return false;
				}
				this.iterator++;

				if (lexemes[this.iterator].lexemCode !== 100) {
					this.error(MISSED_100);
					return false;
				}
				this.iterator++;
			} while(lexemes[this.iterator].val === ">>");
			return true;
		}
		return false;
	}

	output() {
		if (lexemes[this.iterator].val === "cout") {
			this.iterator++;
			do {
				if (lexemes[this.iterator].val !== "<<") {
					this.error(MISSED_22);
					return false;
				}
				this.iterator++;

				if (lexemes[this.iterator].lexemCode !== 100) {
					this.error(MISSED_100);
					return false;
				}
				this.iterator++;
			} while(lexemes[this.iterator].val === "<<");
			return true;
		}
		return false;
	}

	appropriation() {
		if (lexemes[this.iterator].lexemCode === 100) {
			this.iterator++;

			if (lexemes[this.iterator].val !== "=") {
				this.error(MISSED_20);
				return false;
			}
			this.iterator++;	

			if (!this.E()) return false;

			return true;
		}
		return false;
	}

	goto() {
		if (lexemes[this.iterator].val === "goto") {
			this.iterator++;

			if (lexemes[this.iterator].lexemCode !== 100) {
				this.error(MISSED_100);
				return false;
			}
			this.iterator++;
			return true;
		}
		return false;
	}

	label() {
		if (lexemes[this.iterator].val === "@") {
			this.iterator++;

			if (lexemes[this.iterator].lexemCode !== 100) {
				this.error(MISSED_100);
				return false;
			}
			this.iterator++;
			return true;
		}
		return false;
	}

	relation() {
		if (!this.E()) return false;
		if (!this.relationMark()) return false;
		if (!this.E()) return false;

		return true;
	}

	relationMark() {
		if (lexemes[this.iterator].val === ">") {
			this.iterator++;
			return true;
		}
		if (lexemes[this.iterator].val === "<") {
			this.iterator++;
			return true;
		}
		if (lexemes[this.iterator].val === ">=") {
			this.iterator++;
			return true;
		}
		if (lexemes[this.iterator].val === "<=") {
			this.iterator++;
			return true;
		}
		if (lexemes[this.iterator].val === "==") {
			this.iterator++;
			return true;
		}
		if (lexemes[this.iterator].val === "!=") {
			this.iterator++;
			return true;
		}
		this.error(MISSED_EQUAL_OPERATOR);
		return false;
	}


	E() {
		if (this.T()) {
			while (lexemes[this.iterator].val === "+" || lexemes[this.iterator].val === "-") {
				this.iterator++;
				if (!this.T()) return false;
				}
				return true;
		} else {
			return false;
		}
	}

	T() {
		if (this.S()){
			while (lexemes[this.iterator].val === "*" || lexemes[this.iterator].val === "/") {
				this.iterator++;
				if(!this.S()) return false;
			}
			return true;
		} else {
			return false;
		}
	}


	S() {
		if (lexemes[this.iterator].val === "(") {
			this.iterator++;
			if (!this.E()) return false;
			if (lexemes[this.iterator].val === ")") {
				this.iterator++;
				return true;
			} else {
				this.error(MISSED_11);
				return false;
			}
		}  else if (lexemes[this.iterator].lexemCode === 100) {
			this.iterator++;
			return true;
		} else if (lexemes[this.iterator].lexemCode === 101) {
			this.iterator++;
			return true;
		}
		this.error(MISSED_100_101);
		return false;
	}
}