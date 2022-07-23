function plot_data(spendingData) {
    var chartArea = $("#spendingChartArea");
    var min = 0;
    var max = 0;
    for (var i = 0; i < spendingData.length; i++) {
        if (spendingData[i].amount > max) {
            max = spendingData[i].amount;
        }
    }
    //Tallest bar is 10 rem, so the amount needs to be divided by the size fraction to get the size relative to the tallest bar
    var sizeFraction = max / 10;

    for (var i = 0; i < spendingData.length; i++) {
        chartArea.append('<div class="day"><div class="bar" style="height:'
            + spendingData[i].amount / sizeFraction
            + 'rem"><div class="value">$'
            + spendingData[i].amount
            + '</div></div><p>'
            + spendingData[i].day + '</p></div>');
    }
}

function highlight_day(){
    const d = new Date();
    let day = d.getDay();
    let bar = "#spendingChartArea .day:nth-child("+day+") .bar";
    $(bar).css("background", "hsl(186, 34%, 60%)");
}
$(document).ready(function () {
    $(".bar").on("click",function(){
        $(this).find(".value").toggle();
    });
    jQuery(document.body).on("mouseenter mouseleave", '.bar', function(event) {
        $(this).find(".value").toggle();
        $(this).css("cursor", "pointer");
    });

    $.ajax({
        url: "./js/data.json"
    })
    .done(function (data) {
        console.log(data);
        plot_data(data);
        highlight_day();
    });



});
