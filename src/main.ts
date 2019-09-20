const os = require('os');
const path = require('path');


import * as toolCache from '@actions/tool-cache';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';

import getActionInputs from './args';
import resolveConfig from './config';

async function getCargo(): Promise<string> {
    try {
        return await io.which('cargo', true);
    } catch (error) {
        core.info('cargo is not installed by default for some virtual environments, \
see https://help.github.com/en/articles/software-in-virtual-environments-for-github-actions');
        core.info('To install it, use this action: https://github.com/actions-rs/toolchain');

        throw error;
    }
}

async function run() {
    /* Make sure cargo is available before we do anything */
    const cargo = await getCargo();

    const inputs = getActionInputs();
    const config = await resolveConfig(inputs);

    const outputDir = `${os.tmpdir()}/tarpaulin`;
    await io.mkdirP(outputDir);

    core.info(`[tarpaulin] downloading cargo-tarpaulin from ${config.downloadUrl}`);
    const tarpaulinTarballPath = await toolCache.downloadTool(config.downloadUrl);

    const cargoExecutableDir = path.dirname(cargo);
    await toolCache.extractTar(tarpaulinTarballPath, cargoExecutableDir);

    const args = ['tarpaulin', '--out', 'Xml'];

    if (config.type !== null) {
        args.push('--run-types', config.type);
    }

    if (config.timeout !== null) {
        args.push('--timeout', config.timeout);
    }

    core.info(`[tarpaulin] running tests with coverage tracking`);
    await exec.exec(cargo, args);
}

async function main() {
    try {
        await run();
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();
