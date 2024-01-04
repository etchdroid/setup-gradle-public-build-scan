import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'

export async function setup(): Promise<void> {
    const initScriptDir = await determineInitScriptDir()

    if (!fs.existsSync(initScriptDir)) {
        fs.mkdirSync(initScriptDir, {recursive: true})
    }

    const initScript = path.resolve(`${initScriptDir}/build-scan.gradle`)
    const buildScanConfig = `import com.gradle.enterprise.gradleplugin.GradleEnterprisePlugin

    initscript {
        repositories {
            gradlePluginPortal()
        }
        dependencies {
            classpath("com.gradle:gradle-enterprise-gradle-plugin:3.16.1")
        }
    }

    settingsEvaluated { settings ->
        settings.pluginManager.apply(GradleEnterprisePlugin)

        settings.gradleEnterprise {
            buildScan {
                publishAlways()
                termsOfServiceUrl = "https://gradle.com/terms-of-service"
                termsOfServiceAgree = "yes"
            }
        }
    }`

    fs.writeFileSync(initScript, buildScanConfig)
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
