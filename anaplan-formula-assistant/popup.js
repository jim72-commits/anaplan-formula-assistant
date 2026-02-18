document.addEventListener('DOMContentLoaded', () => {

  // ── DOM refs ──
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const categorySelect = document.getElementById('category-select');
  const functionSelect = document.getElementById('function-select');
  const funcDescription = document.getElementById('func-description');
  const funcSyntax = document.getElementById('func-syntax');
  const functionInfo = document.getElementById('function-info');
  const paramsContainer = document.getElementById('params-container');
  const paramsFields = document.getElementById('params-fields');
  const outputSection = document.getElementById('output-section');
  const formulaOutput = document.getElementById('formula-output');
  const copyBtn = document.getElementById('copy-btn');
  const saveBtn = document.getElementById('save-btn');
  const historyList = document.getElementById('history-list');
  const clearHistoryBtn = document.getElementById('clear-history-btn');

  const checkUpdatesBtn = document.getElementById('check-updates-btn');
  const updateStatus = document.getElementById('update-status');
  const lastCheckEl = document.getElementById('last-check');
  const funcCountEl = document.getElementById('func-count');

  const builderSearch = document.getElementById('builder-search');

  let activeFormulas = ANAPLAN_FORMULAS;
  let currentFormula = null;
  let toast = null;

  function extractSyntaxParams(syntax) {
    const openIdx = syntax.indexOf('(');
    if (openIdx === -1) return null;
    const closeIdx = syntax.lastIndexOf(')');
    if (closeIdx === -1 || closeIdx <= openIdx) return null;

    let inner = syntax.substring(openIdx + 1, closeIdx).trim();
    if (!inner) return [];

    inner = inner.replace(/\[\s*,\s*/g, ', §');
    inner = inner.replace(/\[/g, '§');
    inner = inner.replace(/\]/g, '');

    const parts = inner.split(',').map(s => s.trim()).filter(s => s);
    return parts.map(p => {
      const optional = p.charAt(0) === '§';
      const desc = optional ? p.substring(1).trim() : p;
      return { desc, optional };
    });
  }

  // ── Merge discovered functions into the static database ──
  function mergeDiscoveredFunctions(discovered) {
    if (!discovered || discovered.length === 0) return ANAPLAN_FORMULAS;

    const merged = JSON.parse(JSON.stringify(ANAPLAN_FORMULAS));
    const existingNames = new Set();
    for (const funcs of Object.values(merged)) {
      funcs.forEach(f => existingNames.add(f.name.toUpperCase()));
    }

    let newCount = 0;
    discovered.forEach(d => {
      const upperName = d.name.toUpperCase();
      if (!existingNames.has(upperName)) {
        const cat = d.category || 'Miscellaneous';
        if (!merged[cat]) merged[cat] = [];
        merged[cat].push({
          name: d.name,
          description: d.description,
          syntax: d.name + '(...)',
          params: [],
          example: ''
        });
        existingNames.add(upperName);
        newCount++;
      }
    });

    return merged;
  }

  function countFunctions(db) {
    return Object.values(db).reduce((sum, arr) => sum + arr.length, 0);
  }

  function refreshUI() {
    categorySelect.innerHTML = '<option value="">-- Select Category --</option>';
    Object.keys(activeFormulas).forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });

    functionSelect.innerHTML = '<option value="">-- Select Function --</option>';
    functionSelect.disabled = true;
    functionInfo.classList.add('hidden');
    paramsContainer.classList.add('hidden');
    outputSection.classList.add('hidden');
    currentFormula = null;

    funcCountEl.textContent = countFunctions(activeFormulas) + ' functions';
  }

  // ── Load stored discovered functions, then initialize ──
  chrome.storage.local.get(['discoveredFunctions', 'lastUpdateCheck'], (data) => {
    if (data.discoveredFunctions && data.discoveredFunctions.length > 0) {
      activeFormulas = mergeDiscoveredFunctions(data.discoveredFunctions);
    }
    if (data.lastUpdateCheck) {
      const d = new Date(data.lastUpdateCheck);
      lastCheckEl.textContent = 'Last checked: ' + d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    }
    refreshUI();
  });

  // ── Check for Updates ──
  checkUpdatesBtn.addEventListener('click', () => {
    checkUpdatesBtn.disabled = true;
    checkUpdatesBtn.classList.add('checking');
    checkUpdatesBtn.textContent = 'Checking...';
    updateStatus.classList.add('hidden');
    updateStatus.className = 'hidden';

    chrome.runtime.sendMessage({ action: 'checkForUpdates' }, (response) => {
      checkUpdatesBtn.disabled = false;
      checkUpdatesBtn.classList.remove('checking');
      checkUpdatesBtn.textContent = 'Check for Updates';

      if (chrome.runtime.lastError) {
        showUpdateStatus('error', 'Could not connect to the background service. Try reloading the extension.');
        return;
      }

      if (!response) {
        showUpdateStatus('error', 'No response received. Try again.');
        return;
      }

      if (response.success) {
        if (response.newCount > 0) {
          chrome.storage.local.get(['discoveredFunctions'], (data) => {
            if (data.discoveredFunctions) {
              activeFormulas = mergeDiscoveredFunctions(data.discoveredFunctions);
              refreshUI();
            }
          });
          showUpdateStatus('success', response.message);
        } else {
          showUpdateStatus('info', response.message);
        }
        if (response.timestamp) {
          const d = new Date(response.timestamp);
          lastCheckEl.textContent = 'Last checked: ' + d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        }
      } else {
        showUpdateStatus('error', response.error);
      }
    });
  });

  function showUpdateStatus(type, message) {
    updateStatus.className = `status-${type}`;
    updateStatus.textContent = message;
    updateStatus.classList.remove('hidden');
  }

  // ── Tabs ──
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // ── Builder search ──
  builderSearch.addEventListener('input', () => {
    const query = builderSearch.value.trim().toLowerCase();

    functionInfo.classList.add('hidden');
    paramsContainer.classList.add('hidden');
    outputSection.classList.add('hidden');
    currentFormula = null;

    if (!query) {
      categorySelect.value = '';
      functionSelect.innerHTML = '<option value="">-- Select Function --</option>';
      functionSelect.disabled = true;
      return;
    }

    const matches = [];
    for (const [cat, funcs] of Object.entries(activeFormulas)) {
      funcs.forEach((fn, idx) => {
        if (fn.name.toLowerCase().includes(query) ||
            fn.description.toLowerCase().includes(query)) {
          matches.push({ cat, idx, fn });
        }
      });
    }

    categorySelect.value = '';
    functionSelect.innerHTML = '<option value="">-- ' + matches.length + ' result(s) --</option>';
    functionSelect.disabled = false;

    matches.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.cat + '|' + m.idx;
      opt.textContent = m.fn.name + '  (' + m.cat + ')';
      functionSelect.appendChild(opt);
    });

    if (matches.length === 1) {
      functionSelect.selectedIndex = 1;
      functionSelect.dispatchEvent(new Event('change'));
    }
  });

  // ── Category change → populate functions ──
  categorySelect.addEventListener('change', () => {
    builderSearch.value = '';
    const cat = categorySelect.value;
    functionSelect.innerHTML = '<option value="">-- Select Function --</option>';
    functionSelect.disabled = !cat;
    functionInfo.classList.add('hidden');
    paramsContainer.classList.add('hidden');
    outputSection.classList.add('hidden');
    currentFormula = null;

    if (!cat) return;

    activeFormulas[cat].forEach((fn, idx) => {
      const opt = document.createElement('option');
      opt.value = cat + '|' + idx;
      opt.textContent = fn.name;
      functionSelect.appendChild(opt);
    });
  });

  // ── Function change → show info + params ──
  functionSelect.addEventListener('change', () => {
    const val = functionSelect.value;
    if (!val || !val.includes('|')) {
      functionInfo.classList.add('hidden');
      paramsContainer.classList.add('hidden');
      outputSection.classList.add('hidden');
      currentFormula = null;
      return;
    }

    const [cat, idxStr] = val.split('|');
    const fn = activeFormulas[cat][parseInt(idxStr)];
    currentFormula = fn;

    funcDescription.textContent = fn.description;
    funcSyntax.textContent = fn.syntax;
    functionInfo.classList.remove('hidden');

    const exampleEl = document.getElementById('func-example');
    if (fn.example) {
      exampleEl.innerHTML = '<strong>Reference:</strong> <code>' + escapeHtml(fn.example) + '</code>';
      exampleEl.classList.remove('hidden');
    } else {
      exampleEl.classList.add('hidden');
    }

    const scenarioEl = document.getElementById('func-scenario');
    const scenarioText = FORMULA_SCENARIOS[fn.name];
    if (scenarioText) {
      scenarioEl.innerHTML = '<strong>Scenario:</strong> ' + escapeHtml(scenarioText);
      scenarioEl.classList.remove('hidden');
    } else {
      scenarioEl.classList.add('hidden');
    }

    paramsFields.innerHTML = '';
    if (fn.params && fn.params.length > 0) {
      const syntaxDescs = extractSyntaxParams(fn.syntax);
      const useSyntax = syntaxDescs && syntaxDescs.length === fn.params.length;

      fn.params.forEach((p, i) => {
        const input = document.createElement('input');
        input.type = 'text';

        let placeholder;
        if (useSyntax) {
          placeholder = 'e.g. ' + syntaxDescs[i].desc;
          if (p.optional) placeholder += ' (optional)';
        } else {
          placeholder = p.hint || p.name;
        }

        input.placeholder = placeholder;
        input.dataset.param = p.name;
        input.dataset.optional = p.optional ? 'true' : 'false';
        input.addEventListener('input', generateFormula);
        paramsFields.appendChild(input);
      });
      paramsContainer.classList.remove('hidden');
    } else {
      paramsContainer.classList.add('hidden');
    }

    outputSection.classList.add('hidden');
    generateFormula();
  });

  // ── Generate the formula from filled params ──
  function generateFormula() {
    if (!currentFormula) return;

    const inputs = paramsFields.querySelectorAll('input');
    const values = {};
    let allRequiredFilled = true;

    inputs.forEach(inp => {
      const val = inp.value.trim();
      values[inp.dataset.param] = val;
      if (!val && inp.dataset.optional !== 'true') {
        allRequiredFilled = false;
      }
    });

    if (!allRequiredFilled && currentFormula.params.length > 0) {
      outputSection.classList.add('hidden');
      return;
    }

    let formula;

    if (currentFormula.template) {
      formula = currentFormula.template;
      for (const [key, val] of Object.entries(values)) {
        formula = formula.replace(`{${key}}`, val);
      }
    } else if (currentFormula.params.length === 0) {
      formula = currentFormula.syntax;
    } else {
      const args = currentFormula.params
        .map(p => values[p.name])
        .filter(v => v !== '');
      formula = `${currentFormula.name}(${args.join(', ')})`;
    }

    formulaOutput.textContent = formula;
    outputSection.classList.remove('hidden');
  }

  // ── Copy to clipboard ──
  copyBtn.addEventListener('click', () => {
    const text = formulaOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!');
    });
  });

  // ── Save to history ──
  saveBtn.addEventListener('click', () => {
    const text = formulaOutput.textContent;
    if (!text) return;

    chrome.storage.local.get({ formulaHistory: [] }, (result) => {
      const history = result.formulaHistory;
      history.unshift({
        formula: text,
        category: categorySelect.value || (functionSelect.value.includes('|') ? functionSelect.value.split('|')[0] : ''),
        func: currentFormula.name,
        timestamp: Date.now()
      });
      if (history.length > 50) history.pop();
      chrome.storage.local.set({ formulaHistory: history }, () => {
        showToast('Saved to history!');
        renderHistory(history);
      });
    });
  });

  // ══════════════════════════════════════════════
  // EXCEL → ANAPLAN TAB
  // ══════════════════════════════════════════════
  const excelSearch = document.getElementById('excel-search');
  const excelCategorySelect = document.getElementById('excel-category-select');
  const excelList = document.getElementById('excel-list');

  const excelCategories = [...new Set(EXCEL_TO_ANAPLAN.map(e => e.category))];
  excelCategories.sort();
  excelCategories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    excelCategorySelect.appendChild(opt);
  });

  function renderExcelList() {
    const query = excelSearch.value.trim().toLowerCase();
    const catFilter = excelCategorySelect.value;
    excelList.innerHTML = '';

    let filtered = EXCEL_TO_ANAPLAN;
    if (catFilter) filtered = filtered.filter(e => e.category === catFilter);
    if (query) filtered = filtered.filter(e =>
      e.excel.toLowerCase().includes(query) ||
      e.anaplan.toLowerCase().includes(query) ||
      e.notes.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      excelList.innerHTML = '<p class="empty-msg">No matching functions found.</p>';
      return;
    }

    filtered.forEach(entry => {
      const item = document.createElement('div');
      item.className = 'excel-item';

      let typeBadge = '';
      if (entry.type === 'direct') typeBadge = '<span class="excel-badge badge-direct">Direct</span>';
      else if (entry.type === 'alternative') typeBadge = '<span class="excel-badge badge-alt">Alternative</span>';
      else typeBadge = '<span class="excel-badge badge-none">No equivalent</span>';

      item.innerHTML = `
        <div class="excel-row">
          <span class="excel-fn">${escapeHtml(entry.excel)}</span>
          <span class="excel-arrow">→</span>
          <span class="excel-anaplan-fn">${escapeHtml(entry.anaplan)}</span>
          ${typeBadge}
        </div>
        <div class="excel-notes">${escapeHtml(entry.notes)}</div>
      `;
      excelList.appendChild(item);
    });
  }

  excelSearch.addEventListener('input', renderExcelList);
  excelCategorySelect.addEventListener('change', renderExcelList);
  renderExcelList();

  // ══════════════════════════════════════════════
  // EXPLAINER TAB
  // ══════════════════════════════════════════════
  const explainInput = document.getElementById('explain-input');
  const explainBtn = document.getElementById('explain-btn');
  const explainResult = document.getElementById('explain-result');
  const explainSteps = document.getElementById('explain-steps');
  const explainEmpty = document.getElementById('explain-empty');

  explainBtn.addEventListener('click', () => {
    const formula = explainInput.value.trim();
    if (!formula) {
      explainResult.classList.add('hidden');
      explainEmpty.classList.remove('hidden');
      return;
    }

    const result = explainFormula(formula);
    explainSteps.innerHTML = '';

    if (!result) {
      explainEmpty.classList.remove('hidden');
      explainResult.classList.add('hidden');
      return;
    }

    if (result.summary) {
      const summaryEl = document.createElement('div');
      summaryEl.className = 'explain-summary';
      summaryEl.innerHTML = `<div class="summary-label">What this formula does</div><div class="summary-text">${escapeHtml(result.summary)}</div>`;
      explainSteps.appendChild(summaryEl);
    }

    result.steps.forEach(step => {
      const el = document.createElement('div');
      el.className = `explain-step step-${step.type}`;
      el.innerHTML = `
        ${step.label ? `<div class="step-label">${step.label}</div>` : `<div class="step-label">${step.type}</div>`}
        <div class="step-text">${escapeHtml(step.text)}</div>
        <div class="step-desc">${step.desc}</div>
      `;
      explainSteps.appendChild(el);
    });

    explainResult.classList.remove('hidden');
    explainEmpty.classList.add('hidden');
  });

  explainInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      explainBtn.click();
    }
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ══════════════════════════════════════════════
  // QUICK PASTE PANEL (floating overlay on page)
  // ══════════════════════════════════════════════
  const launchBtn = document.getElementById('launch-quick-paste');
  if (launchBtn) {
    launchBtn.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabsList) => {
        if (!tabsList || !tabsList[0]) {
          showToast('No active tab found');
          return;
        }
        const tabId = tabsList[0].id;

        chrome.scripting.insertCSS({ target: { tabId }, files: ['content.css'] })
          .then(() => chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'] }))
          .then(() => new Promise(resolve => setTimeout(resolve, 150)))
          .then(() => {
            return chrome.tabs.sendMessage(tabId, { action: 'togglePanel' }).catch(() => {
              // Listener not ready yet or script already created the panel — that's ok
            });
          })
          .then(() => {
            showToast('Quick Paste panel opened');
          })
          .catch(() => {
            showToast('Cannot inject — open an Anaplan page first');
          });
      });
    });
  }

  // ── History tab ──
  function renderHistory(history) {
    historyList.innerHTML = '';
    if (!history || history.length === 0) {
      historyList.innerHTML = '<p class="empty-msg">No saved formulas yet.</p>';
      return;
    }

    history.forEach((entry, idx) => {
      const item = document.createElement('div');
      item.className = 'history-item';
      item.innerHTML = `
        <code>${entry.formula}</code>
        <button class="hist-copy" data-idx="${idx}">Copy</button>
      `;
      item.querySelector('.hist-copy').addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(entry.formula).then(() => {
          showToast('Copied!');
        });
      });
      historyList.appendChild(item);
    });
  }

  chrome.storage.local.get({ formulaHistory: [] }, (result) => {
    renderHistory(result.formulaHistory);
  });

  clearHistoryBtn.addEventListener('click', () => {
    chrome.storage.local.set({ formulaHistory: [] }, () => {
      renderHistory([]);
      showToast('History cleared');
    });
  });

  // ── Toast notification ──
  function showToast(msg) {
    if (toast) toast.remove();
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 1800);
  }

});
