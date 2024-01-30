import * as fs from 'fs'
import * as lodash from 'lodash'
import {readResourceFileAsString} from './build-env'

const INIT_SCRIPT_TEMPLATE_FILENAME = 'build-scan-template.gradle'

export async function writeInitScript(
    initScriptFile: string,
    gradleEnterprisePluginVersion: string,
    commonUserDataPluginVersion: string
): Promise<void> {
    const buildScanTemplate = readResourceFileAsString(INIT_SCRIPT_TEMPLATE_FILENAME)
    const templateVars = {
        gradleEnterprisePluginVersion,
        commonUserDataPluginVersion
    }
    lodash.templateSettings.interpolate = /\${([\s\S]+?)}/g
    const compiled = lodash.template(buildScanTemplate)
    const content = compiled(templateVars)
    fs.writeFileSync(initScriptFile, content)
}
