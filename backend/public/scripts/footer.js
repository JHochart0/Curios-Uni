// get the button
let buttonBackToTop = document.getElementById("back-to-top");

// hide the button back to top when there is not at all or almost 
// not a scrollbar on the page (example: login / signup form pages)
if(document.body.scrollTop>200 || document.documentElement.scrollTop>200){
    buttonBackToTop.style.display = "flex";
}
else{
    buttonBackToTop.style.display = "none";
}


// add an event to show or hide the back to top part of the footer when we are
// on top of the screen or not
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      buttonBackToTop.style.display = "flex";

    } else {
      buttonBackToTop.style.display = "none";
    }
  }

// when the user clicks the button, scroll back to the top of the page
function backToTop(){
    window.scrollTo(0, 0);
}

