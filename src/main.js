import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  'Roboto': {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-Italic.ttf'
  }
};


// width=595.28, height=841.89
// width=210mm, height=297mm
const factor = ((595.28/210)+(841.89/297))/2
const toScale = (mm) => {
  return mm*factor;
}

const boxH = toScale(10);
const boxW = toScale(25.4);
const [left, top] = [toScale(8), toScale(14)]

let content = [];

let currentHeight = top;
let currentWidth = left;

for (let j = 0; j < 27; j++) {
  for (let i = 0; i < 7; i++) {
    content.push(element(currentWidth, currentHeight, "hallo"));
    currentWidth += boxW + toScale(3.4);
  }
  currentWidth = left;
  currentHeight += boxH;
}

const docDefinition = {
  pageSize: 'A4',
  content: content,
}

function element(x,y, text) {
  return {
    text: text,
    absolutePosition: {x, y}
  };
};



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