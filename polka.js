//Polka-Mania 2021 JS file

//On page load
window.onload = function () {

    //Retrieve current file name to determine which page is active
    var fileName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    //If home page is active
    if (fileName == "index.html") {
        $("#homeNavHead").css("background-color", "ForestGreen");
        $("#homeNavFooter").css("background-color", "ForestGreen");
        //If tickets page is active
    } else if (fileName == "tickets.html") {
        $("#ticketsNavHead").css("background-color", "ForestGreen");
        $("#ticketsNavFooter").css("background-color", "ForestGreen");
        //If activities page is active
    } else if (fileName == "activities.html") {
        $("#activitiesNav").css("background-color", "ForestGreen");
        //If vendors page is active
    } else if (fileName == "vendors.html") {
        $("#vendorNav").css("background-color", "ForestGreen");
        //If contact us page is active
    } else if (fileName == "contactus.html") {
        $("#contactNavHead").css("background-color", "ForestGreen");
        $("#contactNavFooter").css("background-color", "ForestGreen");
    }

    //Event handlers for click event on images 1-6 in gallery from index.html
    $("#img1").click(imageSwap1);
    $("#img2").click(imageSwap2);
    $("#img3").click(imageSwap3);
    $("#img4").click(imageSwap4);
    $("#img5").click(imageSwap5);
    $("#img6").click(imageSwap6);

    //Create slider widget for activites page using the jQueryUI 1.12 Slider Widget
    $("#excitementSlider").slider({
        min: 0,
        max: 100,
        orientation: "horizontal"
    });

    //Activites page slider widget
    //On slider widget 'slidechange' call function to display current percentage selected
    $("#excitementSlider").on("slidechange", function (event, ui) {
        var exciteValue = $("#excitementSlider").slider("option", "value");
        $("#exciteValue").text(exciteValue + "%");

        //If exciteValue selected is equal to 100, open new jBox
        if (exciteValue == 100) {
            var good = new jBox('Modal', {
                id: "goodBox",
                width: 700,
                height: 220,
                content: 'We are so glad you are 100% satisfied with the activities! We will see you at the festival!'
            });
            good.open();
            //If exciteValue selected is not equal to 100, open new jBox
        } else {
            var bad = new jBox('Modal', {
                id: "badBox",
                width: 700,
                height: 220,
                content: 'Are you not 100% satisfied with the activities? Maybe we can help change that! Look below for more details.'
            });
            bad.open();
        }
    });

    //AnimateScroll jQuery plugin functionality
    //Eases up to top of webpage
    $("#toTop").click(animateToTop);

    //Activities page suggestion form submit button on click will clear all form values and display jBox with response
    $("#submitBtnSuggestion").click(function (evt) {
        //Create new jBox for response
        var activitiesResponseJBox = new jBox('Modal', {
            id: "activitiesSubmissionJBox",
            width: 700,
            height: 220,
            content: 'Thank you for responding! We are excited to read your response.'
        });
        activitiesResponseJBox.open();
        evt.preventDefault();

        //Clear form values
        $("#name").val("");
        $("#emailResponse").val("");
        $("#polkaDancing").prop("checked", false);
        $("#contests").prop("checked", false);
        $("#performers").prop("checked", false);
        $("#parade").prop("checked", false);
        $("#food").prop("checked", false);
        $("#games").prop("checked", false);
        $("#suggestionBox").val("");
    });

    //Tickets page purchase form submit button on click will clear all form values and display jBox with thank you message
    $("#submitBtnTickets").click(function (evt) {
        //Create new thank you message jBox
        var thankYou = new jBox('Modal', {
            id: "ticketPurchaseJBox",
            width: 700,
            height: 220,
            content: 'Thank you for purchasing your tickets! We will see you at the festival!'
        });
        thankYou.open();
        evt.preventDefault();

        //Clear form values
        $("#nameTicketsForm").val("");
        $("#emailTickets").val("");
        $("#addressTickets").val("");
        $("#cardTickets").val("");
        $("#oneDay").prop("checked", false);
        $("#twoDay").prop("checked", false);
    });

    //Vendors page vendor application form submit button on click will clear all form values and display jBox with response
    $("#submitBtnVendors").click(function (evt) {
        //Create new jBox for response
        var responseJBox = new jBox('Modal', {
            id: "vendorSubmissionJBox",
            width: 700,
            height: 220,
            content: 'Thank you for your interest in working with us! We will be reviewing you application soon.'
        });
        responseJBox.open();
        evt.preventDefault();

        //Clear form values
        $("#name").val("");
        $("#businessName").val("");
        $("#emailResponse").val("");
        $("#numberResponse").val("");
        $("#descriptionResponse").val("");
    });

    //Contact us page form submit button on click will clear all form values and display jBox with response
    $("#submitBtnContact").click(function (evt) {
        //Create new jBox for response
        var contactResponseJBox = new jBox('Modal', {
            id: "contactUsSubmissionJBox",
            width: 700,
            height: 220,
            content: 'Thank you for responding! We are excited to read your response.'
        });
        contactResponseJBox.open();
        evt.preventDefault();

        //Clear form values
        $("#name").val("");
        $("#emailResponse").val("");
        $("#questionBox").val("");
        $("#displaySatValue").text("0%");
    });

    //Create slider widget for the contact us page using the jQueryUI 1.12 Slider Widget
    $("#webSatisfactionSlider").slider({
        min: 0,
        max: 100,
        orientation: "horizontal"
    });

    //Contact Us page form slider widget
    //On slider widget 'slidechange' call function to display current percentage selected
    $("#webSatisfactionSlider").on("slidechange", function (event, ui) {
        var webSatValue = $("#webSatisfactionSlider").slider("option", "value");
        $("#displaySatValue").text(webSatValue + "%");
    });

//Ajax request to get data from team json file for Contact Us page Team section
$.ajax({
    type: "get",
    url: "team.json",
    beforeSend: function() {
        $("#team").html("Loading...");
    },
    error: function(xhr, status, error) {
        alert("Error: " + xhr.status + " - " + error);
    },
    dataType: "json",
    success: function(data) {
        $("#team").html("");
        $.getJSON("team.json", function(data) {
            $.each(data, function() {
                $.each(this, function(key, value) {
                    $("#team").append("<h3>" + value.name + "</h3>" +
                        "<p>" + value.title + "</p>" +
                        "<p>" + value.bio + "</p>"
                    ); //End append
                }); //End .each 2
            }); //End .each 1
        }); //End .getJSON
    } //End success function
}); //End ajax request

//Ajax request to Youtube search API to get polka dancing video
//Code from "Demo Activity - Assessing YouTube Search API" from ITIS-3135 Canvas Page
$.ajax({
    type: "get",
    //YouTube Search API
    url: "https://www.googleapis.com/youtube/v3/search",
    data: {
        //API key
        key: "AIzaSyDC0olWImriTvbU6tAsLQ4okljJmJjyE6g",
        //Search query
        q: "PolkaPerformanceatOktoberfest",
        part: "snippet",
        maxResults: 1,
        type: "video",
        videoEmbeddable: true
    },
    //On successful data retrieval place video title and video content
    success: function(data) {
        $('#videoIntro').after('<p>' + data.items[0].snippet.title + '</p>');
        $("iframe").attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId);
    },
    //On error display error message in console
    error: function(response) {
        console.log("Youtube video search request failed");
    }
});


}; //END DOCUMENT ON LOAD


