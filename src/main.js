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
const boxW = toScale(24);
const spacer = toScale(3);
const [left, top] = [toScale(8), toScale(13.5)]

let content = [
  {
    style: 'tableExample',
    table: {
      widths: [boxW, spacer, boxW, spacer, boxW, spacer, boxW, spacer, boxW, spacer, boxW, spacer, boxW],
      body: [
        [
          {
            border: [false, false, false, false],
            fillColor: '#dddddd',
            text: '1'
          },
          {
            border: [false, false, false, false],
            fillColor: '#dddddd',
            text: ''
          },
          {
            border: [false, false, false, false],
            fillColor: '#dddddd',
            text: '2'
          },
          {
            border: [false, false, false, false],
            fillColor: '#dddddd',
            text: ''
          },
          {
            border: [false, false, false, false],
            fillColor: '#dddddd',
            text: '3'
          },
          {
            border: [false, false, false, false],
            fillColor: '#dddddd',
            text: ''
          },
          {
            border: [false, false, false, false],
            fillColor: '#dddddd',
            text: '4'
          },
          {
            border: [false, false, false, false],
            fillColor: '#dddddd',
            text: ''
          },
          {
            border: [false, false, false, false],
            fillColor: '#dddddd',
            text: '6'
          },
          {
            border: [false, false, false, false],
            fillColor: '#dddddd',
            text: ''
          },
          {
            border: [false, false, false, false],
            fillColor: '#dddddd',
            text: '7'
          },
        ],
      ]
    },
    layout: {
      defaultBorder: false,
    }
  },
];

let currentHeight = top;
let currentWidth = left;

for (let j = 0; j < 27; j++) {
  for (let i = 0; i < 7; i++) {
    //content.push(element(currentWidth, currentHeight, "hallo"));
    currentWidth += boxW + toScale(3);
  }
  currentWidth = left;
  currentHeight += boxH;
}

const docDefinition = {
  pageSize: 'A4',
  content: content,
  styles: {
		tableExample: {
			margin: [0, 0, 0, 0]
		},
  },
  pageMargins: [left, top, left, top]
}

function element(x,y, text) {
  return {
    text: text,
    absolutePosition: {x, y},
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