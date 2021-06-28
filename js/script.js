var searchBtn = document.getElementById("searchBtn");

var seriesList = [];

if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        var seriesName = document.getElementById("sname").value;

        localStorage.setItem("sname", seriesName);

        window.location.href = "E:/Portfolio projects/TV shows site/html/seriesList.html";
    }, false);
}

function loadPage() {

    //getting series entered from previous page
    var seriesName = localStorage.getItem("sname");

    //setting the series name in UI 
    document.getElementById("series").textContent = seriesName;

    //fetching the data returned from API call and then building UI from that data
    fetchSeriesList();

}

function loadDetailsPage() {
    fetchDetails(localStorage.getItem("seriesdetailsname"));
}

function fetchSeriesList() {

    var seriesName = localStorage.getItem("sname");

    var request = new XMLHttpRequest();

    request.open('GET', `https://api.tvmaze.com/search/shows?q=${seriesName}`);

    var mainDiv = document.getElementById("main");

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            console.log(data);

            if (data.length == 0) {
                var message = document.createElement("div");
                message.className = "row";
                message.className = "container d-flex align-items-center justify-content-center";
                message.textContent = "No result found";
                message.style.fontSize = "4rem";
                message.style.color = "grey";
                message.style.marginTop = "10%";

                mainDiv.appendChild(message);
            }

            for (let index = 0; index < data.length; index++) {

                // styling main div for each series 

                var seriesInfoDiv = document.createElement("div");
                seriesInfoDiv.className = "row";
                // seriesInfoDiv.style.backgroundColor = "#edede8";
                seriesInfoDiv.style.margin = "5%";
                seriesInfoDiv.style.padding = "2%";
                seriesInfoDiv.style.border = "2px ridge";

                //elements creation for data display

                var poster = document.createElement("img");
                poster.src = data[index]["show"]["image"] == null ? "data:image/png;base64,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" :
                    data[index]["show"]["image"]["medium"];

                var infoDiv = document.createElement("div");
                infoDiv.className = "col-sm";

                var desc = document.createElement("p");
                desc.textContent = data[index]["show"]["summary"];

                var name = document.createElement("p");
                name.className = "display-4";
                name.textContent = data[index]["show"]["name"];

                var line = document.createElement("hr");

                var genres = document.createElement("p");
                genres.textContent = data[index]["show"]["genres"].length == 0 ? "Not specified" : data[index]["show"]["genres"].toString();

                // var type = document.createElement("p");
                // type.textContent = "Type: " + data[index]["show"]["type"];

                // var language = document.createElement("p");
                // language.textContent = "Language: " + data[index]["show"]["language"];

                // var runtime = document.createElement("p");
                // runtime.textContent = "Language: " + data[index]["show"]["runtime"];

                // var averageRating = document.createElement("p");
                // averageRating.textContent = "Average rating: " + data[index]["show"]["rating"]["average"];

                var btnDiv = document.createElement("div");

                var button = document.createElement("button");
                button.textContent = "More info";
                button.className = "btn btn-danger";
                button.onclick = function() {
                    window.location.href = "E:/Portfolio projects/TV shows site/html/seriesDetail.html";
                    localStorage.setItem("seriesdetailsname", data[index]["show"]["id"])
                }

                btnDiv.appendChild(button);

                // appending elements to their parent elements

                mainDiv.appendChild(seriesInfoDiv);
                seriesInfoDiv.appendChild(poster);
                seriesInfoDiv.appendChild(infoDiv);
                seriesInfoDiv.appendChild(btnDiv);
                infoDiv.appendChild(name);
                infoDiv.appendChild(line);
                infoDiv.appendChild(genres);
                // infoDiv.appendChild(type);
                // infoDiv.appendChild(language);
                // infoDiv.appendChild(runtime);
                // infoDiv.appendChild(averageRating);
                infoDiv.appendChild(desc);

            }

        } else {
            console.log('error')
        }
    }

    request.send();

}

