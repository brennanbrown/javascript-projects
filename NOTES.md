## Using `arr.sort` Function

* If you have an unsorted array and use a .sort on it, it will, for the most part, do what you expect with these numbers. However, it's not always this simple.
    - The challenge for us is that we're working with JSON which requires a little bit more work.
* `arr.sort()` doesn't always work. If you have anything more complicated than an array with single-digit numbers, you're going to have to pass it a function.
* We'll be sorting these values. However, we need to check if a value is null because we want to be able to push that down no matter what. 
* However, if you just sort the data, you're going to have to re-render this table every time you sort. To avoid that, you can render the already existing nodes 

```javascript
function regularSort(arr, index){
    // a = current row of data.
    // b = next row of data.
    arr.sort((a, b) => {
        // If no data, will push the
        // value down in the sort order.
        const x = a["Area"] === null ? -1 : a["Area"];
        const y = b["Area"] === null ? -1 : b["Area"];
        return x < y ? -1 : (x > y) ? 1 : 0;
    });
    console.log(arr);
}
```

### Node List

```javascript
function regularSort(arr, index){
    const items = tableEle.childNodes;
    console.log(items);
};
```

* The output of the above code will look like it's an array, but it's not. It's a node list, and node lists don't have the same methods as array.
    - This can be fixed easily by using the `Array.from()` method. This simply takes what's ever passing to the parameters and turns it into an array.

```javascript
function regularSort(arr, index){
    const items = Array.from(tableEle.childNodes);
    console.log(items);
};
```

### Filter Null Values

* You'll only sort the values that are not null like what was done in the previous function. 
    - But it makes more sense to break that out in to it's own functions since you'll be doing that for all the sorts you build.

```javascript
// Passing in the very first sorter from the sorter well:
// Eg. if you drag an area, you'll get it's index which 
// is one, and then you will use it to get the value.
const sorterIndex = headers.indexOf(sorters[0]);
// Filter Null Values
const itemsNotNull = filterNull(sorterIndex);

function filterNull(sorterIndex) {
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
```

### Sorting Nodes

* Now, with the `filterNull` function returning `rowTD` at the `sorterIndex` and the textContent for the values.
    - Instead of passing in data, you're going to pass in the `itemsNotNull` as well as the `sorterIndex`. 
    - Down where the function is called, make a const for row A that's going to be equal to `Array.from` and you'll pass in the `a.childNodes`.

```javascript
switch(getSort(data)){
    case "regular":
        console.profile("regularSort");
        const regularArr = regularSort(itemsNotNull, sorterIndex);
        renderNodes(regularArr);
        console.profileEnd("regularSort");
        break;
}

// ...

function regularSort(arr, sorterIndex){
    // a = current row of data.
    // b = next row of data.
    arr.sort((a, b) => {
        const rowA = Array.from(a.childNodes);
        const rowB = Array.from(b.childNodes);
        // If no data, will push the
        // value down in the sort order.
        // No hardcoding requried:
        const x = parseFloat(rowA[sorterIndex].textContent);
        const y = parseFloat(rowB[sorterIndex].textContent);
        return x < y ? -1 : (x > y) ? 1 : 0;
    });
    return arr;
}
```