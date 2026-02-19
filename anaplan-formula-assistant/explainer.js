const EXPLAINER_RULES = [
  {
    pattern: /\bIF\b\s+(.*?)\s+\bTHEN\b\s+(.*?)\s+\bELSE\b\s+(.*)/i,
    explain: (m) => ({
      summary: `This formula checks whether "${m[1].trim()}" is true. If it is, it returns "${m[2].trim()}". Otherwise, it returns "${m[3].trim()}".`,
      steps: [
        { type: 'keyword', text: 'IF ... THEN ... ELSE', desc: 'Conditional logic: evaluates a test and returns one of two results.' },
        { type: 'part', label: 'Condition', text: m[1].trim(), desc: 'This test is evaluated. If TRUE, the THEN branch runs.' },
        { type: 'part', label: 'When TRUE', text: m[2].trim(), desc: 'Returned when the condition above is TRUE.' },
        { type: 'part', label: 'When FALSE', text: m[3].trim(), desc: 'Returned when the condition above is FALSE.' }
      ]
    })
  },
  {
    pattern: /\bSELECT\s*\((.*)\)/i,
    explain: (m) => {
      const parts = smartSplit(m[1]);
      const steps = [
        { type: 'keyword', text: 'SELECT()', desc: 'Maps specific values to results (like a CASE/SWITCH statement).' },
        { type: 'part', label: 'Line Item', text: parts[0] || '', desc: 'The line item being tested against each case.' }
      ];
      const cases = [];
      for (let i = 1; i < parts.length - 1; i += 2) {
        cases.push(`${parts[i]} → ${parts[i + 1] || '(missing)'}`);
        steps.push({ type: 'part', label: `Match "${parts[i]}"`, text: parts[i + 1] || '(missing)', desc: `When the expression equals ${parts[i]}, return this value.` });
      }
      if (parts.length % 2 === 0) {
        steps.push({ type: 'part', label: 'Default', text: parts[parts.length - 1], desc: 'Returned when no match is found.' });
      }
      return {
        summary: `This formula reads the value of "${parts[0] || ''}" and maps it to a result. It checks ${cases.length} specific case(s) (${cases.join('; ')}) and falls back to a default if none match.`,
        steps
      };
    }
  },
  {
    pattern: /(.+?)\[LOOKUP:\s*(.+?)\]/i,
    explain: (m) => ({
      summary: `This formula looks up the value of "${m[1].trim()}" from another module, using "${m[2].trim()}" as the mapping to connect the two dimensions.`,
      steps: [
        { type: 'keyword', text: 'LOOKUP', desc: 'Retrieves a value from a source module/line item using a mapping dimension.' },
        { type: 'part', label: 'Source Line Item', text: m[1].trim(), desc: 'The line item whose value is being looked up.' },
        { type: 'part', label: 'Mapping Line Item', text: m[2].trim(), desc: 'The list-formatted line item that defines the mapping between the current dimension and the source dimension.' }
      ]
    })
  },
  {
    pattern: /(.+?)\[SUM:\s*(.+?)\]/i,
    explain: (m) => ({
      summary: `This formula totals up the values of "${m[1].trim()}" from a detail list, grouping them by the property "${m[2].trim()}" to produce summary-level results.`,
      steps: [
        { type: 'keyword', text: 'SUM (with mapping)', desc: 'Aggregates (sums) detail values up to a summary level using a list property.' },
        { type: 'part', label: 'Source Line Item', text: m[1].trim(), desc: 'The detail-level line item being summed.' },
        { type: 'part', label: 'Mapping property', text: m[2].trim(), desc: 'The list property that maps detail items to summary items.' }
      ]
    })
  },
  {
    pattern: /\bOFFSET\s*\(\s*(.+?)\s*,\s*(.+?)(?:\s*,\s*(.+?))?\s*\)/i,
    explain: (m) => {
      const periods = m[2].trim();
      const dir = periods.startsWith('-') ? `${periods.replace('-', '')} period(s) EARLIER` : `${periods} period(s) LATER`;
      const absNum = periods.replace('-', '');
      const dirWord = periods.startsWith('-') ? 'back' : 'forward';
      const steps = [
        { type: 'keyword', text: 'OFFSET()', desc: `Shifts a value in time. This gets the value from ${dir}.` },
        { type: 'part', label: 'Line Item', text: m[1].trim(), desc: 'The line item whose historical/future value is retrieved.' },
        { type: 'part', label: 'Periods', text: periods, desc: `Number of time periods to shift. Negative = past, positive = future.` }
      ];
      if (m[3]) steps.push({ type: 'part', label: 'Default', text: m[3].trim(), desc: 'Value returned when there is no data at that offset (e.g., before the model start).' });
      return {
        summary: `This formula retrieves the value of "${m[1].trim()}" from ${absNum} time period(s) ${dirWord}.${m[3] ? ` If no data exists at that point (e.g., before the model starts), it returns ${m[3].trim()} instead.` : ''}`,
        steps
      };
    }
  },
  {
    pattern: /\bPREVIOUS\s*\(\s*(.+?)\s*\)/i,
    explain: (m) => ({
      summary: `This formula gets the value of "${m[1].trim()}" from the previous time period (last month, last quarter, etc., depending on the model's time scale).`,
      steps: [
        { type: 'keyword', text: 'PREVIOUS()', desc: 'Returns the value from the immediately preceding time period (equivalent to OFFSET(x, -1)).' },
        { type: 'part', label: 'Line Item', text: m[1].trim(), desc: 'The line item whose prior-period value is returned.' }
      ]
    })
  },
  {
    pattern: /\bCUMULATE\s*\(\s*(.+?)\s*\)/i,
    explain: (m) => ({
      summary: `This formula calculates a running total of "${m[1].trim()}" over time. Each period shows the cumulative sum from the very first period up to and including the current one.`,
      steps: [
        { type: 'keyword', text: 'CUMULATE()', desc: 'Running total over time. Each period equals the sum of all periods from the model start up to (and including) the current period.' },
        { type: 'part', label: 'Line Item', text: m[1].trim(), desc: 'The line item being accumulated.' }
      ]
    })
  },
  {
    pattern: /\bYEARTODATE\s*\(\s*(.+?)\s*\)/i,
    explain: (m) => ({
      summary: `This formula calculates the year-to-date total of "${m[1].trim()}". It sums up all values from January (or the fiscal year start) through the current period, and resets to zero at the start of each new year.`,
      steps: [
        { type: 'keyword', text: 'YEARTODATE()', desc: 'Cumulative sum that resets at the start of each fiscal year.' },
        { type: 'part', label: 'Line Item', text: m[1].trim(), desc: 'The monthly line item being accumulated within each year.' }
      ]
    })
  },
  {
    pattern: /\bMOVINGSUM\s*\(\s*(.+?)\s*,\s*(.+?)(?:\s*,\s*(.+?))?\s*\)/i,
    explain: (m) => {
      const n = m[2].trim();
      const steps = [
        { type: 'keyword', text: 'MOVINGSUM()', desc: `Rolling sum of the last ${n} periods.` },
        { type: 'part', label: 'Line Item', text: m[1].trim(), desc: 'The line item being summed.' },
        { type: 'part', label: 'Periods', text: n, desc: 'The number of periods in the rolling window.' }
      ];
      if (m[3]) steps.push({ type: 'part', label: 'Include current?', text: m[3].trim(), desc: 'TRUE = includes the current period in the window; FALSE = only preceding periods.' });
      return {
        summary: `This formula calculates a rolling ${n}-period sum of "${m[1].trim()}". For each time period, it adds up the values from the last ${n} periods to smooth out short-term fluctuations.`,
        steps
      };
    }
  },
  {
    pattern: /\bMOVINGAVERAGE\s*\(\s*(.+?)\s*,\s*(.+?)(?:\s*,\s*(.+?))?\s*\)/i,
    explain: (m) => {
      const n = m[2].trim();
      const steps = [
        { type: 'keyword', text: 'MOVINGAVERAGE()', desc: `Rolling average of the last ${n} periods.` },
        { type: 'part', label: 'Line Item', text: m[1].trim(), desc: 'The line item being averaged.' },
        { type: 'part', label: 'Periods', text: n, desc: 'The number of periods in the rolling window.' }
      ];
      if (m[3]) steps.push({ type: 'part', label: 'Include current?', text: m[3].trim(), desc: 'TRUE = includes the current period; FALSE = only preceding periods.' });
      return {
        summary: `This formula calculates a rolling ${n}-period average of "${m[1].trim()}". It smooths out volatility by averaging the values over the most recent ${n} periods.`,
        steps
      };
    }
  },
  {
    pattern: /\bSUM\s*\(\s*(.+?)(?:\s*,\s*(.+?))?\s*\)/i,
    explain: (m) => {
      const steps = [
        { type: 'keyword', text: 'SUM()', desc: 'Adds up values across all items in a list dimension.' },
        { type: 'part', label: 'Line Item', text: m[1].trim(), desc: 'The line item whose values are summed.' }
      ];
      if (m[2]) steps.push({ type: 'part', label: 'Mapping', text: m[2].trim(), desc: 'Optional list property to group the summation (e.g., sum revenue BY region).' });
      return {
        summary: m[2]
          ? `This formula totals up "${m[1].trim()}" across all list items, grouped by "${m[2].trim()}".`
          : `This formula totals up "${m[1].trim()}" across all items in the list.`,
        steps
      };
    }
  },
  {
    pattern: /\bRANK\s*\(\s*(.+?)\s*\)/i,
    explain: (m) => ({
      summary: `This formula ranks each list item based on the value of "${m[1].trim()}". The item with the highest value gets rank 1, the second highest gets rank 2, and so on.`,
      steps: [
        { type: 'keyword', text: 'RANK()', desc: 'Returns the rank of each item within its list (1 = highest value).' },
        { type: 'part', label: 'Line Item', text: m[1].trim(), desc: 'The line item used for ranking.' }
      ]
    })
  },
  {
    pattern: /\bFINDITEM\s*\(\s*(.+?)\s*,\s*(.+?)\s*\)/i,
    explain: (m) => ({
      summary: `This formula searches the "${m[1].trim()}" list for an item whose name matches the value of "${m[2].trim()}". If found, it returns that list item; if not, it returns BLANK.`,
      steps: [
        { type: 'keyword', text: 'FINDITEM()', desc: 'Looks up a list item by its display name. Returns BLANK if not found.' },
        { type: 'part', label: 'List', text: m[1].trim(), desc: 'The list to search in.' },
        { type: 'part', label: 'Line Item', text: m[2].trim(), desc: 'The text-formatted line item or expression to search for.' }
      ]
    })
  },
  {
    pattern: /\bPOWER\s*\(\s*(.+?)\s*,\s*(.+?)\s*\)/i,
    explain: (m) => ({
      summary: `This formula raises "${m[1].trim()}" to the power of "${m[2].trim()}". Commonly used for compound growth calculations (e.g., (1 + rate) ^ years).`,
      steps: [
        { type: 'keyword', text: 'POWER()', desc: 'Raises a number to a power (exponentiation).' },
        { type: 'part', label: 'Base', text: m[1].trim(), desc: 'The number being raised.' },
        { type: 'part', label: 'Exponent', text: m[2].trim(), desc: 'The power to raise it to.' }
      ]
    })
  },
  {
    pattern: /\bROUND\s*\(\s*(.+?)\s*,\s*(.+?)\s*\)/i,
    explain: (m) => ({
      summary: `This formula rounds the result of "${m[1].trim()}" to ${m[2].trim()} decimal place(s). Useful for cleaning up display values or avoiding floating-point issues.`,
      steps: [
        { type: 'keyword', text: 'ROUND()', desc: 'Rounds a number to a specified number of decimal places.' },
        { type: 'part', label: 'Number', text: m[1].trim(), desc: 'The value to round.' },
        { type: 'part', label: 'Decimals', text: m[2].trim(), desc: 'Number of decimal places.' }
      ]
    })
  },
  {
    pattern: /\bABS\s*\(\s*(.+?)\s*\)/i,
    explain: (m) => ({
      summary: `This formula returns the absolute (always positive) value of "${m[1].trim()}". If the value is -500, it returns 500. Often used in variance and percentage calculations to avoid sign errors.`,
      steps: [
        { type: 'keyword', text: 'ABS()', desc: 'Returns the absolute (positive) value. Removes the sign.' },
        { type: 'part', label: 'Line Item', text: m[1].trim(), desc: 'The line item whose absolute value is taken.' }
      ]
    })
  },
  {
    pattern: /\bPROFILE\s*\(\s*(.+?)\s*,\s*(.+?)\s*\)/i,
    explain: (m) => ({
      summary: `This formula distributes the value of "${m[1].trim()}" across time periods using the percentages defined in "${m[2].trim()}". Commonly used to phase an annual target into monthly buckets based on a seasonal pattern.`,
      steps: [
        { type: 'keyword', text: 'PROFILE()', desc: 'Spreads a value across time periods using a distribution profile.' },
        { type: 'part', label: 'Value Line Item', text: m[1].trim(), desc: 'The line item containing the total value to distribute (e.g., annual target).' },
        { type: 'part', label: 'Profile Line Item', text: m[2].trim(), desc: 'The line item containing the distribution percentages for each period.' }
      ]
    })
  },
  {
    pattern: /\bNAME\s*\(\s*(.+?)\s*\)/i,
    explain: (m) => ({
      summary: `This formula returns the display name (as text) of the list item given by "${m[1].trim()}". Useful for building labels, concatenated strings, or display-friendly outputs.`,
      steps: [
        { type: 'keyword', text: 'NAME()', desc: 'Returns the display name of a list item as text.' },
        { type: 'part', label: 'Item', text: m[1].trim(), desc: 'The list-formatted expression (often ITEM(list)).' }
      ]
    })
  },
  {
    pattern: /\bISBLANK\s*\(\s*(.+?)\s*\)/i,
    explain: (m) => ({
      summary: `This formula checks whether "${m[1].trim()}" is empty (blank). Returns TRUE if the value is blank, FALSE if it has any data. Often used as a guard condition before calculations.`,
      steps: [
        { type: 'keyword', text: 'ISBLANK()', desc: 'Returns TRUE if the value is empty/blank, FALSE otherwise.' },
        { type: 'part', label: 'Line Item', text: m[1].trim(), desc: 'The line item being tested for blank.' }
      ]
    })
  }
];

