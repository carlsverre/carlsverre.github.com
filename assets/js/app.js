(function() {
  var arg;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.class_var = 5;
  arg = __bind(function(test) {
    var a_long_variable, b_long_var, unused_var;
    a_long_variable = 5;
    b_long_var = a_long_variable * 10;
    unused_var = 1;
    console.log(b_long_var);
    return test;
  }, this);
}).call(this);
