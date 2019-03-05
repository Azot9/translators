//
const ERROR = "ERROR";
const EXIT = "EXIT";
const OPERATOR_STATE = 20;
const EAQUAL_STATE = 50;
const E_STATE = 60;
const SEM_FOR1 = [OPERATOR_STATE, 30];
const SEM_FOR2 = [OPERATOR_STATE, 27];
const SEM_IF1 = [OPERATOR_STATE, 36];
const SEM_IF2 = [OPERATOR_STATE, 35];
const SEM_SP_OP = [OPERATOR_STATE, 5];


class State {
	constructor(name, nextState, semPP, stack ){
		this.name = name;
		this.nextState = nextState;
		this.semPP = semPP;
		this.stack = stack;
	}
}

function setState(name, nextState, semPP = ERROR, stack = null) {
	let state = new State(name, nextState, semPP, stack);
	return state;
}

let states = {
	//PA1
	1: [setState("int", 2), setState("float", 2)],
	2: [setState("idn", 3)],
	3: [setState(",", 2), setState(";", 4)],
	4: [setState("int", 2), setState("float", 2), setState("{", OPERATOR_STATE, ERROR, 5)],
	5: [setState(";", 6)],
	6: [setState("}", 7, SEM_SP_OP)],
	7: [setState(null, null, EXIT)],
	//PA middle
	10: [setState("idn", 11)],
	11: [setState("=", E_STATE, ERROR, 22)],
	//PA2
	20: [setState("for", 21),
		   setState("if", 31),
		   setState("cin", 38),
		   setState("cout", 41),
		   setState("idn", 44),
		   setState("goto", 46),
		   setState("@", 48)
	],
	21: [setState("(", 10)],
	22: [setState(";", EAQUAL_STATE, ERROR, 23)],
	23: [setState(";", E_STATE, ERROR, 24)],
	24: [setState(")", 26)],
	26: [setState("{", OPERATOR_STATE, SEM_FOR1, 27)],
	27: [setState(";", 28)],
	28: [setState("}", 30, SEM_FOR2)],
	30: [setState(null, null, EXIT)],
	31: [setState("(", EAQUAL_STATE, ERROR, 32)],
	32: [setState(")", 33)],
	33: [setState("{", OPERATOR_STATE, SEM_IF1, 34)],
	34: [setState(";", 35)],
	35: [setState("}", 37, SEM_IF2)],
	37: [setState(null, null, EXIT)],
	38: [setState(">>", 39)],
	39: [setState("idn", 40)],
	40: [setState(">>", 39, EXIT)],
	41: [setState("<<", 42)],
	42: [setState("idn", 43)],
	43: [setState("<<", 42, EXIT)],
	44: [setState("=", E_STATE, ERROR, 45)],
	45: [setState(null, null, EXIT)],
	46: [setState("idn", 47)],
	47: [setState(null, null, EXIT)],
	48: [setState("idn", 49)],
	49: [setState(null, null, EXIT)],
	//PA3
	50: [setState(null, null, E_STATE, 51)],
	51: [setState(">", E_STATE, ERROR, 52),
		 setState("<", E_STATE, ERROR, 52),
		 setState("<=", E_STATE, ERROR, 52),
		 setState(">=", E_STATE, ERROR, 52),
		 setState("==", E_STATE, ERROR, 52),
		 setState("!=", E_STATE, ERROR, 52),],
	52: [setState(null, null, EXIT)],
	//PA4
	60: [setState("idn", 62),
		 setState("con", 62),
		 setState("(", E_STATE, ERROR, 61)],
	61: [setState(")", 62)],
	62: [setState("+", 60, EXIT),
		 setState("-", 60, EXIT),
		 setState("*", 60, EXIT),
		 setState("/", 60, EXIT)]
		 //setState(null, null, EXIT)]
} 

