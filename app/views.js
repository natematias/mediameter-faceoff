(function($){

  //View ListView
  var SplashView = Backbone.View.extend({
     
    events: {
      "change #right_newspaper": "drawNewspaperComparison",
      "change #left_newspaper": "drawNewspaperComparison"
    },

    initialize: function(){
      _.bindAll(this, 'render');
      _.bindAll(this, 'loadNewspaperData');
      this.loadNewspaperData();
      this.render();
    },
     
    render: function(){
     $(this.el).load("templates/selection.template");
    },

   loadNewspaperData: function(){
     var that = this;
     jQuery.getJSON("data/newspaper_data.json", function(data){
       that.newspaperData = data;
     });

   },

    drawNewspaperComparison: function(){
      var that = this;
      this.year = 1979;
      this.left_newspaper = $('#left_newspaper').val();
      this.right_newspaper = $('#right_newspaper').val();
      this.left_news_data = this.newspaperData[this.left_newspaper];
      this.right_news_data = this.newspaperData[this.right_newspaper];

      $.ajax({url:"templates/newspaper.template", 
              type: "GET",
              dataType: "text",
              success: function(data){
                $("#newspaper_comparison").append(_.template(data, {newspaper:that.right_newspaper, year:that.year, total:that.right_news_data[that.year]["total"]}));
              }});
    }
  });
  var splashView = new SplashView;
  $("#frame").html(splashView.el);
})(jQuery);
