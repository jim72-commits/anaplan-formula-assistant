const ANAPLAN_TEMPLATES = [
  {
    id: "yoy_growth",
    name: "Year-over-Year Growth %",
    category: "Variance & Growth",
    description: "Calculates the percentage change compared to the same period last year (12 months ago).",
    params: [
      { name: "metric", hint: "e.g. Revenue", label: "Metric (line item)" }
    ],
    template: "IF OFFSET({metric}, -12, 0) <> 0 THEN ({metric} - OFFSET({metric}, -12, 0)) / ABS(OFFSET({metric}, -12, 0)) ELSE 0",
    notes: "Uses OFFSET(-12) to go back 12 monthly periods. ABS in the denominator handles negative base values correctly."
  },
  {
    id: "mom_growth",
    name: "Month-over-Month Growth %",
    category: "Variance & Growth",
    description: "Calculates the percentage change compared to the previous month.",
    params: [
      { name: "metric", hint: "e.g. Revenue", label: "Metric (line item)" }
    ],
    template: "IF PREVIOUS({metric}) <> 0 THEN ({metric} - PREVIOUS({metric})) / ABS(PREVIOUS({metric})) ELSE 0",
    notes: "PREVIOUS() is shorthand for OFFSET(x, -1). Using ABS() in the denominator avoids sign errors when the prior month was negative."
  },
  {
    id: "variance_abs",
    name: "Variance (Actual vs Budget)",
    category: "Variance & Growth",
    description: "Simple absolute variance: how much the actual over- or under-performed versus plan.",
    params: [
      { name: "actual", hint: "e.g. Actual Revenue", label: "Actual" },
      { name: "budget", hint: "e.g. Budget Revenue", label: "Budget" }
    ],
    template: "{actual} - {budget}",
    notes: "Positive = favorable (actual exceeded budget). Negate if the metric is a cost."
  },
  {
    id: "variance_pct",
    name: "Variance % (Actual vs Budget)",
    category: "Variance & Growth",
    description: "Percentage variance: how far off the actual is from plan, as a percentage of budget.",
    params: [
      { name: "actual", hint: "e.g. Actual Revenue", label: "Actual" },
      { name: "budget", hint: "e.g. Budget Revenue", label: "Budget" }
    ],
    template: "IF {budget} <> 0 THEN ({actual} - {budget}) / ABS({budget}) ELSE 0",
    notes: "Divides by ABS(budget) to handle negative budgets. Returns 0 when budget is zero to avoid #DIV/0."
  },
  {
    id: "opening_closing",
    name: "Opening / Closing Balance Roll",
    category: "Financial Modeling",
    description: "Classic balance sheet roll-forward: Opening = prior month's Closing. Closing = Opening + Additions - Reductions.",
    params: [
      { name: "closing", hint: "e.g. Closing Balance", label: "Closing Balance line item" },
      { name: "additions", hint: "e.g. New Hires", label: "Additions" },
      { name: "reductions", hint: "e.g. Terminations", label: "Reductions" }
    ],
    template: "Opening Balance = PREVIOUS({closing})\nClosing Balance = Opening Balance + {additions} - {reductions}",
    notes: "Two line items needed. Opening Balance uses PREVIOUS() to pull prior period's Closing. The first period's Opening defaults to 0 (or set an initial value)."
  },
  {
    id: "cumulate_ytd",
    name: "Year-to-Date (YTD) Running Total",
    category: "Financial Modeling",
    description: "Cumulative sum that resets at the start of each fiscal year.",
    params: [
      { name: "metric", hint: "e.g. Monthly Revenue", label: "Monthly metric" }
    ],
    template: "YEARTODATE({metric})",
    notes: "Automatically resets at the beginning of each fiscal year based on the model calendar. For a running total that never resets, use CUMULATE() instead."
  },
  {
    id: "rolling_avg",
    name: "Rolling 3-Month Average",
    category: "Financial Modeling",
    description: "Smooths out monthly volatility by averaging the current and two prior months.",
    params: [
      { name: "metric", hint: "e.g. Revenue", label: "Metric" },
      { name: "periods", hint: "e.g. 3", label: "Number of periods" }
    ],
    template: "MOVINGAVERAGE({metric}, {periods}, TRUE)",
    notes: "Set the last argument to TRUE to include the current period. FALSE would average only the N preceding periods."
  },
  {
    id: "spread_annual",
    name: "Spread Annual Target to Months",
    category: "Planning & Allocation",
    description: "Distributes an annual number into monthly periods using a seasonal profile.",
    params: [
      { name: "annual_value", hint: "e.g. Annual Revenue Target", label: "Annual value" },
      { name: "profile", hint: "e.g. Seasonal Profile %", label: "Monthly profile (sums to 100%)" }
    ],
    template: "{annual_value} * {profile}",
    notes: "The profile line item should contain monthly percentages that sum to 1 (or 100%). Alternatively, use PROFILE({annual_value}, {profile}) if using Anaplan's built-in profiling."
  },
  {
    id: "even_spread",
    name: "Even Monthly Spread",
    category: "Planning & Allocation",
    description: "Distributes an annual target evenly across 12 months.",
    params: [
      { name: "annual_value", hint: "e.g. Annual Budget", label: "Annual value" }
    ],
    template: "{annual_value} / 12",
    notes: "For uneven fiscal years or non-monthly time scales, replace 12 with the appropriate period count."
  },
  {
    id: "weighted_avg",
    name: "Weighted Average",
    category: "Planning & Allocation",
    description: "Calculates a weighted average across list items (e.g., average price weighted by volume).",
    params: [
      { name: "value", hint: "e.g. Unit Price", label: "Value to average" },
      { name: "weight", hint: "e.g. Units Sold", label: "Weight" }
    ],
    template: "IF SUM({weight}) <> 0 THEN SUM({value} * {weight}) / SUM({weight}) ELSE 0",
    notes: "Both SUM functions aggregate across the detail list. The IF guard prevents division by zero when total weight is 0."
  },
  {
    id: "safe_divide",
    name: "Safe Division (No #DIV/0)",
    category: "Utility Patterns",
    description: "Divides two values, returning 0 when the denominator is zero.",
    params: [
      { name: "numerator", hint: "e.g. Revenue", label: "Numerator" },
      { name: "denominator", hint: "e.g. Units", label: "Denominator" }
    ],
    template: "IF {denominator} <> 0 THEN {numerator} / {denominator} ELSE 0",
    notes: "Use this pattern everywhere you divide to prevent errors. A common Anaplan best practice."
  },
  {
    id: "conditional_lookup",
    name: "Conditional Lookup (IF + LOOKUP)",
    category: "Utility Patterns",
    description: "Looks up a value from another module only when a condition is met.",
    params: [
      { name: "condition", hint: "e.g. Is Active?", label: "Condition" },
      { name: "source", hint: "e.g. SYS01 Rates.Tax Rate", label: "Source line item" },
      { name: "mapping", hint: "e.g. Region Mapping", label: "Mapping line item" },
      { name: "default", hint: "e.g. 0", label: "Default value" }
    ],
    template: "IF {condition} THEN {source}[LOOKUP: {mapping}] ELSE {default}",
    notes: "Combining IF with LOOKUP is a common pattern. The lookup only executes when the condition is TRUE, which can improve performance."
  },
  {
    id: "days_remaining",
    name: "Days Remaining in Period",
    category: "Utility Patterns",
    description: "Calculates the number of days left in the current model time period.",
    params: [],
    template: "CURRENTPERIODEND() - CURRENTPERIODSTART() + 1",
    notes: "Returns the total days in the period. To get remaining days from today, use: CURRENTPERIODEND() - TODAY() + 1 (if you have a TODAY line item)."
  },
  {
    id: "top_n_filter",
    name: "Top N Filter",
    category: "Analysis Patterns",
    description: "Flags the top N items by a metric (e.g., top 10 products by revenue).",
    params: [
      { name: "metric", hint: "e.g. Revenue", label: "Metric to rank" },
      { name: "n", hint: "e.g. 10", label: "Top N count" }
    ],
    template: "RANK({metric}) <= {n}",
    notes: "Returns a boolean (TRUE/FALSE). Use this as a filter in views or as a condition in IF statements."
  },
  {
    id: "pct_of_total",
    name: "Percentage of Total",
    category: "Analysis Patterns",
    description: "Calculates each item's share as a percentage of the total across the list.",
    params: [
      { name: "metric", hint: "e.g. Revenue", label: "Metric" }
    ],
    template: "IF SUM({metric}) <> 0 THEN {metric} / SUM({metric}) ELSE 0",
    notes: "SUM({metric}) aggregates to the parent/total. The result is a decimal (0.25 = 25%). Format as percentage in the line item settings."
  },
  {
    id: "nested_if",
    name: "Nested IF (Multi-Tier Classification)",
    category: "Analysis Patterns",
    description: "Classifies values into multiple tiers (e.g., High / Medium / Low).",
    params: [
      { name: "metric", hint: "e.g. Revenue", label: "Metric" },
      { name: "high_threshold", hint: "e.g. 100000", label: "High threshold" },
      { name: "med_threshold", hint: "e.g. 50000", label: "Medium threshold" }
    ],
    template: "IF {metric} >= {high_threshold} THEN \"High\" ELSE IF {metric} >= {med_threshold} THEN \"Medium\" ELSE \"Low\"",
    notes: "Anaplan evaluates left to right. The first TRUE condition wins. For more than 3 tiers, consider SELECT() instead."
  },
  {
    id: "cagr",
    name: "CAGR (Compound Annual Growth Rate)",
    category: "Analysis Patterns",
    description: "Calculates the compound annual growth rate between a beginning and ending value.",
    params: [
      { name: "end_value", hint: "e.g. FY26 Revenue", label: "Ending value" },
      { name: "begin_value", hint: "e.g. FY23 Revenue", label: "Beginning value" },
      { name: "years", hint: "e.g. 3", label: "Number of years" }
    ],
    template: "IF {begin_value} > 0 THEN POWER({end_value} / {begin_value}, 1 / {years}) - 1 ELSE 0",
    notes: "Only valid when the beginning value is positive. Result is a decimal rate (0.08 = 8% CAGR)."
  }
];
