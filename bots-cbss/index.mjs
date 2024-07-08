import puppeteer from 'puppeteer';

import { staff_id, sec_id } from '../botsconfig/config.js'

// import ocrRead from './utils/ocr.js'

// 连接到一个已经运行的浏览器实例
// 浏览器启动参数 --remote-debugging-port=9222 --no-sandbox --window-size=1366,768
// 产看浏览器实例ID, http://127.0.0.1:9222/json/version



(async () => {




    let userDataDir = `./crt`
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false, // 可以看到浏览器界面
        devtools: true,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // 指定Chrome浏览器路径
        args: ['--ignore-certificate-errors', // 忽略证书错误
            `--user-data-dir=${userDataDir}`, // 指定用户数据目录
            '--no-sandbox',
            '--window-size=1366,850'
        ]
        // args: ['--ignore-certificate-errors',] // 忽略证书错误
    });
    const page = await browser.newPage();

    await page.setViewport({ 'width': 1366, 'height': 768 })

    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36')
    await page.evaluateOnNewDocument(() => { //在每个新页面打开前执行以下脚本
        const newProto = navigator.__proto__;
        delete newProto.webdriver;  //删除navigator.webdriver字段
        navigator.__proto__ = newProto;
        window.chrome = {};  //添加window.chrome字段，为增加真实性还需向内部填充一些值
        window.chrome.app = { "InstallState": "hehe", "RunningState": "haha", "getDetails": "xixi", "getIsInstalled": "ohno" };
        window.chrome.csi = function () { };
        window.chrome.loadTimes = function () { };
        window.chrome.runtime = function () { };
        Object.defineProperty(navigator, 'userAgent', {  //userAgent在无头模式下有headless字样，所以需覆写
            get: () => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
        });

        Object.defineProperty(navigator, 'plugins', {  //伪装真实的插件信息
            get: () => [{
                "description": "Portable Document Format",
                "filename": "internal-pdf-viewer",
                "length": 1,
                "name": "Chrome PDF Plugin"
            }]
        });

        Object.defineProperty(navigator, 'languages', { //添加语言
            get: () => ["zh-CN", "zh", "en"],
        });

        const originalQuery = window.navigator.permissions.query; //notification伪装
        window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );


        // //...
        // await browser.close()
    }).catch(e => {
        console.log(e)
    })

    // Navigate the page to a URL
    await page.goto('https://hb.cbss.10010.cn/cas/login?provinceCode=71', { waitUntil: 'networkidle2' });

    const input_staff_id = await page.$("#STAFF_ID")

    await input_staff_id.type(staff_id);

    const input_pwr = await page.$("#LOGIN_PASSWORD")

    await input_pwr.type(sec_id);

    const verifyImg = await page.$("#imgCapText")

    // await ocrRead.ocrRead('https://hb.cbss.10010.cn/cas/captcha?capTextId=61873a99-c978-4838-88b0-83e5f31b9991')

    // 启用请求拦截
    // await page.setRequestInterception(true);
    // page.on('request', request => {
    //     // 修改请求头
    //     request.headers()['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

    //     request.headers()['Sec-Ch-Ua'] = '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"';

    //     // 设置 Sec-Ch-Ua-Mobile 头部
    //     request.headers()['Sec-Ch-Ua-Mobile'] = '?0'; // ?0 表示非移动设备，?1 表示移动设备

    //     // 设置 Sec-Ch-Ua-Platform 头部
    //     request.headers()['Sec-Ch-Ua-Platform'] = "Windows";

    //     // // 设置 Sec-Fetch-Site
    //     // request.headers()['Sec-Fetch-Site'] = 'same-origin';

    //     // 继续请求
    //     request.continue();
    // });



    // Set screen size
    // await page.setViewport({ width: 1920, height: 1080 });


    // await browser.close();

    //监听这些事件来捕获 Chromium 输出到标准输出和标准错误流的信息。
    browser.process().on('stdout', data => console.log(`STDOUT: ${data.toString()}`));
    browser.process().on('stderr', data => console.log(`STDERR: ${data.toString()}`));

    //捕获页面上的控制台日志
    page.on('console', msg => console.log(`PAGE LOG: ${msg.text()}`));

    //监控网络请求的状态，包括请求失败的原因。
    page.on('requestfailed', request => console.log(`Request failed: ${request.failure().errorText}`));
    page.on('requestfinished', request => console.log(`Request finished: ${request.url()}`));

})();


// (async () => {




//     let userDataDir = `./crt`
//     // Launch the browser and open a new blank page
//     const browser = await puppeteer.launch({
//         headless: false, // 可以看到浏览器界面
//         // devtools: true,
//         executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // 指定Chrome浏览器路径
//         args: ['--ignore-certificate-errors', // 忽略证书错误
//             `--user-data-dir=${userDataDir}`, // 指定用户数据目录
//             '--no-sandbox',
//             '--window-size=1366,850'
//         ]
//         // args: ['--ignore-certificate-errors',] // 忽略证书错误
//     });
//     const page = await browser.newPage();

