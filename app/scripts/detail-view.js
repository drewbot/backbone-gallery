// Create a new View constructor for the detail section
var DetailView = Backbone.View.extend({
  // give it a class name
  className: 'detail-view',
  // point it to this div
  template: _.template($('.detail-view-template').text()),
  // save will call the updateModel function and new will add a new photo to the model
  events: {
    "click .save-button": "updateModel",
    "click .new-button": "createPhoto"
  },
  // When a view instance is created listen to the photoCollection instance...
  // .. and add a function passing the 'photo' argument...
  initialize: function(){
    this.listenTo(photos, 'add', function(photo){
      // ... create a new instance of ThumbnailView....
      //...while passing in an argument of model and applying the photo argument from above 
      new ThumbnailView({model: photo})
    })
    // view instance will listen to it's model and run the render below on any changes to this.el (I think)
    this.listenTo(this.model, 'change', this.render);
    // append this.el to the spcified div
    $('.detail-container').append(this.el);
    // render the changes
    this.render();
  },

  render: function(){
    // pass current model attributes, pulled from the template, through the html method attached to this.$el
    var renderedTemplate = this.template(this.model.attributes);
    this.$el.html(renderedTemplate)
    return this;
  },
  
  updateModel: function(){

    var that = this;

    this.model.set({
      url:      this.$el.find('.url-input').val(),
      caption:  this.$el.find('.caption-input').val()
    });

    photos.add(this.model)

    this.model.save().done(function(){
      that.$el.find('.status').html('Saved!')
    })
  },

  createPhoto: function(){

    var photoInstance = new Photo();

    this.model = photoInstance

    this.$el.find('input').val('');
    this.$el.find('img').attr('src',' http://placehold.it/350x400');

  }
})