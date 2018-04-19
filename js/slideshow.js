/*eslint-env browser*/

// HELPER FUNCTION TO SELECT ELEMENTS FROM THE DOM
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

// REWRITTEN TO TAKE ADVATNAGE OF CLOSURES
var createSlideShow = function () {
    "use strict";
    //PRIVATE VARIABLES AND FUNCTIONS
    var timer, play = true, nodes, img, stopSlideShow, displayNextImage, setPlayText;
    
    nodes = {image: null, caption: null};
    img = {cache: [], counter: 0};
    
    stopSlideShow = function () {
        
    };
    displayNextImage = function () {
        // IF THE SLIDESHOW SHOW REACHES THE END
        if (img.counter === img.cache.length) {
            img.counter = 0;        // START BACK AT THE BEGINNING
        } else {
            img.counter += 1;       // OTHER PROCEED TO NEXT SLIDE
        }
        // CREATE A NEW IMAGE OBJECT FROM THE IMAGE STORED IN THE TEMP ARRY (CACHE)
        var image = img.cache[img.counter];
        nodes.image.src = image.src;
        nodes.image.innerHTML = image.title;
    };
    setPlayText = function () {
        
    };
    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE MEMBERS
    return {
        loadImages: function (slides) {
            var image, i;
            for (i = 0; i < slides.length; i += 1) {
                image = new Image();                // CREATE NEW IMAGE OBJECT
                image.src = slides[i].href;         // SET THE SOURCE OF THE IMAGE
                image.title = slides[i].title;      // SET THE TITLE OF THE IMAGE
                img.cache.push(image);              // PUSH IMAGE TO THE TEMP ARRAY (CACHE)
            }
            return this;
        },
        startSlideShow: function () {
            // CAPTURE IMAGE AND CAPTION
            if (arguments.length === 2) {
                nodes.image = arguments[0];
                nodes.caption = arguments[1];
            }
            // SET TIMER
            timer = setInterval(displayNextImage, 4000);
            return this;
        },
        createToggleHandler: function () {
            var me = this;
            // CLOSURE TO BE USED AS THE CLICK EVENT HANDLER
            return function () {
                // 'THIS' IS THE CLICKED BUTTON
                // 'ME' IS THE OBJECT LISTENER
                if (play) {
                    stopSlideShow();
                } else {
                    startSlideShow();
                    
                }
            }
        }
    };
};

// CREATE THE SLIDESHOW OBJECT
var slideshow = createSlideShow();
slideshow.createToggleHandler

window.addEventListener("load", function () {
    "use strict";
    var slides = [
        {href: "images/backpack.jpeg", title: "He backpacks in the Sierras often."},
        {href: "images/boat.jpeg", title: "He loves his boat."},
        {href: "images/camaro.jpeg", title: "He loves his Camaro more."},
        {href: "images/punk.jpeg", title: "He used to be in a punk band that tourned with NO Doubt and Sublime."},
        {href: "images/race.jpeg", title: "He is active and loves obstacle course racing."}
    ];
    // START SLIDE SHOW
    slideshow.loadImages(slides).startSlideShow($("image"), $("caption"));
    // PAUSE/PLAY SLIDESHOW
    $("play_pause").addEventListener("click", slideshow.createToggleHandler);
});