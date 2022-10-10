const path = require("path");
const fs = require("fs-extra");
const rollup = require('rollup');
const typescript = require("rollup-plugin-typescript");

const inputOptions = {
  // target: "es2016",
  input: "./src/index.ts",
  external: [ "vue" ],
  plugins: [
    typescript({
        exclude: "node_modules/**",
        typescript: require("typescript")
      }
    )],
}
const outputOptions = {
  file: "dist/rx-srv.js",
  format: "cjs",
}

const outputPath = path.join(__dirname, 'dist')

if (fs.existsSync(outputPath)) {
  fs.rmSync(outputPath, {recursive: true})
}

fs.mkdirSync(outputPath)

const buildRxService = async () => {
  const bundle = await rollup.rollup(inputOptions)

  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}

buildRxService().catch(() => {})