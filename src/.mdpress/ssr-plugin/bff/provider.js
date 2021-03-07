const fs = require('fs-extra');
// const cloudbase = require("@cloudbase/node-sdk");
// const { TENCENT_CLOUD_ENV,CMS_DOCUMENT,SECRETID,SECRETKEY } = process.env;
//
// const config = {
//     secretId: SECRETID, // 前往「腾讯云控制台」-「访问密钥」获取
//     secretKey: SECRETKEY, // 前往「腾讯云控制台」-「访问密钥」获取
//     env: TENCENT_CLOUD_ENV // 前往「腾讯云控制台」-「云开发 CloudBase」获取
// };
// const app = cloudbase.init(config);
// const db = app.database();
// const _ = db.command;

async function getDocData(path) {
    try {
        const filename = __dirname + '/mock/' + path + '.js';

        if (fs.existsSync(filename)) {
            const content = require(filename);

            return content;
        }

        // const result = await db.collection(CMS_DOCUMENT).where({
        //     path
        // }).get();
        // if (result.code) {
        //     throw new Error(
        //         `获取「文档」失败, 错误码是${result.code}: ${result.message}`
        //     );
        // }
        //
        // const data =  result.data.map(item => {
        //     if (item.createTime instanceof Date) {
        //         item.createTime = item.createTime.toLocaleString();
        //     }
        //     if (item.updateTime instanceof Date) {
        //         item.updateTime = item.updateTime.toLocaleString();
        //     }
        //     // item.cover = getBucketUrl(item.cover); // 处理云存储的特殊链接
        //     return item;
        // });
        //
        // return data;
    } catch (e) {
        console.error(e)
        return;
    }
}

module.exports.getData = getDocData;
