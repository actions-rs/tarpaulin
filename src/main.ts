const os = require('os');
const fs = require('fs');
const path = require('path');
const https = require('https');

const download = require('download');

import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';

import * as args from './args';

async function run() {
}

async function main() {
    try {
        await run();
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();
