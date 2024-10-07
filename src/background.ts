chrome.runtime.onInstalled.addListener(() => {
    console.log('LinkedIn AI Extension Installed');
  });
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'show_icon') {
      // This log confirms that the message has been received
      console.log('Show icon message received in background script');
      sendResponse({ status: 'Icon message received' }); 
    }
  });