//Uses AnimateScroll jQuery plugin to ease up to head with 'easeInSine'
function animateToTop() {
    $("head").animatescroll({
        scrollSpeed: 800,
        easing:'easeInSine'
    });
}

//Swaps blank image with dancing image
function imageSwap1() {
    $("#blankImage").attr("src", "images/gallery/dancing.jpg");
    $("#blankImage").attr("alt", "group of people dancing the Polka");
}

//Swaps blank image with music image
function imageSwap2() {
    $("#blankImage").attr("src", "images/gallery/music.jpg");
    $("#blankImage").attr("alt", "band of Polka musicians");
}

//Swaps blank image with food image
function imageSwap3() {
    $("#blankImage").attr("src", "images/gallery/food.jpg");
    $("#blankImage").attr("alt", "scrumptious food options");
}

//Swaps blank image with vendor image
function imageSwap4() {
    $("#blankImage").attr("src", "images/gallery/vendors.jpg");
    $("#blankImage").attr("alt", "group of tents for vendors");
}

//Swaps blank image with performers image
function imageSwap5() {
    $("#blankImage").attr("src", "images/gallery/performers.jpg");
    $("#blankImage").attr("alt", "group of Polka musicians");
}

//Swaps blank image with parades image
function imageSwap6() {
    $("#blankImage").attr("src", "images/gallery/parades.jpg");
    $("#blankImage").attr("alt", "group of people sitting on parade float");
}