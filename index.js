var columns = 1;

function addRow() {
    console.log('ITWORKS!');
    let tr = document.createElement("tr");
    // create #of cols
    for (var i = 0; i < columns; i++) {
        let td = document.createElement("td");
        let input = document.createElement('input');
        input.type = "text";
        td.appendChild(input);
        tr.appendChild(td);
    }
    document.getElementById("roottable").appendChild(tr)
}

function addCol() {
    columns++;
    console.log('ITWORKS! TOO!');
    var table = document.getElementById('roottable')
    var childs = table.childNodes
    for (var i = 0; i < childs.length; i++) {
        let tr = childs[i];
        let td = document.createElement('td');
        let input = document.createElement('input');
        input.type = "text";
        td.appendChild(input);
        tr.appendChild(td);
    }

}