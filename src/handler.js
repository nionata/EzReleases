import { context } from '@actions/github'

export default async function run() 
{
    // verify the pull request was merged
    if(!pr.merged) {
        console.log('Pr was not merged. Aborting action!')
        return
    }

    // attempt to create a release
    try {

        // based on the title, check what type of release this is
        const { body, title } = context.payload.pull_request
        const isHotfix = title.match(/hotfix/gi)
        const isVersioned = title.match(/v\d+.\d+(?:.\d+)?/gi)

        // create a base release object
        const { owner, repo } = context.repo
        const baseRelease = { body, owner, repo }

        //
        // on hotfix, release with an incremented patch version
        //
        if (isHotfix) {

            let lastTag = await getLastTag()

            // add a .0 to the end of a tag without a path version
            if (lastTag.length === 4) 
                lastTag = lastTag.concat(['.', '0'])

            // increment the patch version
            lastTag[5] = parseInt(lastTag[5], 10)+1
    
            // get the specific version
            const version = lastTag.join('')
            console.log(`Hotfix - releasing ${version}`)

            // create the release and return
            await createRelease({ ...baseRelease, version }) 
            return
        }

        //
        // on versioned, release with the passed version
        //
        if (isVersioned) {

            // make sure only one version was captured
            if (isVersioned.length > 1) {
                console.log('Pr title contained more than one version. Aborting action!')
                return
            }

            // get the specific version
            const version = isVersioned[0]
            console.log(`Versioned - releasing ${version}`)

            // create the release and return
            await createRelease({ ...baseRelease, version }) 
            return
        }

        //
        // on non-descript, release with an incremented minor version
        //
        let lastTag = await getLastTag()

        // increment the minor version
        lastTag[3] = parseInt(lastTag[3], 10)+1

        // remove patch version if it exists
        while (lastTag.length > 4) lastTag.pop()    

        // get the specific version
        const version = lastTag.join('')
        console.log(`Minor - releasing ${version}`)

        // create the release and return
        await createRelease({ ...baseRelease, version }) 
        return
    } catch (error) {
        console.log(error.message)
    }
}

run()