// window.addEventListener("load", () => {
//   console.log("LinkedIn AI Extension is running");
//   const imageURL = chrome.runtime.getURL("icon.png");
//   const vectorURL = chrome.runtime.getURL("Vector.png");
//   const downloadVector = chrome.runtime.getURL("downloadv.png");
//   const ReVector = chrome.runtime.getURL("regeneratev.png");
//   // the modal structure
//   const modal = document.createElement("div");
//   modal.style.display = "none";
//   modal.style.position = "fixed";
//   modal.style.top = "0";
//   modal.style.left = "0";
//   modal.style.width = "100%";
//   modal.style.height = "100%";
//   modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
//   modal.style.justifyContent = "center";
//   modal.style.alignItems = "center";
//   modal.style.zIndex = "9999";
//   // modal.classList.add("hidden", "fixed", "top-0", "left-0", "w-full", "h-full", "bg-black", "bg-opacity-50", "flex", "justify-center", "items-center", "z-50");
//   // Modal content
//   const modalContent = document.createElement("div");
//   modalContent.style.backgroundColor = "#fff";
//   modalContent.style.padding = "20px";
//   modalContent.style.borderRadius = "12px";
//   modalContent.style.width = "870px";
//   modalContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
//   // modalContent.classList.add("bg-white", "p-6", "rounded-lg", "shadow-lg", "w-3/4", "max-w-3xl");
//   modalContent.innerHTML = `
//     <div>
// <!-- User Input Display -->
// <div id="user-input-display" 
//      style="display: none; background-color: #DFE1E7; padding: 8px 16px; border-radius: 12px; margin-bottom: 10px; font-size: 18px; color: #495057;  text-align: right; word-wrap: break-word; width: 472px; margin-left: 350px; max-width: 100%; ">
//   <span id="display-input-text" style="display: inline-block; text-align: right;"></span>
// </div>
//       <!-- Static Response Text -->
//       <div id="response-text" style="display: none; width: 531px; background-color: #DBEAFE;
// ; padding: 16px; border-radius: 12px; margin-bottom: 10px; font-size: 18px; color: #495057;">
//         Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.
//       </div>
//       <!-- Input Field -->
//       <input 
//         type="text" 
//         placeholder="Your prompt" 
//         class="inputField" 
//         style="width: 100%; height: 61px; padding: 8px; border-radius: 8px; margin-bottom: 10px; font-size: 24px; font-weight: 600; margin-top: 8px;" 
//       />
//       <!-- Button below input, aligned to the right -->
//       <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
//         <button 
//           id="generate-btn" 
//           class="generate-btn" 
//           style="display: flex; align-items: center; width: 190px; height: 53px; font-size: 24px; font-weight: 600; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;">
//           <img 
//             src="${vectorURL}" 
//             alt="Vector Icon" 
//             style="width: 24px; height: 24px; margin-right: 8px;" 
//           />
//           Generate
//         </button>
//       </div>
//     <div style="display: flex; justify-content: flex-end; margin-top: 8px; display: none;" id="action-buttons">
//     <!-- Insert Button -->
//     <button id="insert-btn" class="insert-btn" 
//         style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 190px; height: 53px; font-size: 24px; font-weight: 600; padding: 10px 20px; background-color:  #DFE1E7; color: black; border: none; border-radius: 8px; cursor: pointer; margin-right: 8px;">
//         <img 
//             src="${downloadVector}" 
//             alt="Vector Icon" 
//             style="width: 24px; height: 24px;" 
//         />
//         Insert
//     </button>
//     <!-- Regenerate Button -->
//     <button id="regenerate-btn" class="regenerate-btn" 
//         style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 190px; height: 53px; font-size: 24px; font-weight: 600; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;" disabled>
//         <img 
//             src="${ReVector}" 
//             alt="Vector Icon" 
//             style="width: 24px; height: 24px;" 
//         />
//         <span>Regenerate</span>
//     </button>
// </div>
//     </div>
//   `;
//   modal.appendChild(modalContent);
//   document.body.appendChild(modal);
//   // MutationObserver to find LinkedIn message input
//   const observer = new MutationObserver(() => {
//     const messageInput = document.querySelector(".msg-form__contenteditable");
//     if (messageInput) {
//       console.log("Message input field found.");
//       observer.disconnect(); 
//       // Create the icon element
//       const icon = document.createElement("img");
//       icon.src = imageURL;
//       icon.alt = "Extension Icon";
//       icon.style.width = "16px";
//       icon.style.height = "14px";
//       icon.style.position = "absolute";
//       icon.style.right = "10px";
//       icon.style.bottom = "5px";
//       icon.style.cursor = "pointer";
//       // Append the icon when the input is focused
//       messageInput.addEventListener("focus", () => {
//         if (!messageInput.contains(icon)) {
//           messageInput.parentElement?.appendChild(icon);
//         }
//       });
//       // Show the modal when the icon is clicked
//       icon.addEventListener("click", (event) => {
//         event.stopPropagation(); // Prevent the input from losing focus
//         modal.style.display = "flex"; // Make the modal visible
//       });
//       // Generate button behavior
//       const generateBtn = document.querySelector("#generate-btn");
//       const actionButtons = document.getElementById("action-buttons");
//       const responseText = document.getElementById("response-text");
//       const userInputDisplay = document.getElementById("user-input-display");
//       const displayInputText = document.getElementById("display-input-text");
//       if (generateBtn) {
//         generateBtn.addEventListener("click", () => {
//           const inputField = modal.querySelector(".inputField");
//           if (inputField instanceof HTMLInputElement) {
//             const inputValue = inputField.value.trim();
//             if (inputValue === "") {
//               alert("Please enter a prompt before generating.");
//               return; 
//             }
//             // Ensure the "Generate" button exists and is an HTMLElement
//             if (generateBtn instanceof HTMLElement) {
//               generateBtn.style.display = "none";
//             }
//             // Check if responseText exists and is an HTMLElement
//             if (responseText instanceof HTMLElement) {
//               responseText.style.display = "block";
//             }
//             // Check if actionButtons exists and is an HTMLElement
//             if (actionButtons instanceof HTMLElement) {
//               actionButtons.style.display = "flex";
//             }
//             if (userInputDisplay instanceof HTMLElement) {
//               userInputDisplay.style.display = "flex";
//             }
//             if (displayInputText !== null) {
//               displayInputText.textContent = inputValue;
//             }
//           } else {
//             console.error(
//               "Input field not found or is not an HTMLInputElement"
//             );
//           }
//         });
//       } else {
//         console.error("Generate button not found.");
//       }
//       const insertBtn = document.querySelector("#insert-btn");
//       if (insertBtn) {
//         insertBtn.addEventListener("click", () => {
//           const messageInput = document.querySelector(
//             ".msg-form__contenteditable"
//           );
//           const sendButton = document.querySelector(".msg-form__send-button");
//           if (messageInput instanceof HTMLElement) {
//             // Clear existing content
//             messageInput.innerHTML = ""; 
//             // Create a new paragraph element
//             const newMessage = document.createElement("p");
//             newMessage.textContent =
//               "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
//             // Append the new message to the input
//             messageInput.appendChild(newMessage);
//             // Set cursor position to the end of the input
//             const range = document.createRange();
//             const selection = window.getSelection();
//             if (selection) {
//               range.selectNodeContents(messageInput);
//               range.collapse(false); 
//               selection.removeAllRanges();
//               selection.addRange(range);
//             } else {
//               console.error("Selection is null. Cannot set cursor position.");
//             }
//             // Dispatch input event to ensure LinkedIn recognizes the input
//             const inputEvent = new InputEvent("input", {
//               bubbles: true,
//               cancelable: true,
//             });
//             messageInput.dispatchEvent(inputEvent);
//             // Focus on the message input
//             messageInput.focus();
//             // Adding a delay to check if the send button becomes enabled
//             setTimeout(() => {
//               console.log("Checking send button state...");
//               console.log(
//                 "Current message input content:",
//                 messageInput.innerHTML
//               ); 
//               // Check if send button is enabled
//               if (sendButton instanceof HTMLButtonElement) {
//                 console.log(
//                   `Send button disabled state: ${sendButton.disabled}`
//                 );
//                 if (!sendButton.disabled) {
//                   console.log(
//                     "Send button is enabled. User can click to send."
//                   );
//                 } else {
//                   console.error("Send button is still disabled.");
//                 }
//               } else {
//                 console.error("Send button not found.");
//               }
//             }, 300);
//           } else {
//             console.error("Message input field not found.");
//           }
//           // Hide modal after inserting the message
//           modal.style.display = "none";
//         });
//       }
//       // Close the modal when clicking outside the modal content
//       modal.addEventListener("click", (event) => {
//         if (event.target === modal) {
//           modal.style.display = "none"; 
//         }
//       });
//     } else {
//       console.log("Message input field not found, waiting...");
//     }
//   });
//   // Start observing for DOM changes
//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });
// });
window.addEventListener("load", function () {
    console.log("LinkedIn AI Extension is running");
    var imageURL = chrome.runtime.getURL("icon.png");
    var vectorURL = chrome.runtime.getURL("Vector.png");
    var downloadVector = chrome.runtime.getURL("downloadv.png");
    var ReVector = chrome.runtime.getURL("regeneratev.png");
    // Create the modal structure
    var modal = createModal();
    // Append modal to the body
    document.body.appendChild(modal);
    // MutationObserver to find LinkedIn message input
    var observer = new MutationObserver(function () {
        var messageInput = document.querySelector(".msg-form__contenteditable");
        if (messageInput) {
            console.log("Message input field found.");
            observer.disconnect(); // Stop observing
            // Create the icon element
            var icon_1 = createIcon(imageURL);
            messageInput.addEventListener("focus", function () {
                var _a;
                if (!messageInput.contains(icon_1)) {
                    (_a = messageInput.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(icon_1);
                }
            });
            // Show the modal when the icon is clicked
            icon_1.addEventListener("click", function (event) {
                event.stopPropagation(); // Prevent the input from losing focus
                modal.style.display = "flex"; // Make the modal visible
            });
            setupModalButtons(modal);
        }
        else {
            console.log("Message input field not found, waiting...");
        }
    });
    // Start observing for DOM changes
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
    function createModal() {
        var modal = document.createElement("div");
        modal.style.display = "none";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "9999";
        // Modal content
        var modalContent = document.createElement("div");
        modalContent.style.backgroundColor = "#fff";
        modalContent.style.padding = "20px";
        modalContent.style.borderRadius = "12px";
        modalContent.style.width = "870px";
        modalContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        modalContent.innerHTML = "\n      <div>\n        <div id=\"user-input-display\" style=\"display: none; background-color: #DFE1E7; padding: 8px 16px; border-radius: 12px; margin-bottom: 10px; font-size: 18px; color: #495057;  text-align: right; word-wrap: break-word; width: 472px; margin-left: 350px; max-width: 100%;\">\n          <span id=\"display-input-text\" style=\"display: inline-block; text-align: right;\"></span>\n        </div>\n        <div id=\"response-text\" style=\"display: none; width: 531px; background-color: #DBEAFE; padding: 16px; border-radius: 12px; margin-bottom: 10px; font-size: 18px; color: #495057;\">\n          Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.\n        </div>\n        <input type=\"text\" placeholder=\"Your prompt\" class=\"inputField\" style=\"width: 100%; height: 61px; padding: 8px; border-radius: 8px; margin-bottom: 10px; font-size: 24px; font-weight: 600; margin-top: 8px;\" />\n        <div style=\"display: flex; justify-content: flex-end; margin-top: 12px;\">\n          <button id=\"generate-btn\" class=\"generate-btn\" style=\"display: flex; align-items: center; width: 190px; height: 53px; font-size: 24px; font-weight: 600; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;\">\n            <img src=\"".concat(vectorURL, "\" alt=\"Vector Icon\" style=\"width: 24px; height: 24px; margin-right: 8px;\" />\n            Generate\n          </button>\n        </div>\n        <div style=\"display: flex; justify-content: flex-end; margin-top: 8px; display: none;\" id=\"action-buttons\">\n          <button id=\"insert-btn\" class=\"insert-btn\" style=\"display: flex; align-items: center; justify-content: center; gap: 8px; width: 190px; height: 53px; font-size: 24px; font-weight: 600; padding: 10px 20px; background-color: #DFE1E7; color: black; border: none; border-radius: 8px; cursor: pointer; margin-right: 8px;\">\n            <img src=\"").concat(downloadVector, "\" alt=\"Vector Icon\" style=\"width: 24px; height: 24px;\" />\n            Insert\n          </button>\n          <button id=\"regenerate-btn\" class=\"regenerate-btn\" style=\"display: flex; align-items: center; justify-content: center; gap: 8px; width: 190px; height: 53px; font-size: 24px; font-weight: 600; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;\" disabled>\n            <img src=\"").concat(ReVector, "\" alt=\"Vector Icon\" style=\"width: 24px; height: 24px;\" />\n            <span>Regenerate</span>\n          </button>\n        </div>\n      </div>\n    ");
        modal.appendChild(modalContent);
        return modal;
    }
    function createIcon(src) {
        var icon = document.createElement("img");
        icon.src = src;
        icon.alt = "Extension Icon";
        icon.style.width = "16px";
        icon.style.height = "14px";
        icon.style.position = "absolute";
        icon.style.right = "10px";
        icon.style.bottom = "5px";
        icon.style.cursor = "pointer";
        return icon;
    }
    function setupModalButtons(modal) {
        var generateBtn = document.querySelector("#generate-btn");
        var insertBtn = document.querySelector("#insert-btn");
        var responseText = document.getElementById("response-text");
        var actionButtons = document.getElementById("action-buttons");
        var userInputDisplay = document.getElementById("user-input-display");
        var displayInputText = document.getElementById("display-input-text");
        var inputField = modal.querySelector(".inputField");
        if (generateBtn) {
            generateBtn.addEventListener("click", function () {
                if (inputField) {
                    var inputValue = inputField.value.trim();
                    if (inputValue === "") {
                        alert("Please enter a prompt before generating.");
                        return;
                    }
                    generateBtn.style.display = "none";
                    if (responseText)
                        responseText.style.display = "block";
                    if (actionButtons)
                        actionButtons.style.display = "flex";
                    if (userInputDisplay) {
                        userInputDisplay.style.display = "flex";
                        if (displayInputText)
                            displayInputText.textContent = inputValue;
                    }
                }
            });
        }
        if (insertBtn) {
            insertBtn.addEventListener("click", function () {
                var messageInput = document.querySelector(".msg-form__contenteditable");
                var sendButton = document.querySelector(".msg-form__send-button");
                if (messageInput) {
                    // Clear existing content
                    messageInput.innerHTML = "";
                    // Create a new paragraph element
                    var newMessage = document.createElement("p");
                    newMessage.textContent = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
                    messageInput.appendChild(newMessage);
                    // Set cursor position to the end of the message
                    var range = document.createRange();
                    var selection = window.getSelection();
                    range.selectNodeContents(messageInput);
                    range.collapse(false);
                    selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
                    selection === null || selection === void 0 ? void 0 : selection.addRange(range);
                    if (messageInput) {
                        messageInput.focus(); // Now TypeScript knows messageInput is an HTMLElement
                    }
                    // messageInput.focus();
                    // Hide the modal after inserting the message
                    modal.style.display = "none";
                }
                else {
                    console.log("Message input field not found.");
                }
            });
        }
    }
});
