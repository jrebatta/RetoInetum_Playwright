module.exports = {
    default: `--require-module ts-node/register --require src/steps/**/*.ts --format progress --format json:reports/cucumber-report.json`
};
