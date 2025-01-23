import puppeteer from "puppeteer";

async function openWebPage() {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 400
        });
        const page = await browser.newPage();
        await page.goto("https://www.calendario-info.es/bolivia/calendario/2025/");
        await browser.close();
    } catch (e) {
        console.log(e);
    }
}

async function captureScreenShot() {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 400
        });
        const page = await browser.newPage();
        await page.goto("https://www.calendario-info.es/bolivia/calendario/2025/");
        await page.screenshot({ path: "screenshot.png" });
        await browser.close();
    } catch (e) {
        console.log(e);
    }
}

async function getDataFromWebPage() {
    try {
        const browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 400
        });
        const page = await browser.newPage();
        const year = new Date().getFullYear();
        await page.goto("https://www.calendario-info.es/bolivia/calendario/" + year + "/");
        const result = await page.evaluate(() => {
            const div = document.querySelectorAll(".feiertag_liste_row");
            const data = [...div].map((item) => {
                const diaFecha = item.querySelector(".ft_date").innerText;
                const dia = diaFecha.split(" ")[0];
                const fecha = diaFecha.split(" ")[1];
                const feriado = item.querySelector(".ft_name").innerText;
                return { dia, fecha, feriado };
            });
            return data;
        });
        console.log('result:>', result);
        await browser.close();
    } catch (e) {
        console.log(e);
    }
}
getDataFromWebPage();
// captureScreenShot();
// openWebPage();