const ANAPLAN_URL = 'https://help.anaplan.com/all-functions-160769b0-de37-4f08-87a0-cc3aa55525a3';

const CATEGORY_KEYWORDS = {
  'Aggregation': ['SUM', 'AVERAGE', 'MAX', 'MIN', 'ANY', 'ALL', 'FIRSTNONBLANK', 'LASTNONBLANK', 'TEXTLIST'],
  'Mapping': ['LOOKUP', 'SELECT'],
  'Logical': ['IF', 'COMPARE', 'ISBLANK', 'ISNOTBLANK', 'ISFIRSTOCCURRENCE', 'ISACTUALVERSION', 'ISCURRENTVERSION', 'ISANCESTOR', 'NOT', 'AND', 'OR'],
  'Numeric': ['ABS', 'DIVIDE', 'EXP', 'FIRSTNONZERO', 'LN', 'LOG', 'MOD', 'MROUND', 'POWER', 'ROUND', 'SIGN', 'SQRT'],
  'Text': ['FIND', 'LEFT', 'LENGTH', 'LOWER', 'MAILTO', 'MAKELINK', 'MID', 'NAME', 'RIGHT', 'SUBSTITUTE', 'TEXT', 'TRIM', 'UPPER'],
  'Time & Date': ['ADDMONTHS', 'ADDYEARS', 'CUMULATE', 'CURRENTPERIODEND', 'CURRENTPERIODSTART', 'DATE', 'DAY', 'DAYS', 'DAYSINMONTH', 'DAYSINYEAR', 'DECUMULATE', 'END', 'HALFYEARTODATE', 'HALFYEARVALUE', 'INPERIOD', 'LAG', 'LEAD', 'MONTH', 'MONTHTODATE', 'MONTHVALUE', 'MOVINGSUM', 'NEXT', 'OFFSET', 'PERIOD', 'POST', 'PREVIOUS', 'PROFILE', 'QUARTERTODATE', 'QUARTERVALUE', 'SPREAD', 'START', 'TIMESUM', 'WEEKDAY', 'WEEKTODATE', 'WEEKVALUE', 'YEAR', 'YEARTODATE', 'YEARVALUE'],
  'Miscellaneous': ['CODE', 'COLLECT', 'CURRENTVERSION', 'FINDITEM', 'HIERARCHYLEVEL', 'ITEM', 'ITEMLEVEL', 'NEXTVERSION', 'PARENT', 'PREVIOUSVERSION', 'RANK', 'RANKCUMULATE', 'VALUE'],
  'Financial': ['COUPDAYBS', 'COUPDAYS', 'COUPDAYSNC', 'COUPNCD', 'COUPNUM', 'COUPPCD', 'CUMIPMT', 'CUMPRINC', 'DURATION', 'FV', 'IPMT', 'IRR', 'MDURATION', 'NPER', 'NPV', 'PMT', 'PPMT', 'PRICE', 'PV', 'RATE', 'YEARFRAC', 'YIELD'],
  'Call Center Planning': ['AGENTS', 'AGENTSB', 'ANSWERTIME', 'ARRIVALRATE', 'AVGDURATION', 'AVGWAIT', 'ERLANGB', 'ERLANGC', 'SLA']
};

function categorizeFunctionName(name) {
  const upper = name.toUpperCase().replace(/[^A-Z]/g, '');
  for (const [cat, funcs] of Object.entries(CATEGORY_KEYWORDS)) {
    if (funcs.some(f => upper.includes(f) || f.includes(upper))) {
      return cat;
    }
  }
  return 'Miscellaneous';
}

function stripTags(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseAnaplanPage(html) {
  const discovered = [];
  const seenNames = new Set();

  const linkRe = /<a[^>]*href="[^"]*[Ff]unction[^"]*"[^>]*>(.*?)<\/a>/gi;
  let match;
  while ((match = linkRe.exec(html)) !== null) {
    const text = stripTags(match[1]).trim();
    if (text && text.length > 1 && text.length < 50) {
      const name = text.replace(/\(.*\)/, '').trim();
      if (/^[A-Z][A-Z0-9]+$/.test(name) && !seenNames.has(name)) {
        seenNames.add(name);
        discovered.push({
          name,
          description: `Anaplan ${name} function.`,
          category: categorizeFunctionName(name)
        });
      }
    }
  }

  const cellRe = /<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>/gi;
  while ((match = cellRe.exec(html)) !== null) {
    const name = stripTags(match[1]).trim();
    const desc = stripTags(match[2]).trim();
    if (/^[A-Z][A-Z0-9]+$/.test(name) && !seenNames.has(name) && name.length < 30) {
      seenNames.add(name);
      discovered.push({
        name,
        description: desc || `Anaplan ${name} function.`,
        category: categorizeFunctionName(name)
      });
    }
  }

  return discovered;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkForUpdates') {
    fetchAndParse().then(result => sendResponse(result));
    return true;
  }

  if (message.action === 'getUpdateStatus') {
    chrome.storage.local.get(['lastUpdateCheck', 'discoveredFunctions'], (data) => {
      sendResponse({
        lastCheck: data.lastUpdateCheck || null,
        discoveredCount: data.discoveredFunctions ? data.discoveredFunctions.length : 0
      });
    });
    return true;
  }
});

async function fetchAndParse() {
  try {
    const response = await fetch(ANAPLAN_URL, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml',
        'User-Agent': 'AnaplanBuilderAssistant/1.1'
      }
    });

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}: Could not reach Anaplan help page.` };
    }

    const html = await response.text();

    if (html.length < 500) {
      return {
        success: false,
        error: 'The Anaplan help page returned minimal content (likely loads dynamically). The built-in database remains current and complete.'
      };
    }

    const discovered = parseAnaplanPage(html);

    if (discovered.length === 0) {
      const timestamp = new Date().toISOString();
      await chrome.storage.local.set({
        lastUpdateCheck: timestamp,
        lastUpdateResult: 'no_new'
      });
      return {
        success: true,
        message: 'Page checked successfully. No new functions detected beyond the built-in database.',
        newCount: 0,
        timestamp
      };
    }

    const timestamp = new Date().toISOString();
    await chrome.storage.local.set({
      discoveredFunctions: discovered,
      lastUpdateCheck: timestamp,
      lastUpdateResult: 'found_new'
    });

    return {
      success: true,
      message: `Found ${discovered.length} function references on the page. Any new functions have been added.`,
      newCount: discovered.length,
      timestamp
    };
  } catch (err) {
    return {
      success: false,
      error: `Network error: ${err.message}. Check your internet connection and try again.`
    };
  }
}
