import {describe} from "jest-circus";
import getActionInputs from "../src/args";

const testEnvVars = {
    INPUT_VERSION: '0.8.6',
    INPUT_RUN_TYPES: 'Doctests',
    INPUT_GITHUB_RELEASE_ENDPOINT: 'https://api.github.com/repos/xd009642/tarpaulin/releases'
};

describe('actions-rs/tarpaulin', () => {
    beforeEach(() => {
        console.log(testEnvVars);
        for (const key in testEnvVars) {
            process.env[key] = testEnvVars[key as keyof typeof testEnvVars]
        }
    });

    it('action inputs should be resolved from env vars', async () => {
       const input = getActionInputs();

       expect(input.runType).toBe('Doctests');
       expect(input.requestedVersion).toBe('0.8.6');
       expect(input.releaseEndpoint).toBe('https://api.github.com/repos/xd009642/tarpaulin/releases');
    });
});
