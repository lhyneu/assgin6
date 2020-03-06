var columns = 1;
var row = 1;
var selCol = '';
var selRow = '';

function addRow() {
    let table = document.getElementById('roottable')
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
    let id = "row" + String(row);
    tr.setAttribute("class", id);
    tr.setAttribute("onclick", "change()")
    row++;
    // create #of cols
    for (let i = 0; i < columns; i++) {
        let td = document.createElement("td");
        let input = document.createElement('input');
        input.type = "text";
        id = "col" + String(i+1);
        td.appendChild(input);
        td.setAttribute("class", id);
        tr.appendChild(td);
    }
    table.appendChild(tr)
}

function genColId() {
    let s = [];
    let c = columns;
    while (c > 0) {
        let r = c % 26;
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
    let table = document.getElementById('roottable')
    let childs = table.childNodes
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
        for (let i = 1; i < childs.length; i++) {
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

function dye(flag) {
    let color = "#F0F0F0"
    if (!flag) {
        color = ""
    }
    let row = document.querySelector('.'+selRow).childNodes;
    // console.log(row);
    for (let i = 1; i < row.length; i++) {
        let td = row[i];
        console.log(td);
        td.childNodes[0].style.backgroundColor = color;
    }
    let col = document.querySelectorAll('.'+selCol);
    // console.log(col);
    for (let i=0; i<col.length; i++) {
        let td = col[i];
        td.childNodes[0].style.backgroundColor = color;
    }
}


function change(change) {
    
    let sel = window.event.srcElement;
    if (sel.tagName.toLowerCase() == "input") {
        sel = sel.parentNode;
    }
    if (selCol != "" && selRow != "") {
        let s1 = '.' + selRow;
        let s2 = '.' + selCol;
        let tr = document.querySelector(s1);
        let td = tr.querySelector(s2);
        td.childNodes[0].style.backgroundColor = "";
        dye(false);
    }
    //alert(change.tagName.toLowerCase());
    if (sel.tagName.toLowerCase() == "td") {
        console.log('td selected!');
        selRow = sel.parentNode.className;
        selCol = sel.className;
        dye(true);
        sel.childNodes[0].style.backgroundColor = "#BBBBBB";
    } else if (sel.tagName.toLowerCase() == "th") {
        console.log('th selected!');
    }
}


function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
}

function export_table_to_csv(html, filename) {
	var csv = [];
	var rows = document.querySelectorAll("table tr");
	
    for (var i = 1; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td");
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].childNodes[0].value);
            // console.log(cols[j])
		csv.push(row.join(","));		
	}
    // console.log(csv)
    // Download CSV
    download_csv(csv.join("\n"), filename);
}

function gencsv() {
    var html = document.querySelector("table").outerHTML;
    export_table_to_csv(html, "table.csv");
}

