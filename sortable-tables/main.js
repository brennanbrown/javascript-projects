import {
	regularSort,
	bubbleSort,
	mergeSort,
	insertionSort,
	minMaxMean
} from './scripts/sort.js';

(function () {
	const bodyEle = document.body,
		tableEle = document.createElement("TABLE");
	tableEle.className = "table";
	let data = [],
		originalData = [],
		columnSummary = {}
	let sorters = [],
		headers = [];

	function tableInit() {
		const sortingWell = document.createElement("DIV");
		const container = document.createElement("DIV");
		const resetBtn = document.getElementById("reset");
		resetBtn.addEventListener("click", () => {
			data = originalData;
			while (tableEle.firstChild) {
				tableEle.removeChild(tableEle.firstChild);
			}
			while (sortingWell.firstChild) {
				sortingWell.removeChild(sortingWell.firstChild);
			}
			createTable()
		})
		container.className = "tableContainer"
		sortingWell.className = "border bg-light p-3 sortWell";
		sortingWell.addEventListener("drop", drop);
		sortingWell.addEventListener("dragover", allowDrop);
		bodyEle.appendChild(sortingWell);
		// Datafile:
		const url = "./factbook.json";
		fetch(url)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('something went wrong!')
				}
			})
			// Reassigning the data variable:
			.then((results) => {
				data = results;
				originalData = results;
				columnSummary = minMaxMean(results);
			})
			.then(() => {
				createTable()
			})
			.then(() => {
				container.appendChild(tableEle)
				bodyEle.appendChild(container);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function createTable() {
		createHeader();
		createTableBody();
	}

	function createHeader() {
		const trEle = document.createElement("TR");
		const firstRow = data[0];
		// ES5 Object.keys
		headers = Object.keys(firstRow);
		headers.forEach((key, i) => {
			const thEle = document.createElement("TH"),
				btnEle = document.createElement("BUTTON");
			btnEle.className = 'btn btn-default ml-2'
			btnEle.innerText = key;
			// ES6 template literals
			btnEle.id = `sorter-${i}`;
			btnEle.draggable = true;
			btnEle.addEventListener("dragstart", dragstart);
			thEle.appendChild(btnEle);
			trEle.appendChild(thEle);
			if (i === 0) {
				thEle.className = "fixed";
			} else {
				thEle.className = "pushRight";
			}
		})
		tableEle.appendChild(trEle);
	}

	function createTableBody() {
		data.forEach((row) => {
			const trEle = document.createElement("TR")
			Object.entries(row).forEach((entry, i) => {
				const key = entry[0],
					val = entry[1],
					tdEle = document.createElement("TD")
				tdEle.innerText = val;
				if (i === 0) {
					tdEle.className = "fixed";
				} else {
					tdEle.className = "pushRight " + key.toLowerCase().replace(/-/g, '').replace(/ /g, '_');
				}
				trEle.appendChild(tdEle);
			})
			tableEle.appendChild(trEle)
		})
	}

	function allowDrop(ev) {
		ev.preventDefault();
		ev.stopPropagation();
	}

	function dragstart(ev) {
		ev.dataTransfer.setData("text", ev.currentTarget.id);
		// Here I clone the button because A node can only exist once in the DOM and when
		// you append it somewhere else, it removes it from the original location.
		// So, when you append the button on drop, it automatically removes it from the TH.
		var clonedBtn = ev.target.cloneNode(true);
		clonedBtn.id = `${clonedBtn.id}-cloned`
		clonedBtn.disabled = true;
		clonedBtn.style.display = "none";
		ev.currentTarget.parentNode.appendChild(clonedBtn)
	}
	// IMPORTANT!
	function drop(ev) {
		var transferData = ev.dataTransfer.getData("text");
		const dragBtn = document.getElementById(transferData);
		const clonedBtn = document.getElementById(`${transferData}-cloned`);
		ev.currentTarget.appendChild(dragBtn);
		clonedBtn.style.display = "block";
		sorters.length = 0;
		event.currentTarget.childNodes.forEach((item) => {
			sorters.push(item.innerText);
		})
		sorters.reverse();
		// Passing in the very first sorter from the sorter well:
		// Eg. if you drag an area, you'll get it's index which
		// is one, and then you will use it to get the value.
		const sorterIndex = headers.indexOf(sorters[0]);
		// Filter Null Values
		const itemsNotNull = filterNull(sorterIndex);
		switch (getSort(data)) {
			case "regular":
				console.profile("regularSort");
				const regularArr = regularSort(itemsNotNull, sorterIndex);
				renderNodes(regularArr);
				console.profileEnd("regularSort");
				break;
			case "bubble":
				console.profile("bubbleSort");
				const bubbleArr = bubbleSort(itemsNotNull, sorterIndex);
				renderNodes(bubbleArr);
				console.profileEnd("bubbleSort");
				break;
			case "merge":
				console.profile("mergeSort");
				const mergeArr = mergeSort(itemsNotNull);
				renderNodes(mergeArr);
				console.profileEnd("mergeSort");
				break;
			case "insertion":
				console.profile("insertionSort");
				const insertArr = insertionSort(itemsNotNull, sorterIndex);
				renderNodes(insertArr);
				console.profileEnd("insertionSort");
				break;
			case "quartile":
				console.profile("quartileSort");
				sorters.forEach((sorter) => {
					quartileSort(sorter)
				});
				console.profileEnd("quartileSort");
				break;
			default:
				console.profile("regularSort");
				regularSort();
				console.profileEnd("regularSort");
		}
	}

	function renderNodes(arr) {
		const reverse = document.getElementById("reverse").checked;
		if (reverse) {
			arr.reverse()
		}
		arr.forEach((row) => {
			const tds = row.childNodes;
			const tdsArr = Array.from(row.childNodes)
			tdsArr.forEach((td) => {
				const classListArr = Array.from(td.classList);
				sorters.forEach((sorter) => {
					const sorterVal = sorter.toLowerCase().replace(/-/g, '').replace(/ /g, '_');
					if (classListArr.includes(sorterVal)) {
						const tdVal = parseFloat(td.textContent);
						heatMapColor(td, tdVal, sorter);
					}
				})
			})
			tableEle.insertBefore(row, tableEle.childNodes[1])
		})
	}

	function getSort() {
		const sortSelector = document.getElementById("sort_selector").children;
		const sortSelectorArr = Array.from(sortSelector);
		let sorter = ""
		sortSelectorArr.forEach((btn) => {
			if (btn.classList.contains("active")) {
				sorter = btn.children[0].value;
			}
		});
		return sorter;
	}

	function filterNull(sorterIndex) {
		// Returns rowTD at the sorterIndex, and the textContent for the value.
		const items = Array.from(tableEle.childNodes);
		// Will iterate through each row of data.
		// Filter will create new array with everything returned.
		return items.filter((row) => {
			const rowTD = Array.from(row.childNodes);
			// Here you might want to use innerHTML or innerText,
			// However, textContent is standard, more efficient,
			// and doesn't concern itself with rendering and will
			// return null if the value is empty.
			return rowTD[sorterIndex].textContent;
		});
	}

	function heatMapColor(ele, val, key) {
		let color = '';
		const currentColumn = columnSummary[key],
			red = "rgb(253,92,1)",
			orange = "rgb(252,168,33)",
			green = "rgb(167,199,108)",
			blue = "rgb(111,183,149)",
			white = "rgb(255,255,255)";
		if (val >= currentColumn.min && val <= currentColumn.first) {
			color = red;
		} else if (val > currentColumn.first && val <= currentColumn.mean) {
			color = orange
		} else if (val > currentColumn.mean && val <= currentColumn.third) {
			color = green;
		} else if (val > currentColumn.third && val <= currentColumn.max) {
			color = blue;
		} else {
			color = white;
		}
		ele.style.backgroundColor = color;
		ele.classList.add("selected");
	}


	tableInit();
})()