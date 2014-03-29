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
	var input = "a = 1";
	var resultado = pl0.parse(input);
	var esperado = "{\n  \"type\": \"=\",\n  \"left\": {\n    \"type\": \"ID\",\n    \"value\": \"a\"\n  },\n  \"right\": {\n    \"type\": \"NUM\",\n    \"value\": 1\n  }\n}";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });


  test('Parentizacion', function(){
	var input = "a = 2*(1+1).";
	var resultado = pl0.parse(input);
	var esperado = "{\n  \"type\": \"=\",\n  \"left\": {\n    \"type\": \"ID\",\n    \"value\": \"a\"\n  },\n  \"right\": {\n    \"type\": \"*\",\n    \"left\": {\n      \"type\": \"NUM\",\n      \"value\": 2\n    },\n    \"right\": {\n      \"type\": \"+\",\n      \"left\": {\n        \"type\": \"NUM\",\n        \"value\": 1\n      },\n      \"right\": {\n        \"type\": \"NUM\",\n        \"value\": 1\n      }\n    }\n  }\n}";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Condicionales', function(){
	var input = "if a == 1 then b = 1.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  }); 
  
  test('Bloques y Call', function(){
	var input = "const a = 1; procedure p; a = a + 1; call p.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });
  test('Bloques y Call', function(){
	var input = "if odd 1 then a = 1 .";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Bloques y Call', function(){
	var input = "call a .";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });


  test('While-Do', function(){
	var input = "while a == 1 do b = b+1.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Begin-End', function(){
	var input = "begin a = 1; b = b+1 end.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });
});

suite('Pruebas para el paso de parmetros', function(){
  test('Funcion con parametros', function(){
	var input = "var x, valor;\nprocedure aumentar(x);\nbegin\nvalor = x + 1\nend;\ncall aumentar(x).";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });
});

suite('Pruebas para las operaciones', function(){
  test('Suma', function(){
	var input = "a = 1 + 1";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Resta', function(){
	var input = "a = 1 - 1";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Division', function(){
	var input = "a = 1 / 1";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

  test('Multiplicacion', function(){
	var input = "a = 1 * 1";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });
});


