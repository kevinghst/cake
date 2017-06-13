function Stack() {
  // initialize an empty array
  this.items = [];
}

// push a new item to the last index
Stack.prototype.push = function(item) {
  this.items.push(item);
};

// remove the last item
Stack.prototype.pop = function() {

  // if the stack is empty, return null
  // (it would also be reasonable to throw an exception)
  if (!this.items.length) {
      return null;
  }
  return this.items.pop();
};

// see what the last item is
Stack.prototype.peek = function() {
  if (!this.items.length) {
      return null;
  }
  return this.items[this.items.length -1];
};

function MaxStack(){
  this.stack = new Stack();
  this.maxTrack = new Stack();
  this.max = null;
}

MaxStack.prototype.getMax = function(){
  let lastIndx = this.maxTrack.items.length - 1;
  return this.maxTrack.items[lastIndx];
}

MaxStack.prototype.push = function(item){
  this.stack.push(item);

  if(this.stack.items.length === 1){
    this.max = item;
  } else {
    if(item > this.max){
      this.max = item;
    }
  }

  this.maxTrack.push(item);
}

MaxStack.prototype.pop = function(){
  this.stack.pop();
  this.maxTrack.pop();
}

MaxStack.prototype.peek = function(){
  return this.stack.peek();
}

let maxStack = new MaxStack();

maxStack.push(3);
maxStack.push(5);
maxStack.push(10);

maxStack.pop();
maxStack.pop();



console.log(maxStack.getMax());
