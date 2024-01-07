import * as core from '@actions/core'

import * as buildEnv from './build-env'
import * as gradleBuildScan from './gradle-build-scan'

export async function run(): Promise<void> {
    try {
        const buildTool = buildEnv.getBuildTool()

        switch (buildTool) {
            case buildEnv.BuildTool.Gradle:
                gradleBuildScan.setup()
                break
        }
    } catch (error) {
        core.setFailed(String(error))
    }
}

run()
