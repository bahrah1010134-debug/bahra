const XLSX = require('xlsx');

try {
    const workbook1 = XLSX.readFile('GetEmployeeDataList.xlsx');
    const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
    const data1 = XLSX.utils.sheet_to_json(sheet1);
    console.log('GetEmployeeDataList.xlsx structure:');
    console.log(data1.slice(0, 2));

    const workbook2 = XLSX.readFile('روابط.xlsx');
    const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];
    const data2 = XLSX.utils.sheet_to_json(sheet2);
    console.log('روابط.xlsx structure:');
    console.log(data2.slice(0, 2));
} catch (err) {
    console.error('Error reading files:', err.message);
}
