
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
    $('#inputs').html(new InputView().el);
    $('#kredyt').html(new KredytView({model: new Kredyt()}).el);  }
});


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


templateLoader.load(["InputView", "KredytView", "TrView"],
  function () {
    window.app = new AppRouter();
    Backbone.history.start();
  });
