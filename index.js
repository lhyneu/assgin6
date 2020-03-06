var columns = 1;
var row = 1;
var selCol = '';
var selRow = '';

function addRow() {
    var table = document.getElementById('roottable')
    if (row == 1) {
        let header = document.createElement("tr");
        let th_emp = document.createElement("th");
        let th_col1 = document.createElement("th");
        th_col1.append('A');
        header.appendChild(th_emp);
        header.appendChild(th_col1);
        table.appendChild(header);
    }
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.append(String(row));
    tr.appendChild(th);
    var id = "row" + String(row);
    tr.setAttribute("class", id);
    tr.setAttribute("onclick", "change()")
    row++;
    // create #of cols
    for (var i = 0; i < columns; i++) {
        let td = document.createElement("td");
        let input = document.createElement('input');
        input.type = "text";
        id = "col" + String(i);
        td.appendChild(input);
        td.setAttribute("class", id);
        tr.appendChild(td);
    }
    table.appendChild(tr)
}

function genColId() {
    var s = [];
    var c = columns;
    while (c > 0) {
        var r = c % 26;
        c = parseInt(c / 26);
        if (r == 0) {
            r = 26;
            c -= 1;
        }
        s.push(String.fromCharCode(64 + r));
    }
    s = s.reverse();
    return s.join("");
}

function addCol() {
    var table = document.getElementById('roottable')
    var childs = table.childNodes
    console.log(childs.length);
    if (childs.length <= 1) {
        addRow();
    } else {
        columns++;
        let header = childs[0];
        console.log(header);
        let th = document.createElement('th');
        th.append(genColId());
        header.appendChild(th);
        for (var i = 1; i < childs.length; i++) {
            let tr = childs[i];
            let td = document.createElement('td');
            let id = "col" + String(columns);
            td.setAttribute("class", id);
            let input = document.createElement('input');
            input.type = "text";
            td.appendChild(input);
            tr.appendChild(td);
        }
    }
}

function change(change) {
    
    var sel = window.event.srcElement;
    if (sel.tagName.toLowerCase() == "input") {
        sel = sel.parentNode;
    }
    //alert(change.tagName.toLowerCase());
    if (sel.tagName.toLowerCase() == "td") {
        console.log('td selected!');
        sel.style.borderColor = "blue";
    } else if (sel.tagName.toLowerCase() == "th") {
        console.log('th selected!');
    }
}

function out() {
    var oObj = event.srcElement;
    if (oObj.tagName.toLowerCase() == "td") {
        var oTr = oObj.parentNode;
        if (!oTr.tag) oTr.style.borderColor = "";
    }
}
