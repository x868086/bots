# bots



```JS
// 等待
await page.waitForSelector('cssSelector'，{visible:true}) //等待元素出现
page.$

await page.waitFor(1000 * Math.random());


// 处理多个元素
page.$$eval()

// 执行javascript方法 处理日期框
await.page.evaluate(()=>{
	document.querySelector('#hd_check').value='2020-01-01'
})



//弹出对话框
dialog.accept() //点击确定
dialog.defaultValue() /获取弹出框的内容
dialog.dissmiss() //点击取消
dialog.message() //获取显示文本值
dialog.type() //返回弹出框的类型





//验证码
https://www.bilibili.com/video/BV14Z421z7M4/?spm_id_from=333.337.search-card.all.click&vd_source=32fa1c202efe5bb6942b35f0c043a7e9
https://www.bilibili.com/video/BV15841127K6/?spm_id_from=333.337.search-card.all.click&vd_source=32fa1c202efe5bb6942b35f0c043a7e9



// 识别验证码API
https://www.jianshu.com/p/97efb8d988b5
https://api.dazheng.site/ocr.html

```



#### 启动时的窗口大小设置
browser = await launch({'headless': False,'dumpio':True, 'autoClose':False,'args': ['--no-sandbox', '--window-size=1366,850']})
await page.setViewport({'width':1366,'height':768})

#### 反反爬虫策略
2.禁用 JavaScript：有些网站会使用 JavaScript 检测爬虫。你可以禁用 JavaScript 来避免这种检测。
await page.setJavaScriptEnabled(false);
3.使用代理：使用代理 IP 可以避免因为请求频率过高而被封 IP。
const browser = await puppeteer.launch({
  args: ['--proxy-server=http://your-proxy']
});
4.模拟正常用户行为：例如，你可以在访问页面之间设置随机延迟，模拟鼠标点击和滚动等。
await page.waitFor(1000 * Math.random()); // 随机延迟
await page.click('#some-id'); // 模拟点击
await page.evaluate(_ => {
  window.scrollBy(0, window.innerHeight); // 模拟滚动
});
5.使用 headless 模式：在某些情况下，使用 headless 模式可能会被检测出来。你可以尝试关闭 headless 模式。
const browser = await puppeteer.launch({ headless: false });
6.使用 stealth 插件：puppeteer-extra-plugin-stealth 是一个 Puppeteer 插件，它对一些常见的爬虫检测进行了处理。
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const browser = await puppeteer.launch({ headless: true });