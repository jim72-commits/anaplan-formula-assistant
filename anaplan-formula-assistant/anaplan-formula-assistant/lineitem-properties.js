function _summaryClip(method) {
  return JSON.stringify({
    summaryMethod: method,
    timeSummaryMethod: method,
    timeSummarySameAsMainSummary: true,
    ratioNumeratorIdentifier: '',
    ratioDenominatorIdentifier: ''
  });
}

const LINEITEM_PROPERTIES = {

  format: {
    label: 'Format',
    description: 'The data type for a line item. Determines what values can be stored and how they are displayed.',
    options: [
      { value: 'Number', clipboard: '{"dataType":"NUMBER"}', desc: 'Numeric values. Supports decimals, negatives, and formatting (currency, percentage, etc.).', tip: 'Most common format. Use for revenue, costs, quantities, rates, and any calculated metrics.' },
      { value: 'Text', clipboard: '{"dataType":"TEXT"}', desc: 'Free-form text strings up to 2,000 characters.', tip: 'Use for names, labels, notes, or concatenated display strings. Cannot be used in math.' },
      { value: 'Boolean', clipboard: '{"dataType":"BOOLEAN"}', desc: 'TRUE or FALSE values. Displayed as checkboxes in grid views.', tip: 'Use for flags, filters, and conditional logic (e.g. "Is Active?", "Include in Forecast?").' },
      { value: 'Date', clipboard: '{"dataType":"DATE"}', desc: 'Calendar dates. Displayed in the model\'s date format (e.g. MM/DD/YYYY).', tip: 'Use for start/end dates, milestones, deadlines. Works with DATE(), DAY(), MONTH(), YEAR().' },
      { value: 'Time Period', clipboard: '{"dataType":"TIME_ENTITY"}', desc: 'References a specific time period in the model\'s calendar (e.g. Jan FY26).', tip: 'Use for "effective period" or "target period" line items. Works with PERIOD() and INPERIOD().' },
      { value: 'List', clipboard: null, desc: 'References an item from a specified Anaplan list. Must then select which list.', tip: 'Cannot be pasted — requires selecting the specific list in the blueprint dropdown.' },
      { value: 'No Data', clipboard: '{"dataType":"NONE"}', desc: 'Line item holds no data. Used for structural or organizational purposes.', tip: 'Rare. Used as headings in modules or to create visual separators in the blueprint.' }
    ]
  },

  summary: {
    label: 'Summary',
    description: 'Controls how a line item\'s values roll up to parent items in list hierarchies and time summary levels.',
    options: [
      { value: 'Sum', clipboard: _summaryClip('SUM'), desc: 'Adds all child values together. Default for most numeric line items.', tip: 'Use for: Revenue, Cost, Volume, Headcount, Cash Flow.' },
      { value: 'None', clipboard: _summaryClip('NONE'), desc: 'No aggregation. Parent/summary cells show blank.', tip: 'Use for: Line items where roll-up is not meaningful, like unit prices or individual rates.' },
      { value: 'Average', clipboard: _summaryClip('AVERAGE'), desc: 'Weighted average based on the number of sub-items (periods or list children).', tip: 'Use for: Rates averaged over time, like monthly interest rates rolling up to quarterly.' },
      { value: 'Average (Non-weighted)', clipboard: _summaryClip('AVERAGE_NON_WEIGHTED'), desc: 'Simple mean of child values, regardless of how many sub-items each has.', tip: 'Use for: Simple averages across list items, e.g. average score per department.' },
      { value: 'Min', clipboard: _summaryClip('MIN'), desc: 'Shows the smallest value among all children.', tip: 'Use for: Minimum stock levels, lowest price, earliest date as a number.' },
      { value: 'Max', clipboard: _summaryClip('MAX'), desc: 'Shows the largest value among all children.', tip: 'Use for: Peak demand, highest cost, capacity limits.' },
      { value: 'Opening Period', clipboard: _summaryClip('OPENING_PERIOD'), desc: 'Summary shows the first child period\'s value (e.g. January value for Q1 roll-up).', tip: 'Use for: Opening balances, beginning-of-period headcount or inventory.' },
      { value: 'Closing Period', clipboard: _summaryClip('CLOSING_PERIOD'), desc: 'Summary shows the last child period\'s value (e.g. March value for Q1 roll-up).', tip: 'Use for: Balance sheet items, ending balances, closing inventory, closing headcount.' },
      { value: 'Formula', clipboard: _summaryClip('FORMULA'), desc: 'Re-runs the line item\'s formula at the summary level instead of aggregating children.', tip: 'Use for: Ratios and percentages (e.g. Margin % = Revenue / Cost recalculated at each level).' },
      { value: 'Any', clipboard: _summaryClip('ANY'), desc: 'Returns TRUE if any child is TRUE. For Boolean line items only.', tip: 'Use for: "Has any sub-item been flagged?" type checks.' },
      { value: 'All', clipboard: _summaryClip('ALL'), desc: 'Returns TRUE only if every child is TRUE. For Boolean line items only.', tip: 'Use for: "Are all sub-items approved/complete?" type checks.' },
      { value: 'First Non-blank', clipboard: _summaryClip('FIRST_NON_BLANK'), desc: 'Returns the first non-blank value found among children (by order).', tip: 'Use for: Status fields where you want the earliest available value.' },
      { value: 'Last Non-blank', clipboard: _summaryClip('LAST_NON_BLANK'), desc: 'Returns the last non-blank value found among children (by order).', tip: 'Use for: "Most recent status" or "latest comment" style roll-ups.' },
      { value: 'Ratio', clipboard: _summaryClip('RATIO'), desc: 'Calculates the ratio at the summary level rather than summing.', tip: 'Use for: Weighted averages where you want Anaplan to re-derive the ratio from summed components.' },
      { value: 'Text List', clipboard: _summaryClip('TEXT_LIST'), desc: 'Concatenates child text values into a comma-separated list.', tip: 'Use for: Rolling up names or labels into a combined string at the parent level.' }
    ]
  },

  timeScale: {
    label: 'Time Scale',
    description: 'Sets the time granularity at which a line item stores data. Must be the same or coarser than the model\'s calendar base.',
    options: [
      { value: 'Not Applicable', clipboard: '{"periodType":"NOT_APPLICABLE"}', desc: 'No time dimension. The line item has a single value per list intersection.', tip: 'Use for: Static parameters, mappings, properties, or any data that doesn\'t change over time.' },
      { value: 'Day', clipboard: '{"periodType":"DAY"}', desc: 'One value per day. Only available if the model\'s calendar includes daily periods.', tip: 'Use for: Daily transactions, attendance, operational metrics. Increases model size significantly.' },
      { value: 'Week', clipboard: '{"periodType":"WEEK"}', desc: 'One value per week. Only available if the model\'s calendar includes weekly periods.', tip: 'Use for: Weekly reporting, retail planning, sprint-level tracking.' },
      { value: 'Month', clipboard: '{"periodType":"MONTH"}', desc: 'One value per month. The most common time scale for planning models.', tip: 'Use for: Most financial planning — budgets, forecasts, P&L, headcount plans.' },
      { value: 'Quarter', clipboard: '{"periodType":"QUARTER"}', desc: 'One value per quarter (3 months).', tip: 'Use for: Quarterly targets, board reporting metrics, strategic milestones.' },
      { value: 'Half Year', clipboard: '{"periodType":"HALF_YEAR"}', desc: 'One value per half-year (6 months).', tip: 'Use for: Semi-annual reviews, half-year bonus calculations.' },
      { value: 'Year', clipboard: '{"periodType":"YEAR"}', desc: 'One value per year. Coarsest time granularity.', tip: 'Use for: Annual targets, yearly parameters, growth rates, tax rates.' }
    ]
  },

  formatSubtypes: {
    label: 'Number Format Subtypes',
    description: 'When Format is "Number", these sub-formats control how the value is displayed in grids and reports.',
    options: [
      { value: 'General', clipboard: null, desc: 'Standard number display. No special formatting applied.', tip: 'Default. Good for IDs, scores, or values where format doesn\'t matter.' },
      { value: 'Number: 0 decimals', clipboard: null, desc: 'Integer display, rounded to 0 decimal places.', tip: 'Use for: Headcount, units, quantities, whole-number counts.' },
      { value: 'Number: 1 decimal', clipboard: null, desc: 'Display with 1 decimal place.', tip: 'Use for: Ratings, simple metrics.' },
      { value: 'Number: 2 decimals', clipboard: null, desc: 'Display with 2 decimal places.', tip: 'Use for: Prices, unit costs, FX rates.' },
      { value: 'Number: 3 decimals', clipboard: null, desc: 'Display with 3 decimal places.', tip: 'Use for: High-precision rates, scientific measurements.' },
      { value: 'Percentage: 0 decimals', clipboard: null, desc: 'Displays as percentage (e.g. 50%). Stored internally as 0.5.', tip: 'Use for: Growth rates, margins, completion %. Value 0.5 shows as 50%.' },
      { value: 'Percentage: 1 decimal', clipboard: null, desc: 'Percentage with 1 decimal (e.g. 50.5%).', tip: 'Use for: More precise rates and percentages.' },
      { value: 'Percentage: 2 decimals', clipboard: null, desc: 'Percentage with 2 decimals (e.g. 50.55%).', tip: 'Use for: Interest rates, yield rates, precision-sensitive percentages.' },
      { value: 'Currency: 0 decimals', clipboard: null, desc: 'Currency symbol with no decimals (e.g. $1,000).', tip: 'Use for: Revenue, cost, budget amounts in whole units.' },
      { value: 'Currency: 2 decimals', clipboard: null, desc: 'Currency symbol with 2 decimals (e.g. $1,000.00).', tip: 'Use for: Detailed financial amounts, pricing, invoice-level data.' },
      { value: 'Thousands', clipboard: null, desc: 'Abbreviates display in thousands (e.g. 1,000 shows as 1K).', tip: 'Use for: Dashboard views of large numbers.' },
      { value: 'Millions', clipboard: null, desc: 'Abbreviates display in millions (e.g. 1,000,000 shows as 1M).', tip: 'Use for: Executive-level reporting, P&L summaries.' },
      { value: 'Billions', clipboard: null, desc: 'Abbreviates display in billions (e.g. 1,000,000,000 shows as 1B).', tip: 'Use for: Enterprise-scale financials, market cap displays.' }
    ]
  }

};
