import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, '.assetsignore'), '# .assetsignore\n');
  console.log('✓ Created dist/.assetsignore for Cloudflare deploy');
}
