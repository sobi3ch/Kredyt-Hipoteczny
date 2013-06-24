
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
    this.start();
    
    // for recalculation
    var that = this;
    $('#oblicz').click(function() {
      that.recalculate();
    });
  },
  
  start: function() {
    // create input view..
    window.inputs = new InputView;
    
    // ..insert it to page
    $('#inputs').html(inputs.el); 
    
    // create kredyt model and get initial inputs from just inserted inputs    
    window.kredyt = new Kredyt(inputs.getInputs());
    window.kredytView = new KredytView({model: kredyt});
    
    // insert kredytView render element
    $('#kredyt').html(kredytView.el);  
  },
          
  recalculate: function() {
    kredytView.model.set(inputs.getInputs());
    kredytView.model.set('raty', new Raty(kredytView.model.obliczRaty()));
    kredytView.render();
  }
});


templateLoader.load(["InputView", "KredytView", "TrView"],  function () {
    window.app = new AppRouter();
    Backbone.history.start();
  });
