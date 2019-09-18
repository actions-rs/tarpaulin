import * as args from '../src/args'

const testEnvVars = {
    INPUT_VERSION: '0.8.6'
};

describe('actions-rs/tarpaulin', () => {
    beforeEach(() => {
        for (const key in testEnvVars) {
            process.env[key] = testEnvVars[key as keyof typeof testEnvVars]
        }
    });

    it('Parses action input into toolchain options', async () => {
        const result = await args.getOptions();

        expect(result.version).toBe('0.8.6');
    });
});
