import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import * as lodash from 'lodash'

import * as core from '@actions/core'

export async function setup(): Promise<void> {
    const initScriptDir = await determineInitScriptDir()

    if (!fs.existsSync(initScriptDir)) {
        fs.mkdirSync(initScriptDir, {recursive: true})
    }

    const initScriptFile = path.resolve(`${initScriptDir}/build-scan.gradle`)

    if (!fs.existsSync(initScriptFile)) {
        const buildScanConfig = fs.readFileSync('./resources/build-scan.gradle', 'utf-8')
        const templateVars = {gradleEnterprisePluginVersion: '3.16.1'}
        lodash.templateSettings.interpolate = /\${([\s\S]+?)}/g
        const compiled = lodash.template(buildScanConfig)
        const initScriptContent = compiled(templateVars)
        fs.writeFileSync(initScriptFile, initScriptContent)
    } else {
        core.error(`The initializing script '${initScriptFile}' already exists. Skipped creation!`)
    }
}

async function determineInitScriptDir(): Promise<string> {
    return path.resolve(await determineGradleUserHome(), 'init.d')
}

async function determineGradleUserHome(): Promise<string> {
    const customGradleUserHome = process.env['GRADLE_USER_HOME']

    if (customGradleUserHome) {
        const rootDir = workspaceDirectory()
        return path.resolve(rootDir, customGradleUserHome)
    }

    return path.resolve(os.homedir(), '.gradle')
}

function workspaceDirectory(): string {
    return process.env['GITHUB_WORKSPACE'] || ''
}
