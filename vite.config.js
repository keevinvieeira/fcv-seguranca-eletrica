export default {
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: [
        '**/*.crdownload',
        '**/Marketing Kit/**',
        '**/stitch_pomelli_dynamic_redesign/**',
        '**/.git/**',
        '**/.wrangler/**',
        '**/dist/**',
        '**/node_modules/**'
      ]
    }
  }
};
