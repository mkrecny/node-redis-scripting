/*
 * Really skimping on tests here but just want to prove that the client can load and execute scripts
 * Alot will depend on how lua scripters implement
 */

var keys = {
  set_a:'test_foo',
  set_b:'test_bar'
};

var assert = require('assert');
var client = require('../client.js').create(); 

client.sadd(keys.set_a, ['a', 'b', 'c']);//sync
client.sadd(keys.set_b, ['a', 'b']);//sync
client.sissubset([keys.set_a, keys.set_b], [], function(){
  assert.ok(arguments[1], console.log('Passed sissubset'));  
  client.sopscard([keys.set_a], ['smembers'], function(){
    assert.ok(arguments[1]===3, console.log('Passed sopscard'));
    process.exit();
  });
});
