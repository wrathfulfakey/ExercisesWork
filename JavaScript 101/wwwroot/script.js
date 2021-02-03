var arrHead = new Array();
arrHead = ['', 'Subject', 'Remove'];

function addRow() {
  //Add row
  var subjTab = document.getElementById('tableBody');

  var rowCnt = subjTab.rows.length; // get the number of rows.
  var tr = subjTab.insertRow(rowCnt); // table row.
  tr.setAttribute('id', 'row');

  for (var c = 0; c < arrHead.length; c++) {
    var td = document.createElement('td'); // TABLE DEFINITION.
    td = tr.insertCell(c);
    if (c == 0) {
      continue;
    } else if (c == 1) {
      var ele = document.createElement('input');
      ele.setAttribute('type', 'text');
      ele.setAttribute('value', '');
      ele.setAttribute('id', `inputText`);
      ele.setAttribute('onkeyup', 'labelUpdate(this)');
      var label = document.createElement('label');
      label.setAttribute('id', 'subjLabel');
      label.setAttribute('for', `inputText`);
      label.innerText = 'Subject';

      td.appendChild(label);
      td.appendChild(ele);
    } else {
      var divEle = document.createElement('div');
      divEle.classList = 'floatingDiv';
      var btn = document.createElement('button');
      btn.classList = 'btn btn-danger removeBtn';
      btn.setAttribute('type', 'button');
      let id = Math.random();
      btn.setAttribute('data-id', id);
      id++;
      btn.setAttribute('onclick', 'removeRow(this)');
      btn.textContent = 'X';
      var pg = document.createElement('p');
      pg.classList = 'hideText';
      pg.textContent = 'remove';
      divEle.innerHTML = btn.outerHTML + pg.outerHTML;
      td.appendChild(divEle);
    }
  }
}

addRow();

// Change Label
function labelUpdate(oInput) {
  var lblTxt = oInput.parentNode.childNodes[0];
  var inpTxt = oInput.value;
  var letters = inpTxt.replace(/[^A-Za-z\s]+/g, '');
  lblTxt.textContent = 'Subject: ' + letters;
  if (inpTxt === '') {
    lblTxt.textContent = 'Subject';
  }
}

// Remove row
function removeRow(oButton) {
  var subjTab = document.getElementById('subjectTable');
  oButton.parentNode.parentNode.parentNode.classList.add('itemToDel');
  setTimeout(function () {
    subjTab.deleteRow(oButton.parentNode.parentNode.parentNode.rowIndex);
  }, 1100);
}

// Remove Empty Rows
function removeEmptyRows() {
  var subjTab = document.getElementById('subjectTable');
  var inputs = document.getElementsByTagName('input');

  for (let i = 0; i < inputs.length; i++) {
    let eleVal = inputs[i].value;
    if (eleVal === null || eleVal === undefined || eleVal === '') {
      inputs[i].parentNode.parentNode.classList.add('itemToDel');
    }
  }

  var rowsToDel = document.getElementsByClassName('itemToDel');
  setTimeout(function () {
    while (rowsToDel.length > 0) {
      rowsToDel[0].parentNode.removeChild(rowsToDel[0]);
    }
  }, 1000);

  var printedDataExists = document.getElementById('printingTable');

  if (printedDataExists) {
    printedDataExists.remove();
  }
}

// Print Data
function printData() {
  var subjTable = document.getElementById('subjectTable');
  var printedDataExists = document.getElementById('printingTable');

  if (printedDataExists) {
    printedDataExists.remove();
  }

  var printedData = subjTable.cloneNode(true);
  printedData.setAttribute('id', 'printingTable');

  // Getting the rows in table.
  var row = printedData.rows;

  // Removing the column at index(1).
  var i = 2;
  for (var j = 0; j < row.length; j++) {
    // Deleting the last cell of each row.
    row[j].deleteCell(i);
  }

  var inputs = printedData.getElementsByTagName('input');
  var deleteLabels = printedData.getElementsByTagName('label');

  for (let i = 0; i < inputs.length; i++) {
    var eleVal = inputs[i].value;

    if (eleVal === null || eleVal === undefined || eleVal === '') {
      printedData.deleteRow(inputs[i].parentNode.parentNode.rowIndex);
      i--;
      continue;
    }

    var createText = document.createElement('p');
    createText.setAttribute('id', 'printedText');
    createText.textContent = eleVal;
    deleteLabels[i].parentNode.appendChild(createText);

    deleteLabels[i].remove();
    inputs[i].remove();
    i--;
  }

  subjTable.parentNode.append(printedData);
}

var removeEmptyRowsBtn = document.getElementById('removeEmptyRowsBtn');
removeEmptyRowsBtn.addEventListener('click', removeEmptyRows);

var addSubjectBtn = document.getElementById('addSubjectBtn');
addSubjectBtn.addEventListener('click', addRow);

var printBtn = document.getElementById('printDataBtn');
printBtn.addEventListener('click', printData);
