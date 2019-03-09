let grammar = {
		program: {
			rule: [ ["declarationList", "{", "operatorsList1", "}"] ] 
		},
		declarationList: { 
			rule: [ ["declarationList", "idnDeclaration"], ["idnDeclaration"] ] 
		},
		idnDeclaration: { 
			rule: [ ["type", "declaration1", ";"] ] 
		},
		type: { 
			rule: [ ["int"], ["float"] ] 
		},
		declaration1: { 
			rule: [ ["declaration"] ]
		},
		declaration: { 
			rule: [ ["declaration", ",", "idn"], ["idn"] ]
		},
		operatorsList1: {
			rule: [ [ "operatorsList" ] ]
		},
		operatorsList: { 
			rule: [ ["operatorsList", "operator", ";"], ["operator", ";"] ]
		},
		operator: { 
			rule: [ ["cycle"], ["conditionalTransition"], ["input"], ["output"],
				    ["appropriation"], ["goto"], ["label"] ] 
		},
		cycle: { 
			rule: [ ["for", "(1", "appropriation1", ";1", "relation", ";2", "E1", ")1", "{", "operatorsList1", "}"],
				    ["for", "(1", "appropriation1", ";1", "relation", ";2", "E1", ")1", "operator"] ] 
				},
		relation1: { 
			rule: [ ["relation"] ] 
		},
		conditionalTransition: { 
			rule: [ ["if", "(", "relation1", ")1", "{", "operatorsList1", "}"], 
					["if", "(", 'relation1', ")1", "operator"] ] 
		},
		input: { 
			rule: [ ["cin", ">>", "idn"], ["input", ">>", "idn"] ] 
		},
		output: { 
			rule: [ ["cout", "<<", "idn"], ["output", "<<", "idn"] ] 
		},
		appropriation1: { 
			rule: [ ["appropriation"] ] 
		},
		appropriation: { 
			rule: [ ["idn1", "=", "E1"] ] 
		},
		relation: { 
			rule: [ ["E1", "relationMark", "E2"] ] 
		},
		relationMark: { 
			rule: [ [">"], ["<"], ["<="], [">="], ["=="], ["!="] ] 
		},
		E1: {
			rule: [["E"]]
		},
		E2: {
			rule: [["E"]]
		},
		E: { 
			rule: [ ["E", "+", "T1"], ["E", "-", "T1"], ["T1"] ] 
		},
		T1: {
			rule: [ ["T"] ]
		},
		T: { 
			rule: [ ["T", "*", "S"], ["T", "/", "S"], ["S"] ] 
		},
		S: { 
			rule: [ ["(2", "E1", ")1"], ["idn"], ["con"] ] 
		},
		goto: { 
			rule: [ ["goto", "idn"] ] 
		},
		label: { 
			rule: [ ["@", "idn"] ] 
		},
		"int": {}, 
		 "float": {}, 
		 "for": {}, 
		 "if": {}, 
		 "goto": {}, 
		 "cin": {}, 
		 "cout": {},
		 "{": {},
		 "}": {},
		 "(": {},
		 ")": {},
		 ".": {},
		 ",": {},
		 ";": {},
		 "<": {},
		 ">": {},
		 "<=": {},
		 ">=": {},
		 "=": {},
		 "!=": {},
		 "<<": {},
		 ">>": {},
		 "+": {},
		 "-": {},
		 "*": {},
		 "/": {},
		 "@": {},
		 "==": {},
		 "idn": {},
		 "con": {},
		 "idn1": {
			rule: [ ["idn"] ]
		 },
		 ";1": {
		 	rule: [ [";"] ]
		 },
		 ";2": {
		 	rule: [ [";"] ]
		 },
		 ")1": {
		 	rule: [ [")"] ]
		 },
		 ")2": {
		 	rule: [ [")1"] ]
		 },
		 "(1": {
		 	rule: [ ["("] ]
		 },
		 "(2": {
		 	rule: [ ["(1"] ]
		 }
	}


	/*
	let grammar = {
		program: {
			rule: [ ["declarationList", "{", "operatorsList1", "}"] ] 
		},
		declarationList: { 
			rule: [ ["declarationList", "idnDeclaration"], ["idnDeclaration"] ] 
		},

		idnDeclaration: { 
			rule: [ ["type", "declaration1", ";2"] ] 
		},
		declaration1: { 
			rule: [ ["declaration"] ] 
		},
		type: { 
			rule: [ ["int"], ["float"] ] 
		},
		declaration: { 
			rule: [ ["declaration", ",", "idn"], ["idn"] ]
		},
		operatorsList1: {
			rule: [ [ "operatorsList" ] ]
		},
		operatorsList: { 
			rule: [ ["operatorsList", "operator", ";"], ["operator", ";"] ]
		},
		operator: { 
			rule: [ ["cycle"], ["conditionalTransition"], ["input"], ["output"],
				    ["appropriation"], ["goto"], ["label"] ] 
		},
		cycle: { 
			rule: [ ["for", "(1", "appropriation1", ";1", "relation", ";2", "E1", ")1", "{", "operatorsList1", "}"],
				  ["for", "(1", "appropriation1", ";1", "relation", ";2", "E1", ")1", "operator"] ] 
				},
		conditionalTransition: { 
			rule: [ ["if", "(1", "relation", ")1", "{", "operatorsList1", "}"], 
								  ["if", "(1", 'relation', ")1", "operator"] ] 
		},
		input: { 
			rule: [ ["cin", ">>", "idn"], ["input", ">>", "idn"] ] 
		},
		output: { 
			rule: [ ["cout", "<<", "idn"], ["output", "<<", "idn"] ] 
		},
		appropriation1: { 
			rule: [ ["appropriation"] ] 
		},
		appropriation: { 
			rule: [ ["idn1", "=", "E1"] ] 
		},
		relation: { 
			rule: [ ["E1", "relationMark", "E2"] ] 
		},
		relationMark: { 
			rule: [ [">"], ["<"], ["<="], [">="], ["=="], ["!="] ] 
		},
		E1: {
			rule: [["E"]]
		},
		E2: {
			rule: [ ["E"] ]
		},
		E: { 
			rule: [ ["E", "+", "T1"], ["E", "-", "T1"], ["T1"] ] 
		},
		T1: {
			rule: [ ["T"] ]
		},
		T: { 
			rule: [ ["T", "*", "S"], ["T", "/", "S"], ["S"] ] 
		},
		S: { 
			rule: [ ["(2", "E1", ")1"], ["idn"], ["con"] ] 
		},
		goto: { 
			rule: [ ["goto", "idn"] ] 
		},
		label: { 
			rule: [ ["@", "idn"] ] 
		},
		"int": {}, 
		 "float": {}, 
		 "for": {}, 
		 "if": {}, 
		 "goto": {}, 
		 "cin": {}, 
		 "cout": {},
		 "{": {},
		 "}": {},
		 "(": {},
		 ")": {},
		 ".": {},
		 ",": {},
		 ";": {},
		 "<": {},
		 ">": {},
		 "<=": {},
		 ">=": {},
		 "=": {},
		 "!=": {},
		 "<<": {},
		 ">>": {},
		 "+": {},
		 "-": {},
		 "*": {},
		 "/": {},
		 "@": {},
		 "==": {},
		 "idn": {},
		 "con": {},
		 "idn1": {
			rule: [ ["idn"] ]
		 },
		 ")1": {
		 	rule: [ [")"] ]
		 },
		 ";2": {
		 	rule: [ [";"] ]
		 },
		 ";1": {
		 	rule: [ [";"] ]
		 },
		 "(1": {
		 	rule: [ ["("] ]
		 },
		 "(2": {
		 	rule: [ ["("] ]
		 }
	}
	*/