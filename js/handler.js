/* Bar Blocks */
var barsElem = document.querySelectorAll('.bar');
var bars = document.querySelectorAll('.bar .bar-inner');

/* Make Array from Node Collection */
barsElem = Array.prototype.slice.call(barsElem);
bars = Array.prototype.slice.call(bars);

/* Scroll to top and ajust wrapper height, when DOM loaded */
window.scrollTo(0, 0);
ajustWrapperHeight();

/* Indicators */
var indicators = indicator.querySelectorAll('p span');
indicators[3].innerHTML = Math.round(barsElem[0].getBoundingClientRect().top);

/* Event Counters */
var documentScrollEventsCounter = 0;
var documentTouchMoveEventsCount = 0;

/* Set width and height for bar containers... */
bars.forEach(function(bar) {
  var barWidth = bar.offsetWidth;
  var barHeight = bar.offsetHeight;
  bar.parentElement.style.width = barWidth + 'px';
  bar.parentElement.style.height = barHeight + 'px';
});

/* ... only after this show page */
document.body.classList.remove('hidden');

/* Set event handlers */
window.addEventListener('resize', ajustWrapperHeight);
wrapper.addEventListener('scroll', scrollEventHandler);
wrapper.addEventListener('touchmove', touchmoveEventHandler);

/* ---------------- Functions -------------------- */

function ajustWrapperHeight() {
  wrapper.style.height = window.innerHeight + 'px';
  var barWidth = (document.documentElement.clientWidth <= 600)
  ? window.document.documentElement.clientWidth
  : 600;

  barsElem.forEach(function(barElem) {
    barElem.style.width = barWidth + 'px';
  });

  bars.forEach(function(bar) {
    if(bar.style.position == 'fixed') {
      bar.style.left = bar.parentElement.getBoundingClientRect().left + 'px';
    }
  });
}

/* Events Handler */
function scrollEventHandler(eventObject) {
  var wrapperScrollTop = wrapper.scrollTop;

  /* Set values for indicators */
  indicators[0].innerHTML = ++documentScrollEventsCounter;
  indicators[2].innerHTML = Math.round(wrapperScrollTop);
  indicators[3].innerHTML = Math.round(barsElem[0].getBoundingClientRect().top);

  /* Bars control */
  barsElem.forEach(function(barElem) {
    var elemRect = barElem.getBoundingClientRect();
    var elemContent = barElem.querySelector('.bar-inner');

    if(elemRect.top <= 0) {
      elemContent.style.position = 'fixed';
      elemContent.style.top = 0;
      elemContent.style.left = elemRect.left + 'px';
    }
    else {
      elemContent.style.position = '';
      elemContent.style.top = '';
      elemContent.style.left = '';
    }
  });
}

function touchmoveEventHandler(eventObject) {
  indicators[1].innerHTML = ++documentTouchMoveEventsCount;
}
