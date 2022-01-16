import { PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib'

// Create a new PDFDocument
const pdfDoc = await PDFDocument.create()

// Embed the Times Roman font
const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)


// Add a blank page to the document
const page = pdfDoc.addPage(PageSizes.A4)

// Get the width and height of the page
const { width, height } = page.getSize()
// A4 - 210mm x 297mm
const factor = ((height/297)+(width/210))/2;

const fromMm = (mm) => {
  return mm * factor;
};

const spaceBetween = 3;
const spaceTop = 14 ;
const spaceLeft = 7.7;
const boxH = (height-fromMm(spaceTop)*2)/27;
const boxW = 25.3;

let top = height-fromMm(spaceTop);
let left = fromMm(spaceLeft);

let number = 3000;

for (let j = 0; j < 27; j++) {
  for (let i = 0; i < 7; i++) {
    page.drawRectangle({
      x: left,
      y: top,
      width: fromMm(boxW),
      height: boxH,
      borderWidth: 0,
      color: rgb(0.75, 0.2, 0.2),
      opacity: 0.5,
    });

    let numWidth = timesRomanFont.widthOfTextAtSize(number.toString(), 11)/2
    let numHeight = timesRomanFont.heightAtSize(11)/2;
    // page.drawText(number.toString(), {
    //   x: left+numWidth,
    //   y: top-numHeight,
    //   font: timesRomanFont,
    //   size: 11,
    // });
    left += fromMm(spaceBetween+boxW);
  }
  left = fromMm(spaceLeft);
  top -= boxH;
}

// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()

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


download("pdf-lib_form_flattening_example.pdf", pdfBytes, "application/pdf");
