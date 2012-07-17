window.InputView = Backbone.View.extend({
  
  initialize: function(){
    this.render();
  },
  
  render: function(){
    var inputs = this.template(this.setInitials());    
    $(this.el).html( inputs );

    return this;
  },
  
  getInputs: function() {
    return {
      nieruchomosc: $('input[name="nieruchomosc"]').val().s2i(),
      kredyt: $('input[name="kredyt"]').val().s2i(),
      okres: $('input[name="okres"]').val().s2i(),
      RRSO: $('input[name="RRSO"]').val().s2f()
    }
  },
  
  setInitials: function() {
    return {
      nieruchomosc: 200200,
      kredyt: 151000,
      okres: 31,
      RRSO: "6,8"
    }    
  }
});