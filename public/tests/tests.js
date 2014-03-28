var assert = chai.assert;

suite('Pruebas para el parser', function(){
  test('Asociacion a izquierdas', function(){
	var input = "a = 3-2-1";
	var resultado = pl0.parse(input);
	var esperado = "{\n  \"type\": \"=\",\n  \"left\": {\n    \"type\": \"ID\",\n    \"value\": \"a\"\n  },\n  \"right\": {\n    \"type\": \"-\",\n    \"left\": {\n      \"type\": \"-\",\n      \"left\": {\n        \"type\": \"NUM\",\n        \"value\": 3\n      },\n      \"right\": {\n        \"type\": \"NUM\",\n        \"value\": 2\n      }\n    },\n    \"right\": {\n      \"type\": \"NUM\",\n      \"value\": 1\n    }\n  }\n}";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

    test('Asignacion', function(){
	var input = "a = 1.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });


  test('Parentizacion', function(){
	var input = "a = 2*(1+1).";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Condicionales', function(){
	var input = "IF a == 1 THEN b = 1.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  }); 
  
  test('Bloques y Call', function(){
	var input = "CONST a = 1; PROCEDURE p; a = a + 1; CALL p.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });
  test('Bloques y Call', function(){
	var input = "IF ODD 1 THEN a = 1 .";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Bloques y Call', function(){
	var input = "WHILE a == 3 DO b = b+3.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('While-Do', function(){
	var input = "WHILE a == 3 DO b = b+3.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('While-Do', function(){
	var input = "WHILE a == 3 DO b = b+3.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Begin-End', function(){
	var input = "BEGIN a = 3; b = b+3 END.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });
});

suite('Pruebas para las operaciones', function(){
  test('Suma', function(){
	var input = "a = 1 + 1.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Resta', function(){
	var input = "a = 1 - 1.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Division', function(){
	var input = "a = 1 / 1.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Multiplicacion', function(){
	var input = "a = 1 * 1.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });
});


