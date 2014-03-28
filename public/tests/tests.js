var assert = chai.assert;

suite('Pruebas para el parser', function(){
  test('Asociacion a izquierdas', function(){
	var input = "a = 3-2-1";
	var resultado = pl0.parse(input);
	var esperado = "{\n  \"type\": \"=\",\n  \"left\": {\n    \"type\": \"ID\",\n    \"value\": \"a\"\n  },\n  \"right\": {\n    \"type\": \"-\",\n    \"left\": {\n      \"type\": \"-\",\n      \"left\": {\n        \"type\": \"NUM\",\n        \"value\": 3\n      },\n      \"right\": {\n        \"type\": \"NUM\",\n        \"value\": 2\n      }\n    },\n    \"right\": {\n      \"type\": \"NUM\",\n      \"value\": 1\n    }\n  }\n}";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });

    test('Begin-End', function(){
	var input = "begin\n	x = 1 + 2\n end.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });


  test('Begin-End', function(){
	var input = "begin\n	x = 1 + 2\n end.";
	var resultado = pl0.parse(input);
	var esperado = "...";
	
	resultado = JSON.stringify(resultado,undefined,2);

	assert.equal(esperado, resultado);

  });
});


