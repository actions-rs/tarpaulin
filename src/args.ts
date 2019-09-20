import * as core from '@actions/core';

// Workaround for a GH bug: https://github.com/actions/toolkit/issues/127
//
// For input `all-features: true` it will generate the `INPUT_ALL-FEATURES: true`
// env variable, which looks too weird.
// Here we are trying to get proper name `INPUT_NO_DEFAULT_FEATURES` first,
// and if it does not exist, trying the `INPUT_NO-DEFAULT-FEATURES`
function getInput(name: string, options?: core.InputOptions): string {
    const inputFullName = name.replace(/-/g, '_');
    let value = core.getInput(inputFullName, options);
    if (value.length > 0) {
        return value
    }

    return core.getInput(name)
}

export interface ActionInputs {
    requestedVersion: string,
    releaseEndpoint: string,
    timeout: string,
    runType: string,
}

export default function getActionInputs(): ActionInputs {
    const requestedVersion = getInput('version');
    const releaseEndpoint = getInput('github-release-endpoint');
    const runType = getInput('run-types');
    const timeout = getInput('timeout');

    return {
        requestedVersion,
        releaseEndpoint,
        runType,
        timeout
    };
}
