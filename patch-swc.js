const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'node_modules', 'next', 'dist', 'build', 'swc', 'index.js');

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Ensure wasm fallback is called before logLoadFailure
  if (content.includes('logLoadFailure(attempts, true);') && !content.includes('let wasmFallback = await tryLoadWasmWithFallback')) {
    content = content.replace(
      'logLoadFailure(attempts, true);',
      'let wasmFallback = await tryLoadWasmWithFallback(attempts); if (wasmFallback) return resolve(wasmFallback); logLoadFailure(attempts, true);'
    );
  }

  // 2. Ensure wasm pkgPath resolution resolves correctly
  const searchRegex = /let pkgPath = pkg;[\s\S]*?pkgPath = _path\.default\.join\(importPath, pkg, "wasm\.js"\);[\s\S]*?}/;
  if (searchRegex.test(content)) {
    content = content.replace(searchRegex, 'let pkgPath = importPath ? _path.default.join(importPath, pkg, "wasm.js") : require.resolve(pkg);');
  }

  fs.writeFileSync(file, content);
  console.log('SWC patches applied successfully.');
}
