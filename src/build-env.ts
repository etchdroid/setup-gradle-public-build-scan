import * as path from 'path'
import * as fs from 'fs'
import * as core from '@actions/core'

export function getSupportedBuildTools(): BuildTool[] {
    const buildTools: BuildTool[] = []

    if (core.getInput('support-gradle')) {
        buildTools.push(BuildTool.Gradle)
    }
    if (core.getInput('support-maven')) {
        buildTools.push(BuildTool.Maven)
    }
    if (core.getInput('support-sbt')) {
        buildTools.push(BuildTool.SBT)
    }

    if (buildTools.length == 0) {
        throw TypeError(`You need to select at least one build tool. Valid values are: ${Object.values(BuildTool)}`)
    }

    return buildTools
}

export enum BuildTool {
    Gradle = 'gradle',
    Maven = 'maven',
    SBT = 'sbt'
}

export function workspaceDirectory(): string {
    return process.env['GITHUB_WORKSPACE'] || ''
}

export function readResourceFileAsString(...paths: string[]): string {
    const absolutePath = path.resolve(__dirname, 'resources', ...paths)
    return fs.readFileSync(absolutePath, 'utf-8')
}
