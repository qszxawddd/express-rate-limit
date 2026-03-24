// === Shopee 等候頁面互動功能 ===

(function () {
    // 倒數計時總秒數（對應 rate limit 的 5 分鐘）
    var TOTAL_SECONDS = 5 * 60;
    var remainingSeconds = TOTAL_SECONDS;

    // DOM 元素
    var timerEl = document.getElementById('timer');
    var progressFill = document.getElementById('progressFill');
    var progressText = document.getElementById('progressText');
    var comfortMessage = document.getElementById('comfortMessage');
    var retryBtn = document.getElementById('retryBtn');
    var mascot = document.getElementById('mascot');

    // 安撫語句列表
    var comfortMessages = [
        '別擔心，我們正在全力恢復中！',
        '工程師正在努力修復，請稍候～',
        '趁現在去倒杯水，馬上就好！',
        '伺服器正在加班處理訂單中...',
        '感謝你的耐心等待，蝦皮愛你！',
        '好東西值得等待，優惠不會消失的！',
        '深呼吸～購物車裡的寶貝還在喔！',
        '系統正在排隊處理中，就快輪到你了！'
    ];

    var currentMessageIndex = 0;

    // 格式化時間為 MM:SS
    function formatTime(seconds) {
        var m = Math.floor(seconds / 60);
        var s = seconds % 60;
        return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }

    // 更新進度條
    function updateProgress() {
        var elapsed = TOTAL_SECONDS - remainingSeconds;
        var percent = Math.floor((elapsed / TOTAL_SECONDS) * 100);
        progressFill.style.width = percent + '%';
        progressText.textContent = percent + '%';
    }

    // 倒數計時
    function countdown() {
        if (remainingSeconds <= 0) {
            timerEl.textContent = '00:00';
            progressFill.style.width = '100%';
            progressText.textContent = '100%';
            comfortMessage.textContent = '時間到！正在重新載入頁面...';
            retryBtn.disabled = true;
            retryBtn.textContent = '重新載入中...';
            setTimeout(function () {
                window.location.reload();
            }, 1500);
            return;
        }

        remainingSeconds--;
        timerEl.textContent = formatTime(remainingSeconds);
        updateProgress();
    }

    // 輪播安撫語句
    function rotateComfortMessage() {
        comfortMessage.style.opacity = '0';
        setTimeout(function () {
            currentMessageIndex = (currentMessageIndex + 1) % comfortMessages.length;
            comfortMessage.textContent = comfortMessages[currentMessageIndex];
            comfortMessage.style.opacity = '1';
        }, 400);
    }

    // 重試按鈕點擊
    retryBtn.addEventListener('click', function () {
        retryBtn.disabled = true;
        retryBtn.textContent = '重新載入中...';
        setTimeout(function () {
            window.location.reload();
        }, 500);
    });

    // 點擊吉祥物互動
    mascot.addEventListener('click', function () {
        mascot.style.animation = 'none';
        // 觸發 reflow 重啟動畫
        void mascot.offsetHeight;
        mascot.style.animation = 'bounce 0.5s ease';
        setTimeout(function () {
            mascot.style.animation = 'float 3s ease-in-out infinite';
        }, 500);
    });

    // 啟動計時器：每秒倒數
    setInterval(countdown, 1000);

    // 啟動安撫語句輪播：每 5 秒切換
    setInterval(rotateComfortMessage, 5000);

    // 初始化顯示
    timerEl.textContent = formatTime(remainingSeconds);
    updateProgress();
})();
