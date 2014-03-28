/*
 * Gramatica para lenguaje PL0
 */

{
  var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}

/* program --> block '.' */

/* block --> VAR var procedure st 
*			 /CONST constant VAR var procedure st
*			 /CONST constant procedure st
*			 /CONST constant procedure st
*			 /procedure st */ 
/* AUX RULES FOR BLOCK*/
/* constant  --> ID ASSIGN NUMBER (COMA ID ASSIGN NUMBER)* SEMICOLON */
/* var  --> ID (COMA ID)* SEMICOLON */

/* procedure --> (PROCEDURE ID args? SEMICOLON block SEMICOLON)* */      


/* AUX RULE FOR STATEMENT*/
/*args --> LEFTPAR ID (COMA ID)* RIGHTPAR */  


/*st  --> ID ASSIGN exp
*      / CALL ID args?
*       / BEGIN st (PYC st)* END
*       / IF cond THEN st ELSE st
*       / IF cond THEN st
*       / WHILE cond DO st */
st     = i:ID ASSIGN e:exp            
            { return {type: '=', left: i, right: e}; }
       / IF e:exp THEN st:st ELSE sf:st
           {
             return {
               type: 'IFELSE',
               c:  e,
               st: st,
               sf: sf,
             };
           }
       / IF e:exp THEN st:st    
           {
             return {
               type: 'IF',
               c:  e,
               st: st
             };
           }
		   
/*condition  --> ODD exp
*              / exp COND exp */

/* exp --> ADDSUB? term   (ADDSUB term)* */  
exp    = t:term   r:(ADD term)*   { return tree(t,r); }


/* term --> factor (MULTDIV factor)* */
term   = f:factor r:(MUL factor)* { return tree(f,r); }


/* factor --> NUMBER
*			 /ID
*			 /LEFTPAR exp RIGHTPAR */
factor = NUMBER
       / ID
       / LEFTPAR t:exp RIGHTPAR   { return t; }

_ = $[ \t\n\r]*

//TERMINALS
ASSIGN   = _ op:'=' _  { return op; }
ADDSUB      = _ op:[+-] _ { return op; }
MULTDIV      = _ op:[*/] _ { return op; }
CONDITION     = _ op:$([<>=!][=]/[<>]) _ { return op; }
LEFTPAR  = _"("_
RIGHTPAR = _")"_
SEMICOLON  = _";"_
COMA     = _","_
DOT      = _"."_
CALL     = _ "call" _
BEGIN    = _ "begin" _
END      = _ "end" _
PROCEDURE = _ "procedure" _
CONST    = _ "const" _
VAR      = _ "var" _
IF       = _ "if" _
THEN     = _ "then" _
ELSE     = _ "else" _
WHILE    = _ "while" _
DO       = _ "do" _
ODD      = _ "odd" _
ID       = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ 
            { 
              return { type: 'ID', value: id }; 
            }
NUMBER   = _ digits:$[0-9]+ _ 
            { 
              return { type: 'NUM', value: parseInt(digits, 10) }; 
            }
