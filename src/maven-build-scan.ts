import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import * as lodash from 'lodash'
import * as core from '@actions/core'
import {readResourceFileAsString} from './build-env'

export async function setup(): Promise<void> {
    const mavenHomeDir = await determineMavenHomeDir()

    if (!fs.existsSync(mavenHomeDir)) {
        fs.mkdirSync(mavenHomeDir, {recursive: true})
    }

    const extensionsFile = path.join(mavenHomeDir, 'extensions.xml')

    if (!fs.existsSync(extensionsFile)) {
        await writeExtensionFile(extensionsFile, core.getInput('develocity-maven-extension-version'))
    } else {
        core.error(`The Maven extension file '${extensionsFile}' already exists. Skipped creation!`)
    }
}

async function determineMavenHomeDir(): Promise<string> {
    const mavenHomeEnvVar = process.env['MAVEN_HOME']

    if (mavenHomeEnvVar) {
        return mavenHomeEnvVar
    }

    const m2HomeEnvVar = process.env['M2_HOME']

    if (m2HomeEnvVar) {
        return m2HomeEnvVar
    }

    return path.resolve(os.homedir(), '.m2')
}

async function writeExtensionFile(extensionFile: string, extensionVersion: string): Promise<void> {
    const buildScanTemplate = readResourceFileAsString('extensions.xml')
    const templateVars = {gradleEnterpriseMavenExtensionVersion: extensionVersion}
    lodash.templateSettings.interpolate = /\${([\s\S]+?)}/g
    const compiled = lodash.template(buildScanTemplate)
    const content = compiled(templateVars)
    fs.writeFileSync(extensionFile, content)
}
