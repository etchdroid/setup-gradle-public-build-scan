import {getInput} from '@actions/core'
import {jest} from '@jest/globals'
import * as inputParams from '../src/input-params'

jest.mock('@actions/core', () => ({
    getInput: jest.fn()
}))

describe('resolve input', () => {
    it('for Develocity plugin version', async () => {
        const givenInputValue = '1.2.3'
        ;(getInput as jest.Mock).mockReturnValueOnce(givenInputValue)
        const resolvedInputValue = inputParams.getDevelocityPluginVersion()
        expect(resolvedInputValue).toBe(givenInputValue)
    })

    it('for common data plugin version', async () => {
        const givenInputValue = '4.5.6'
        ;(getInput as jest.Mock).mockReturnValueOnce(givenInputValue)
        const resolvedInputValue = inputParams.getCommonUserDataPluginVersion()
        expect(resolvedInputValue).toBe(givenInputValue)
    })

    it('for null tags', async () => {
        ;(getInput as jest.Mock).mockReturnValueOnce(null)
        const resolvedInputValue = inputParams.getTags()
        expect(resolvedInputValue).toStrictEqual([])
    })

    it('for single tag', async () => {
        ;(getInput as jest.Mock).mockReturnValueOnce('ci')
        const resolvedInputValue = inputParams.getTags()
        expect(resolvedInputValue).toStrictEqual(['ci'])
    })

    it('for multiple tags', async () => {
        ;(getInput as jest.Mock).mockReturnValueOnce('ci,local')
        const resolvedInputValue = inputParams.getTags()
        expect(resolvedInputValue).toStrictEqual(['ci', 'local'])
    })

    it('for multiple tags with spaces', async () => {
        ;(getInput as jest.Mock).mockReturnValueOnce(' ci, local ')
        const resolvedInputValue = inputParams.getTags()
        expect(resolvedInputValue).toStrictEqual(['ci', 'local'])
    })

    it('for null links', async () => {
        ;(getInput as jest.Mock).mockReturnValueOnce(null)
        const resolvedInputValue = inputParams.getLinks()
        expect(resolvedInputValue).toEqual(new Map<string, string>())
    })

    it('for single link', async () => {
        ;(getInput as jest.Mock).mockReturnValueOnce('developer=https://github.com/bmuschko')
        const resolvedInputValue = inputParams.getLinks()
        expect(resolvedInputValue).toEqual(new Map<string, string>([['developer', 'https://github.com/bmuschko']]))
    })

    it('for multiple links', async () => {
        ;(getInput as jest.Mock).mockReturnValueOnce('developer=https://github.com/bmuschko,twitter=bmuschko')
        const resolvedInputValue = inputParams.getLinks()
        expect(resolvedInputValue).toEqual(
            new Map<string, string>([
                ['developer', 'https://github.com/bmuschko'],
                ['twitter', 'bmuschko']
            ])
        )
    })

    it('for multiple links with spaces', async () => {
        ;(getInput as jest.Mock).mockReturnValueOnce(' developer= https://github.com/bmuschko , twitter=bmuschko ')
        const resolvedInputValue = inputParams.getLinks()
        expect(resolvedInputValue).toEqual(
            new Map<string, string>([
                ['developer', 'https://github.com/bmuschko'],
                ['twitter', 'bmuschko']
            ])
        )
    })
})
