$(document).ready(function() {

  /* Scroll to top when DOM loaded */
  $(window).scrollTop(0);

  /* Select blocks */
  var bars = $('.bar');
  var firstBlock = bars.eq(0);
  var lastBlock = bars.eq(1);

  /* Create clone of first block and insert into DOM */
  var clone = firstBlock.clone();
  clone.hide();
  firstBlock.after(clone);

  /* Window scroll event handler */
  $(window).scroll(function() {
    var windowScrollTop = $(window).scrollTop();

    /* First Block Subhandler */
    var firstBlockOffset = firstBlock.offset();
    if(windowScrollTop > firstBlockOffset.top) {
      clone.show().css({
        position: 'fixed',
        top: 0,
        left: firstBlockOffset.left
      });
    }
    else {
      clone.hide();
    }

    /* Last Block Subhandler */
    var lastBlockPositionType = lastBlock.css('position');
    if(lastBlockPositionType == 'fixed') {
      lastBlock.css('position', 'static');
    }

    var lastBlockOffset = lastBlock.offset();
    if(windowScrollTop > lastBlockOffset.top) {
      lastBlock.css({
        position: 'fixed',
        top: 0,
        left: lastBlockOffset.left
      });
    }
  });
});
