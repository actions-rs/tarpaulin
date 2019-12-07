import {input} from '@actions-rs/core';

export interface ActionInputs {
    requestedVersion: string,
    releaseEndpoint: string,
    timeout: string,
    runType: string,
    opts: string | null,
}

export default function getActionInputs(): ActionInputs {
    const requestedVersion = input.getInput('version');
    const releaseEndpoint = input.getInput('github-release-endpoint');
    const runType = input.getInput('run-types');
    const timeout = input.getInput('timeout');
    const opts = input.getInput('args');

    return {
        requestedVersion,
        releaseEndpoint,
        runType,
        timeout,
        opts
    };
}
