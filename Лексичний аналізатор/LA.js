
 // Constants
const LETTER = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBER = "0123456789";
const OR = "{}();,@:";
const DOT = ".";
const MORE = ">";
const LESS = "<";
const EQUAL = "=";
const EXCL_MARK = "!";
const INC_DEC_MARK = "+-";
const MIL_DIV_MARK = "*/";
const E = "Ee"; 
const SPACE = "\b\n\r\t\u0020";
const lexemTable = [undefined,
				 	"int", 
					 "float", 
					 "for", 
					 "if", 
					 "goto", 
					 "cin", 
					 "cout",
					 "{",
					 "}",
					 "(",
					 ")",
					 ".",
					 ",",
					 ";",
					 ":",
					 "<",
					 ">",
					 "<=",
					 ">=",
					 "=",
					 "!=",
					 "<<",
					 ">>",
					 "+",
					 "-",
					 "*",
					 "/",
					 "@"];
const LABEL = "label";


  	// global variables
  	var lexemNumber = 1;
  	var idnCode = 1;
  	var conCode = 1;
    var text;
    var lastIDNType;
    var lexemCode = 0;
    var lexema = "";
    var state = 1;
	var i = 0;
	var line = 1;

	//arrays
	var lexemes = [];
    var idns = [];
    var cons = [];

	// objects
	var newLexema;
	var newIDN;
    var input = document.getElementById('program');
    var reader = new FileReader();
    var drawer = new Draw();


