const APIworld = "https://disease.sh/v3/covid-19/all";
const APIcountry = "https://pomber.github.io/covid19/timeseries.json";
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");
const changelist = document.getElementById('change-country-list');
const search_country = document.querySelector(".search-country");

//WORLDWIDE
function fetchCoronavirusData() {

  let coronavirusData = {
      totalconfirmed: null,
      newconfirmed: null,
      totadDeaths: null,
      newdeaths: null,
      totalrecovered: null,
      newrecovered: null
  }

  fetch(APIworld).then(res => res.json()).then((data) => {

      coronavirusData.totalconfirmed = data.cases;
      coronavirusData.newconfirmed = data.todayCases;
      coronavirusData.totaldeaths = data.deaths;
      coronavirusData.newdeaths = data.todayDeaths;
      coronavirusData.totalrecovered = data.recovered;
      coronavirusData.newrecovered = data.todayRecovered;

      country_name_element.innerHTML = "Worldwide"
      total_cases_element.innerHTML = coronavirusData.totalconfirmed;
      new_cases_element.innerHTML = "+ " + coronavirusData.newconfirmed;
      recovered_element.innerHTML = coronavirusData.totalrecovered;
      new_recovered_element.innerHTML = "+ " + coronavirusData.newrecovered;
      deaths_element.innerHTML = coronavirusData.totaldeaths;
      new_deaths_element.innerHTML = "+ " + coronavirusData.newdeaths;
      axesLinearChart();
  })

}


//COUNTRY WISE
function fetchData(country_name){
    countryinput = country_name;
    console.log(countryinput);
    fetch(APIcountry)
    .then(response => {
      return response.json();
    })
    .then(myData => {
     data = myData;
     console.log(data);
     updateStates();
  })
}



//UPDATE
function updateStates() {
      country_name_element.innerHTML = countryinput;
      total_cases_element.innerHTML = data[countryinput][data[countryinput].length - 1].confirmed;
      new_cases_element.innerHTML = `+${(data[countryinput][data[countryinput].length - 1].confirmed) - (data[countryinput][data[countryinput].length - 2].confirmed)}`;
      recovered_element.innerHTML = data[countryinput][data[countryinput].length - 1].recovered;
      new_recovered_element.innerHTML = `+${data[countryinput][data[countryinput].length - 1].recovered - data[countryinput][data[countryinput].length - 2].recovered}`;
      deaths_element.innerHTML = data[countryinput][data[countryinput].length - 1].deaths;
      new_deaths_element.innerHTML = `+${data[countryinput][data[countryinput].length - 1].deaths - data[countryinput][data[countryinput].length - 2].deaths}`;
}


//CHART
let my_chart;
function axesLinearChart() {
    fetch("https://covid19.mathdro.id/api/daily").then(res => res.json()).then((data) => {
      console.log(data);

      var canvas = document.getElementById("axes_line_chart").getContext('2d');

      let coronavirusDateSets = [data[data.length - 8 * 20].reportDate, data[data.length - 8 * 19].reportDate, data[data.length - 8 * 18].reportDate, data[data.length - 8 * 17].reportDate, data[data.length - 8 * 16].reportDate, data[data.length - 8 * 15].reportDate, data[data.length - 8 * 14].reportDate, data[data.length - 8 * 13].reportDate, data[data.length - 8 * 12].reportDate, data[data.length - 8 * 11].reportDate, data[data.length - 8 * 10].reportDate, data[data.length - 8 * 9].reportDate, data[data.length - 8 * 8].reportDate, data[data.length - 8 * 7].reportDate, data[data.length - 8 * 6].reportDate, data[data.length - 8 * 5].reportDate, data[data.length - 8 * 4].reportDate, data[data.length - 8 * 2].reportDate, data[data.length - 8].reportDate, data[data.length - 1].reportDate];
      let confirmedCoronavirusDataSet = [data[data.length - 8 * 20].totalConfirmed, data[data.length - 8 * 19].totalConfirmed, data[data.length - 8 * 18].totalConfirmed, data[data.length - 8 * 17].totalConfirmed, data[data.length - 8 * 16].totalConfirmed, data[data.length - 8 * 15].totalConfirmed, data[data.length - 8 * 14].totalConfirmed, data[data.length - 8 * 13].totalConfirmed, data[data.length - 8 * 12].totalConfirmed, data[data.length - 8 * 11].totalConfirmed, data[data.length - 8 * 10].totalConfirmed, data[data.length - 8 * 9].totalConfirmed, data[data.length - 8 * 8].totalConfirmed, data[data.length - 8 * 7].totalConfirmed, data[data.length - 8 * 6].totalConfirmed, data[data.length - 8 * 5].totalConfirmed, data[data.length - 8 * 4].totalConfirmed, data[data.length - 8 * 3].totalConfirmed, data[data.length - 8 * 2].totalConfirmed, data[data.length - 8].totalConfirmed, data[data.length - 1].totalConfirmed];
      let deathCoronavirusDataSet = [data[data.length - 8 * 20].deaths.total, data[data.length - 8 * 19].deaths.total, data[data.length - 8 * 18].deaths.total, data[data.length - 8 * 17].deaths.total, data[data.length - 8 * 16].deaths.total, data[data.length - 8 * 15].deaths.total, data[data.length - 8 * 14].deaths.total, data[data.length - 8 * 13].deaths.total, data[data.length - 8 * 12].deaths.total, data[data.length - 8 * 11].deaths.total, data[data.length - 8 * 10].deaths.total, data[data.length - 8 * 9].deaths.total, data[data.length - 8 * 8].deaths.total, data[data.length - 8 * 7].deaths.total, data[data.length - 8 * 6].deaths.total, data[data.length - 8 * 5].deaths.total, data[data.length - 8 * 4].deaths.total, data[data.length - 8 * 2].deaths.total, data[data.length - 8].deaths.total, data[data.length - 1].deaths.total];

      my_chart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: coronavirusDateSets,
          datasets: [{
            label: 'Confirmed Cases (Worldwide)',
            data: confirmedCoronavirusDataSet,
            backgroundColor: '#FFFFFF',
            fill: false,
            borderColor: '#FFFFFF',
            backgroundColor: '#FFFFFF'
          }, {
            label: 'Deaths (Worldwide)',
            data: deathCoronavirusDataSet,
            backgroundColor: '#f44336',
            fill: false,
            borderColor: '#f44336',
            backgroundColor: '#f44336'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
                display: true,
                text: 'Graphical Representation of World Coronavirus Data',
            }
        }}
      });


    });
  }

//Executing the functions
fetchCoronavirusData();
fetchCountryData();
