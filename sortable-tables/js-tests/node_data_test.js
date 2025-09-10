// Setup
const bodyEle = document.body,
  tableEle = document.createElement('TABLE');
tableEle.className = 'table';
let data = [
  {
    'Country Name': 'Afghanistan',
    Area: 652230,
    Population: 32564342,
    'Population growth rate': 2.32,
    'Birth rate': 38.57,
    'Death rate': 13.89,
    'Net migration rate': -1.51,
    'Maternal mortality rate': 460,
    'Infant mortality rate': 115.08,
    'Life expectancy at birth': 50.87,
    'Total fertility rate': 5.33,
    'Health expenditures': 8.6,
  },
  {
    'Country Name': 'Albania',
    Area: 28748,
    Population: 3029278,
    'Population growth rate': 0.3,
    'Birth rate': 12.92,
    'Death rate': 6.58,
    'Net migration rate': -3.3,
    'Maternal mortality rate': 27,
    'Infant mortality rate': 12.75,
    'Life expectancy at birth': 78.13,
    'Total fertility rate': 1.5,
    'Health expenditures': 6,
  },
  {
    'Country Name': 'Algeria',
    Area: 2381741,
    Population: 39542166,
    'Population growth rate': 1.84,
    'Birth rate': 23.67,
    'Death rate': 4.31,
    'Net migration rate': -0.92,
    'Maternal mortality rate': 97,
    'Infant mortality rate': 20.98,
    'Life expectancy at birth': 76.59,
    'Total fertility rate': 2.78,
    'Health expenditures': 5.2,
  },
  {
    'Country Name': 'American Samoa',
    Area: 199,
    Population: 54343,
    'Population growth rate': -0.3,
    'Birth rate': 22.89,
    'Death rate': 4.75,
    'Net migration rate': -21.13,
    'Maternal mortality rate': null,
    'Infant mortality rate': 8.69,
    'Life expectancy at birth': 75.14,
    'Total fertility rate': 2.92,
    'Health expenditures': null,
  },
  {
    'Country Name': 'Andorra',
    Area: 468,
    Population: 85580,
    'Population growth rate': 0.12,
    'Birth rate': 8.13,
    'Death rate': 6.96,
    'Net migration rate': 0,
    'Maternal mortality rate': null,
    'Infant mortality rate': 3.65,
    'Life expectancy at birth': 82.72,
    'Total fertility rate': 1.38,
    'Health expenditures': 8.3,
  },
  {
    'Country Name': 'Angola',
    Area: 1246700,
    Population: 19625353,
    'Population growth rate': 2.77,
    'Birth rate': 38.78,
    'Death rate': 11.49,
    'Net migration rate': 0.46,
    'Maternal mortality rate': 450,
    'Infant mortality rate': 78.26,
    'Life expectancy at birth': 55.63,
    'Total fertility rate': 5.37,
    'Health expenditures': 3.5,
  },
  {
    'Country Name': 'Anguilla',
    Area: 91,
    Population: 16418,
    'Population growth rate': 2.03,
    'Birth rate': 12.67,
    'Death rate': 4.57,
    'Net migration rate': 12.18,
    'Maternal mortality rate': null,
    'Infant mortality rate': 3.37,
    'Life expectancy at birth': 81.31,
    'Total fertility rate': 1.75,
    'Health expenditures': null,
  },
  {
    'Country Name': 'Argentina',
    Area: 2780400,
    Population: 43431886,
    'Population growth rate': 0.93,
    'Birth rate': 16.64,
    'Death rate': 7.33,
    'Net migration rate': 0,
    'Maternal mortality rate': 77,
    'Infant mortality rate': 9.69,
    'Life expectancy at birth': 77.69,
    'Total fertility rate': 2.23,
    'Health expenditures': 8.5,
  },
  {
    'Country Name': 'Armenia',
    Area: 29743,
    Population: 3056382,
    'Population growth rate': -0.15,
    'Birth rate': 13.61,
    'Death rate': 9.34,
    'Net migration rate': -5.8,
    'Maternal mortality rate': 30,
    'Infant mortality rate': 13.51,
    'Life expectancy at birth': 74.37,
    'Total fertility rate': 1.64,
    'Health expenditures': 4.5,
  },
];

function createTableBody() {
  data.forEach((row) => {
    const trEle = document.createElement('TR');
    Object.entries(row).forEach((entry, i) => {
      const key = entry[0],
        val = entry[1],
        tdEle = document.createElement('TD');
      tdEle.innerText = val;
      if (i === 0) {
        tdEle.className = 'fixed';
      } else {
        tdEle.className = 'pushRight';
      }

      trEle.appendChild(tdEle);
    });
    tableEle.appendChild(trEle);
  });
}
createTableBody();

// Snippet 1
(function () {
  function regularSort() {
    var items = Array.from(tableEle.childNodes);
    items.shift();
    var sorterIndex = 1;

    var itemNoNull = items.filter((item) => {
      var row = Array.from(item.childNodes);
      return row[1].textContent;
    });

    itemNoNull.sort((a, b) => {
      const rowA = Array.from(a.childNodes);
      const rowB = Array.from(b.childNodes);
      const x = parseInt(rowA[sorterIndex].innerText);
      const y = parseInt(rowB[sorterIndex].innerText);
      return x < y ? -1 : x > y ? 1 : 0;
    });

    itemNoNull.reverse().forEach((row) => {
      tableEle.appendChild(row);
    });
  }
  regularSort();
})()(
  // Snippet 2
  function () {
    function regularSort(results, sorter) {
      return data.sort((a, b) => {
        const x = a['Area'] === null ? -1 : a['Area'];
        const y = b['Area'] === null ? -1 : b['Area'];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
    regularSort();
    createTableBody();
  }
)();
