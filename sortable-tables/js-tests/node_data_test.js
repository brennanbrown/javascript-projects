// Setup
const bodyEle =  document.body,
	tableEle = document.createElement("TABLE");
	tableEle.className = "table";
	let data = [
    {
      "Country Name": "Afghanistan",
      "Area": 652230,
      "Population": 32564342,
      "Population growth rate": 2.32,
      "Birth rate": 38.57,
      "Death rate": 13.89,
      "Net migration rate": -1.51,
      "Maternal mortality rate": 460,
      "Infant mortality rate": 115.08,
      "Life expectancy at birth": 50.87,
      "Total fertility rate": 5.33,
      "Health expenditures": 8.6,
      "HIV/AIDS - adult prevalence rate": 0.04,
      "HIV/AIDS - people living with HIV/AIDS": 6700,
      "HIV/AIDS - deaths": 300,
      "": null,
      "Obesity - adult prevalence rate": 2.2,
      "Children under the age of 5 years underweight": 32.9,
      "Education expenditures": null,
      "Unemployment youth ages 15-24": null,
      "GDP (purchasing power parity)": 61690000000,
      "GDP - real growth rate": 3.2,
      "GDP - per capita (PPP)": 2000,
      "Exports": 2785000000,
      "Debt - external": 1280000000,
      "Imports": 6390000000,
      "Industrial production growth rate": 7.7,
      "Inflation rate (consumer prices)": 4.6,
      "Labor force": 7512000,
      "Unemployment rate": 35,
      "Distribution of family income - Gini index": null,
      "Public debt": null,
      "Current account balance": -743900000,
      "Reserves of foreign exchange and gold": 6442000000,
      "Stock of direct foreign investment - at home": null,
      "Stock of direct foreign investment - abroad": null,
      "Market value of publicly traded shares": null,
      "Central bank discount rate": null,
      "Commercial bank prime lending rate": 15.08,
      "Stock of domestic credit": -819600000,
      "Stock of narrow money": 6121000000,
      "Stock of broad money": 6499000000,
      "Taxes and other revenues": 22.6,
      "Budget surplus (+) or deficit (-)": -0.6,
      "Gross national saving": 21.1,
      "Electricity - production": 833100000,
      "Electricity - consumption": 3021000000,
      "Electricity - exports": 0,
      "Electricity - imports": 2246000000,
      "Electricity - installed generating capacity": 489100,
      "Electricity - from fossil fuels": 23.5,
      "Electricity - from hydroelectric plants": 76.5,
      "Electricity - from nuclear fuels": 0,
      "Electricity - from other renewable sources": 0,
      "Crude oil - production": 1950,
      "Crude oil - exports": 0,
      "Crude oil - imports": 0,
      "Crude oil - proved reserves": null,
      "Refined petroleum products - production": 0,
      "Refined petroleum products - consumption": 50000,
      "Refined petroleum products - exports": 0,
      "Refined petroleum products - imports": 36250,
      "Natural gas - production": 140000000,
      "Natural gas - consumption": 140000000,
      "Natural gas - exports": 0,
      "Natural gas - imports": 0,
      "Natural gas - proved reserves": 49550000000,
      "Telephones - fixed lines": 100000,
      "Telephones - mobile cellular": 23400000,
      "Internet users": 1900000,
      "Airports": 52,
      "Railways": null,
      "Roadways": 42150,
      "Waterways": 1200,
      "Military expenditures": null
    },
    {
      "Country Name": "Akrotiri",
      "Area": 123,
      "Population": null,
      "Population growth rate": null,
      "Birth rate": null,
      "Death rate": null,
      "Net migration rate": null,
      "Maternal mortality rate": null,
      "Infant mortality rate": null,
      "Life expectancy at birth": null,
      "Total fertility rate": null,
      "Health expenditures": null,
      "HIV/AIDS - adult prevalence rate": null,
      "HIV/AIDS - people living with HIV/AIDS": null,
      "HIV/AIDS - deaths": null,
      "": null,
      "Obesity - adult prevalence rate": null,
      "Children under the age of 5 years underweight": null,
      "Education expenditures": null,
      "Unemployment youth ages 15-24": null,
      "GDP (purchasing power parity)": null,
      "GDP - real growth rate": null,
      "GDP - per capita (PPP)": null,
      "Exports": null,
      "Debt - external": null,
      "Imports": null,
      "Industrial production growth rate": null,
      "Inflation rate (consumer prices)": null,
      "Labor force": null,
      "Unemployment rate": null,
      "Distribution of family income - Gini index": null,
      "Public debt": null,
      "Current account balance": null,
      "Reserves of foreign exchange and gold": null,
      "Stock of direct foreign investment - at home": null,
      "Stock of direct foreign investment - abroad": null,
      "Market value of publicly traded shares": null,
      "Central bank discount rate": null,
      "Commercial bank prime lending rate": null,
      "Stock of domestic credit": null,
      "Stock of narrow money": null,
      "Stock of broad money": null,
      "Taxes and other revenues": null,
      "Budget surplus (+) or deficit (-)": null,
      "Gross national saving": null,
      "Electricity - production": null,
      "Electricity - consumption": null,
      "Electricity - exports": null,
      "Electricity - imports": null,
      "Electricity - installed generating capacity": null,
      "Electricity - from fossil fuels": null,
      "Electricity - from hydroelectric plants": null,
      "Electricity - from nuclear fuels": null,
      "Electricity - from other renewable sources": null,
      "Crude oil - production": null,
      "Crude oil - exports": null,
      "Crude oil - imports": null,
      "Crude oil - proved reserves": null,
      "Refined petroleum products - production": null,
      "Refined petroleum products - consumption": null,
      "Refined petroleum products - exports": null,
      "Refined petroleum products - imports": null,
      "Natural gas - production": null,
      "Natural gas - consumption": null,
      "Natural gas - exports": null,
      "Natural gas - imports": null,
      "Natural gas - proved reserves": null,
      "Telephones - fixed lines": null,
      "Telephones - mobile cellular": null,
      "Internet users": null,
      "Airports": null,
      "Railways": null,
      "Roadways": null,
      "Waterways": null,
      "Military expenditures": null
    }
 ];
 function createTableBody(){
      data.forEach((row) => {
            const trEle = document.createElement("TR")
            Object.entries(row).forEach((entry, i) => {
                  const key = entry[0],
                  val = entry[1],
                  tdEle = document.createElement("TD")
                  tdEle.innerText = val;
                  if(i === 0){
                        tdEle.className = "fixed";
                  }else{
                        tdEle.className = "pushRight";
                  }

                  trEle.appendChild(tdEle);
            })
            tableEle.appendChild(trEle)
      })
}
createTableBody();

// Snippet 1
(function(){

      function regularSort(){
            var items = Array.from(tableEle.childNodes);
            items.shift()
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
                  return x < y ? -1 : (x > y) ? 1 : 0;                  
            });
            
            itemNoNull.reverse().forEach((row) => {
                  tableEle.appendChild(row)
            })
      }
      regularSort();
      
})()

// Snippet 2
(function(){
  	function regularSort(results,sorter){
		return data.sort((a, b) => {
			const x = a["Area"] === null ? -1 : a["Area"];
			const y = b["Area"] === null ? -1 : b["Area"];
			return x < y ? -1 : (x > y) ? 1 : 0;
		});		
	}
	regularSort();
      createTableBody();
})()