import * as path from 'path'
import * as fs from 'fs'

const workspaceDir = workspaceDirectory()
const gradleSettingsFile = path.join(workspaceDir, 'settings.gradle')
const gradleSettingsKtsFile = path.join(workspaceDir, 'settings.gradle.kts')
const mavenPomFile = path.join(workspaceDir, 'pom.xml')
const sbtBuildFile = path.join(workspaceDir, 'build.sbt')

export function getBuildTool(): BuildTool {
    if (fs.existsSync(gradleSettingsFile) || fs.existsSync(gradleSettingsKtsFile)) {
        return BuildTool.Gradle
    } else if (fs.existsSync(mavenPomFile)) {
        return BuildTool.Maven
    } else if (fs.existsSync(sbtBuildFile)) {
        return BuildTool.SBT
    }

    throw TypeError(
        `Could not detect a Gradle, Maven, or SBT file in the directory ${workspaceDir}.`
    )
}

export function workspaceDirectory(): string {
    return process.env['GITHUB_WORKSPACE'] || ''
}

export enum BuildTool {
    Gradle = 'gradle',
    Maven = 'maven',
    SBT = 'sbt'
}