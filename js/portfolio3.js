document.addEventListener("DOMContentLoaded", function() {
    var data = "other";
    document.getElementById("webb").addEventListener("click", function() {
        data = "web"
        removeSliderElements();
        slide = 1;
        searchProjects(data);
    });
    document.getElementById("print").addEventListener("click", function() {
        removeSliderElements();
        data = "print";
        removeSliderElements();
        searchProjects(data);
        slide = 1;
    });
    document.getElementById("backend").addEventListener("click", function() {
        removeSliderElements();
        data = "backend";
        removeSliderElements();
        searchProjects(data);
        slide = 1;
    });
    document.getElementById("other").addEventListener("click", function() {
        removeSliderElements();
        data = "other";
        removeSliderElements();
        searchProjects(data);
        slide = 1;
    });

    function createSlick() {
        var slider = $("#slide.responsive").not('.slick-initialized');
        /*   var slider = $("#slide.responsive");*/
        slider.slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        arrows: false
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
                        arrows: false,
                        rows: 3
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }

    function removeSliderElements() {
        $('.slider-port').slick('removeSlide', null, null, true);
        $('.slider-port').slick('unslick');
    }

    searchProjects(data);

    var projects = [];
    var id = 0;
    var title = "";
    var subTitle = "";
    var desc = "";
    var imgUrl = "";
    var dLoadUrl = "";
    var slide = 1;

    function searchProjects(filter) {
        var url = "https://staffan-portfolio.herokuapp.com/" + filter;
        console.log(url);
        $.ajax({
            type: "GET",
            url: url,
            data: "",
            success: function(data) {
                console.log(data);
                projects = data;
                getProjects();
                createSlick();

            },
            error: function(a, b, c) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    }

    function getProjects() {

        projects.map(function(arrayItem, i) {
            id = arrayItem._id;
            title = arrayItem.title;
            subTitle = arrayItem.subtitle;
            imgUrl = arrayItem.imageurl;
            desc = arrayItem.desc;
            if (i <= 9) {
                console.log(id, title, subTitle, desc, imgUrl, slide);
                showProject(id, title, subTitle, desc, imgUrl, slide);
                slide++;
            } else {
                var moreProjects = {
                    id: id,
                    title: title,
                    subTitle: subTitle,
                    desc: desc,
                    imgUrl: imgUrl
                }
                hiddenProjects.push(moreProjects);
            }
            return
        });
    }

    function showProject(id, title, subTitle, desc, imgUrl, slide) {
        //Här visas resultatet

        var target = document.getElementById("slide");
        if (target !== null) {
            // Ny div skapas
            var product = document.createElement("div");
            product.setAttribute("class", "styleaMig");
            product.setAttribute("id", "slide" + slide);

            // HTML sträng skapas
            var htmlToAdd = "<div class='col s4'>";
            htmlToAdd = "<div class='card-panel hoverable' >";
            htmlToAdd += "<div class='card'> <div class='card-image waves-effect waves-block waves-light'>";
            htmlToAdd += "<img class='activator' src='" + imgUrl + "'></div>";
            htmlToAdd += "<div class='card-content'>";
            htmlToAdd += "<span class='card-title activator grey-text text-darken-4'>" + title + "<i class='material-icons right'>more_vert</i></span>";
            htmlToAdd += "</div>";
            htmlToAdd += "<div class='card-reveal'>";
            htmlToAdd += "<span class='card-title grey-text text-darken-4'>" + title + "<i class='material-icons right'>close</i></span>";
            htmlToAdd += "<p>" + subTitle + "</p>";
            htmlToAdd += "<p>" + desc + "</p>";
            htmlToAdd += "</div>";
            htmlToAdd += "</div>";
            htmlToAdd += "</div>";
            htmlToAdd += "</div>";

            /*       htmlToAdd += "<div>" + desc + "</div>";
                   htmlToAdd += "<div><input type='button' value='Ladda hem' id='"+ id + "'/>";*/

            // sista formatering
            product.innerHTML = htmlToAdd;
            //HTML injectas

            target.appendChild(product);

            /*document.getElementById("dwnLoadBtn").addEventListener("click",downLoad);*/
        }
    }
});