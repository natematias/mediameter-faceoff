(function($){

  //View ListView
  var SplashView = Backbone.View.extend({
     
    events: {
      "change #right_newspaper": "drawNewspaperComparison",
      "change #left_newspaper": "drawNewspaperComparison"
    },

    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },
     
    render: function(){
     $(this.el).load("templates/selection.template");
    },

    drawNewspaperComparison: function(){
      $.ajax({url:"templates/newspaper.template", 
              type: "GET",
              dataType: "text",
              success: function(data){
                $("#newspaper_comparison").html(_.template(data, {newspaper:"New York Times", year:"1979", total:100}));
              }});
    }
  });
  var splashView = new SplashView;
  $("#frame").html(splashView.el);
})(jQuery);
