import {input} from '@actions-rs/core';

export interface ActionInputs {
    requestedVersion: string,
    releaseEndpoint: string,
    timeout: string,
    runType: string,
}

export default function getActionInputs(): ActionInputs {
    const requestedVersion = input.getInput('version');
    const releaseEndpoint = input.getInput('github-release-endpoint');
    const runType = input.getInput('run-types');
    const timeout = input.getInput('timeout');

    return {
        requestedVersion,
        releaseEndpoint,
        runType,
        timeout
    };
}
