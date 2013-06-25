window.KredytView = Backbone.View.extend({
  
  initialize: function(){
    this.render();
  },
  
  render: function(){
    var kredytRender = this.template({
      label: 'Kredyt', 
      value: G.format(this.model.get('kredyt'), 'c0'),
      wkladWlasnyLabel: 'Wkład własny',
      wkladWlasny: G.format(this.model.getOnesOwnContribution(), 'c0')
    });

    // Load the compiled HTML into the Backbone "el"
    this.$el.html( kredytRender );
    this.table = new TableView({model: this.model});
    this.$el.find('fieldset').append(this.table.el);

    return this;
  }  
});