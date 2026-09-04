const puppeteer = require('puppeteer');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'assets');

const links = [
    { url: 'https://el-hayat.com/', name: 'proj_el_hayat' },
    { url: 'https://bac-ai-dz.netlify.app', name: 'proj_bac_ai' },
    { url: 'https://restaurant-la-ostra.netlify.app', name: 'proj_la_ostra' },
    { url: 'https://gymwolfdz.netlify.app', name: 'proj_gym_wolf' },
    { url: 'https://expert-manager-production.netlify.app', name: 'proj_expert_manager' },
    { url: 'https://crikx-burger-crepe-dz.netlify.app', name: 'proj_crikx_burger' },
    { url: 'https://solo-solution.netlify.app', name: 'proj_solo_solution' },
    { url: 'https://inscripstionkickkata.netlify.app', name: 'proj_kick_kata' }
];

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    for (const link of links) {
        console.log(`Capturing: ${link.url}`);
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });
        try {
            await page.goto(link.url, { waitUntil: 'networkidle2', timeout: 30000 });
            await new Promise(r => setTimeout(r, 3000));
            const outputPath = path.join(ASSETS_DIR, `${link.name}.png`);
            await page.screenshot({ path: outputPath, clip: { x: 0, y: 0, width: 1440, height: 900 } });
            console.log(`  ✔ Saved: ${outputPath}`);
        } catch (err) {
            console.error(`  ✘ Error for ${link.url}: ${err.message}`);
        }
        await page.close();
    }
    await browser.close();
    console.log('\nAll done!');
})();
