// background.js

// 监听页面加载完成事件
chrome.webNavigation.onCompleted.addListener(async (details) => {
  // try {
  //   // 发起HTTP请求
  //   const response = await fetch('https://s1.ljcdn.com/dig-log/static/v3/lianjiaUlog.js');
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }

  //   const data = await response;

  //   // 将数据发送到页面上下文
  //   chrome.tabs.sendMessage(details.tabId, { type: 'dataLoaded', data });

  console.log("success");

  // } catch (error) {
  //   console.error('Error fetching data:', error);
  // }
}, { url: [{ schemes: ['https'] }] });