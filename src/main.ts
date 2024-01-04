import * as core from '@actions/core'

import * as gradleBuildScan from './gradle-build-scan'

export async function run(): Promise<void> {
    try {
        gradleBuildScan.setup()
    } catch (error) {
        core.setFailed(String(error))
    }
}

run()
