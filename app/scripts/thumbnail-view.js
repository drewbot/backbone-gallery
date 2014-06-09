
// New View Cconstructor for the thumbnail gallery
var ThumbnailView = Backbone.View.extend({

  // define class name
  className: 'thumbnail',

  // point to the template
  template: _.template($('.thumbnail-template').text()),

  // click any thumb to show detail
  events: {
    "click" : "showDetailView"
  },

  initialize: function(){
    // when a thumbnal view instance is called it is told to listen to changes to the model
    this.listenTo(this.model, 'change', this.render);
    // Append changes to the this.el to the thumbnail container
    $('.thumbnails-container').append(this.el);
    // Render the changes by calling the render funtion below
    this.render();
  },

  render: function(){
    // pass current model attributes through the html method attached to this.$el
    var renderedTemplate = this.template(this.model.attributes)
    this.$el.html(renderedTemplate)
  },


  showDetailView: function(){
    console.log('should render a new DetailView')
    // remove the current detail view to clear the way for a new one
    detailViewInstance.remove();
    // create a new detail view based on the current model instance
    detailViewInstance = new DetailView({model: this.model})
  }

})