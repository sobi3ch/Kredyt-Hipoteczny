// helper
window.h = {
  getInputs: function() {
    return {
      nieruchomosc: $('input[name="nieruchomosc"]').val().s2i(),
      kredyt: $('input[name="kredyt"]').val().s2i(),
      okres: $('input[name="okres"]').val().s2i(),
      RRSO: $('input[name="RRSO"]').val().s2f()
    }
  },
  
  // corect or calculation
  correct: function(value) {
    return parseFloat(value.toFixed(2));
  },
  
  cl: function(v) {
    console.log(v);
  }
};

G=Globalize;
G.culture('pl-PL');

////////////////////////////////////////////////
// Router
window.AppRouter = Backbone.Router.extend({
  routes:{
    "":"list"
  },

  list: function() {
    this.doCalculation();
    
    var that = this;
    $('#oblicz').click(function() {
      that.doCalculation();
    });
  },
  
  doCalculation: function() {
    var $kredyt = $('#kredyt');
    var inputs = h.getInputs();
    $kredyt.html(new KredytView({model: new Kredyt(inputs)}).el);  }
});


// add string2float method
String.prototype.s2f = function() { 
  return parseFloat(this.replace(',', '.')); 
}

String.prototype.s2i = function() {
  return parseInt(this);
}

templateLoader.load(["KredytView", "TrView"],
  function () {
    window.app = new AppRouter();
    Backbone.history.start();
  });
