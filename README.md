Regex URL Filter – Chrome Extension  

Overview  
Regex URL Filter is a lightweight Chrome extension that **allows access only to `.com` and `.org` domains**. All other websites are blocked and redirected to a custom "Blocked Page".  

This project demonstrates the practical application of **Formal Languages & Automata Theory (Regex + DFA/NFA concepts)** in real-world **network security**.  

Features  
✅ Blocks all domains except `.com` and `.org`  
✅ Uses a **regex pattern** for strict URL filtering  
✅ Displays a **custom block page** for restricted websites  
✅ Works even if VPN or proxy is enabled (domain filtering is browser-level)  
✅ Simple popup showing allowed domains  
✅ Lightweight, no external dependencies

Installation (Developer Mode)  
1. Download or clone this repository.  
2. Open **Google Chrome** and go to:  
3. Enable **Developer Mode** (toggle in the top-right).  
4. Click **Load unpacked** and select the extension folder.  
5. The extension will now start filtering domains.  

How It Works  
The extension listens to all web requests using the `chrome.webRequest` API.  
It applies this regex:  
regex
https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+\.(com|org)(\/.*)?$
