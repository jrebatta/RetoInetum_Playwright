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
    workers: 1,
});
