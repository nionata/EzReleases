import { exec } from '@actions/exec'

export const execCommand = async (command) => 
{
    let stdout = ''
    let stderr = ''

    try {
        const options = {
            listeners: {
                stdout: (data) => {
                    stdout += data.toString()
                },
                stderr: (data) => {
                    stderr += data.toString()
                },
            },
        }

        const code = await exec(command, undefined, options)

        return {
            code,
            stdout,
            stderr,
        }
    } catch (err) {
        return {
            code: 1,
            stdout,
            stderr,
            error: err,
        }
    }
}

export const getLastTag = async () => 
{
    // fetch tags
    await execCommand('git fetch --prune --unshallow --tags')

    // get the last tag sha
    const previousTagSha = (await execCommand('git rev-list --tags --topo-order --max-count=1')).stdout.trim()

    // get the last tag
    const tag = (await execCommand(`git describe --tags ${previousTagSha}`)).stdout.trim()

    // ensure there is a tag
    if (!tag) return null

    // return all the tag parts
    return tag.match(/(v)(\d+)(.)(\d+)(.)?(\d+)?/).slice(1).filter(item => item !== undefined)
}