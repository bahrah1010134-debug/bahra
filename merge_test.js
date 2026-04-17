const XLSX = require('xlsx');
const fs = require('fs');

try {
    const workbook1 = XLSX.readFile('GetEmployeeDataList.xlsx');
    const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
    const ids = XLSX.utils.sheet_to_json(sheet1);

    const workbook2 = XLSX.readFile('روابط.xlsx');
    const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];
    const links = XLSX.utils.sheet_to_json(sheet2);

    const merged = [];
    const unmatchedIds = [];
    const unmatchedLinks = [];

    const normalize = (str) => {
        if (!str) return '';
        return str.trim()
            .replace(/\s+/g, ' ')
            .replace(/[أإآ]/g, 'ا')
            .replace(/ة/g, 'ه')
            .replace(/ى/g, 'ي');
    };

    const linksMap = new Map();
    links.forEach(item => {
        const name = normalize(item['اسم المعلم / المعلمة']);
        linksMap.set(name, item['رابط المجلد']);
    });

    ids.forEach(item => {
        const rawName = item['اسم المعلمة'];
        const name = normalize(rawName);
        if (linksMap.has(name)) {
            merged.push({
                name: rawName,
                id: String(item['رقم الهوية']),
                link: linksMap.get(name)
            });
            linksMap.delete(name);
        } else {
            unmatchedIds.push(rawName);
        }
    });

    for (const [name, link] of linksMap) {
        unmatchedLinks.push(name);
    }

    fs.writeFileSync('merged_data.json', JSON.stringify(merged, null, 2));
    console.log(`Merged: ${merged.length}`);
    console.log(`Unmatched IDs: ${unmatchedIds.length}`);
    console.log(`Unmatched Links: ${unmatchedLinks.length}`);
    if (unmatchedIds.length > 0) {
        console.log('Sample Unmatched IDs:', unmatchedIds.slice(0, 5));
    }
} catch (err) {
    console.error('Error:', err.message);
}
