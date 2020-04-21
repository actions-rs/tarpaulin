import { describe } from "jest-circus";
import getActionInputs from "../src/args";

const testEnvVars = {
    INPUT_VERSION: '0.8.6',
    INPUT_RUN_TYPES: 'Doctests',
    INPUT_OUT_TYPE: 'Lcov',
};

describe('actions-rs/tarpaulin', () => {
    beforeEach(() => {
        console.log(testEnvVars);
        Object.entries(testEnvVars).forEach(([key, value]) => {
            process.env[key] = value
        })
    });

    it('action inputs should be resolved from env vars', async () => {
        const input = getActionInputs();

        expect(input.runType).toBe('Doctests');
        expect(input.requestedVersion).toBe('0.8.6');
        expect(input.outType).toBe('Lcov')
    });
});
