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
		operator1: { 
			rule: [ [ "operator" ] ]
			},
		operator: { 
			rule: [ ["cycle"], ["conditionalTransition"], ["input"], ["output"],
				    ["appropriation"], ["goto"], ["label"] ] 
		},
		cycle: { 
			rule: [ ["for", "(", "appropriation", ";", "relation", ";", "E", ")", "{", "operatorsList1", "}"],
				  ["for", "(", "appropriation", ";", "relation", ";", "E", ")", "operator1"] ] 
				},
		conditionalTransition: { 
			rule: [ ["if", "(", "relation", ")", "{", "operatorsList1", "}"], 
								  ["if", "(", 'relation', ")", "operator1"] ] 
		},
		input: { 
			rule: [ ["cin", ">>", "idn"], ["input", ">>", "idn"] ] 
		},
		output: { 
			rule: [ ["cout", "<<", "idn"], ["output", "<<", "idn"] ] 
		},
		appropriation: { 
			rule: [ ["idn", "=", "E"] ] 
		},
		relation: { 
			rule: [ ["E", "relationMark", "E"] ] 
		},
		relationMark: { 
			rule: [ [">"], ["<"], ["<="], [">="], ["=="], ["!="] ] 
		},
		E: { 
			rule: [ ["E", "+", "T"], ["E", "-", "T"], ["T"] ] 
		},
		T: { 
			rule: [ ["T", "*", "S"], ["T", "/", "S"], ["S"] ] 
		},
		S: { 
			rule: [ ["(", "E", ")"], ["idn"], ["con"] ] 
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
		 "con": {}
	}