import * as core from '@actions/core'

import * as buildEnv from './build-env'
import * as gradleBuildScan from './gradle-build-scan'

export async function run(): Promise<void> {
    try {
        const buildTools = buildEnv.getSupportedBuildTools()

        if (buildTools.includes(buildEnv.BuildTool.Gradle)) {
            gradleBuildScan.setup()
        }
    } catch (error) {
        core.setFailed(String(error))
    }
}

run()
