(function($){

  //View ListView
  var SplashView = Backbone.View.extend({
     
    events: {
      "change #right_newspaper": "drawNewspaperComparison",
      "change #left_newspaper": "drawNewspaperComparison",
      "click #1979": "year1979",
      "click #1989": "year1989",
      "click #1999": "year1999",
      "click #2009": "year2009"
    },

    initialize: function(){
      _.bindAll(this, 'render');
      _.bindAll(this, 'loadNewspaperData');
      _.bindAll(this, 'loadNewspaperData');
      _.bindAll(this, 'year1979');
      _.bindAll(this, 'year1989');
      _.bindAll(this, 'year1999');
      _.bindAll(this, 'year2009');
      this.year = 1979;
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
      this.left_newspaper = $('#left_newspaper').val();
      this.right_newspaper = $('#right_newspaper').val();
      this.left_news_data = this.newspaperData[this.left_newspaper];
      this.right_news_data = this.newspaperData[this.right_newspaper];

      $.ajax({url:"templates/newspaper.template", 
              type: "GET",
              dataType: "text",
              success: function(data){
                $("#newspaper_comparison").html(_.template(data, {orientation:'left', source:that.left_newspaper, year:that.year, newspaper:that.left_news_data[that.year]}));
                $("#newspaper_comparison").append(_.template(data, {orientation:'right', source:that.right_newspaper, year:that.year, newspaper:that.right_news_data[that.year]}));
              }});
    },
  
    year1979: function(){
      this.changeYear(1979);
    },
    year1989: function(){
      this.changeYear(1989);
    },
    year1999: function(){
      this.changeYear(1999);
    },
    year2009: function(){
      this.changeYear(2009);
    },

    changeYear: function(new_year){
      this.year = new_year
      years = [1979, 1989, 1999, 2009];
      for( year in years){
        year = years[year];
        if( new_year == year){
           $('#'+year.toString()).attr("src", "images/" + new_year.toString() + "_selected.png");
        }else{
           $('#'+year.toString()).attr("src", "images/" + year.toString() + "_unselected.png");
        }
      }
      this.drawNewspaperComparison();
    }
  
    
  });
  var splashView = new SplashView;
  $("#frame").html(splashView.el);
})(jQuery);
