const { Message, Blocks, Elements } = require('slack-block-builder')
    ;

module.exports = {

    releaseMessageBody: (channel, repo, version,message,branch) => {
        return Message({ channel, text: `New Release is out! in ${repo}.` })
            .blocks(
                Blocks.Divider(),
                Blocks.Section({ text: ":tada: *GITHUB ACTION: New release is out ! `"+version+"`*" }),
                Blocks.Section({ text: "*Branch*: `"+ branch +"` \t"+"*Repository*: `"+ repo +"`" }),
                Blocks.Section({ text: "*Release*: `"+ "Beta" +"`"}),
                Blocks.Section({ text: message}),
                Blocks.Divider(),
                Blocks.Actions()
                    .elements(
                        Elements.Button({ text: version, actionId: 'scaredyCat' })
                            .primary()))
            .asUser()
            .buildToJSON();
    },
    workflowMessageBody: (channel,repo, workflowName, actor,workflowUrl,status) => {
        return Message()
            .blocks(
                Blocks.Divider(),
                Blocks.Section({ text: "*"+status+ " `"+ workflowName +"`* "}),
                Blocks.Section({ text: "*Repository:* `"+ repo +"`"+"\t" + ":man: *Actor:* `"+ actor +"`"}),
                Blocks.Section({ text: "*workflow url:* "+ workflowUrl +""}),
                Blocks.Divider())
            .asUser()
            .buildToJSON();
    },
    
    tagMessageBody: (tag, repo ) => {
        return Message()
            .blocks(
                Blocks.Divider(),
                Blocks.Section({ text: ":clap: *GITHUB ACTION: New tag is out ! `"+tag+"`*"}),
                Blocks.Section({ text: "*Repository:* `"+ repo +"`"+"\t" + "*version:* `"+ tag +"`"}),
                Blocks.Divider())
            .asUser()
            .buildToJSON();
    },


    formatCommitMsg: async (body) => {
        body = JSON.stringify(body)
        console.log("body",body)
        const searchRegExp = /\(.*?\).*?\\n/g;
        body = body.replace(searchRegExp, "")
        console.log("body 1",body)
        body = body.replace(/\\n\\n/g, '&&');
        console.log("body 2",body)
        let splitCommit = body.split('&&').map(item => item.replace(/#/g, ''))
        console.log("split 1",splitCommit)
        splitCommit = splitCommit.map(item => {
            let commit = item.replace(/\\n/g, '');
            if(commit === " Bug Fixes" || commit === " Features" ){
                commit = `:bug: *${commit.trim()}*`
            }else{
                commit = `• ${commit.replace('*','').trim()}`
            }
            
            return commit
        })
        console.log("split 2",splitCommit)
        splitCommit = splitCommit.filter(item=> {
            if(item.length > 3){
                console.log(item)
                return item 
            
            }
        })
        console.log("split 3",splitCommit)
        return splitCommit.splice(1,splitCommit.length).join('\n')
    }

}