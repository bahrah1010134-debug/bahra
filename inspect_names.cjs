const XLSX = require('xlsx');
const fs = require('fs');

function getNames(filename, sheetIndex, colName) {
    const workbook = XLSX.readFile(filename);
    const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
    const data = XLSX.utils.sheet_to_json(sheet);
    return data.map(item => item[colName] || 'MISSING').filter(n => n !== 'MISSING');
}

try {
    const idsNames = getNames('GetEmployeeDataList.xlsx', 0, 'اسم المعلمة');
    const linksNames = getNames('روابط.xlsx', 0, 'اسم المعلم / المعلمة');

    console.log('--- Names in GetEmployeeDataList.xlsx ---');
    console.log(JSON.stringify(idsNames, null, 2));
    console.log('\n--- Names in روابط.xlsx ---');
    console.log(JSON.stringify(linksNames, null, 2));
} catch (e) {
    console.error(e.message);
}
