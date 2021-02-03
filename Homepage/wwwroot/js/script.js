// Blog posts script
$(document).ready(function () {
  var itemsMainDiv = '.MultiCarousel';
  var itemsDiv = '.MultiCarousel-inner';
  var itemWidth = '';
  var itemHeight = 600;

  $('.leftLst, .rightLst').click(function () {
    var condition = $(this).hasClass('leftLst');
    if (condition) click(0, this);
    else click(1, this);
  });

  ResCarouselSize();

  $(window).resize(function () {
    ResCarouselSize();
  });

  //this function define the size of the items
  function ResCarouselSize() {
    var incno = 0;
    var dataItems = 'data-items';
    var itemClass = '.item';
    var id = 0;
    var btnParentSb = '';
    var itemsSplit = '';
    var sampwidth = $(itemsMainDiv).width();
    var bodyWidth = $('body').width();
    $(itemsDiv).each(function () {
      id = id + 1;
      var itemNumbers = $(this).find(itemClass).length;
      btnParentSb = $(this).parent().attr(dataItems);
      itemsSplit = btnParentSb.split(',');
      $(this)
        .parent()
        .attr('id', 'MultiCarousel' + id);

      if (bodyWidth >= 1200) {
        incno = itemsSplit[3];
        itemWidth = sampwidth / incno + 90;
      } else if (bodyWidth >= 992) {
        incno = itemsSplit[2];
        itemWidth = sampwidth / incno + 90;
      } else if (bodyWidth >= 768) {
        incno = itemsSplit[1];
        itemWidth = sampwidth / incno + 90;
      } else {
        incno = itemsSplit[0];
        itemWidth = sampwidth / incno;
      }
      $(this).css({
        transform: 'translateX(0px)',
        width: itemWidth * itemNumbers,
        height: itemHeight,
      });
      $(this)
        .find(itemClass)
        .each(function () {
          $(this).outerWidth(itemWidth);
        });

      $('.leftLst').addClass('over');
      $('.rightLst').removeClass('over');
    });
  }

  //this function used to move the items
  function ResCarousel(e, el, s) {
    var leftBtn = '.leftLst';
    var rightBtn = '.rightLst';
    var translateXval = '';
    var divStyle = $(el + ' ' + itemsDiv).css('transform');
    var values = divStyle.match(/-?[\d\.]+/g);
    var xds = Math.abs(values[4]);
    if (e == 0) {
      translateXval = parseInt(xds) - parseInt(itemWidth * s);
      $(el + ' ' + rightBtn).removeClass('over');

      if (translateXval <= itemWidth / 2) {
        translateXval = 0;
        $(el + ' ' + leftBtn).addClass('over');
      }
    } else if (e == 1) {
      var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
      translateXval = parseInt(xds) + parseInt(itemWidth * s);
      $(el + ' ' + leftBtn).removeClass('over');

      if (translateXval >= itemsCondition - itemWidth / 2) {
        translateXval = itemsCondition;
        $(el + ' ' + rightBtn).addClass('over');
      }
    }
    $(el + ' ' + itemsDiv).css(
      'transform',
      'translateX(' + -translateXval + 'px)'
    );
  }

  //It is used to get some elements from btn
  function click(ell, ee) {
    var Parent = '#' + $(ee).parent().attr('id');
    var slide = $(Parent).attr('data-slide');
    ResCarousel(ell, Parent, slide);
  }
});

// Top Carousel Progress Bar
var totalSteps = document
  .getElementById('topCarousel')
  .getElementsByClassName('carousel-item').length;

$('#topCarousel').carousel();
$('#topCarousel').on('slide.bs.carousel', function (e) {
  //update progress
  var step = $(e.relatedTarget).data('step');
  var percent = (parseInt(step) / totalSteps) * 100;

  var progressBar = document.getElementById('topCarouselProgressBar');
  progressBar.style.width = percent + '%';
});

// Nav Active Script
var links = document.getElementsByClassName('nav-link');

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function () {
    var current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
  });
}

// Show More teammates Script
function showTeammates() {
  var teammates = document.getElementById('moreTeammates');
  var teammatesLink = document.getElementById('showTeammatesLink');

  if (teammates.style.display === 'none') {
    teammates.style.display = 'flex';
    teammatesLink.innerText = 'Show less teammates';
  } else {
    teammates.style.display = 'none';
    teammatesLink.innerText = 'Show more teammates';
  }
}

// FAQ Collapsible
var coll = document.getElementsByClassName('collapsible');
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active');
    var content = this.nextElementSibling;
    var collLstItem = this.parentElement;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      collLstItem.style.opacity = 0.6;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      collLstItem.style.opacity = 1;
    }
  });
}
