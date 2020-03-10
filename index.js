var columns = 1;
var rows = 1;
var selCol = '';
var selRow = '';

function findTd(label) {
    let table = document.getElementById('roottable')
    let char = []
    let number = []
    for (let i =0;i<label.length;i++) {
        if (!parseInt(label[i])){
            char.push(label[i]);
        } else {
            number.push(label[i]);
        }
    }
    let colLabel = char.join('');
    let header = table.childNodes[0].childNodes;
    let col = '.col'
    for (let i = 1; i< header.length;i++) {
        if (header[i].textContent == colLabel){
            col = '.col' + String(i);
        }
    }
    let row = ".row"+number.join("");
    let td = document.querySelector(row+" "+col);
    // console.log(label)
    // console.log(td)
    return td.childNodes[0]
}

function handleStaticFormula(td) {
    let text = td.childNodes[0].value;
    if (text[0] == "=") {
        let formula = text.slice(1);
        if (text.includes("+")) {
            let part1 = findTd(formula.split('+')[0])
            let part2 = findTd(formula.split('+')[1])
            // td.textContent = parseInt(add1.value) + parseInt(add2.value);
            if (td.childNodes.length == 1) {
                let txt = document.createElement("div")
                txt.style.display = "none"
                txt.textContent = text
                td.appendChild(txt);
            } else {
                td.childNodes[1].textContent = text
            }
            td.childNodes[0].value = parseInt(part1.value) + parseInt(part2.value);
        } else if (text.includes("-")) {
            let part1 = findTd(formula.split('-')[0])
            let part2 = findTd(formula.split('-')[1])
            if (td.childNodes.length == 1) {
                let txt = document.createElement("div")
                txt.style.display = "none"
                txt.textContent = text
                td.appendChild(txt);
            } else {
                td.childNodes[1].textContent = text
            }
            td.childNodes[0].value = parseInt(part1.value) - parseInt(part2.value);
        } else if (text.includes("*")) {
            let part1 = findTd(formula.split('*')[0])
            let part2 = findTd(formula.split('*')[1])
            if (td.childNodes.length == 1) {
                let txt = document.createElement("div")
                txt.style.display = "none"
                txt.textContent = text
                td.appendChild(txt);
            } else {
                td.childNodes[1].textContent = text
            }
            td.childNodes[0].value = parseInt(part1.value) * parseInt(part2.value);
        } else if (text.includes("/")) {
            let part1 = findTd(formula.split('/')[0])
            let part2 = findTd(formula.split('/')[1])
            if (td.childNodes.length == 1) {
                let txt = document.createElement("div")
                txt.style.display = "none"
                txt.textContent = text
                td.appendChild(txt);
            } else {
                td.childNodes[1].textContent = text
            }
            td.childNodes[0].value = parseInt(part1.value) / parseInt(part2.value);
        }
    }
}

function handleCell(event) {
    let td = event.target.parentNode;
    handleStaticFormula(td)
    console.log(event.target);
    console.log("ITWORKS");
}


function createTd() {
    let td = document.createElement('td');
    let input = document.createElement('input');
    input.type = "text";
    input.setAttribute("onblur", "handleCell(event)");
    td.appendChild(input);
    return td
}

window.onload = function () {
    let table = document.getElementById('roottable')
    let header = document.createElement("tr");
    let th_emp = document.createElement("th");
    let th_col1 = document.createElement("th");
    th_col1.append('A');
    header.appendChild(th_emp);
    header.appendChild(th_col1);
    table.appendChild(header);
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.append(String(1));
    tr.appendChild(th);
    let id = "row" + String(1);
    tr.setAttribute("class", id);
    tr.setAttribute("onclick", "change()")
    rows++;
    columns++;
    // create #of cols
    let td = createTd();
    id = "col" + String(1);
    td.setAttribute("class", id);
    tr.appendChild(td);
    table.appendChild(tr)
}

function reNumberRow() {
    dye(false);
    let table = document.getElementById('roottable');
    let trs = table.childNodes;
    for (let i = 1; i<trs.length; i++) {
        let tr = trs[i]
        tr.className = "row" + String(i);
        tr.childNodes[0].textContent = i;
    }
}

function reNumberCol() {
    dye(false);
    let table = document.getElementById('roottable');
    let trs = table.childNodes;
    for (let i = 1; i<trs.length; i++) {
        let tr = trs[i]
        let tds = tr.childNodes;
        for (let j=1; j < tds.length;j++){
            let td = tds[j]
            td.className = "col" + String(j)
        }
    }
}

