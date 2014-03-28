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
program  = b:block DOT { return { type: 'program', block: b } }

/* block --> VAR var procedure st 
*			 /CONST constant VAR var procedure st
*			 /CONST constant procedure st
*			 /CONST constant procedure st
*			 /procedure st */ 
/* AUX RULES FOR BLOCK*/
/* constant  --> ID ASSIGN NUMBER (COMA ID ASSIGN NUMBER)* SEMICOLON */
constant   = i:ID ASSIGN n:NUMBER c:(COMA ID ASSIGN NUMBER)* SEMICOLON 
           {     
             
             var result = [{type: '=', left: i, right: n}];
             for (var x = 0; x < c.length; x++)
               result.push({type: '=', left: c[x][1], right: c[x][3]});
             
             return result;
           }
		   
/* var  --> ID (COMA ID)* SEMICOLON */
var    = i:ID v:(COMA ID)* SEMICOLON
           {     
             
             var ids = [i];
             for (var x = 0; x < v.length; x++)
               ids.push(v[x][1]);
             
             return ids;
           }
		   
/* procedure --> (PROCEDURE ID args? SEMICOLON block SEMICOLON)* */      
procedure  = p:(PROCEDURE ID args? SEMICOLON block SEMICOLON)*
           {
                  
             var result = [];
             for (var x = 0; x < p.length; x++)
               result.push({type: 'procedure', id: p[x][1], arguments: p[x][2], block: p[x][4]});
             
             return result;
           }

/* AUX RULE FOR STATEMENT*/
/*args --> LEFTPAR ID (COMA ID)* RIGHTPAR */
args   = LEFTPAR i:ID is:(COMA ID)* RIGHTPAR
           {
     
             var result = [i];
             for (var x = 0; x < is.length; x++)
               result.push(is[x][1]);
             
             return result;
           }
  
/*condition  --> ODD exp
*              / exp COND exp */
condition   = o:ODD e:exp { return { type: o, expression: e }; }
			/ e1:exp c:CONDITION e2:exp { return { type: c, left: e1, right: e2 }; }
   
/*st  --> ID ASSIGN exp
*      / CALL ID args?
*       / BEGIN st (PYC st)* END
*       / IF cond THEN st ELSE st
*       / IF cond THEN st
*       / WHILE cond DO st */
st     = i:ID ASSIGN e:exp            
            { return { type: '=', left: i, right: e }; }
       / CALL i:ID a:args? 
           { 
             return { type: 'call', id: i, arguments: a }; 
           }
       / BEGIN l:st r:(SEMICOLON st)* END
           { 
             var result = [l];
               for (var i = 0; i < r.length; i++)
                 result.push(r[i][1]);
         
               return result;
           }
       / IF c:condition THEN st:st ELSE sf:st
           {
             return {
               type: 'IFELSE',
               condition:  e,
               true_st: st,
               false_st: sf,
             };
           }
       / IF c:condition THEN st:st    
           {
             return {
               type: 'IF',
               condition:  c,
               st: st
             };
           }
       / WHILE c:condition DO st:st    
           {
             return {
               type: 'IF',
               condition:  c,
               st: st
             };
           }

/* exp --> ADDSUB? term   (ADDSUB term)* */  
exp    = t:term   r:(ADDSUB term)*   { return tree(t,r); }


/* term --> factor (MULTDIV factor)* */
term   = f:factor r:(MULTDIV factor)* { return tree(f,r); }


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
