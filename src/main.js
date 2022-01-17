import { jsPDF } from "jspdf";

const doc = new jsPDF({format: 'a4'});

const boxH = 10;
const boxW = 24.6;
const space = 3.7;

const topMargin = 14 + doc.getTextDimensions('text').h;
const leftMargin = 8;

let top = topMargin;
let left = leftMargin; 
let dim = ''
let count = 2016;

//doc.setTextColor('#0000FF');

let page = 0;
for (let p = 0; p < 9; p++){
  for (let i = 0; i < 27; i++) {
    for (let j = 0; j < 7; j++) {
      dim = doc.getTextDimensions(count.toString());
      doc.text(count.toString(),left+(boxW/2)-(dim.w/2),top+(boxH/2)-(dim.h/2));    
      left += space + boxW
      count+=1;
    }
    left = leftMargin
    top += boxH
  }
  if (p != 8) {
    doc.addPage()
    top = topMargin;
    left = leftMargin; 
  }
}

doc.save("etiketten.pdf");

console.log(docDefinition);
pdfMake.createPdf(docDefinition).download(`etiketten.pdf`);

function download(filename, data, type) {
    var element = document.createElement('a');
    element.setAttribute('href', window.URL.createObjectURL(new Blob([data], {type: type})));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(element);
  }