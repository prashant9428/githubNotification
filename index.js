const _ = require('lodash')
const { applicationConfig } = require('./notifyConfig')
const { sendSlackNotification } = require('./notify')
const { releaseMessageBody, formatCommitMsg , workflowMessageBody, tagMessageBody } = require('./messageFormat')
const {getReleaseBody} = require("./utils")
const { GITHUB_TOKEN } = require("./config")


module.exports.handler = async (event) => {
  console.log("event",event)
  const EVENT_BODY = JSON.parse(event.body)
  const ACTION = EVENT_BODY.action
  let WEBHOOK_EVENT = null

  if (EVENT_BODY.hasOwnProperty('release') && ACTION == "published" ) WEBHOOK_EVENT = 'release'
  if (EVENT_BODY.hasOwnProperty('workflow_run')) WEBHOOK_EVENT = 'workflow_run'
  if (EVENT_BODY.hasOwnProperty("ref_type") && EVENT_BODY.ref_type == "tag"){
    WEBHOOK_EVENT = "tag"
  }


  switch (WEBHOOK_EVENT) {
    case 'release':
      // pull the keys from body
      const repoName = EVENT_BODY?.repository?.name
      const version = EVENT_BODY?.release.name
      const branch = EVENT_BODY?.release.target_commitish
      const messageBody = await formatCommitMsg(EVENT_BODY.release.body)
      console.log("messageBody",messageBody)
      //filter the application from config
      
      const application = _.findKey(applicationConfig, ['repository.repository_name', repoName]);
      const appDetails = applicationConfig[application]
      if(branch == "master"){
           //send notification 
      for (let url of appDetails.notification.masterSlackWebhook) {
          const message = releaseMessageBody('semantic-bot', repoName, version, messageBody, branch)
          await sendSlackNotification(url, message)
        }
      }

      break;
    case 'workflow_run':
      // check if pipeline is requested or completed
      const workflow_status = EVENT_BODY?.action 
      const conclusion = EVENT_BODY?.workflow_run?.conclusion
      const workflowUrl = EVENT_BODY?.workflow_run?.html_url
      const workflowName = EVENT_BODY?.workflow_run?.name
      const triggeringActor = EVENT_BODY?.workflow_run?.triggering_actor?.login
      const actorProfile = EVENT_BODY?.workflow_run?.triggering_actor?.url
      // repository
      const repo_name = EVENT_BODY?.workflow_run?.repository?.name

      const application_key = _.findKey(applicationConfig, ['repository.repository_name', repo_name]);
      const applicationDetails = applicationConfig[application_key]
      const ignore_workflow = applicationDetails.ignore_workflow
      const master_workflow = applicationDetails.master_workflow
      console.log("workflow name",workflowName)
      console.log("ignore_workflow",ignore_workflow.includes(workflowName))
      let status = ""
      if(conclusion == 'failure' && !ignore_workflow.includes(workflowName)){
        const slackUrl = master_workflow.includes(workflowName) ? applicationDetails.notification.masterSlackWebhook: applicationDetails.notification.slackWebhook
        console.log("slackUrl",slackUrl)
        for (let url of slackUrl) {
        const status = ":x: GITHUB ACTION: pipeline failed"
        const message = workflowMessageBody('semantic-bot', repo_name, workflowName, triggeringActor, workflowUrl,status)
        await sendSlackNotification(url, message)
      }
      }
      if(workflow_status == 'requested') status = ':bellhop_bell: GITHUB ACTION: pipeline started:'
      if(workflow_status == 'completed') status = ':white_check_mark: GITHUB ACTION: pipeline completed:' 
      if(!ignore_workflow.includes(workflowName)){
      const slackUrl = master_workflow.includes(workflowName) ? applicationDetails.notification.masterSlackWebhook: applicationDetails.notification.slackWebhook
      for (let url of slackUrl) {
        const message = workflowMessageBody('semantic-bot', repo_name, workflowName, triggeringActor, workflowUrl,status)
        await sendSlackNotification(url, message)
      }
      }
      break;
    case "tag":
      const latestTag = EVENT_BODY.ref
      const repository_name = EVENT_BODY?.repository?.name

      const app_key = _.findKey(applicationConfig, ['repository.repository_name', repository_name]);
      const appConfig = applicationConfig[app_key]
      const githubOp = await getReleaseBody(`byjus-orders/${repository_name}`, latestTag, GITHUB_TOKEN)
      const target_branch = githubOp.target_commitish
      console.log("target_commitish",target_branch)
      const slackConfig = target_branch == 'master' ? appConfig.notification.masterSlackWebhook : appConfig.notification.slackWebhook
      for (let url of slackConfig) {
        const message = tagMessageBody(latestTag, repository_name)
        await sendSlackNotification(url, message)
      }
      break;

    default:
      break;
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify("working")
  }
}