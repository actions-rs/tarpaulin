import { input } from '@actions-rs/core';
import { OutputType } from './config';

export interface ActionInputs {
    requestedVersion: string,
    target: String,
    timeout: string,
    runType: string,
    opts: string | null,
    outType: OutputType,
}

export default function getActionInputs(): ActionInputs {
    const requestedVersion = input.getInput('version');
    const target = input.getInput('target');
    const runType = input.getInput('run-types');
    const timeout = input.getInput('timeout');
    const opts = input.getInput('args');
    const outType = input.getInput('out-type') as OutputType;

    return {
        requestedVersion,
        target,
        runType,
        timeout,
        opts,
        outType,
    };
}
