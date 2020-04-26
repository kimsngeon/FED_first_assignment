const apiUrl = "https://coronavirus-19-api.herokuapp.com/countries";
const contentDiv = document.getElementById("content");

let countries = "";

async function loadData() {
  const response = await fetch(apiUrl);
  countries = await response.json();

  showWorldData();
}

function showWorldData() {
  let worldCasesResult =
    "Cases<br>" +
    countries[7].cases +
    "<br><div class='worldToday'>(+" +
    countries[7].todayCases +
    ")</div>";
  document.getElementById("worldCases").innerHTML = worldCasesResult;
  let worldDeathsResult =
    "Deaths<br>" +
    countries[7].deaths +
    "<br><div class='worldToday'>(+" +
    countries[7].todayDeaths +
    ")</div>";
  document.getElementById("worldDeaths").innerHTML = worldDeathsResult;
  let worldRecoveredResult =
    "Recovered<br>" + countries[7].recovered + "<br>&nbsp";
  document.getElementById("worldRecovered").innerHTML = worldRecoveredResult;

  filterData();
}

function filterData() {
  countries = countries.filter(function(country) {
    return (
      country.country !== "World" &&
      country.country !== "Total:" &&
      country.country !== "Europe" &&
      country.country !== "Asia" &&
      country.country !== "South America" &&
      country.country !== "North America" &&
      country.country !== "Africa" &&
      country.country !== "Oceania" &&
      country.country !== ""
    );
  });

  showData();
}

function showData(sortCriteria) {
  if (sortCriteria === "country") {
    countries = countries.sort(function(a, b) {
      var A = a.country.toLowerCase();
      var B = b.country.toLowerCase();
      return A > B ? 1 : B > A ? -1 : 0;
    });
  } else if (sortCriteria === "cases") {
    countries = countries.sort(function(a, b) {
      return b.cases - a.cases;
    });
  } else if (sortCriteria === "casesPer") {
    countries = countries.sort(function(a, b) {
      return b.casesPerOneMillion - a.casesPerOneMillion;
    });
  } else if (sortCriteria === "deaths") {
    countries = countries.sort(function(a, b) {
      return b.deaths - a.deaths;
    });
  } else if (sortCriteria === "deathsPer") {
    countries = countries.sort(function(a, b) {
      return b.deathsPerOneMillion - a.deathsPerOneMillion;
    });
  } else if (sortCriteria === "recovered") {
    countries = countries.sort(function(a, b) {
      return b.recovered - a.recovered;
    });
  } else if (sortCriteria === "totalTests") {
    countries = countries.sort(function(a, b) {
      return b.totalTests - a.totalTests;
    });
  } else if (sortCriteria === "testsPer") {
    countries = countries.sort(function(a, b) {
      return b.testsPerOneMillion - a.testsPerOneMillion;
    });
  } else {
    countries = countries.sort(function(a, b) {
      return b.cases - a.cases;
    });
  }

  let result = "";
  result += "<tr class='contentInfo'>";
  for (let country of countries) {
    result += "<td class='content1' >" + country.country + "</td>";
    result +=
      "<td class='content1'>" +
      country.cases +
      "<br><div class='contentToday'>(+ " +
      country.todayCases +
      ")</div></td>";
    result += "<td class='content1'>" + country.casesPerOneMillion + "</td>";
    result +=
      "<td class='content2'>" +
      country.deaths +
      "<br><div class='contentToday'>(+ " +
      country.todayDeaths +
      ")</div></td>";
    result += "<td class='content2'>" + country.deathsPerOneMillion + "</td>";
    result += "<td class='content1'>" + country.recovered + "</td>";
    result += "<td class='content1'>" + country.totalTests + "</td>";
    result += "<td class='content1'>" + country.testsPerOneMillion + "</td>";
    result += "</tr>";
  }

  contentDiv.innerHTML = result;
}

loadData();

const buttonCountry = document.getElementById("country");
buttonCountry.addEventListener("click", function() {
  showData("country");
});

const buttonCases = document.getElementById("cases");
buttonCases.addEventListener("click", function() {
  showData("cases");
});

const buttonCasesPer = document.getElementById("casesPer");
buttonCasesPer.addEventListener("click", function() {
  showData("casesPer");
});

const buttonDeaths = document.getElementById("deaths");
buttonDeaths.addEventListener("click", function() {
  showData("deaths");
});

const buttonDeathsPer = document.getElementById("deathsPer");
buttonDeathsPer.addEventListener("click", function() {
  showData("deathsPer");
});

const buttonRecovered = document.getElementById("recovered");
buttonRecovered.addEventListener("click", function() {
  showData("recovered");
});

const buttonTotalTests = document.getElementById("totalTests");
buttonTotalTests.addEventListener("click", function() {
  showData("totalTests");
});

const buttonTestsPer = document.getElementById("testsPer");
buttonTestsPer.addEventListener("click", function() {
  showData("testsPer");
});

window.onscroll = function() {
  myFunction();
};

var menu = document.getElementById("menu");

function myFunction() {
  if (window.pageYOffset >= menu.offsetTop + 350) {
    menu.classList.add("sticky");
  } else {
    menu.classList.remove("sticky");
  }
}
