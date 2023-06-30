var lastScrollTop = 0;
window.addEventListener("scroll", function() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop){
        document.getElementById('scrollingSubmarine').classList.remove('right', 'up');
        document.getElementById('scrollingSubmarine').classList.add('down');
    } else {
        document.getElementById('scrollingSubmarine').classList.remove('right', 'down');
        document.getElementById('scrollingSubmarine').classList.add('up');
    }
    lastScrollTop = st <= 0 ? 0 : st; 
}, false);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }