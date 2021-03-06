let grammar = {
		program: {
			rule: [ ["declarationList", "{", "operatorsList", "}"] ] 
		},
		declarationList: { 
			rule: [ ["declarationList", "idnDeclaration"], ["idnDeclaration"] ] 
		},
		idnDeclaration: { 
			rule: [ ["type", "declaration", ";"] ] 
		},
		type: { 
			rule: [ ["int"], ["float"] ] 
		},
		declaration: { 
			rule: [ ["declaration", ",", "idn"], ["idn"] ]
		},
		operatorsList: { 
			rule: [ ["operatorsList", "operator", ";"], ["operator", ";"] ]
		},
		operator: { 
			rule: [ ["cycle"], ["conditionalTransition"], ["input"], ["output"],
				    ["appropriation"], ["goto"], ["label"] ] 
		},
		cycle: { 
			rule: [ ["for", "(", "appropriation", ";", "relation", ";", "E", ")", "{", "operatorsList", "}"],
				  ["for", "(", "appropriation", ";", "relation", ";", "E", ")", "operator"] ] 
				},
		conditionalTransition: { 
			rule: [ ["if", "(", "relation", ")", "{", "operatorsList", "}"], 
								  ["if", "(", 'relation', ")", "operator"] ] 
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