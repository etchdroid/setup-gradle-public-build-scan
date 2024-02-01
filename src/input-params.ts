import * as core from '@actions/core'

const DEVELOCITY_PLUGIN_VERSION_INPUT = 'develocity-gradle-plugin-version'
const COMMON_USER_DATA_PLUGIN_VERSION_INPUT = 'common-user-data-plugin-version'
const TAGS_INPUT = 'tags'
const LINKS_INPUT = 'links'

export function getDevelocityPluginVersion(): string {
    return getInput(DEVELOCITY_PLUGIN_VERSION_INPUT)
}

export function getCommonUserDataPluginVersion(): string {
    return getInput(COMMON_USER_DATA_PLUGIN_VERSION_INPUT)
}

export function getTags(): string[] {
    const tags = getInput(TAGS_INPUT)

    if (!tags) {
        return []
    }

    return tags.split(',').map(s => s.trim())
}

export function getLinks(): Map<string, string> {
    const links = getInput(LINKS_INPUT)

    if (!links) {
        return new Map<string, string>()
    }

    return links.split(',').reduce((acc, curr) => {
        const [key, value] = curr.split('=')
        acc.set(key.trim(), value.trim())
        return acc
    }, new Map<string, string>())
}

function getInput(name :string): string {
    return core.getInput(name)
}
