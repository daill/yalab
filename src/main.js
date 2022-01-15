import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

// Create a new PDFDocument
const pdfDoc = await PDFDocument.create()

// Embed the Times Roman font
const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

// Add a blank page to the document
const page = pdfDoc.addPage()

// Get the width and height of the page
const { width, height } = page.getSize()

// Draw a string of text toward the top of the page
const fontSize = 30
page.drawText('Creating PDFs in JavaScript is awesome!', {
  x: 50,
  y: height - 4 * fontSize,
  size: fontSize,
  font: timesRomanFont,
  color: rgb(0, 0.53, 0.71),
})

// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', window.URL.createObjectURL(new Blob([data], {type: type})));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  

  if (data !== null && navigator.msSaveBlob)
  return navigator.msSaveBlob(new Blob([data], { type: type }), name);
var a = $("<a style='display: none;'/>");
var url = window.URL.createObjectURL(new Blob([data], {type: type}));
a.attr("href", url);
a.attr("download", name);
$("body").append(a);
a[0].click();
window.URL.revokeObjectURL(url);
a.remove();

download("pdf-lib_form_flattening_example.pdf", pdfBytes, "application/pdf");
