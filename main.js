import { injectSpeedInsights } from "@vercel/speed-insights";

console.log("Hi I'm the main.js file!");
injectSpeedInsights();
console.log("I've injected Speed Insights into the main.js file!");
