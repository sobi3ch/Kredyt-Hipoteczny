window.KredytView = Backbone.View.extend({
  
  initialize: function(){
    this.render();
  },
  
  render: function(){
    var onesOwnContributionPercentage = 100 * (this.model.getOnesOwnContribution()/this.model.get('nieruchomosc')),
        kredytRender = this.template({
          kredyt: G.format(this.model.get('kredyt'), 'c0'),
          wkladWlasny: G.format(this.model.getOnesOwnContribution(), 'c0'),
          wkladWlasnyProcenty: onesOwnContributionPercentage.toFixed(2)
        });

    // Load the compiled HTML into the Backbone "el"
    this.$el.html( kredytRender );
    this.table = new TableView({model: this.model});
    this.$el.find('fieldset').append(this.table.el);

    return this;
  }  
});