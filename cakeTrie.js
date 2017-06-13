function node(value){
  this.value = value;
  this.children = {};
  this.end = false;
}

function trie(){
  this.root = new node(null);
}

trie.prototype.insert = function(string){
  let current = this.root;

  for(let i=0; i<string.length; i++){
    let letter = string[i];

    if(current.children[letter]){
      current = current.children[letter];
      continue;
    } else {
      let newNode = new node(letter);
      current.children[letter] = newNode;
      current = current.children[letter];
    }

    if(i === string.length - 1){
      current.end = true;
    }
  }
}

trie.prototype.verify = function(string){
  let current = this.root;

  for(let i=0; i<string.length; i++){
    let letter = string[i];

    if(current.children[letter]){
      current = current.children[letter];
    } else {
      return false;
    }

    if(i === string.length - 1){
      if(current.end === false){
        return false;
      }
    }
  }
  return true;
}

function maxValue(cakeTypes, cap, cache){
  if(cakeTypes.length === 0){
    return 0;
  }

  let highestPrice = 0;
  for(let i=0; i<cakeTypes.length; i++){
    let cake = cakeTypes[i];
    let remainder = cap - cake.weight;

    debugger

    if(remainder < 0){
      continue;
    } else {
      let validCakes = cakeTypes.filter(function(x){
        return x.weight <= remainder;
      })

      let remainHighest = cache[remainder] || maxValue(validCakes, remainder, cache);
      cache[remainder] = remainHighest;

      let currentHighest = cake.value + remainHighest;
      if(currentHighest > highestPrice){
        highestPrice = currentHighest;
      }
    }
  }
  return highestPrice;
}

var cakeTypes = [
  {weight: 7, value: 160},
  {weight: 3, value: 90},
  {weight: 2, value: 15},
];

var capacity = 0;

console.log(maxValue(cakeTypes, capacity, {}));