var openFile = function() {
    reader.onload = function() {
        text = reader.result;
        createLexemTable(text);
        createConsTable();
        drawer.drawLexemTable(lexemes);
        drawer.drawIDNTable(idns);
        drawer.drawConTable(cons);
        console.log(lexemes);
        console.log(idns);
        console.log(cons);
    }
   reader.readAsText(input.files[0]);
};

  	

  	function LexemaCreator(val, line, lexemCode, number, idnCode, conCode) {
  		this.val = val;
  		this.line = line;
  		this.lexemCode = lexemCode;
  		this.number = number;
  		this.idnCode = idnCode;
  		this.conCode = conCode;
  	}

  	function IdnCreator(type) {
  		this.type = type;
  	}

  	function createConsTable(){
  		for (var j = 0; j < lexemes.length; j++) {
  			if(lexemes[j].lexemCode == 101)
  				cons.push(lexemes[j]);
  		}
  	}

  	function findLexemCode(){
  		for (let j = 0; j < lexemTable.length; j++) {
			if ( lexema === lexemTable[j]) {
				return j;
			}
		}
		if ( state == 2 ) {
			return 100;
		} else {
			return 101;
		}
  	}

  	function findIdnCode(lexemCode){

  		if (lexemCode == 100) {
  			for (let j = 0; j < lexemes.length; j++) {
  				if (lexema == lexemes[j].val) {
  					return lexemes[j].idnCode;
  				}
  			}
  			return idnCode++;
  		} else {
  			return 0;
  		}
  	}

  	function findConCode(lexemCode){
  		if (lexemCode == 101) {
  			return conCode++;
  		} else {
  			return 0;
  		}
  	}

	function addIDN(){
			newIDN = new IdnCreator(lastIDNType);
			newIDN.__proto__ = newLexema;
			idns.push(newIDN);
	}

	function IDNStatusCheck(){
		for (let j = 0; j < idns.length; j++) {
			if (idns[j].val == lexemes[lexemes.length - 1].val) {
				return true;
			} 
		}
		return false;
	}

	function nextState(stateNumber) {
  		state = stateNumber;
		lexema = lexema + text[i];
        i++;
  	}

  	function addLexemWithLast() {
		lexema = lexema + text[i];
		i++;
		lexemCode = findLexemCode();
		newLexema = new LexemaCreator(lexema, line, lexemCode, lexemNumber++, findIdnCode(lexemCode), findConCode(lexemCode));
		lexemes.push(newLexema);
		if (newLexema.val == lexemTable[28]){
			lastIDNType = LABEL;
		}
		lexema = "";
		state = 1;
	}

	function addLexemWithoutLast() {
		lexemCode = findLexemCode();
		newLexema = new LexemaCreator(lexema, line, lexemCode, lexemNumber++, findIdnCode(lexemCode), findConCode(lexemCode));
		lexemes.push(newLexema);
		if (newLexema.val == lexemTable[1]) { 
			lastIDNType = lexemTable[1];
		} 
		if (newLexema.val == lexemTable[2]) {
			lastIDNType = lexemTable[2];
		}
		if (lexemes[lexemes.length - 1].lexemCode == 100 && !(IDNStatusCheck())) {
			addIDN();
		}
		lexema = "";
		state = 1;
	}

	function undefinedLexem(lexema) {
        state = 1;
        newLexema = new LexemaCreator(lexema, line, "error", lexemNumber++, "error", "error");
        lexemes.push(newLexema);
        lexema = "";
        i++;
	}


    function createLexemTable(text) {
        while (text[i] != undefined) {
        	switch(state) { 
        		case 1: { 
                    if (LETTER.indexOf(text[i]) != -1) {
                    	nextState(2);
        	            break;
        	        } else if (NUMBER.indexOf(text[i]) != -1) {
                    	nextState(3);
        	            break;
        	        } else if (DOT.indexOf(text[i]) != -1) {
                    	nextState(4);
        	            break;
        	        } else if (OR.indexOf(text[i]) != -1) {
        	        	addLexemWithLast();
        	        	break;
        	        } else if (MORE.indexOf(text[i]) != -1) {
                    	nextState(9);
        	            break;
        	        } else if (LESS.indexOf(text[i]) != -1) {
                    	nextState(10);
        	            break;
        	        } else if (EQUAL.indexOf(text[i]) != -1) {
                    	nextState(11);
        	            break;
        	        } else if (EXCL_MARK.indexOf(text[i]) != -1) {
                    	nextState(12);
        	            break;
        	        } else if (SPACE.indexOf(text[i]) != -1) {
        	        	if (text[i] == "\n")  line++;
        	        	i++;
        	        	break;
        	        } else if ((INC_DEC_MARK.indexOf(text[i]) != -1) || (MIL_DIV_MARK.indexOf(text[i])) != -1) {
        	        	addLexemWithLast();
        	        	break;
        	        } else {
        	        	undefinedLexem(text[i]);
        	        	i++;
        	        	break;
        	        }
        	    };
                case 2: { 
                    if (LETTER.indexOf(text[i]) != -1 || NUMBER.indexOf(text[i]) != -1) {
                    	nextState(2);
        	            break;
        	        } else {
        	        	addLexemWithoutLast();
        	        	break;
        	        }
                };
                case 3: {
                	if (NUMBER.indexOf(text[i]) != -1) {
                        nextState(3);
        	            break;
                	} else if (DOT.indexOf(text[i]) != -1) {
                    	nextState(5);
        	            break;
        	        } else if (E.indexOf(text[i]) != -1) {
                    	nextState(6); 
        	            break;
        	        } else {
        	        	addLexemWithoutLast();
        	        	break;
        	        }
                };
                case 4: {
                	if (NUMBER.indexOf(text[i]) != -1) {
                    	nextState(5);
        	            break;
        	        } else {
        	        	undefinedLexem(text[i]);
        	        	break;
        	        }
                };
                case 5: {
                	if (NUMBER.indexOf(text[i]) != -1) {
                        nextState(5);
        	            break;
                	} else if (E.indexOf(text[i]) != -1) {
                    	nextState(6); 
        	            break;
        	        } else {
        	        	addLexemWithoutLast();
        	        	break;
        	        }
                };
                case 6: {
                	if (NUMBER.indexOf(text[i]) != -1) {
                        nextState(8);
        	            break;
                	} else if (INC_DEC_MARK.indexOf(text[i]) != -1) {
                    	nextState(7); 
        	            break;
        	        } else {
        	        	undefinedLexem(test[i]);
        	        	break;
        	        }
                };
                case 7: {
                	if (NUMBER.indexOf(text[i]) != -1) {
                    	nextState(8);
        	            break;
        	        } else {
        	        	undefinedLexem(test[i]);
        	        	break;
        	        }
                };
                case 8: { 
                    if (NUMBER.indexOf(text[i]) != -1) {
                    	nextState(2);
        	            break;
        	        } else {
        	        	addLexemWithoutLast();
        	        	break;
        	        }
                };
                case 9: {
                	if (MORE.indexOf(text[i]) != -1) {
                        addLexemWithLast();
        	            break;
                	} else if (EQUAL.indexOf(text[i]) != -1) {
                    	addLexemWithLast();
        	            break;
        	        } else {
        	        	addLexemWithoutLast();
        	        	break;
        	        }
                };
                case 10: {
                	if (LESS.indexOf(text[i]) != -1) {
                        addLexemWithLast();
        	            break;
                	} else if (EQUAL.indexOf(text[i]) != -1) {
                    	addLexemWithLast();
        	            break;
        	        } else {
        	        	addLexemWithoutLast();
        	        	break;
        	        }
                };
                case 11: { 
                    if (EQUAL.indexOf(text[i]) != -1) {
                    	addLexemWithLast();
        	        } else {
        	        	addLexemWithoutLast();
        	        	break;
        	        }
                };
                case 12: { 
                    if (EXCL_MARK.indexOf(text[i]) != -1) {
                    	addLexemWithLast();
        	        } else {
        	        	undefinedLexem(text[i]);
        	        	break;
        	        }
                };       	
            }
        };
    }
