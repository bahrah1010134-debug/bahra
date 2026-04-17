const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const normalize = (str) => {
    if (!str) return '';
    return str.toString().trim()
        .replace(/\s+/g, ' ')
        // Normalize Arabic characters
        .replace(/[أإآ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/ؤ/g, 'و')
        .replace(/ئ/g, 'ي')
        .replace(/[\u064B-\u0652]/g, '') // Remove Tashkeel
        // Remove common words and prefixes that vary
        .replace(/\bبنت\b/g, '')
        .replace(/\bبن\b/g, '')
        .replace(/\bال\b/g, ' ') 
        .replace(/^ال/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};

const getWords = (str) => {
    return normalize(str).split(' ').filter(w => w.length > 2);
};

try {
    console.log('Reading Excel files...');
    const workbook1 = XLSX.readFile('GetEmployeeDataList.xlsx');
    const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
    const ids = XLSX.utils.sheet_to_json(sheet1);

    const workbook2 = XLSX.readFile('روابط.xlsx');
    const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];
    const links = XLSX.utils.sheet_to_json(sheet2);

    console.log(`Loaded ${ids.length} IDs and ${links.length} Links.`);

    const linksMap = new Map();
    links.forEach(item => {
        const rawName = item['اسم المعلم / المعلمة'] || '';
        if (!rawName) return;
        const normName = normalize(rawName);
        linksMap.set(normName, {
            rawName,
            link: item['رابط المجلد'],
            words: getWords(rawName)
        });
    });

    const merged = [];
    const unmatched = [];
    const matchedIds = new Set();

    ids.forEach(item => {
        const rawName = item['اسم المعلمة'] || '';
        const nationalId = String(item['رقم الهوية'] || '').trim();
        if (!rawName || !nationalId) return;

        const normName = normalize(rawName);
        let found = false;

        // 1. Exact Match on Normalized Name
        if (linksMap.has(normName)) {
            merged.push({
                name: rawName,
                id: nationalId,
                link: linksMap.get(normName).link
            });
            found = true;
        } else {
            // 2. Fuzzy Match
            const idWords = getWords(rawName);
            let bestMatch = null;
            let maxMatches = 0;

            for (const [normLinkName, linkData] of linksMap) {
                const linkWords = linkData.words;
                const matches = linkWords.filter(w => idWords.includes(w)).length;
                
                if (matches > maxMatches && matches >= 2) { // At least 2 words must match
                    maxMatches = matches;
                    bestMatch = linkData;
                }
            }

            if (bestMatch && (maxMatches / bestMatch.words.length >= 0.5)) {
                merged.push({
                    name: rawName,
                    id: nationalId,
                    link: bestMatch.link
                });
                found = true;
                console.log(`Fuzzy matched: "${rawName}" -> "${bestMatch.rawName}"`);
            }
        }

        if (!found) {
            unmatched.push(rawName);
        } else {
            matchedIds.add(nationalId);
        }
    });

    const dataDir = path.join('src', 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(path.join(dataDir, 'employees.json'), JSON.stringify(merged, null, 2));
    
    // Also update root merged_data.json just in case
    fs.writeFileSync('merged_data.json', JSON.stringify(merged, null, 2));

    console.log('\n--- Processing Summary ---');
    console.log(`Successfully matched: ${merged.length} / ${ids.length}`);
    console.log(`Unmatched names: ${unmatched.length}`);
    if (unmatched.length > 0) {
        console.log('Unmatched list:', unmatched);
    }
    console.log('--------------------------');

} catch (err) {
    console.error('Error processing data:', err.stack);
    process.exit(1);
}