function addRow(bias) {
    let table = document.getElementById('roottable')
    if (selRow != "") {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        tr.appendChild(th);
        tr.setAttribute("onclick", "change()")
        for (let i = 1; i < columns; i++) {
            let td = createTd();
            let colId = "col" + String(i);
            td.setAttribute("class", colId);
            tr.appendChild(td);
        }
        let selRowTr = document.querySelector('.' + selRow);
        if (bias == 1) {
            // Insert after sel row
            if (selRowTr.nextSibling != null) {
                table.insertBefore(tr, selRowTr.nextSibling);
            } else {
                table.appendChild(tr);
            }
        } else {
            table.insertBefore(tr, selRowTr);
        }
        reNumberRow();
        selRow = "";
        selCol = "";
        rows++;
    }
}

function addCol(bias) {
    let table = document.getElementById('roottable')
    if (selCol != "") {
        let header = table.childNodes[0]
        let th = document.createElement('th');
        th.append(genColId(columns));
        header.appendChild(th);
        let trs = table.childNodes;
        for(let i=1; i<trs.length;i++){
            let curRow = trs[i];
            let selColTd = trs[i].querySelector("." + selCol);
            let td = createTd();
            let colId = "col" + String(i + 1);
            td.setAttribute("class", colId);
            if (bias == 1) {
                // Insert after sel row
                if (selColTd.nextSibling != null) {
                    curRow.insertBefore(td, selColTd.nextSibling);
                } else {
                    curRow.appendChild(td);
                }
            } else {
                curRow.insertBefore(td, selColTd);
            }
        }
        reNumberCol();
        selRow = "";
        selCol = "";
        columns++;
    }
}

function genColId(c) {
    let s = [];
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


function dye(flag) {
    let table = document.getElementById('roottable')
    let color = "#F0F0F0"
    if (!flag) {
        color = ""
    }
    let row = document.querySelector('.' + selRow).childNodes;
    // console.log(row);
    for (let i = 1; i < row.length; i++) {
        let td = row[i];
        td.childNodes[0].style.backgroundColor = color;
    }
    let col = document.querySelectorAll('.' + selCol);
    // console.log(col);
    for (let i = 0; i < col.length; i++) {
        let td = col[i];
        td.childNodes[0].style.backgroundColor = color;
    }
}


function change(change) {
    let table = document.getElementById('roottable')
    let sel = window.event.srcElement;
    if (sel.tagName.toLowerCase() == "input" || sel.tagName.toLowerCase() == "div") {
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
    // console.log("SRC:", event.srcElement)
    if (sel.tagName.toLowerCase() == "td") {
        selRow = sel.parentNode.className;
        selCol = sel.className;
        dye(true);
        if (sel.childNodes.length > 1) {
            sel.childNodes[0].value = sel.childNodes[1].textContent
        }
        sel.childNodes[0].style.backgroundColor = "#BBBBBB";
    } else if (sel.tagName.toLowerCase() == "th") {
        console.log('th selected!');
    }
}

function removeRow() {
    let table = document.getElementById('roottable')
    if (selRow != "" && rows > 2) {
        let trs = table.childNodes;
        let matched = false;
        let tr;
        for (let i = 1; i < trs.length; i++) {
            if (trs[i].className == selRow) {
                tr = trs[i];
                matched = true;
            } else {
                if (matched) {
                    let newRow = parseInt(trs[i].className.slice(3)) - 1;
                    trs[i].className = "row" + String(newRow);
                    trs[i].childNodes[0].textContent = newRow;
                }
            }
        }
        dye(false);
        selRow = "";
        selCol = "";
        rows--;
        table.removeChild(tr);
    }
}

function removeCol() {
    let table = document.getElementById('roottable')
    if (selCol != "" && columns > 2) {
        let trs = table.childNodes;
        let matched = false;
        let idx;
        let td;
        for (let i = 1; i < trs.length; i++) {
            let tds = trs[i].childNodes;
            for (let j = 1; j < tds.length; j++) {
                if (tds[j].className == selCol) {
                    idx = j;
                    td = tds[j];
                    matched = true;
                } else {
                    if (matched) {
                        let newCol = parseInt(tds[j].className.slice(3)) - 1;
                        tds[j].className = "col" + String(newCol);
                    }
                }
            }
            matched = false;
            trs[i].removeChild(td);
        }
        let header = trs[0].childNodes;
        for (let i = idx + 1; i < header.length; i++) {
            let newCol = genColId(i - 1);
            header[i].textContent = newCol;
        }
        trs[0].removeChild(header[idx]);
        dye(false);
        selRow = "";
        selCol = "";
        columns--;
    }
}


function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;
    // CSV FILE
    csvFile = new Blob([csv], { type: "text/csv" });
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
    let allRows = document.querySelectorAll("table tr");

    for (var i = 1; i < allRows.length; i++) {
        let row = [], cols = allRows[i].querySelectorAll("td");
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

