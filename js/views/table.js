window.TableView = Backbone.View.extend({
    tagName: 'table',

    initialize: function() {
      this.render();
    },

    render: function() {
      var header;
      $.get('tpl/TableHeaderView.html', function(data) {
          header = data;
      }, 'html');
      $(this.el).append(header);
      
      // then table body
      _.each(this.model.get('raty').models, function(element, index) {
        element.set('index', index) ;
        $(this.el).append( new TrView({model:element}).el ); //
      }, this);

      return this;
    }
});
