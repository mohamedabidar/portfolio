
$(document).ready(function(){

  /*--------------/ Fixing Navbar When Scrolling /-------------*/

  if($(window).scrollTop() > 85)  $('nav').addClass('fixed');

  $(window).bind('scroll', function(){

    if($(window).scrollTop() > 85) {
      // Fix the navbar when scolling + animation
      $('nav').addClass('fixed slideInDown');
    }
    else {
      $('nav').removeClass('fixed slideInDown');
    }
   });


   /*------------------------/ Navbar Menus Effects /--.-------------------*/

   //######## Drop Down Menu #########
   $('.Dropdown').click(function(){
     $('.Dropdown-content').slideToggle();
   });
   $('.Dropdown-content a').click(function(){
     $('.Dropdown-content').slideUp();
   });

   //############ Set Menu Item to Active When scrolling ############
   var win = $(window);
   // Get the top offset of a div element
  function offset_of(element) {
    return $(element).offset().top;
  }

  // Set the active list item of navbar
  function setActiveItem(pos) {
    $('nav li.active').removeClass('active');
    $('nav li').eq(pos-1).addClass('active');
  }
  // change active item when scrolling
   $(window).bind('scroll', function(){
     var winTop = $(window).scrollTop() + ($(window).height() /2);

     if( winTop > offset_of('#contact') )  setActiveItem(5);
     else if( winTop > offset_of('#portfolio') )  setActiveItem(4);
     else if( winTop > offset_of('#about') )  setActiveItem(2);
     else if( winTop > offset_of('#whatido') )  setActiveItem(1);
});

//---------------------- Smooth scroll ------------------------
$('nav li a').click(function() {

  $('body').animate({
    scrollTop: $($(this).attr('href')).offset().top-50
  }, 'slow');

});


   /*--------------/ Jumbotron Animation /-------------*/

   // Hide all elements before starting
   $('.Jumbotron h1, .Jumbotron p, .Jumbotron .slider').hide();
   // Animate elemets one after other, after loading
   $('.Jumbotron h1').addClass('animated bounceInDown').show().delay(400).queue(function(){
     $('.Jumbotron p').addClass('animated slideInLeft').show().delay(400).queue(function(){
       $('.Jumbotron .slider').addClass('animated slideInRight').show();
       $(this).dequeue();
     });
     $(this).dequeue();
   });


   /*------------------------/ Animation When Scrolling /---------------------*/

   var animCls = 'animate'; // class name of elements to animate
   var dataAttr = 'animation';  // data attribute which send animation name (data-animation="..")

   // Add animation class for every html elements
  $('.heading p').each(function(){ $(this).addClass(animCls).data(dataAttr,'zoomInRight'); });
  $('.heading h1').each(function(){ $(this).css('opacity','0').addClass(animCls).data(dataAttr,'zoomIn'); });
  $('#whatido .col-4').css('opacity','0');
  $('#projects img').each(function(){ $(this).addClass(animCls).data(dataAttr,'slideInLeft'); });
  $('#about img').each(function(){ $(this).addClass(animCls).data(dataAttr,'slideInRight'); });
  $('#about .content p, #about .content a').each(function(){ $(this).addClass(animCls).data(dataAttr, 'bounceIn'); });
  $('#skills .chart h2').each(function(){ $(this).addClass(animCls).data(dataAttr, 'bounceIn'); });
  $('#portfolio .buttons li').each(function(){ $(this).addClass(animCls).data(dataAttr,'fadeInLeft'); });
  $('#portfolio img').each(function(){ $(this).addClass(animCls).data(dataAttr,'lightSpeedIn'); });
  $('#contact form').each(function(){ $(this).addClass(animCls).data(dataAttr,'flipInX'); });


  //--- Hide all elements with class 'animate'
  $('.'+animCls).css('opacity','0');

  //--- Start animations using 'data' attribute to determine which animation to trigger
  $('.'+animCls).waypoint(function(){
      $(this.element).addClass('animated ' + $(this.element).data(dataAttr)).css('opacity','1');
    }, { offset: '80%'} // When the element achieve 80% of window (80% from top)
  );


  //--- 4 columns animation one after other
  function orderAnimation() {
    var elem = '#whatido .col-4';
    var animClass = 'animated fadeInUp';
    $(elem).eq(0).addClass(animClass).show().delay(300).queue(function(){
      $(elem).eq(1).addClass(animClass).show().delay(300).queue(function(){
        $(elem).eq(2).addClass(animClass).show().delay(300).queue(function(){
          $(elem).eq(3).addClass(animClass);
            $(this).dequeue();
          });
        $(this).dequeue();
      });
      $(this).dequeue();
    });
  }
  $('#whatido .col-4').eq(0).waypoint(function(){ orderAnimation(); } , {offset: '80%'} );

  //--- Animate the footer with a different offset
  $('footer .social-links a, footer .copyright p').waypoint(function(){ $(this.element).addClass('animated rollIn'); }, { offset: '100%'});


  /*---------------------------/ Pie Charts /----------------------*/

  // Default Styles
  var chart = [];
  for(var i=0; i<4; ++i) {
    chart[i] = new circleDonutChart('chart' + (i+1));
    chart[i].draw({
      end:0,
      start:0,
      maxValue:100,
      titlePosition:"outer-top",
      outerCircleColor:'#34495e',
      innerCircleColor:'#3498db'
    })
  }
  // Set Charts Values
  chart[0].draw({end:90});
  chart[1].draw({end:75});
  chart[2].draw({end:80});
  chart[3].draw({end:60});

  /*---------------------------/ Portfolio MixitUp /----------------------*/
  $('#MixContainer').mixItUp();

  /*--- Contact Form Alert ---*/
  $('.submit').click(function(){
    alert('The contact form is not working yet, please contact me at: "contact.abidar@gmail.com"');
  });

   //--- Closing Document Ready Function ---
});
