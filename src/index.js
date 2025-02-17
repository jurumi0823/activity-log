const { fetchAndFilterEvents } = require('./utils/github');
const { updateReadme } = require('./utils/file');
const { username, token, eventLimit, ignoreEvents, readmePath, commitMessage } = require('./config');
const core = require('@actions/core')

// Main function to execute the update process
async function main() {
    try {
        const activity = await fetchAndFilterEvents({ username, token: process.env.ACTIONSECRET2024, eventLimit, ignoreEvents });
        await updateReadme(activity, readmePath);
    } catch (error) {
        core.setFailed(`❌ Error in the update process: ${error.message}`);
        console.error(error)
        process.exit(1);
    }
}

// Execute the main function
main();
