(function () {
  var ABA_VERSION = '8.0';
  var STORAGE_KEY = 'abaPanelState';
  var existingPanel = document.getElementById('aba-floating-panel');
  var existingBtn = document.getElementById('aba-toggle-btn');
  var existingTB = document.getElementById('aba-toolbar-btn');
  var existingDD = document.getElementById('aba-dropdown');

  if (existingPanel && existingPanel.dataset.version === ABA_VERSION) return;

  if (existingPanel) existingPanel.remove();
  if (existingBtn) existingBtn.remove();
  if (existingTB) existingTB.remove();
  if (existingDD) existingDD.remove();
  document.querySelectorAll('.aba-toast').forEach(function(el) { el.remove(); });

  var PROPS = {
    format: {
      label: 'Format',
      options: [
        { value: '# 1,000', clipboard: '{"minimumSignificantDigits":4,"decimalPlaces":-1,"decimalSeparator":"FULL_STOP","groupingSeparator":"COMMA","negativeNumberNotation":"MINUS_SIGN","unitsType":"NONE","unitsDisplayType":"NONE","currencyCode":null,"customUnits":null,"zeroFormat":"ZERO","comparisonIncrease":"GOOD","dataType":"NUMBER"}' },
        { value: '$ 1,000', clipboard: '{"minimumSignificantDigits":4,"decimalPlaces":-1,"decimalSeparator":"FULL_STOP","groupingSeparator":"COMMA","negativeNumberNotation":"MINUS_SIGN","unitsType":"CURRENCY","unitsDisplayType":"CURRENCY_SYMBOL","currencyCode":"USD","customUnits":null,"zeroFormat":"ZERO","comparisonIncrease":"GOOD","dataType":"NUMBER"}' },
        { value: '95%', clipboard: '{"minimumSignificantDigits":4,"decimalPlaces":-1,"decimalSeparator":"FULL_STOP","groupingSeparator":"COMMA","negativeNumberNotation":"MINUS_SIGN","unitsType":"PERCENTAGE","unitsDisplayType":"PERCENTAGE_SUFFIX","currencyCode":null,"customUnits":null,"zeroFormat":"ZERO","comparisonIncrease":"GOOD","dataType":"NUMBER"}' },
        { value: 'Text', clipboard: '{"dataType":"TEXT"}' },
        { value: 'Boolean', clipboard: '{"dataType":"BOOLEAN"}' },
        { value: 'Date', clipboard: '{"dataType":"DATE"}' },
        { value: 'Time Period', clipboard: '{"dataType":"TIME_ENTITY"}' },
        { value: 'No Data', clipboard: '{"dataType":"NONE"}' }
      ]
    },
    summary: {
      label: 'Summary',
      options: [
        { value: 'Sum', clipboard: '{"summaryMethod":"SUM","timeSummaryMethod":"SUM","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'None', clipboard: '{"summaryMethod":"NONE","timeSummaryMethod":"NONE","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'Average', clipboard: '{"summaryMethod":"AVERAGE","timeSummaryMethod":"AVERAGE","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'Avg (Non-wt)', clipboard: '{"summaryMethod":"AVERAGE_NON_WEIGHTED","timeSummaryMethod":"AVERAGE_NON_WEIGHTED","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'Min', clipboard: '{"summaryMethod":"MIN","timeSummaryMethod":"MIN","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'Max', clipboard: '{"summaryMethod":"MAX","timeSummaryMethod":"MAX","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'Opening Period', clipboard: '{"summaryMethod":"OPENING_PERIOD","timeSummaryMethod":"OPENING_PERIOD","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'Closing Period', clipboard: '{"summaryMethod":"CLOSING_PERIOD","timeSummaryMethod":"CLOSING_PERIOD","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'Formula', clipboard: '{"summaryMethod":"FORMULA","timeSummaryMethod":"FORMULA","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'Any', clipboard: '{"summaryMethod":"ANY","timeSummaryMethod":"ANY","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'All', clipboard: '{"summaryMethod":"ALL","timeSummaryMethod":"ALL","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'First Non-blank', clipboard: '{"summaryMethod":"FIRST_NON_BLANK","timeSummaryMethod":"FIRST_NON_BLANK","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'Last Non-blank', clipboard: '{"summaryMethod":"LAST_NON_BLANK","timeSummaryMethod":"LAST_NON_BLANK","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'Ratio', clipboard: '{"summaryMethod":"RATIO","timeSummaryMethod":"RATIO","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' },
        { value: 'Text List', clipboard: '{"summaryMethod":"TEXT_LIST","timeSummaryMethod":"TEXT_LIST","timeSummarySameAsMainSummary":true,"ratioNumeratorIdentifier":"","ratioDenominatorIdentifier":""}' }
      ]
    }
  };

  var panel, toastEl, isDragging = false, dragOffsetX = 0, dragOffsetY = 0;
  var saveTimer = null;

  function saveState() {
    if (!panel) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function() {
      var rect = panel.getBoundingClientRect();
      var state = {
        left: parseInt(panel.style.left) || rect.left,
        top: parseInt(panel.style.top) || rect.top,
        width: rect.width,
        height: rect.height,
        visible: panel.style.display !== 'none'
      };
      chrome.storage.local.set({ [STORAGE_KEY]: state });
    }, 200);
  }

  function applyState(state) {
    if (!state || !panel) return;

    if (typeof state.left === 'number' && typeof state.top === 'number') {
      var x = Math.max(0, Math.min(window.innerWidth - 50, state.left));
      var y = Math.max(0, Math.min(window.innerHeight - 30, state.top));
      panel.style.left = x + 'px';
      panel.style.top = y + 'px';
      panel.style.right = 'auto';
    }

    if (typeof state.width === 'number') {
      panel.style.width = Math.max(180, Math.min(700, state.width)) + 'px';
    }
    if (typeof state.height === 'number') {
      panel.style.height = state.height + 'px';
    }

    if (state.visible === false) {
      panel.style.display = 'none';
      showToggleBtn();
    }
  }

  function copyToClipboard(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    if (!ok) return navigator.clipboard.writeText(text);
    return Promise.resolve();
  }

  function createPanel() {
    panel = document.createElement('div');
    panel.id = 'aba-floating-panel';
    panel.dataset.version = ABA_VERSION;

    var sectionsHTML = '';
    var isFirst = true;
    Object.keys(PROPS).forEach(function(key) {
      var section = PROPS[key];
      var optsHTML = '';
      section.options.forEach(function(opt, idx) {
        var btnId = 'aba-btn-' + key + '-' + idx;
        optsHTML += '<button class="aba-opt-btn" id="' + btnId + '">' +
          '<span class="aba-opt-name">' + opt.value + '</span></button>';
      });

      var labelRow = '<div class="aba-section-label-row">' +
        '<span class="aba-section-label">' + section.label + '</span>' +
        (isFirst ? '<button class="aba-close-x" id="aba-close-btn" title="Close">&times;</button>' : '') +
      '</div>';
      isFirst = false;

      sectionsHTML += '<div class="aba-section">' +
        labelRow +
        '<div class="aba-section-body">' + optsHTML + '</div>' +
      '</div>';
    });

    panel.innerHTML = '<div class="aba-panel-body">' + sectionsHTML + '</div>';
    document.body.appendChild(panel);

    Object.keys(PROPS).forEach(function(key) {
      PROPS[key].options.forEach(function(opt, idx) {
        var btn = document.getElementById('aba-btn-' + key + '-' + idx);
        if (btn) {
          btn.addEventListener('click', function() {
            copyToClipboard(opt.clipboard).then(function() {
              showToast('Copied "' + opt.value + '"');
            });
          });
        }
      });
    });

    document.getElementById('aba-close-btn').addEventListener('click', function() {
      panel.style.display = 'none';
      saveState();
      showToggleBtn();
    });

    panel.querySelectorAll('.aba-section-label-row').forEach(function(row) {
      row.addEventListener('mousedown', startDrag);
    });

    var resizeObserver = new ResizeObserver(function() {
      if (!isDragging) saveState();
    });
    resizeObserver.observe(panel);
  }

  function startDrag(e) {
    if (e.target.closest('.aba-close-x')) return;
    isDragging = true;
    var rect = panel.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    e.preventDefault();
  }

  function onDrag(e) {
    if (!isDragging) return;
    var x = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - dragOffsetX));
    var y = Math.max(0, Math.min(window.innerHeight - 40, e.clientY - dragOffsetY));
    panel.style.left = x + 'px';
    panel.style.top = y + 'px';
    panel.style.right = 'auto';
  }

  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    saveState();
  }

  function showToggleBtn() {
    var btn = document.getElementById('aba-toggle-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'aba-toggle-btn';
      btn.textContent = 'fx';
      btn.title = 'Open Anaplan Quick Paste';
      btn.addEventListener('click', function() {
        btn.style.display = 'none';
        panel.style.display = 'flex';
        saveState();
      });
      document.body.appendChild(btn);
    }
    btn.style.display = 'flex';
  }

  function showToast(msg) {
    if (toastEl) toastEl.remove();
    toastEl = document.createElement('div');
    toastEl.className = 'aba-toast';
    toastEl.textContent = msg;
    document.body.appendChild(toastEl);
    requestAnimationFrame(function() { toastEl.classList.add('aba-show'); });
    setTimeout(function() {
      toastEl.classList.remove('aba-show');
      setTimeout(function() { toastEl.remove(); }, 250);
    }, 1500);
  }

  createPanel();

  chrome.storage.local.get([STORAGE_KEY], function(data) {
    applyState(data[STORAGE_KEY]);
  });

  chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.action === 'togglePanel') {
      if (panel.style.display === 'none') {
        panel.style.display = 'flex';
        var toggleBtn = document.getElementById('aba-toggle-btn');
        if (toggleBtn) toggleBtn.style.display = 'none';
      } else {
        panel.style.display = 'none';
        showToggleBtn();
      }
      saveState();
    }
  });
})();
