const applicationConfig = {
    "oms": {
        "repository": {
            "url": "https://github.com/byjus-orders/microservices-oms",
            "repository_name": "microservices-oms"
        },
        "notification": {
            "slackWebhook": ['https://hooks.slack.com/services/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'],
            "masterSlackWebhook":['https://hooks.slack.com/services/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'],
            "email": {}
        },
        'ignore_workflow':['go green','uat-oms'],
        'master_workflow':["prod-server-oms","prod-server-kms","prod-server-pms"]
    },
    "lms": {
        "repository": {
            "url": "https://github.com/byjus-orders/microservices-lms",
            "repository_name": "microservices-lms"
        },
        "notification": {
            "slackWebhook": ['https://hooks.slack.com/services/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'],
            "masterSlackWebhook":['https://hooks.slack.com/services/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'],
            "email": {}
        },
        'ignore_workflow':['go green','uat-lms'],
        'master_workflow':["prod-server-lms"]
    },
    "ums": {
        "repository": {
            "url": "https://github.com/byjus-orders/microservices-ums",
            "repository_name": "microservices-ums"
        },
        "notification": {
            "slackWebhook": ['https://hooks.slack.com/services/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'],
            "masterSlackWebhook":['https://hooks.slack.com/services/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'],
            "email": {}
        },
        'ignore_workflow':['go green','uat-ums'],
        'master_workflow':["prod-server-ums"]
    },
    "ptms": {
        "repository": {
            "url": "https://github.com/byjus-orders/microservices-ptms",
            "repository_name": "microservices-ptms"
        },
        "notification": {
            "slackWebhook": ['https://hooks.slack.com/services/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'],
            "masterSlackWebhook":['https://hooks.slack.com/services/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'],
            "email": {}
        },
        'ignore_workflow':['go green','uat-ptms'],
        'master_workflow':["prod-server-ptms"]
    },
    "fms": {
        "repository": {
            "url": "https://github.com/byjus-orders/microservices-fms",
            "repository_name": "microservices-fms"
        },
        "notification": {
            "slackWebhook": ['https://hooks.slack.com/services/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'],
            "masterSlackWebhook":['https://hooks.slack.com/services/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'],
            "email": {}
        },
        
        'ignore_workflow':['go green','uat-fms'],
        'master_workflow':["prod-server-fms"]
    },
    "wms": {
        "repository": {
            "url": "https://github.com/byjus-orders/microservices-wms",
            "repository_name": "microservices-wms"
        },
        "notification": {
            "slackWebhook":['https://hooks.slack.com/services/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'],
            "masterSlackWebhook":['https://hooks.slack.com/services/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'],
            "email": {}
        },
         'ignore_workflow':['go green','uat-wms'],
         'master_workflow':["prod-server-wms"]
    },
    "uxos": {
        "repository": {
            "url": "https://github.com/byjus-orders/microservices-uxos",
            "repository_name": "microservices-uxos"
        },
        "notification": {
            "slackWebhook":['https://hooks.slack.com/services/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'],
            "masterSlackWebhook":['https://hooks.slack.com/services/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'],
            "email": {}
        },
        'ignore_workflow':['go green','uat-uxos'],
        'master_workflow':["prod-server-uxos"]
    },
    "achieve": {
        "repository": {
            "url": "https://github.com/byjus-orders/microservices-achieve",
            "repository_name": "microservices-achieve"
        },
        "notification": {
            "slackWebhook":['https://hooks.slack.com/services/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'],
            "masterSlackWebhook":['https://hooks.slack.com/services/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'],
            "email": {}
        },
        'ignore_workflow':['go green','uat-achieve'],
        'master_workflow':["prod-server-achieve"]
    },
    "middleware":{
        "repository": {
            "url": "https://github.com/byjus-orders/microservices-middleware",
            "repository_name": "microservices-middleware"
        },
        "notification": {
            "slackWebhook":['https://hooks.slack.com/services/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'],
            "masterSlackWebhook":['https://hooks.slack.com/services/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'],
            "email": {}
        },
        'ignore_workflow':['go green','uat-middleware'],
        'master_workflow':["prod-server-middleware"]
    },
    "auto_release": {
        "repository": {
            "url": "https://github.com/prashant9428/auto-release-single-repo",
            "repository_name": "auto-release-single-repo"
        },
        "notification": {
            "slackWebhook": ['https://hooks.slack.com/services/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'],
            "masterSlackWebhook":['https://hooks.slack.com/services/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'],
            "email": {}
        },
        'ignore_workflow':['go green'],
        'master_workflow':['npackages-publish-prod']
    }
 
}


module.exports = {applicationConfig}
