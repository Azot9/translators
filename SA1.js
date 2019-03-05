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


 class SA{
 
    constructor(){
		this.gramarState = false;
		this.iterator = 0;
		this.figureBracketIterator = 0;
		this.arcBracketIterator = 0;
        console.log(lexemes);
        console.log(idns);
    	console.log(cons);
    }

	error(notice) {
		console.log(`line   ${lexemes[this.iterator].line}:  ${notice}`);
	}

	program(){
		if (this.declarationList()) {
			if (lexemes[this.iterator].val === "{") {
				this.iterator++;
				//console.log("{ exist");
				if (this.operatorsList()){
					if (lexemes[this.iterator] === undefined || lexemes[this.iterator].val === "}") {
						console.log("Congratulation! This program is beautiful!");
					} else {
						this.error(MISSED_9);
					}
				}
			} else {
				this.error(MISSED_8);
			}
		}
	}

	declarationList(){	
		while(lexemes[this.iterator].val !== "{") {
			if(this.declaration()){
			} else {
				return false;
			}
		}
		return true;
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
			}
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
		while (lexemes[this.iterator].val !== ";") {
			if (lexemes[this.iterator].lexemCode === 100) {
				this.iterator++;
				if (lexemes[this.iterator].val === ",") {
					this.iterator++;
				} else if (lexemes[this.iterator].val === ";"){
					break;
				} else if (lexemes[this.iterator].lexemCode !== 100) {
					this.error(MISSED_14);
					return false;					
				} else {
					this.error(MISSED_13);
					return false;
				}
			} else {
				this.error(MISSED_100);
				return false;
			}
		}
		return true;
	}

	operatorsList(){
		if (this.operator()) {
			if (lexemes[this.iterator].val === ";") {
				this.iterator++;
				while (lexemes[this.iterator].val !== "}") {
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
		}
	}

	operator() {
		if (this.conditionalTransition()) return true;
		if (this.input()) return true;
		if (this.output()) return true;
		if (this.appropriation()) return true;
		if (this.goto()) return true;
		if (this.label()) return true;
		if (this.cycle()) return true;

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
				this.iterator++;
				if (this.operatorsList()) {
					if (lexemes[this.iterator].val === "}") {
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
			this.error(OPERATOR_ERROR);
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
				this.iterator++;
				if (this.operatorsList()) {
					if (lexemes[this.iterator].val === "}") {
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
			this.error(OPERATOR_ERROR);
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
		if (this.T()){
			if (lexemes[this.iterator].val === "+" || lexemes[this.iterator].val === "-") {
				this.iterator++;
				if(!this.E()) return false;
			}
			return true;
		} else {
			return false;
		}

	}

	T() {
		if (this.S()){
			if (lexemes[this.iterator].val === "*" || lexemes[this.iterator].val === "/") {
				this.iterator++;
				if(!this.T()) return false;
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
		}
		if (lexemes[this.iterator].lexemCode === 100) {
			this.iterator++;
			return true;
		}
		if (lexemes[this.iterator].lexemCode === 101) {
			this.iterator++;
			return true;
		}

		this.error(MISSED_100_101);
		return false;
	}
}