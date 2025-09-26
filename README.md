# 🛡️ Cyber Guardian - Domain Filter

[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/user/cyber-guardian)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/platform-Chrome%20Extension-yellow.svg)](https://developer.chrome.com/docs/extensions/)

> **Advanced Domain Filtering & Security Management Chrome Extension**

## 🚀 Overview

**Cyber Guardian** is a sophisticated Chrome extension that implements **enterprise-level domain filtering** by allowing access only to `.com` and `.org` domains by default, with a customizable whitelist for additional trusted domains. This project demonstrates practical applications of **Computer Networks**, **Web Security**, and **Browser Extension Development**.

### 🎯 Key Highlights
- **Manifest V3** compliant (latest Chrome extension standard)
- **declarativeNetRequest API** for high performance filtering
- **Chrome Storage Sync** with localStorage fallback
- **Responsive UI** with modern design patterns
- **Real-time domain management** with instant updates

## ✨ Features

### 🔒 **Security Features**
- ✅ **Domain-based filtering**: Blocks all domains except `.com` and `.org` by default
- ✅ **Whitelist management**: Add trusted domains (.edu, .gov, .io, etc.)
- ✅ **VPN/Proxy resistant**: Browser-level filtering independent of network settings
- ✅ **Real-time protection**: No page refresh needed for rule changes
- ✅ **Secure storage**: Uses Chrome's encrypted storage with fallback

### 🎨 **User Interface**
- ✅ **Cyber-themed blocked page** with Matrix-style animations
- ✅ **Modern settings panel** with gradient design and smooth animations
- ✅ **Quick-access popup** for instant domain management
- ✅ **Toast notifications** for user feedback
- ✅ **Responsive design** for all screen sizes

### ⚙️ **Technical Features**
- ✅ **Manifest V3** architecture for future compatibility
- ✅ **External JavaScript files** to comply with Content Security Policy
- ✅ **Async/await patterns** for modern JavaScript practices
- ✅ **Error handling** with graceful fallbacks
- ✅ **Console logging** for debugging and monitoring

## 📦 Installation

### Method 1: Developer Mode (Recommended)
1. **Download the extension**:
   ```bash
   git clone https://github.com/Eshwar187/cn-fla-core-project
   ```

2. **Open Chrome Extensions**:
   - Navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right)

3. **Load the extension**:
   - Click **"Load unpacked"**
   - Select the `chrome-site-filter` folder
   - Extension will activate immediately

### Method 2: Chrome Web Store
*Coming soon - pending store review*

## 🛠️ How It Works

### Architecture Overview
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Background    │    │  Content Filter  │    │   Blocked Page  │
│   Service       │────│  (declarative    │────│   (Custom UI)   │
│   Worker        │    │   NetRequest)    │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Options Page  │    │   Chrome Storage │    │   Extension     │
│   (Settings)    │────│   (Whitelist)    │────│   Popup         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Core Technologies
- **declarativeNetRequest API**: High-performance request filtering
- **Chrome Storage Sync**: Cross-device whitelist synchronization
- **Service Worker**: Background processing for Manifest V3
- **Web Accessible Resources**: Secure blocked page delivery

### Filtering Logic
1. **Request Interception**: All navigation requests are intercepted
2. **Domain Extraction**: Extract hostname from request URL
3. **Rule Matching**: Check against `.com/.org` + whitelist rules
4. **Action Decision**: Allow request or redirect to blocked page
5. **Real-time Updates**: Rules update without extension reload

## 🎮 Usage

### Basic Operations

#### Adding Trusted Domains
1. **Via Options Page**:
   - Click extension icon → "⚙️ Open Full Settings"
   - Enter domain (e.g., `github.io`)
   - Click "ADD DOMAIN" or press Enter

2. **Via Quick Popup**:
   - Click extension icon → "➕ Quick Add Domain"
   - Enter domain in prompt
   - Confirms addition with toast notification

#### Removing Domains
- Go to Options page
- Click "🗑️ Remove" next to any whitelisted domain
- Confirm removal in dialog

### Advanced Features

#### Debug Mode
Add `?debug=1` to options page URL for detailed logging:
```
chrome-extension://[extension-id]/options.html?debug=1
```

