import $ from 'jquery'

const ScrollJS = {}

ScrollJS.scroll = (id) => {
    if (id) {
        $(() => {
            // Handler for .ready() called.
            if ($(id)) {
                $('html, body').animate({
                    scrollTop: $(`#${id}`).offset().top
                }, 'slow');
            }
        });
    }
}

ScrollJS.scrollToComponent = (id) => {
    if (id) {
        if (document.getElementById(id)) {
            window.scrollTo(0, document.getElementById(id).offsetTop)
        }
    }
}

export default ScrollJS