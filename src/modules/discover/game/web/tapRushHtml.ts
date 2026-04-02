export const tapRushHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <title>Tap Rush</title>
    <style>
      * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }

      html,
      body {
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: linear-gradient(180deg, #f0fff5 0%, #d8f5e7 100%);
        color: #102315;
      }

      body {
        display: flex;
        align-items: stretch;
        justify-content: center;
      }

      .game-shell {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .hud {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 16px;
        z-index: 2;
      }

      .pill {
        min-width: 92px;
        padding: 10px 14px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.84);
        box-shadow: 0 8px 20px rgba(16, 35, 21, 0.08);
      }

      .pill-label {
        display: block;
        font-size: 11px;
        color: #4d6752;
      }

      .pill-value {
        display: block;
        margin-top: 4px;
        font-size: 22px;
        font-weight: 700;
      }

      .arena {
        position: absolute;
        inset: 0;
      }

      .hint {
        position: absolute;
        left: 24px;
        right: 24px;
        bottom: 28px;
        z-index: 2;
        padding: 14px 16px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.78);
        box-shadow: 0 12px 30px rgba(16, 35, 21, 0.12);
        font-size: 14px;
        line-height: 1.5;
        color: #35533b;
      }

      .target {
        position: absolute;
        width: 88px;
        height: 88px;
        border: none;
        border-radius: 28px;
        background: radial-gradient(circle at 30% 30%, #9cffc0 0%, #07c160 68%, #039245 100%);
        box-shadow: 0 16px 26px rgba(7, 193, 96, 0.28);
        color: #ffffff;
        font-size: 26px;
        font-weight: 700;
      }

      .target:active {
        transform: scale(0.96);
      }

      .overlay {
        position: absolute;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(13, 28, 17, 0.3);
        z-index: 3;
      }

      .overlay.visible {
        display: flex;
      }

      .dialog {
        width: min(320px, calc(100% - 40px));
        padding: 24px 20px;
        border-radius: 24px;
        background: #ffffff;
        text-align: center;
        box-shadow: 0 18px 40px rgba(16, 35, 21, 0.2);
      }

      .dialog h1 {
        margin: 0;
        font-size: 28px;
      }

      .dialog p {
        margin: 12px 0 0;
        color: #48624d;
        line-height: 1.5;
      }

      .dialog button {
        margin-top: 18px;
        width: 100%;
        border: none;
        border-radius: 14px;
        padding: 14px 16px;
        background: #07c160;
        color: #ffffff;
        font-size: 16px;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <div class="game-shell">
      <div class="hud">
        <div class="pill">
          <span class="pill-label">Score</span>
          <span class="pill-value" id="score">0</span>
        </div>
        <div class="pill">
          <span class="pill-label">Time</span>
          <span class="pill-value" id="time">15</span>
        </div>
      </div>
      <div class="arena" id="arena">
        <button class="target" id="target" aria-label="Tap target">GO</button>
      </div>
      <div class="hint">15 秒内尽量多点绿色方块。每次命中都会随机换位并回传分数给 RN。</div>
      <div class="overlay" id="overlay">
        <div class="dialog">
          <h1 id="result-title">Game Over</h1>
          <p id="result-copy">Your score: 0</p>
          <button id="restart-button">再来一局</button>
        </div>
      </div>
    </div>

    <script>
      (function () {
        var arena = document.getElementById("arena");
        var target = document.getElementById("target");
        var scoreNode = document.getElementById("score");
        var timeNode = document.getElementById("time");
        var overlay = document.getElementById("overlay");
        var resultCopy = document.getElementById("result-copy");
        var restartButton = document.getElementById("restart-button");
        var duration = 15;
        var score = 0;
        var timeLeft = duration;
        var tickTimer = null;
        var active = false;

        function emit(type, payload) {
          var message = JSON.stringify({ type: type, payload: payload || {} });
          if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            window.ReactNativeWebView.postMessage(message);
          }
        }

        function updateHud() {
          scoreNode.textContent = String(score);
          timeNode.textContent = String(timeLeft);
        }

        function moveTarget() {
          var arenaRect = arena.getBoundingClientRect();
          var maxX = Math.max(0, arenaRect.width - 112);
          var maxY = Math.max(0, arenaRect.height - 220);
          var left = 12 + Math.random() * maxX;
          var top = 90 + Math.random() * maxY;
          target.style.left = left + "px";
          target.style.top = top + "px";
        }

        function endGame() {
          active = false;
          if (tickTimer) {
            clearInterval(tickTimer);
            tickTimer = null;
          }
          overlay.classList.add("visible");
          resultCopy.textContent = "Your score: " + score;
          emit("gameOver", { score: score });
        }

        function startGame() {
          score = 0;
          timeLeft = duration;
          active = true;
          overlay.classList.remove("visible");
          updateHud();
          moveTarget();

          if (tickTimer) {
            clearInterval(tickTimer);
          }

          tickTimer = setInterval(function () {
            timeLeft -= 1;
            updateHud();
            if (timeLeft <= 0) {
              endGame();
            }
          }, 1000);

          emit("ready", { gameId: "tap-rush" });
        }

        target.addEventListener("click", function () {
          if (!active) {
            return;
          }
          score += 1;
          updateHud();
          moveTarget();
          emit("score", { score: score });
        });

        restartButton.addEventListener("click", function () {
          startGame();
        });

        window.__tapRush = {
          restart: startGame,
          pause: function () {
            active = false;
          },
          resume: function () {
            if (timeLeft > 0) {
              active = true;
            }
          }
        };

        window.addEventListener("message", function (event) {
          try {
            var data = JSON.parse(event.data || "{}");
            if (data.type === "restart") {
              startGame();
            } else if (data.type === "pause") {
              window.__tapRush.pause();
            } else if (data.type === "resume") {
              window.__tapRush.resume();
            }
          } catch (error) {}
        });

        updateHud();
        startGame();
      })();
    </script>
  </body>
</html>`;