#### Storage Fallback
- Primary: Chrome Storage Sync (cross-device)
- Fallback: localStorage (local device only)
- Automatic switching based on API availability

## 📁 Project Structure

```
chrome-site-filter/
├── 📄 manifest.json         # Extension configuration
├── 🔧 background.js         # Service worker (filtering logic)
├── 🚫 blocked.html          # Custom blocked page UI
├── 🚫 blocked.js           # Blocked page functionality
├── ⚙️ options.html          # Settings page UI
├── ⚙️ options.js           # Settings page functionality
├── 🔧 popup.html           # Extension popup UI
└── 📖 README.md            # Project documentation
```

### Key Files Explained

- **`manifest.json`**: Extension metadata, permissions, and resource declarations
- **`background.js`**: Core filtering logic using declarativeNetRequest
- **`blocked.html/js`**: Cyber-themed block page with animations
- **`options.html/js`**: Full-featured settings interface
- **`popup.html`**: Quick access interface for common actions

## 🔧 Development

### Prerequisites
- Google Chrome (latest version)
- Text editor/IDE (VS Code recommended)
- Basic knowledge of JavaScript, HTML, CSS

### Development Setup
1. **Clone repository**:
   ```bash
   git clone https://github.com/user/cyber-guardian.git
   cd cyber-guardian/chrome-site-filter
   ```

2. **Load in Chrome**:
   - Open `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select project folder

3. **Development workflow**:
   - Make changes to files
   - Click refresh button on extension card
   - Test changes immediately

### Debugging
- **Console Logs**: Check browser console for detailed logs
- **Storage Inspection**: Use Chrome DevTools → Application → Storage
- **Network Tab**: Monitor request filtering in DevTools
- **Debug Mode**: Add `?debug=1` to options URL

## 🌐 Networking Concepts Demonstrated

### 1. **Domain Name System (DNS)**
- URL parsing and hostname extraction
- Top-level domain (TLD) filtering
- Subdomain handling and validation

### 2. **HTTP/HTTPS Request Interception**
- Browser request lifecycle understanding
- Request filtering at browser level
- Redirect mechanisms

### 3. **Content Security Policy (CSP)**
- Inline script restrictions in extensions
- External resource loading
- Secure JavaScript execution

### 4. **Web Security Principles**
- Client-side filtering limitations
- Browser extension security model
- Data persistence and synchronization

## 🎓 Educational Value

This project serves as an excellent learning resource for:

### **Computer Networks (CN)**
- **URL Structure**: Understanding protocol, domain, subdomain, path
- **Request/Response Cycle**: Browser-server communication
- **Domain Filtering**: Network-level vs. browser-level filtering
- **Security Policies**: Implementation of access controls

### **Web Development**
- **Chrome Extension APIs**: Manifest V3, Storage, declarativeNetRequest
- **Modern JavaScript**: Async/await, Promises, ES6+ features
- **Responsive Design**: CSS Grid, Flexbox, animations
- **User Experience**: Toast notifications, loading states, error handling

### **Software Engineering**
- **Modular Architecture**: Separation of concerns
- **Error Handling**: Graceful degradation and fallbacks
- **Code Organization**: External files, clean structure
- **Version Control**: Git workflow and documentation

## 🚨 Limitations & Considerations

### Security Limitations
- **Client-side only**: Can be bypassed by disabling extension
- **No server-side enforcement**: Relies on browser cooperation
- **Local admin access**: Users with admin rights can disable

### Technical Limitations
- **Chrome only**: Not compatible with other browsers
- **Extension permissions**: Requires broad site access
- **Storage limits**: Chrome storage has size restrictions

### Educational Context
This extension is designed for **educational and demonstration purposes**. For production security systems, consider:
- Server-side filtering solutions
- Network-level firewalls and proxies
- Enterprise mobile device management (MDM)
- DNS-based filtering services

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Chrome Extension Documentation** for comprehensive API guidance
- **Modern CSS techniques** for responsive design inspiration
- **Computer Networks coursework** for networking concepts
- **Open source community** for best practices and patterns

## 📞 Support

- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Create an enhancement issue
- 🤔 **Questions**: Check existing issues or create new one
- 📧 **Contact**: [your-email@example.com]

---

**Made with ❤️ for Computer Networks learning and web security education**