function fetchDetails(seriesID) {

    var request = new XMLHttpRequest();

    request.open('GET', `https://api.tvmaze.com/shows/${seriesID}`);

    var mainDiv = document.getElementById("main");

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            console.log(data);


            // styling main div for each series 

            var seriesInfoDiv = document.createElement("div");
            seriesInfoDiv.className = "row";
            seriesInfoDiv.style.backgroundColor = "#edede8";
            seriesInfoDiv.style.margin = "5%";
            seriesInfoDiv.style.padding = "2%";

            //elements creation for data display

            var poster = document.createElement("img");
            poster.src = data["image"] == null ? "data:image/png;base64,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" :
                data["image"]["original"];
            poster.className = "img-fluid";
            poster.alt = "Responsive image";

            var infoDiv = document.createElement("div");
            infoDiv.className = "col-sm";

            var desc = document.createElement("p");
            desc.textContent = data["summary"];

            var name = document.createElement("p");
            name.className = "display-4";
            name.textContent = data["name"];

            var line = document.createElement("hr");

            var genres = document.createElement("p");
            genres.textContent = data["genres"].length == 0 ? "Not specified" : data["genres"].toString();

            var type = document.createElement("p");
            type.textContent = "Type: " + data["type"];

            var language = document.createElement("p");
            language.textContent = "Language: " + data["language"];

            var runtime = document.createElement("p");
            runtime.textContent = "Runtime: " + data["runtime"];

            var averageRating = document.createElement("p");
            averageRating.textContent = "Average rating: " + data["rating"]["average"];

            var premDate = document.createElement("p");
            premDate.textContent = "Premiered date: " + data["premiered"];

            var network = document.createElement("p");
            var networkname = data["network"] == null ? "" : data["network"]["name"];
            network.textContent = "Network: " + networkname;

            // appending elements to their parent elements

            mainDiv.appendChild(seriesInfoDiv);
            seriesInfoDiv.appendChild(poster);
            seriesInfoDiv.appendChild(infoDiv);
            infoDiv.appendChild(name);
            infoDiv.appendChild(line);
            infoDiv.appendChild(genres);
            infoDiv.appendChild(type);
            infoDiv.appendChild(language);
            infoDiv.appendChild(runtime);
            infoDiv.appendChild(averageRating);
            infoDiv.appendChild(premDate);
            infoDiv.appendChild(network);
            infoDiv.appendChild(desc);


        } else {
            console.log('error')
        }
    }

    request.send();
}

function buildChart() {

    var seriesName = localStorage.getItem("sname");

    var request = new XMLHttpRequest();

    request.open('GET', `https://api.tvmaze.com/search/shows?q=${seriesName}`);


    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            if (data != null) {
                for (let index = 0; index < data.length; index++) {

                    seriesList[index] = { label: data[index]["show"]["name"], y: data[index]["show"]["rating"]["average"] == null ? 0 : data[index]["show"]["rating"]["average"] };

                }
                console.log(seriesList);
                console.log(sessionStorage.getItem("chartType"));

                var chart = new CanvasJS.Chart("chartContainer", {

                    title: {
                        text: "Average ratings"
                    },
                    data: [{
                        type: sessionStorage.getItem("chartType") == null ? "column" : sessionStorage.getItem("chartType"),
                        dataPoints: seriesList
                    }]
                });
                chart.render();
            }

        }
    }
    request.send();

}

// function getChartType() {
//     var dropdown = document.getElementById("charts");
//     var chartOption = dropdown.options[dropdown.selectedIndex].value;
//     sessionStorage.setItem("chartType", chartOption);

//     return chartOption;
// }

document.getElementById("charts").addEventListener("change", () => {
    var dropdown = document.getElementById("charts");
    var chartOption = dropdown.options[dropdown.selectedIndex].value;
    sessionStorage.setItem("chartType", chartOption);
    location.reload();
});

if (sessionStorage.getItem('chartType')) {
    document.getElementById(sessionStorage.getItem("chartType")).selected = true;
}