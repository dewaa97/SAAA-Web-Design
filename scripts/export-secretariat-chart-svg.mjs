/**
 * Export the rendered v3 secretariat chart to SVG (1:1 with live HTML/CSS).
 * Run: node scripts/export-secretariat-chart-svg.mjs
 */
import puppeteer from "puppeteer";
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const htmlPath = join(rootDir, "organization.html");
const outPath = join(rootDir, "images/organization/saaa-secretariat-chart.svg");
const htmlToImagePath = join(rootDir, "node_modules/html-to-image/dist/html-to-image.js");

const htmlToImageSource = readFileSync(htmlToImagePath, "utf8");

function decodeSvgDataUri(dataUri) {
  if (!dataUri.startsWith("data:")) return dataUri;
  const comma = dataUri.indexOf(",");
  const header = dataUri.slice(0, comma);
  const payload = dataUri.slice(comma + 1);
  if (header.includes(";base64")) {
    return Buffer.from(payload, "base64").toString("utf8");
  }
  return decodeURIComponent(payload);
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--font-render-hinting=medium", "--disable-web-security"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1400, deviceScaleFactor: 1 });

await page.goto(`${pathToFileURL(htmlPath).href}?chart=v3`, {
  waitUntil: "networkidle0",
});

await page.waitForSelector("#sec-v3-root:not([hidden])", { timeout: 10000 });
await page.evaluate(() => document.fonts.ready);

await page.waitForFunction(
  () => document.querySelectorAll("#sec-v3-svg path").length >= 3,
  { timeout: 15000 }
);

const dimensions = await page.evaluate(() => {
  const node = document.getElementById("sec-v3-root");
  return { width: node.offsetWidth, height: node.offsetHeight };
});

await page.evaluate((source) => {
  const script = document.createElement("script");
  script.textContent = source;
  document.head.appendChild(script);
}, htmlToImageSource);

await page.waitForFunction(() => Boolean(window.htmlToImage?.toSvg));

const { svg, width, height } = await page.evaluate(async (dims) => {
  const node = document.getElementById("sec-v3-root");
  if (!node) throw new Error("Chart root not found");

  const svgDataUri = await window.htmlToImage.toSvg(node, {
    backgroundColor: "#f8fafc",
    cacheBust: true,
    skipFonts: false,
    pixelRatio: 1,
    width: dims.width,
    height: dims.height,
  });

  return {
    svg: svgDataUri,
    width: dims.width,
    height: dims.height,
  };
}, dimensions);

const rawSvg = decodeSvgDataUri(svg);
writeFileSync(outPath, rawSvg);
console.log(`Exported ${outPath} (${rawSvg.length} bytes, ${width}x${height})`);

await browser.close();
