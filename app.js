$(document).ready(function () {

    var moods = ["Happy", "Sad", "Annoyed", "Angry", "Silly"];

    function showButtons() {
        console.log(moods);
        $("#mood-buttons").empty();
        for (i = 0; i < moods.length; i++) {
            var mb = $("<button>");
            mb.addClass("mood-button");
            mb.attr("data-type", moods[i]);
            mb.text(moods[i]);
            $("#mood-buttons").append(mb);
        }
    }
    showButtons();

    $("#add-mood").on("click", function () {
        event.preventDefault();
        var mood = $("#mood-input").val();
        moods.push(mood);
        showButtons();
    });

    $(document).on('click', '.mood-button', function () {
        var mood = $(this).attr("data-type");
        console.log(mood);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + '&api_key=Ix1raiCGZ0fEifNhIWfEVTp545KoT9dU&limit=10&offset=0&rating=PG&lang=en';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var response = response.data;
            console.log(response);
            $("#moods").empty();
            for (var i = 0; i < response.length; i++) {
                var moodDiv = $("<div>");
                var p = $("<p>").text("Rating" + response[i].rating);
                var moodImg = $("<img>");

                moodImg.attr("src", response[i].images.original_still.url);
                moodImg.attr("data-still", response[i].images.original_still.url);
                moodImg.attr("data-animate", response[i].images.original.url);
                moodImg.attr("data-state", "still");
                moodImg.addClass("gif-img");
                moodDiv.append(p);
                moodDiv.append(moodImg);
                $("#moods").append(moodDiv);
            }
        });
    });

    $(document).on("click", ".gif-img", function () {
        console.log("works");
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("scr", stillImage);
            $(this).attr("data-state", "still");
        }
    });

});