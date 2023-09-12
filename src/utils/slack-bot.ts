import axios from 'axios';
import _ from 'lodash';

const { BOT_TOKEN, LOG_CHANNEL } = process.env;

const DEFAULT_CHANNEL = LOG_CHANNEL || 'event-sync-data-logs';

const sendLog = function({ msg, err, data }: any) {
    try {
        if (!BOT_TOKEN)
            return;
            
        const log: any = {};

        if (data)
            log.data = data;

        if (err)
            log.err = serializeErr(err);

        const attachments = buildAttachments(log);

        axios({
            headers: {
                Authorization: `Bearer ${BOT_TOKEN}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
            url: 'https://slack.com/api/chat.postMessage',
            data: JSON.stringify({
                attachments,
                text: msg,
                channel: DEFAULT_CHANNEL,
            }),
            method: 'POST',
        }).catch((error) => console.error(error));
    } catch (e) {
        console.error(e);
    }
};

function buildAttachments(data: object) {
    let fields: any = [];
    if (_.isObject(data)) {
        fields = Object.keys(data).map((key) => {
            if (!_.isObject(data[key])) {
                return {
                    short: true,
                    title: key,
                    value: data[key],
                };
            }
            return {
                short: true,
                title: key,
                value: JSON.stringify(data[key]),
            };
        });
    }

    return [
        {
            fields,
        },
    ];
}

function serializeErr(err: any): any {
    if (err.isAxiosError && err.response) {
        return {
            requestUrl: _.get(err.response, 'config.url'),
            requestParams: _.get(err.response, 'config.params'),
            requestData: _.get(err.response, 'config.data'),
            requestHeaders: _.get(err.response, 'config.headers'),
            status: _.get(err.response, 'status'),
            statusText: _.get(err.response, 'statusText'),
            error: _.get(err.response, 'data.error'),
            config: _.get(err, 'config'),
        };
    }

    return {
        stack: err.stack || err,
    };
}

export default sendLog;
