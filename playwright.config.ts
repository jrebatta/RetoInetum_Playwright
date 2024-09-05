import { defineConfig } from '@playwright/test';

export default defineConfig({
    projects: [
        {
            name: 'Chrome',
            use: {
                channel: 'chrome',
            },
        },
    ],
    reporter: [['html', { outputFolder: 'test-results' }]],
    workers: 1, // Limita el número de trabajadores a 1
});
