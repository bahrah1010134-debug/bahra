const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const normalize = (str) => {
    if (!str) return '';
    return str.trim()
        .replace(/\s+/g, ' ')
        // Normalize Arabic characters
        .replace(/[أإآ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/ؤ/g, 'و')
        .replace(/ئ/g, 'ي')
        .replace(/[\u064B-\u0652]/g, ''); // Remove Tashkeel
};

try {
    const workbook1 = XLSX.readFile('GetEmployeeDataList.xlsx');
    const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
    const ids = XLSX.utils.sheet_to_json(sheet1);

    const workbook2 = XLSX.readFile('روابط.xlsx');
    const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];
    const links = XLSX.utils.sheet_to_json(sheet2);

    const merged = [];
    const linksMap = new Map();
    
    links.forEach(item => {
        const rawName = item['اسم المعلم / المعلمة'] || '';
        const name = normalize(rawName);
        linksMap.set(name, item['رابط المجلد']);
    });

    ids.forEach(item => {
        const rawName = item['اسم المعلمة'] || '';
        const name = normalize(rawName);
        const nationalId = String(item['رقم الهوية'] || '').trim();
        
        if (linksMap.has(name)) {
            merged.push({
                name: rawName,
                id: nationalId,
                link: linksMap.get(name)
            });
        } else {
            // Attempt partial match if exact match fails
            let found = false;
            for (const [linkName, linkUrl] of linksMap) {
                if (linkName.includes(name) || name.includes(linkName)) {
                    merged.push({
                        name: rawName,
                        id: nationalId,
                        link: linkUrl
                    });
                    found = true;
                    break;
                }
            }
            if (!found) {
                console.log(`Unmatched: ${rawName}`);
            }
        }
    });

    const dataDir = path.join('src', 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(path.join(dataDir, 'employees.json'), JSON.stringify(merged, null, 2));
    console.log(`Successfully merged ${merged.length} records.`);
} catch (err) {
    console.error('Error processing data:', err.message);
    process.exit(1);
}
