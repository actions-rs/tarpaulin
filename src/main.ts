const os = require('os');

import * as toolCache from '@actions/tool-cache';
import * as core from '@actions/core';
import * as io from '@actions/io';
import * as rustCore from '@actions-rs/core';

import getActionInputs from './args';
import resolveConfig from './config';

async function run() {
    /* Make sure cargo is available before we do anything */
    const cargo = await rustCore.Cargo.get();

    const inputs = getActionInputs();
    const config = await resolveConfig(inputs);

    const outputDir = `${os.tmpdir()}/tarpaulin`;
    await io.mkdirP(outputDir);

    core.info(`[tarpaulin] downloading cargo-tarpaulin from ${config.downloadUrl}`);
    const tarpaulinTarballPath = await toolCache.downloadTool(config.downloadUrl);
    const tarpaulinBinPath = await toolCache.extractTar(tarpaulinTarballPath);

    core.addPath(tarpaulinBinPath);

    const args = ['tarpaulin', '--out', 'Xml'];
    const additionalArgs = config.additionalOptions;

    if (!additionalArgs.includes('--run-types') && config.type !== null) {
        args.push('--run-types', config.type);
    }

    if (!additionalArgs.includes('--timeout') && config.timeout !== null) {
        args.push('--timeout', config.timeout);
    }

    additionalArgs.forEach(item => args.push(item));

    core.info(`[tarpaulin] running tests with coverage tracking`);
    await cargo.call(args);
}

async function main() {
    try {
        await run();
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();