function smartSplit(str) {
  const parts = [];
  let depth = 0;
  let current = '';
  let inQuote = false;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '"') {
      inQuote = !inQuote;
      current += ch;
    } else if (inQuote) {
      current += ch;
    } else if (ch === '(') {
      depth++;
      current += ch;
    } else if (ch === ')') {
      depth--;
      current += ch;
    } else if (ch === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function explainFormula(formula) {
  const trimmed = formula.trim();
  if (!trimmed) return null;

  for (const rule of EXPLAINER_RULES) {
    const match = trimmed.match(rule.pattern);
    if (match) {
      return rule.explain(match);
    }
  }

  const operators = [];
  if (/\s\+\s/.test(trimmed)) operators.push({ op: '+', desc: 'Addition' });
  if (/\s-\s/.test(trimmed)) operators.push({ op: '-', desc: 'Subtraction' });
  if (/\s\*\s/.test(trimmed)) operators.push({ op: '*', desc: 'Multiplication' });
  if (/\s\/\s/.test(trimmed)) operators.push({ op: '/', desc: 'Division' });
  if (/\bAND\b/i.test(trimmed)) operators.push({ op: 'AND', desc: 'Both conditions must be TRUE' });
  if (/\bOR\b/i.test(trimmed)) operators.push({ op: 'OR', desc: 'At least one condition must be TRUE' });
  if (/\bNOT\b/i.test(trimmed)) operators.push({ op: 'NOT', desc: 'Reverses a boolean value' });
  if (/<>/.test(trimmed)) operators.push({ op: '<>', desc: 'Not equal to' });
  if (/>=/.test(trimmed)) operators.push({ op: '>=', desc: 'Greater than or equal to' });
  if (/<=/.test(trimmed)) operators.push({ op: '<=', desc: 'Less than or equal to' });
  if (/(?<!<|>)=(?!=)/.test(trimmed)) operators.push({ op: '=', desc: 'Equal to' });

  if (operators.length > 0) {
    const opNames = operators.map(o => o.desc.toLowerCase()).join(', ');
    const steps = [{ type: 'keyword', text: 'Expression', desc: 'An arithmetic or logical expression combining values with operators.' }];
    operators.forEach(o => {
      steps.push({ type: 'operator', label: o.op, text: o.op, desc: o.desc });
    });
    return {
      summary: `This formula performs a calculation using ${opNames}. It combines line items and/or literal values to produce a result.`,
      steps
    };
  }

  return {
    summary: `"${trimmed}" is a direct reference to a line item or a literal value. It simply returns whatever value that line item holds for the current cell.`,
    steps: [{ type: 'info', text: trimmed, desc: 'This is a direct reference to a line item or a literal value. No function or operator detected.' }]
  };
}
