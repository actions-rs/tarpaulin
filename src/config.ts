import {ActionInputs} from "./args";
import fetch from 'node-fetch';

export interface TarpaulinConfig {
    /**
     * The URL to download a tarball of cargo-tarpaulin from.
     */
    downloadUrl: string,

    /**
     * The type of tests to run. If {@code null}, doctests and normal tests
     * will be run.
     */
    type: string | null,

    /**
     * The maximum time a test can be ran without response before a timeout occurs.
     */
    timeout: string | null,
}

/**
 * Resolve the configuration (e.g., download url and test options) required to run tarpaulin
 * from the inputs supplied to the action.
 *
 * @param input The parameters of the action.
 */
export default async function resolveConfig(input: ActionInputs): Promise<TarpaulinConfig> {
    const downloadUrl = await getDownloadUrl(input.releaseEndpoint, input.requestedVersion);
    const type = input.runType ? input.runType : null;
    const timeout = input.timeout ? input.timeout : null;

    console.log(input.runType);
    return {
        downloadUrl,
        timeout,
        type,
    };
}

/**
 * Determine the download URL for the tarball containing the `cargo-tarpaulin` binaries.
 *
 * @param releaseEndpoint The URI of the GitHub API that can be used to fetch release information, sans the version number.
 * @param requestedVersion The Git tag of the tarpaulin revision to get a download URL for. May be any valid Git tag,
 * or a special-cased `latest`.
 */
async function getDownloadUrl(releaseEndpoint: string, requestedVersion: string): Promise<string> {
    const releaseInfoUri = requestedVersion === 'latest' ?
        `${releaseEndpoint}/latest` :
        `${releaseEndpoint}/tag/${requestedVersion};`;

    const releaseInfoRequest = await fetch(releaseInfoUri);
    const releaseInfo = await releaseInfoRequest.json();
    const asset = releaseInfo["assets"].find(asset => {
        return asset['content_type'] === 'application/gzip';
    });

    if (!asset) {
        throw new Error(`Couldn't find a release tarball containing binaries for ${requestedVersion}`);
    }

    return asset["browser_download_url"];
}
