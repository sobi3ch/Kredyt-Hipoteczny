window.TableView = Backbone.View.extend({
    tagName: 'table',

    initialize: function() {
      this.render();
    },

    render: function() {
      // table header
      var table = this;
      $.get('tpl/TableHeaderView.html', function(data) {
        $(table.el).append(data);
      }, 'html');
      
      // table body
      _.each(this.model.get('raty').models, function(element, index) {
        element.set('index', index) ;
        $(this.el).append( new TrView({model:element}).el ); //
      }, this);

      return this;
    }
});
