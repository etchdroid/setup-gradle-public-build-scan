import * as path from 'path'
import * as fs from 'fs'

export function readResourceFileAsString(...paths: string[]): string {
    const absolutePath = path.resolve(__dirname, 'resources', ...paths)
    return fs.readFileSync(absolutePath, 'utf-8')
}
