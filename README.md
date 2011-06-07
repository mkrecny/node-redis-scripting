# Node-Redis-Scripting
A node.js redis client that has been extended to support lua-scripting. 

## Usage
// Define config - OPTIONAL. Will default to port 6379 on localhost and the scripts dir included in this repo

var config = {"port":6380, "host":"127.0.0.1", "scripts_dir":"/path/to/lua/scripts"}; 

// Create a client passing the config if defined

var redis_client = require('path/to/node-redis-scripting/client.js').create(config);

// Call scripts as methods defined on the client by their name in the scripts directory
// e.g. scripts/somescript.lua would be called as:

redis_client.somescript(keys, args, callback);

// Note: 'keys' and 'args' are arrays - empty arrays must be passed if there are either no keys or args

## Examples
redis_client.sissubset(['foo', 'bar'], [], console.log); // is bar a subset of foo?
redis_client.sopscard(['foo'], ['smembers'], console.log); // get the cardinality of 'smembers' on set 'foo'
redis_client.sopsrandsubset(['foo', 'bar'], ['sunion', 1], console.log); // get a one member random subset of the union of 'foo' and 'bar'

## Commands Included:

### MHDEL key1 [key2 ...] field
Remove the same field from several hashes, get the number of values actually removed.

### MHLEN key1 [key2 ...]
Varadic HLEN.

### MHSET key1 [key2 ... keyN] value1 [value2 ... valueN] field
Set the same field in several hashes, get the number of fields actually created (not updated).

### PATTERNOP pattern operation
Perform 'operation' (eg DEL) on all keys matching 'pattern'

### SISSUBSET key1 key2 
Determine if the set at 'key2' is a subset of the set at 'key1'

### SOPSCARD key1 [key2 ... keyN] operation
The cardinality of the set resulting from the 'operation' (smembers/sinter/sunion) between the sets at 'key1' ... 'keyN'.

### SOPSRANDSUBSET key1 [key2 ... keyN] operation count
A random subset of maximum size 'count' from the 'operation' (smembers/sinter/sunion) between the set at 'key1' and all the sets at 'key2' ... 'keyN'.

### SOPSRANDSUBSTORE key1 [key2 ... keyN] operation count destination
Store a random subset of maximum s