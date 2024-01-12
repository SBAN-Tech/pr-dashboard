let ua = navigator.userAgent;

let browser: string;
let version: number;
if (/Chrome\/(\S+)/.test(ua)) {
    browser = 'Chromium';
    version = parseFloat(RegExp.$1);
} else if (ua.includes("Safari") && /Version\/(\S+)/.test(ua)) {
    browser = 'Safari';
    version = parseFloat(RegExp.$1);
} else if (/Firefox\/(\S+)/.test(ua)) {
    browser = 'Firefox';
    version = parseFloat(RegExp.$1);
} else {
    browser = "Other";
    version = 0;
}

let browser_ok: boolean;

if ((browser == "Chromium" && version < 108.0) ||
    (browser == "Safari" && version < 15.4) ||
    (browser == "Firefox" && version < 101.0) ||
    (browser == "Other")) {
    browser_ok = false;
} else {
    browser_ok = true;
}



export default browser_ok;
