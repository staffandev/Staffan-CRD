document.addEventListener("DOMContentLoaded", function () {

    searchProjects();
 
/*    //Remove encaspulated Tags

    $.fn.ignore = function (sel) {
        return this.clone().find(sel || ">*").remove().end();
    };

    $(".clk > a").click(function (event) {

        var selectedB = $(this).ignore("i").text();
        searchITbooksAPI(selectedB);
    });

});*/

var projects = [];

var id = 0;
var title = "";
var subTitle = "";
var desc = "";
var imgUrl = "";
var dLoadUrl = "";


function  searchProjects() {
    var url = "https://staffan-portfolio.herokuapp.com/data";
    console.log(url);
    $.ajax({
        type: "GET",
        url: url,
        data: "",
        success: function (data) {
            console.log(data);
            projects = data;
            getProjects();
        },
        error: function (a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
        }
    });
}

function getProjects() {
    document.getElementById("books").innerHTML = "";
   projects.forEach(function (arrayItem) {
        console.log(arrayItem);
        id = arrayItem._id;
        title = arrayItem.title;
        subTitle = arrayItem.subtitle;
        desc = arrayItem.desc;
        imgUrl = arrayItem.imageurl;
        showProject(id, title, subTitle, desc, imgUrl);
    });


    function showProject(id, title, subTitle, desc, imgUrl) {

        //Här visas resultatet

        var target = document.getElementById("books");

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

        // sista formatering
        product.innerHTML = htmlToAdd;
        //HTML injectas
        target.appendChild(product);

        /*document.getElementById("dwnLoadBtn").addEventListener("click",downLoad);*/
    }

}
