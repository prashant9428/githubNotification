const { IncomingWebhook } = require('@slack/webhook');

module.exports = {
    sendSlackNotification: async (url,message)=>{

        try {
        // Read a url from the environment variables
        // const url = process.env.SLACK_WEBHOOK_URL;

        // Initialize
       
        // send the nofication
        // message = JSON.parse(message)
        // console.log(typeof message)
       
        // console.log(message)
        const webhook = new IncomingWebhook(url,JSON.parse(message));
        await webhook.send(); 
        } catch (error) {
            console.log("error in send notification",error)
        }

    }
}