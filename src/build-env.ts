import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'

export function determineInitScriptDir(): string {
    return path.resolve(determineGradleUserHome(), 'init.d')
}

export function determineGradleUserHome(): string {
    const gradleUserHomeEnvVar = process.env['GRADLE_USER_HOME']

    if (gradleUserHomeEnvVar) {
        return gradleUserHomeEnvVar
    }

    return path.resolve(os.homedir(), '.gradle')
}

export function readResourceFileAsString(...paths: string[]): string {
    const absolutePath = path.resolve(__dirname, 'resources', ...paths)
    return fs.readFileSync(absolutePath, 'utf-8')
}
