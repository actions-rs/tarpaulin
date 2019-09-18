const os = require('os');
const path = require('path');

const download = require('download');

import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';

import {getOptions} from './args';

// TODO: `core.info` function is not published yet as for `1.0.1` version,
// bundling it.
function core_info(message: string): void {
    process.stdout.write(message + os.EOL);
}

async function getCargo(): Promise<string> {
    try {
        return await io.which('cargo', true);
    } catch (error) {
        core_info('cargo is not installed by default for some virtual environments, \
see https://help.github.com/en/articles/software-in-virtual-environments-for-github-actions');
        core_info('To install it, use this action: https://github.com/actions-rs/toolchain');

        throw error;
    }
}

async function run() {
    const {version} = await getOptions();
    const cargo = await getCargo();
    const cargoExecutableDir = path.dirname(cargo);

    const outputDir = `${os.tmpdir()}/tarpaulin/${version}`;
    await io.mkdirP(outputDir);

    const archiveName = `cargo-tarpaulin-${version}-travis.tar.gz`;
    const archiveUrl = `https://github.com/xd009642/tarpaulin/releases/download/${version}/${archiveName}`;

    core_info(`Fetching cargo-tarpaulin ${version} from ${archiveUrl}`);

    await download(archiveUrl, outputDir, {
        followRedirect: true,
    });

    core_info(`Extracting to ${outputDir}`);

    await exec.exec('tar', ['-C', cargoExecutableDir, '-xf', `${outputDir}/${archiveName}`]);
}

async function main() {
    try {
        await run();
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();
