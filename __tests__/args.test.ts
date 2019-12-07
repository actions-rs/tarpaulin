import {describe} from "jest-circus";
import getActionInputs from "../src/args";

const testEnvVars = {
    INPUT_VERSION: '0.8.6',
    INPUT_RUN_TYPES: 'Doctests',
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
    });
});
