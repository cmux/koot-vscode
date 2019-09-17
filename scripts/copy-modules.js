const fs = require('fs-extra');
const path = require('path');

const modules = ['camelcase'];

(async () => {
    const targetLibs = path.resolve(__dirname, '../modules');

    await fs.emptyDir(targetLibs);

    for (const m of modules) {
        await fs.copy(
            path.resolve(__dirname, '../node_modules/', m),
            path.resolve(targetLibs, m)
        );
    }
})();
