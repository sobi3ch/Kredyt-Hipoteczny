window.TrView = Backbone.View.extend({

    tagName: "tr",
    
    initialize: function(){
      this.render();
    },

    render: function() {
      // prepare data
      var vars = {
        rata: G.format(this.model.get('rata'), 'c'), 
        index: (this.model.get('index')+1),
        czescKapitalowa: G.format(this.model.get('czescKapitalowa'), 'c'),
        czescOdsetkowa: G.format(this.model.get('czescOdsetkowa'), 'c')
      }
      
      $(this.el).html(this.template(vars));
      return this;
    }
});
