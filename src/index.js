const core = require('@actions/core');
const axios = require('axios');
const github = require('@actions/github');

async function run() {
    try {
        const url = core.getInput('url')
        const headers = JSON.parse(core.getInput('headers') || '{}')
        const actions = JSON.parse(core.getInput('actions') || '{}')
        const tags = core.getInput('tags').split(',');
        const topic = core.getInput('topic')
        const title = core.getInput('title') || 'GitHub Actions'
        const priority = core.getInput('priority') || 3

        core.info(`Connecting to endpoint (${url}) ...`)

        const response = await axios({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
                'Priority': priority,
                ...headers
            },
            data: JSON.stringify({
                'topic': topic,
                'tags': tags,
                'title': (title),
                'actions': actions,
                "message": core.getInput('details')
            })

        })

        core.setOutput('response', {
            'statusCode': response.statusCode
        });
    } catch (error) {
        console.log(error.response.data)
        core.setFailed(error.message);
    }
}

run();