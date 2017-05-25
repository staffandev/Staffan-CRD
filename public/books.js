document.addEventListener("DOMContentLoaded", function () {
    //getValue();
    //document.getElementById("select").addEventListener("change", getValue);

    searchITbooksAPI("JavaScript")
    // Initialize collapse button
    $(".button-collapse").sideNav({

        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens);


    });

    //Remove encaspulated Tags

    $.fn.ignore = function (sel) {
        return this.clone().find(sel || ">*").remove().end();
    };

    $(".clk > a").click(function (event) {

        var selectedB = $(this).ignore("i").text();
        searchITbooksAPI(selectedB);
    });

});

var books = [];

var id = 0;
var title = "";
var subTitle = "";
var desc = "";
var imgUrl = "";
var dLoadUrl = "";


function searchITbooksAPI() {
    var url = "https://staffan-portfolio.herokuapp.com/data";
    console.log(url);
    $.ajax({
        type: "GET",
        url: url,
        data: "",
        success: function (data) {
            console.log(typeof data);

            var booksObj = data;
            console.log(data);
            books = data;
            getBooks();
        },
        error: function (a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
        }

    });

}

/*function getValue() {
    var selected = document.getElementById("select");
    var selectedBook = selected.options[selected.selectedIndex].value;
    console.log(selectedBook);
    searchITbooksAPI(selectedBook);
}*/

function getBooks() {
    document.getElementById("books").innerHTML = "";
    books.forEach(function (arrayItem) {
        console.log(arrayItem);
        id = arrayItem._id;
        title = arrayItem.title;
        subTitle = arrayItem.subtitle;
        desc = arrayItem.desc;
        imgUrl = arrayItem.imageurl;
        // console.log(imgUrl);
        showBook(id, title, subTitle, desc, imgUrl);

    });

    function showBook(id, title, subTitle, desc, imgUrl) {
        downLoad(id);


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

        /*       htmlToAdd += "<div>" + desc + "</div>";
               htmlToAdd += "<div><input type='button' value='Ladda hem' id='"+ id + "'/>";*/

        // sista formatering
        product.innerHTML = htmlToAdd;
        //HTML injectas
        target.appendChild(product);

        /*document.getElementById("dwnLoadBtn").addEventListener("click",downLoad);*/
        function downLoad(id) {
            var url = "https://it-ebooks-api.info/v1/book/" + id;
            console.log(url);

            $.ajax({
                type: "GET",
                url: url,
                data: "",
                success: function (data) {
                    console.log(data);

                    var bookObj = data;
                    dLoadUrl = bookObj.Download;
                    console.log(dLoadUrl);

                },
                error: function (a, b, c) {
                    console.log(a);
                    console.log(b);
                    console.log(c);
                }

            });



        }
    }

}
