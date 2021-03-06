document.addEventListener("DOMContentLoaded", function() {
    var data = "print";
    document.getElementById("webb").addEventListener("click", function() {
        data = "web"
        searchProjects(data);
    });
    document.getElementById("print").addEventListener("click", function() {
        data = "print"
        searchProjects(data);
    });
    document.getElementById("backend").addEventListener("click", function() {
        data = "backend"
        searchProjects(data);
    });
    document.getElementById("other").addEventListener("click", function() {
        data = "other"
        searchProjects(data);
    });

    searchProjects(data);

    var projects = [];
    var id = 0;
    var title = "";
    var subTitle = "";
    var desc = "";
    var imgUrl = "";
    var dLoadUrl = "";
    var slide = 1;

    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
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
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });


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
            },
            error: function(a, b, c) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    }

    function getProjects() {
        slide++
        /*document.getElementById("books").innerHTML = "";*/
        if ($('#slide2').length) // use this if you are using id to check
        {
            document.getElementById("slide2").innerHTML = "";
        } else if ($('#slide3').length) {
            document.getElementById("slide3").innerHTML = "";
        } else if ($('#slide4').length) {
            document.getElementById("slide4").innerHTML = "";
        }
        document.getElementById("slide1").innerHTML = "";

        projects.map(function(arrayItem, i) {
            console.log(arrayItem);
            id = arrayItem._id;
            title = arrayItem.title;
            subTitle = arrayItem.subtitle;
            desc = arrayItem.desc;
            imgUrl = arrayItem.imageurl;
            if (i <= 2) {
                /*  $("#slide2").remove();
                  $("#slide3").remove();
                  $("#slide4").remove();
                  $("ul.indicator-item:nth-child(2)").remove();
                  $("ul.indicator-item:nth-child(3)").remove();
                  $("ul.indicator-item:nth-child(4)").remove();*/
                var slide = "slide1";
                showProject(id, title, subTitle, desc, imgUrl, slide);

            } else if (i >= 2 && i <= 5) {
                /*   $("#slide3").remove();
                   $("#slide4").remove();
                   $("ul.indicator-item:nth-child(3)").remove();
                   $("ul.indicator-item:nth-child(4)").remove();*/
                var slide = "slide2";
                showProject(id, title, subTitle, desc, imgUrl, slide);
            } else if (i >= 5 && i <= 8) {
                /*   $("#slide4").remove();
                   $("ul.indicator-item:nth-child(4)").remove();*/
                var slide = "slide3";
                showProject(id, title, subTitle, desc, imgUrl, slide);
            } else if (i >= 8 && i <= 11) {
                var slide = "slide4";
                showProject(id, title, subTitle, desc, imgUrl, slide);
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

            /* return (i !== 2);*/
            return
        });
        /*        projects.each(function(index, arrayItem) {
                    console.log(arrayItem);
                    id = arrayItem._id;
                    title = arrayItem.title;
                    subTitle = arrayItem.subtitle;
                    desc = arrayItem.desc;
                    imgUrl = arrayItem.imageurl;
                    showProject(id, title, subTitle, desc, imgUrl);
                    return (index !== 2);
                })*/
    }

    function showProject(id, title, subTitle, desc, imgUrl, slide) {


        //Här visas resultatet

        var target = document.getElementById(slide);
        if (target !== null) {
            // Ny div skapas
            var product = document.createElement("div");
            product.setAttribute("class", "styleaMig");

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