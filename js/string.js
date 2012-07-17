String.prototype.s2i = function() {
  return parseFloat(this.val().replace(',', '.')); 
};

String.prototype.s2i = function() {
  return parseInt(this.val());
};
