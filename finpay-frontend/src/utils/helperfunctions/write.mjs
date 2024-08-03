import { PDFDocument, rgb } from 'pdf-lib';
import { writeFile ,appendFile} from 'fs/promises';
import { join } from 'path';

async function createTablePDF(filename, tableData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { height } = page.getSize();

  const fontSize = 12;
  const x = 50;
  let y = height - 50;

  for (const [column1, column2] of tableData) {
    page.drawText(column1, { x, y, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(column2, { x: x + 200, y, size: fontSize, color: rgb(0, 0, 0) });
    y -= fontSize + 10;
  }

  const pdfBytes = await pdfDoc.save();
  const filePath = join(`finpay-frontend/src/utils//files/${ filename}`); 
  await appendFile(filePath, pdfBytes);
  // await appendFile(filePath, "hello did i over write");
  console.log(`PDF file written successfully to ${filePath}`);
}

// Example table data
const tableData = [
  ['Column1', 'Column2'],
  ['Entry1', 'Data1'],
  ['Entry2', 'Data2'],
  ['Entry3', 'Data3'],
  ['Entry4', 'Data4'],
  ['Entry5', 'Data5'],
];

// Example usage
createTablePDF('table.pdf', tableData);