//     await page.setViewport({ 'width': 1366, 'height': 768 })

//     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36')

//         // 启用请求拦截
//         await page.setRequestInterception(true);
//         page.on('request', request => {
//             // 修改请求头
//             request.headers()['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

//             request.headers()['Sec-Ch-Ua'] = '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"';

//             // 设置 Sec-Ch-Ua-Mobile 头部
//             request.headers()['Sec-Ch-Ua-Mobile'] = '?0'; // ?0 表示非移动设备，?1 表示移动设备

//             // 设置 Sec-Ch-Ua-Platform 头部
//             request.headers()['Sec-Ch-Ua-Platform'] = "Windows";

//             // // 设置 Sec-Fetch-Site
//             // request.headers()['Sec-Fetch-Site'] = 'same-origin';

//             // 继续请求
//             request.continue();
//         });

//         // Navigate the page to a URL
//         await page.goto('https://hb.cbss.10010.cn/cas/login?provinceCode=71', { waitUntil: 'networkidle2' });

//         // Set screen size
//         // await page.setViewport({ width: 1920, height: 1080 });


//         // await browser.close();

//         //监听这些事件来捕获 Chromium 输出到标准输出和标准错误流的信息。
//         browser.process().on('stdout', data => console.log(`STDOUT: ${data.toString()}`));
//         browser.process().on('stderr', data => console.log(`STDERR: ${data.toString()}`));

//         //捕获页面上的控制台日志
//         page.on('console', msg => console.log(`PAGE LOG: ${msg.text()}`));

//         //监控网络请求的状态，包括请求失败的原因。
//         page.on('requestfailed', request => console.log(`Request failed: ${request.failure().errorText}`));
//         page.on('requestfinished', request => console.log(`Request finished: ${request.url()}`));

//     })();



// 连接到一个已经运行的浏览器实例
// 浏览器启动参数 --remote-debugging-port=9222 --no-sandbox --window-size=1366,768
// 产看浏览器实例ID, http://127.0.0.1:9222/json/version
// (async () => {
//     let baseURL = `https://hb.cbss.10010.cn/cas/`


//     try {
//         const browserWSEndpoint = "ws://127.0.0.1:9222/devtools/browser/10d4864d-681c-4e94-8276-9267004a5659"
//         const browser = await puppeteer.connect({
//             browserWSEndpoint,
//             ignoreHTTPSErrors: true, // 可选参数，忽略 HTTPS 错误
//             slowMo: 250, // 可选参数，增加延迟，便于观察调试
//             dumpio: true, // 可选参数，输出 Puppeteer 和浏览器之间的所有通信
//         });

//         // 获取第一个浏览器上下文
//         const context = browser.defaultBrowserContext();


//         const pages = await context.pages();

//         pages.forEach(async page => {
//             try {
//                 if (!page.isClosed()) {
//                     // console.log(`Page URL: ${page.url()}`);
//                     // console.log(`Page Title: ${await page.title()}`);
//                     // console.log(`Page is closed: ${page.isClosed()}`);
//                     // console.log('---');


//                     if (page.url().includes('https://hb.cbss.10010.cn')) {
//                         await page.setViewport({ width: 1366, height: 768 });
//                         // page.setViewport({ width: 1024, height: 768 })
//                         const input_staff_id = await page.$("#STAFF_ID")

//                         await input_staff_id.type("EYCJF002");

//                         const input_pwr = await page.$("#LOGIN_PASSWORD")

//                         await input_pwr.type("uU@147258");

//                         const verifyImg = await page.$("#imgCapText")
//                         const imgSrc = await page.evaluate(el => el.getAttribute('src'), verifyImg)

//                         const imgUrl = imgSrc.replace(/^\.\//, '')
//                         console.log(`${baseURL}${imgUrl}`)
//                         console.log(ocrRead.ocrRead(`https://hb.cbss.10010.cn/cas/captcha?capTextId=b149a2e1-d5b3-4ee3-9da4-ae4699e75c3a`))

//                         // await ocrRead.ocrRead(page)
//                     }
//                 }
//             } catch (error) {
//                 console.error(`Error while processing page: ${error.message}`);
//             }
//         });







// console.log(pages)

// pages.forEach(page => {
//     console.log(`Page URL: ${page.url()}`);
//     console.log(`Page Title: ${page.title()}`);
//     console.log(`Page is closed: ${page.isClosed()}`);
//     console.log('---');
// });
// // 创建一个新的页面
// const page = await context.newPage();

// // 导航到一个 URL
// await page.goto('https://example.com');

// 执行一些操作...
// ...

// 不要忘记断开连接
// await browser.disconnect();
// } catch (error) {
//     console.error('An error occurred:', error);
// }

// }) ();