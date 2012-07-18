
G = Globalize;
G.culture('pl-PL');

////////////////////////////////////////////////
// Router
window.AppRouter = Backbone.Router.extend({
  routes:{
    "":"list"
  },

  list: function() {
    // for the first time
    this.doCalculation();
    
    // for recalculation
    var that = this;
    $('#oblicz').click(function() {
      that.doCalculation();
    });
  },
  
  doCalculation: function() {
    // create input view..
    var inputs = new InputView;
    
    // ..insert it to page
    $('#inputs').html(inputs.el); 
    
    // create kredyt model and get initial inputs from just inserted inputs    
    kredyt = new Kredyt(inputs.getInputs());
    
    // create and insert kredytView
    $('#kredyt').html(new KredytView({model: kredyt}).el);  }
});


templateLoader.load(["InputView", "KredytView", "TrView"],
  function () {
    window.app = new AppRouter();
    Backbone.history.start();
  });
