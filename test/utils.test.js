/**
 * @jest-environment node
 */
'use strict'

import { execCommand, getLastTag } from '../src/utils.js'

test('Run a command', async () => {
    const response = await execCommand('ls')

    expect(response.code).toBe(0)
    expect(response.stderr).toBeDefined()
    expect(response.stderr).toBe('')
})

test('Get last tag', async () => {
    const tag = 'v100.1'
    await execCommand(`git tag ${tag}`)

    const response = await getLastTag()
    await execCommand(`git tag -d ${tag}`)

    expect(response).not.toBeNull()
    expect(response.join('')).toBe(tag)

})