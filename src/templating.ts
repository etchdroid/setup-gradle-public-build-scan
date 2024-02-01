import * as fs from 'fs'
import {Eta} from 'eta'
import {readResourceFileAsString} from './build-env'

const INIT_SCRIPT_TEMPLATE_FILENAME = 'build-scan-template.gradle'

export async function writeInitScript(
    initScriptFile: string,
    gradleEnterprisePluginVersion: string,
    commonUserDataPluginVersion: string,
    tags: string[],
    links: Map<string, string>
): Promise<void> {
    const buildScanTemplate = readResourceFileAsString(INIT_SCRIPT_TEMPLATE_FILENAME)
    const templateVars = {
        gradleEnterprisePluginVersion,
        commonUserDataPluginVersion,
        tags,
        links
    }
    const eta = new Eta({views: buildScanTemplate})
    const content = eta.renderString(buildScanTemplate, templateVars)
    fs.writeFileSync(initScriptFile, content)
}
