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
        rule: [ ["for", "(", "appropriation1", ";1", "relation", ";1", "E2", ")1", "{", "operatorsList1", "}"],
              ["for", "(", "appropriation1", ";1", "relation", ";1", "E2", ")1", "operator"] ] 
            },
    conditionalTransition: { 
        rule: [ ["if", "(", "relation", ")1", "{", "operatorsList1", "}"], 
                              ["if", "(", 'relation', ")1", "operator"] ] 
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
        rule: [ ["E1", "relationMark", "E1"] ] 
    },
    relationMark: { 
        rule: [ [">"], ["<"], ["<="], [">="], ["=="], ["!="] ] 
    },
    E1: {
        rule: [["E"]]
    },
    E2: {
        rule: [["E1"]]
    },
    E: { 
        rule: [ ["E", "+", "T1"], ["E", "-", "T1"], ["T"] ] 
    },
    T1: { 
        rule: [ ["T"] ] 
    },
    T: { 
        rule: [ ["T", "*", "S"], ["T", "/", "S"], ["S"] ] 
    },
    S: { 
        rule: [ ["(", "E2", ")1"], ["idn"], ["con"] ] 
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
     ")1": {
        rule: [ [")"] ]
    },
    ";1": {
        rule: [ [";"] ]
    },
    idn1: { 
        rule: [ ["idn"] ] 
    },
}