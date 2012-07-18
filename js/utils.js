// The Template Loader. Used to asynchronously load templates located in separate .html files
window.templateLoader = {
  load: function(views, callback) {
    var deferreds = [];

    $.each(views, function(index, view) {
      if (window[view]) {
        deferreds.push($.get('tpl/' + view + '.html', function(data) {
          window[view].prototype.template = _.template(data);
        }, 'html'));
      } else {
        alert(view + " not found");
      }
    });

    $.when.apply(null, deferreds).done(callback);
  }
};

// helper
window.h = {
  // corect or calculation
  correct: function(value) {
    return parseFloat(value.toFixed(2));
  },
  
  cl: function(v) {
    console.log(v);
  }
};

String.prototype.s2f = function() {
  return parseFloat(this.replace(',', '.')); 
};

String.prototype.s2i = function() {
  return parseInt(this);
};
