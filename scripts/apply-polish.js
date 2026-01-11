const fs = require('fs');
const path = require('path');

const demosDir = path.join(__dirname, '../public/demos');
const scriptTag = '<script src="/js/return-home.js"></script>';

function injectPolish() {
    if (!fs.existsSync(demosDir)) {
        console.error('Demos directory not found!');
        return;
    }

    const items = fs.readdirSync(demosDir, { withFileTypes: true });

    items.forEach(item => {
        if (item.isDirectory()) {
            const indexPath = path.join(demosDir, item.name, 'index.html');

            if (fs.existsSync(indexPath)) {
                let content = fs.readFileSync(indexPath, 'utf8');

                // Check if script is already present
                if (!content.includes('return-home.js')) {
                    // Inject before closing body tag
                    if (content.includes('</body>')) {
                        content = content.replace('</body>', `    ${scriptTag}\n</body>`);
                        fs.writeFileSync(indexPath, content);
                        console.log(`[POLISHED] Injected home button into ${item.name}`);
                    } else {
                        console.warn(`[SKIPPED] ${item.name} -> No </body> tag found.`);
                    }
                } else {
                    console.log(`[EXISTING] ${item.name} already has the script.`);
                }
            } else {
                // If index.html doesn't exist, maybe check recursively or just skip
                console.warn(`[SKIPPED] ${item.name} -> No index.html found directly in folder.`);
            }
        }
    });
}

injectPolish();
