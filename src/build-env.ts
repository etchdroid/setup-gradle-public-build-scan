import * as path from 'path'
import * as fs from 'fs'
import * as core from '@actions/core'

export function getSupportedBuildTools(): BuildTool[] {
    let buildTools: BuildTool[] = [];

    if (core.getInput('support-gradle')) {
        buildTools.push(BuildTool.Gradle)
    }
    if (core.getInput('support-maven')) {
        buildTools.push(BuildTool.Maven)
    }
    if (core.getInput('support-sbt')) {
        buildTools.push(BuildTool.SBT)
    }

    return buildTools
}

export function workspaceDirectory(): string {
    return process.env['GITHUB_WORKSPACE'] || ''
}

export function readResourceFileAsString(...paths: string[]): string {
    const absolutePath = path.resolve(__dirname, 'resources', ...paths)
    return fs.readFileSync(absolutePath, 'utf-8')
}

export enum BuildTool {
    Gradle = 'gradle',
    Maven = 'maven',
    SBT = 'sbt'
}
