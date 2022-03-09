const core = require('@actions/core');
const github = require('@actions/github');
const { context } = require('@actions/github')
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(GITHUB_TOKEN);
  
const { pull_request } = context.payload;

  
async function run() {
  const opened_name = pull_request.user.login;
  const merged_name = pull_request.merged_by.login;  
  let body = `hello ${opened_name} and ${merged_name} thanks for merging this feature`;
  if(opened_name === merged_name) {
    body = `![Self.png](https://user-images.githubusercontent.com/49370927/157414445-bfde117a-9748-4018-80b5-d356479a54cb.jpg)`;
  }
  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: `${body}`
  });
}
  
run();
