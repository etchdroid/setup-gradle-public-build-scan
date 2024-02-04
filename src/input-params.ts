import * as core from '@actions/core'

export const DEVELOCITY_PLUGIN_VERSION_INPUT = 'develocity-gradle-plugin-version'
export const COMMON_USER_DATA_PLUGIN_VERSION_INPUT = 'common-user-data-plugin-version'
export const TAGS_INPUT = 'tags'
export const LINKS_INPUT = 'links'

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

    return parseArray(tags)
}

export function getLinks(): Map<string, string> {
    const links = getInput(LINKS_INPUT)

    if (!links) {
        return new Map<string, string>()
    }

    return parseMap(links)
}

function getInput(name: string): string {
    return core.getInput(name)
}

function parseArray(input: string): string[] {
    let result = []
    const json = JSON.parse(input)

    for (let item in json) {
        result.push(json[item])
    }

    return result
}

function parseMap(input: string): Map<string, string> {
    let result = new Map<string, string>()
    const json = JSON.parse(input)

    for (let key in json) {
        result.set(key, json[key])
    }

    return result
}
