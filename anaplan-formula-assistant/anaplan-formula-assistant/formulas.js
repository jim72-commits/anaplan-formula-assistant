const ANAPLAN_FORMULAS = {

  "Aggregation": [
    {
      name: "SUM",
      description: "Sums values in a result module based on mapping from a source module.",
      syntax: "Values to sum[SUM: Mapping, SUM: Mapping 2, etc.]",
      params: [
        { name: "source", hint: "e.g. REV01 Revenue.Amount" },
        { name: "mapping", hint: "e.g. Products.Region" }
      ],
      template: "{source}[SUM: {mapping}]",
      example: "REV01 Revenue.Amount[SUM: Products.Region]"
    },
    {
      name: "AVERAGE",
      description: "Returns the mean average of values from a source module based on mapping.",
      syntax: "Values to average[AVERAGE: Mapping, AVERAGE: Mapping 2, etc.]",
      params: [
        { name: "source", hint: "e.g. Unit Cost" },
        { name: "mapping", hint: "e.g. Products.Category" }
      ],
      template: "{source}[AVERAGE: {mapping}]",
      example: "Unit Cost[AVERAGE: Products.Category]"
    },
    {
      name: "MAX (Aggregation)",
      description: "Returns the maximum value from a line item in a source module.",
      syntax: "Source[MAX: Mapping, MAX: Mapping 2, etc.]",
      params: [
        { name: "source", hint: "e.g. Sales Amount" },
        { name: "mapping", hint: "e.g. Products.Region" }
      ],
      template: "{source}[MAX: {mapping}]",
      example: "Sales Amount[MAX: Products.Region]"
    },
    {
      name: "MIN (Aggregation)",
      description: "Returns the minimum value from a line item in a source module.",
      syntax: "Source[MIN: Mapping, MIN: Mapping 2, etc.]",
      params: [
        { name: "source", hint: "e.g. Sales Amount" },
        { name: "mapping", hint: "e.g. Products.Region" }
      ],
      template: "{source}[MIN: {mapping}]",
      example: "Sales Amount[MIN: Products.Region]"
    },
    {
      name: "ANY",
      description: "Returns TRUE for any value that matches specific Boolean criteria in a source module.",
      syntax: "Source[ANY: Mapping, ANY: Mapping 2, etc.]",
      params: [
        { name: "source", hint: "e.g. Is Active?" },
        { name: "mapping", hint: "e.g. Employees.Department" }
      ],
      template: "{source}[ANY: {mapping}]",
      example: "Is Active?[ANY: Employees.Department]"
    },
    {
      name: "ALL",
      description: "Returns TRUE only if all values match specific Boolean criteria in a source module.",
      syntax: "Source[ALL: Mapping, ALL: Mapping 2, etc.]",
      params: [
        { name: "source", hint: "e.g. Is Approved?" },
        { name: "mapping", hint: "e.g. Orders.Region" }
      ],
      template: "{source}[ALL: {mapping}]",
      example: "Is Approved?[ALL: Orders.Region]"
    },
    {
      name: "FIRSTNONBLANK",
      description: "Returns the first non-blank value of a line item found for a given list item or time period.",
      syntax: "Line item[FIRSTNONBLANK: Mapping, FIRSTNONBLANK: Mapping 2, etc.]",
      params: [
        { name: "source", hint: "e.g. Comments" },
        { name: "mapping", hint: "e.g. Tasks.Project" }
      ],
      template: "{source}[FIRSTNONBLANK: {mapping}]",
      example: "Comments[FIRSTNONBLANK: Tasks.Project]"
    },
    {
      name: "LASTNONBLANK",
      description: "Returns the last non-blank value of a line item found for a given list item or time period.",
      syntax: "Line item[LASTNONBLANK: Mapping, LASTNONBLANK: Mapping 2, etc.]",
      params: [
        { name: "source", hint: "e.g. Status" },
        { name: "mapping", hint: "e.g. Tasks.Project" }
      ],
      template: "{source}[LASTNONBLANK: {mapping}]",
      example: "Status[LASTNONBLANK: Tasks.Project]"
    },
    {
      name: "TEXTLIST (Aggregation)",
      description: "Returns a collection of text values as a comma-separated value, based on mapping from a source module.",
      syntax: "Values to list[TEXTLIST: Mapping, TEXTLIST: Mapping 2, etc.]",
      params: [
        { name: "source", hint: "e.g. Employee Name" },
        { name: "mapping", hint: "e.g. Employees.Department" }
      ],
      template: "{source}[TEXTLIST: {mapping}]",
      example: "Employee Name[TEXTLIST: Employees.Department]"
    }
  ],

  "Mapping": [
    {
      name: "LOOKUP",
      description: "Looks up values in a source module or list and displays them in a target module.",
      syntax: "Values to lookup[LOOKUP: Mapping, LOOKUP: Mapping 2, etc.]",
      params: [
        { name: "source", hint: "e.g. SYS01 Config.Tax Rate" },
        { name: "mapping", hint: "e.g. Region Mapping" }
      ],
      template: "{source}[LOOKUP: {mapping}]",
      example: "SYS01 Config.Tax Rate[LOOKUP: Region Mapping]"
    },
    {
      name: "SELECT",
      description: "Returns values from a given list item or time period.",
      syntax: "Source[SELECT: Target item]",
      params: [
        { name: "source", hint: "e.g. Budget.Revenue" },
        { name: "target_item", hint: "e.g. FY26" }
      ],
      template: "{source}[SELECT: {target_item}]",
      example: "Budget.Revenue[SELECT: FY26]"
    }
  ],

  "Logical": [
    {
      name: "IF THEN ELSE",
      description: "Tests a Boolean argument and returns one of two results based on whether it is true or false.",
      syntax: "IF Boolean argument THEN Result 1 ELSE Result 2",
      params: [
        { name: "condition", hint: "e.g. Revenue > 1000" },
        { name: "true_value", hint: "e.g. \"High\"" },
        { name: "false_value", hint: "e.g. \"Low\"" }
      ],
      template: "IF {condition} THEN {true_value} ELSE {false_value}",
      example: "IF Revenue > 1000 THEN \"High\" ELSE \"Low\""
    },
    {
      name: "COMPARE",
      description: "Compares two text values. Returns 0 if same, 1 if first is greater, -1 if first is less.",
      syntax: "COMPARE(Text 1, Text 2 [, Comparison mode] [, Locale])",
      params: [
        { name: "text1", hint: "e.g. Name A" },
        { name: "text2", hint: "e.g. Name B" },
        { name: "mode", hint: "e.g. 0 (optional)", optional: true }
      ],
      example: "COMPARE(Name A, Name B)"
    },
    {
      name: "ISBLANK",
      description: "Returns TRUE for values that are blank.",
      syntax: "ISBLANK(Value to test)",
      params: [
        { name: "value", hint: "e.g. Revenue" }
      ],
      example: "ISBLANK(Revenue)"
    },
    {
      name: "ISNOTBLANK",
      description: "Returns TRUE for values that are not blank.",
      syntax: "ISNOTBLANK(Value to test)",
      params: [
        { name: "value", hint: "e.g. Revenue" }
      ],
      example: "ISNOTBLANK(Revenue)"
    },
    {
      name: "ISFIRSTOCCURRENCE",
      description: "Returns TRUE for the first occurrence of a value in a list dimension.",
      syntax: "ISFIRSTOCCURRENCE(Values to compare, List dimension to search)",
      params: [
        { name: "values", hint: "e.g. Customer Name" },
        { name: "list_dimension", hint: "e.g. Transactions" }
      ],
      example: "ISFIRSTOCCURRENCE(Customer Name, Transactions)"
    },
    {
      name: "ISACTUALVERSION",
      description: "Returns TRUE for the version that is set as Actual in a model. FALSE for all other versions.",
      syntax: "ISACTUALVERSION()",
      params: [],
      example: "ISACTUALVERSION()"
    },
    {
      name: "ISCURRENTVERSION",
      description: "Returns TRUE for the version that is set as Current in a model. FALSE for all other versions.",
      syntax: "ISCURRENTVERSION()",
      params: [],
      example: "ISCURRENTVERSION()"
    },
    {
      name: "ISANCESTOR",
      description: "Returns TRUE if the first value is an ancestor (parent, grandparent, etc.) of the second in a hierarchy.",
      syntax: "ISANCESTOR(Ancestor, Descendant)",
      params: [
        { name: "ancestor", hint: "e.g. PARENT(ITEM(Regions))" },
        { name: "descendant", hint: "e.g. ITEM(Regions)" }
      ],
      example: "ISANCESTOR(PARENT(ITEM(Regions)), ITEM(Regions))"
    }
  ],

  "Numeric": [
    {
      name: "ABS",
      description: "Returns the absolute value of a number. Negative numbers become positive.",
      syntax: "ABS(Number)",
      params: [
        { name: "number", hint: "e.g. Variance" }
      ],
      example: "ABS(Variance)"
    },
    {
      name: "DIVIDE",
      description: "Divides one number by another. Returns 0 when the divisor is 0.",
      syntax: "DIVIDE(Dividend, Divisor)",
      params: [
        { name: "dividend", hint: "e.g. Revenue" },
        { name: "divisor", hint: "e.g. Units" }
      ],
      example: "DIVIDE(Revenue, Units)"
    },
    {
      name: "EXP",
      description: "Raises the mathematical constant e (Euler's number) to the power you specify.",
      syntax: "EXP(Number)",
      params: [
        { name: "number", hint: "e.g. Growth Rate" }
      ],
      example: "EXP(Growth Rate)"
    },
    {
      name: "FIRSTNONZERO",
      description: "Searches through two or more numeric arguments and returns the first value that is not zero.",
      syntax: "FIRSTNONZERO(Value 1, Value 2, [etc.])",
      params: [
        { name: "value1", hint: "e.g. Override Price" },
        { name: "value2", hint: "e.g. Standard Price" }
      ],
      example: "FIRSTNONZERO(Override Price, Standard Price)"
    },
    {
      name: "LN",
      description: "Returns the natural logarithm of a number (based on constant e). Inverse of EXP.",
      syntax: "LN(Number)",
      params: [
        { name: "number", hint: "e.g. Growth Factor" }
      ],
      example: "LN(Growth Factor)"
    },
    {
      name: "LOG",
      description: "Returns the logarithm of a number to the base you specify.",
      syntax: "LOG(Number, Base)",
      params: [
        { name: "number", hint: "e.g. Revenue" },
        { name: "base", hint: "e.g. 10" }
      ],
      example: "LOG(Revenue, 10)"
    },
    {
      name: "MAX",
      description: "Returns the maximum from a set of values. For dates, returns the latest date.",
      syntax: "MAX(Value 1, Value 2, [etc.])",
      params: [
        { name: "value1", hint: "e.g. Budget" },
        { name: "value2", hint: "e.g. Actual" }
      ],
      example: "MAX(Budget, Actual)"
    },
    {
      name: "MIN",
      description: "Returns the minimum from a set of values. For dates, returns the earliest date.",
      syntax: "MIN(Value 1, Value 2, [etc.])",
      params: [
        { name: "value1", hint: "e.g. Budget" },
        { name: "value2", hint: "e.g. Actual" }
      ],
      example: "MIN(Budget, Actual)"
    },
    {
      name: "MOD",
      description: "Returns the remainder when one number is divided by another (modulo).",
      syntax: "MOD(Dividend, Divisor)",
      params: [
        { name: "dividend", hint: "e.g. Row Number" },
        { name: "divisor", hint: "e.g. 2" }
      ],
      example: "MOD(Row Number, 2)"
    },
    {
      name: "MROUND",
      description: "Rounds a value to the nearest multiple of a number.",
      syntax: "MROUND(Number to round [, Multiple] [, Rounding direction])",
      params: [
        { name: "number", hint: "e.g. Price" },
        { name: "multiple", hint: "e.g. 0.05 (optional)", optional: true },
        { name: "direction", hint: "e.g. 0=nearest, 1=up, -1=down (optional)", optional: true }
      ],
      example: "MROUND(Price, 0.05)"
    },
    {
      name: "POWER",
      description: "Raises a number to the power you specify.",
      syntax: "POWER(Number, Power)",
      params: [
        { name: "number", hint: "e.g. 1 + Growth Rate" },
        { name: "power", hint: "e.g. Years" }
      ],
      example: "POWER(1 + Growth Rate, Years)"
    },
    {
      name: "ROUND",
      description: "Rounds a value to a specified number of decimal places, an integer, or a power of 10.",
      syntax: "ROUND(Number [, Decimal places] [, Rounding direction] [, Rounding method])",
      params: [
        { name: "number", hint: "e.g. Revenue / Units" },
        { name: "decimals", hint: "e.g. 2 (optional)", optional: true },
        { name: "direction", hint: "e.g. 0=nearest (optional)", optional: true }
      ],
      example: "ROUND(Revenue / Units, 2)"
    },
    {
      name: "SIGN",
      description: "Returns the sign of a number: 1 for positive, 0 for zero, -1 for negative.",
      syntax: "SIGN(Number)",
      params: [
        { name: "number", hint: "e.g. Variance" }
      ],
      example: "SIGN(Variance)"
    },
    {
      name: "SQRT",
      description: "Calculates the square root of a number.",
      syntax: "SQRT(Number)",
      params: [
        { name: "number", hint: "e.g. Variance" }
      ],
      example: "SQRT(Variance)"
    }
  ],

  "Text": [
    {
      name: "FIND",
      description: "Searches for the first occurrence of text within another text. Returns the position number, or 0 if not found.",
      syntax: "FIND(Text to find, Text to search [, Starting character])",
      params: [
        { name: "search_text", hint: "e.g. \"-\"" },
        { name: "text", hint: "e.g. Product Code" },
        { name: "start", hint: "e.g. 1 (optional)", optional: true }
      ],
      example: "FIND(\"-\", Product Code)"
    },
    {
      name: "LEFT",
      description: "Extracts a string of characters from text, starting from the left.",
      syntax: "LEFT(Text [, Number of characters])",
      params: [
        { name: "text", hint: "e.g. Product Code" },
        { name: "length", hint: "e.g. 3 (optional)", optional: true }
      ],
      example: "LEFT(Product Code, 3)"
    },
    {
      name: "LENGTH",
      description: "Returns the number of characters in a text string. Also known as LEN().",
      syntax: "LENGTH(Text to evaluate)",
      params: [
        { name: "text", hint: "e.g. Description" }
      ],
      example: "LENGTH(Description)"
    },
    {
      name: "LOWER",
      description: "Converts text values to lowercase.",
      syntax: "LOWER(Text [, Locale])",
      params: [
        { name: "text", hint: "e.g. Name" },
        { name: "locale", hint: "e.g. \"en_US\" (optional)", optional: true }
      ],
      example: "LOWER(Name)"
    },
    {
      name: "MAILTO",
      description: "Generates clickable links that send an email with recipients, subjects, and body text.",
      syntax: "MAILTO(Display text, To [, CC] [, BCC] [, Subject] [, Body text])",
      params: [
        { name: "display", hint: "e.g. \"Send Email\"" },
        { name: "to", hint: "e.g. Email Address" },
        { name: "subject", hint: "e.g. \"Approval Request\" (optional)", optional: true }
      ],
      example: "MAILTO(\"Send Email\", Email Address, , , \"Approval Request\")"
    },
    {
      name: "MAKELINK",
      description: "Generates clickable hyperlinks in a module.",
      syntax: "MAKELINK(Display text, URL)",
      params: [
        { name: "display", hint: "e.g. \"View Details\"" },
        { name: "url", hint: "e.g. Detail URL" }
      ],
      example: "MAKELINK(\"View Details\", Detail URL)"
    },
    {
      name: "MID",
      description: "Extracts a number of characters from a text string, starting from a character you select.",
      syntax: "MID(Text, Start position [, Number of characters])",
      params: [
        { name: "text", hint: "e.g. Product Code" },
        { name: "start", hint: "e.g. 2" },
        { name: "length", hint: "e.g. 5 (optional)", optional: true }
      ],
      example: "MID(Product Code, 2, 5)"
    },
    {
      name: "NAME",
      description: "Converts a list item to a text data type (returns its display name).",
      syntax: "NAME(List item)",
      params: [
        { name: "item", hint: "e.g. ITEM(Products)" }
      ],
      example: "NAME(ITEM(Products))"
    },
    {
      name: "RIGHT",
      description: "Extracts a string of characters from text, starting from the right.",
      syntax: "RIGHT(Text [, Number of characters])",
      params: [
        { name: "text", hint: "e.g. Product Code" },
        { name: "length", hint: "e.g. 4 (optional)", optional: true }
      ],
      example: "RIGHT(Product Code, 4)"
    },
    {
      name: "SUBSTITUTE",
      description: "Finds all occurrences of text within another and replaces them with a given value.",
      syntax: "SUBSTITUTE(Text to search, Text to find, Replacement text)",
      params: [
        { name: "text", hint: "e.g. Address" },
        { name: "old_text", hint: "e.g. \"Street\"" },
        { name: "new_text", hint: "e.g. \"St.\"" }
      ],
      example: "SUBSTITUTE(Address, \"Street\", \"St.\")"
    },
    {
      name: "TEXT",
      description: "Converts numeric values to text.",
      syntax: "TEXT(Number to convert)",
      params: [
        { name: "number", hint: "e.g. Revenue" }
      ],
      example: "TEXT(Revenue)"
    },
    {
      name: "TEXTLIST (Text)",
      description: "Concatenates a series of text values into a single text value with a separator.",
      syntax: "TEXTLIST(Text, Separator, List [, Duplicate behavior])",
      params: [
        { name: "text", hint: "e.g. Item Name" },
        { name: "separator", hint: "e.g. \", \"" },
        { name: "list", hint: "e.g. Products" },
        { name: "duplicates", hint: "e.g. 0=include (optional)", optional: true }
      ],
      example: "TEXTLIST(Item Name, \", \", Products)"
    },
    {
      name: "TRIM",
      description: "Removes all leading and trailing spaces, and extra spaces between words.",
      syntax: "TRIM(Text)",
      params: [
        { name: "text", hint: "e.g. User Input" }
      ],
      example: "TRIM(User Input)"
    },
    {
      name: "UPPER",
      description: "Converts text values to uppercase.",
      syntax: "UPPER(Text [, Locale])",
      params: [
        { name: "text", hint: "e.g. Name" },
        { name: "locale", hint: "e.g. \"en_US\" (optional)", optional: true }
      ],
      example: "UPPER(Name)"
    }
  ],

  "Time & Date": [
    {
      name: "ADDMONTHS",
      description: "Adds a number of months to a date.",
      syntax: "ADDMONTHS(Date, Number)",
      params: [
        { name: "date", hint: "e.g. Start Date" },
        { name: "months", hint: "e.g. 3" }
      ],
      example: "ADDMONTHS(Start Date, 3)"
    },
    {
      name: "ADDYEARS",
      description: "Adds a number of years to a date.",
      syntax: "ADDYEARS(Date, Number)",
      params: [
        { name: "date", hint: "e.g. Start Date" },
        { name: "years", hint: "e.g. 1" }
      ],
      example: "ADDYEARS(Start Date, 1)"
    },
    {
      name: "CUMULATE",
      description: "Calculates the cumulative sum of values over time or across a list. Can include a Boolean filter.",
      syntax: "CUMULATE(Values to add [, Boolean] [, List])",
      params: [
        { name: "values", hint: "e.g. Monthly Revenue" },
        { name: "filter", hint: "e.g. Is Active? (optional)", optional: true },
        { name: "list", hint: "e.g. Products (optional)", optional: true }
      ],
      example: "CUMULATE(Monthly Revenue)"
    },
    {
      name: "CURRENTPERIODEND",
      description: "Returns the end date from a model's current period.",
      syntax: "CURRENTPERIODEND()",
      params: [],
      example: "CURRENTPERIODEND()"
    },
    {
      name: "CURRENTPERIODSTART",
      description: "Returns the start date from a model's current period.",
      syntax: "CURRENTPERIODSTART()",
      params: [],
      example: "CURRENTPERIODSTART()"
    },
    {
      name: "DATE",
      description: "Forms a date from values that represent the year, month, and day.",
      syntax: "DATE(Year, Month, Day)",
      params: [
        { name: "year", hint: "e.g. 2026" },
        { name: "month", hint: "e.g. 1" },
        { name: "day", hint: "e.g. 15" }
      ],
      example: "DATE(2026, 1, 15)"
    },
    {
      name: "DAY",
      description: "Returns the day from a date as a number between 1 and 31. Returns 0 if blank.",
      syntax: "DAY(Date)",
      params: [
        { name: "date", hint: "e.g. Start Date" }
      ],
      example: "DAY(Start Date)"
    },
    {
      name: "DAYS",
      description: "Returns the number of days in a given time period.",
      syntax: "DAYS([Period])",
      params: [
        { name: "period", hint: "e.g. (leave blank for current period)", optional: true }
      ],
      example: "DAYS()"
    },
    {
      name: "DAYSINMONTH",
      description: "Returns the number of days in a month you specify.",
      syntax: "DAYSINMONTH(Year, Month)",
      params: [
        { name: "year", hint: "e.g. 2026" },
        { name: "month", hint: "e.g. 2" }
      ],
      example: "DAYSINMONTH(2026, 2)"
    },
    {
      name: "DAYSINYEAR",
      description: "Returns the number of days in a year you specify.",
      syntax: "DAYSINYEAR(Year)",
      params: [
        { name: "year", hint: "e.g. 2026" }
      ],
      example: "DAYSINYEAR(2026)"
    },
    {
      name: "DECUMULATE",
      description: "Subtracts the value of the previous item from the current over any dimension. Inverse of CUMULATE.",
      syntax: "DECUMULATE(Value to subtract [, List])",
      params: [
        { name: "value", hint: "e.g. Cumulative Total" },
        { name: "list", hint: "e.g. Products (optional)", optional: true }
      ],
      example: "DECUMULATE(Cumulative Total)"
    },
    {
      name: "END",
      description: "Returns the last date of a time period.",
      syntax: "END([Time period])",
      params: [
        { name: "period", hint: "e.g. (leave blank for current period)", optional: true }
      ],
      example: "END()"
    },
    {
      name: "HALFYEARTODATE",
      description: "Cumulates values within a half-year period. Resets every half-year based on fiscal year start.",
      syntax: "HALFYEARTODATE(Line item to cumulate)",
      params: [
        { name: "line_item", hint: "e.g. Revenue" }
      ],
      example: "HALFYEARTODATE(Revenue)"
    },
    {
      name: "HALFYEARVALUE",
      description: "Returns the half-yearly time summary in place of the detail value.",
      syntax: "HALFYEARVALUE(Line item)",
      params: [
        { name: "line_item", hint: "e.g. Revenue" }
      ],
      example: "HALFYEARVALUE(Revenue)"
    },
    {
      name: "INPERIOD",
      description: "Returns TRUE if a date falls within a time period or module's Time dimension. FALSE otherwise.",
      syntax: "INPERIOD(Date to test, Time period)",
      params: [
        { name: "date", hint: "e.g. Start Date" },
        { name: "period", hint: "e.g. ITEM(Time)" }
      ],
      example: "INPERIOD(Start Date, ITEM(Time))"
    },
    {
      name: "LAG",
      description: "Returns a value from a preceding position within the specified dimension.",
      syntax: "LAG(Value, Offset amount, Substitute [, Non-positive behavior, List])",
      params: [
        { name: "value", hint: "e.g. Revenue" },
        { name: "offset", hint: "e.g. 1" },
        { name: "substitute", hint: "e.g. 0" },
        { name: "list", hint: "e.g. (optional)", optional: true }
      ],
      example: "LAG(Revenue, 1, 0)"
    },
    {
      name: "LEAD",
      description: "Returns a value from a subsequent position within the specified dimension.",
      syntax: "LEAD(Value, Offset amount, Substitute [, Non-positive behavior, List])",
      params: [
        { name: "value", hint: "e.g. Revenue" },
        { name: "offset", hint: "e.g. 1" },
        { name: "substitute", hint: "e.g. 0" },
        { name: "list", hint: "e.g. (optional)", optional: true }
      ],
      example: "LEAD(Revenue, 1, 0)"
    },
    {
      name: "MONTH",
      description: "Converts a date or time period to a month in number format (1-12).",
      syntax: "MONTH(Value to convert [, Time period method])",
      params: [
        { name: "value", hint: "e.g. Start Date" },
        { name: "method", hint: "e.g. (optional)", optional: true }
      ],
      example: "MONTH(Start Date)"
    },
    {
      name: "MONTHTODATE",
      description: "Cumulates values within a monthly time range.",
      syntax: "MONTHTODATE(Line item to aggregate)",
      params: [
        { name: "line_item", hint: "e.g. Daily Revenue" }
      ],
      example: "MONTHTODATE(Daily Revenue)"
    },
    {
      name: "MONTHVALUE",
      description: "Returns the monthly time summary value for each time period within that month.",
      syntax: "MONTHVALUE(Line item)",
      params: [
        { name: "line_item", hint: "e.g. Revenue" }
      ],
      example: "MONTHVALUE(Revenue)"
    },
    {
      name: "MOVINGSUM",
      description: "Returns the sum of values over a changing (rolling) time range.",
      syntax: "MOVINGSUM(Line item [, Start offset] [, End offset] [, Aggregation method])",
      params: [
        { name: "line_item", hint: "e.g. Revenue" },
        { name: "start_offset", hint: "e.g. -11 (optional)", optional: true },
        { name: "end_offset", hint: "e.g. 0 (optional)", optional: true }
      ],
      example: "MOVINGSUM(Revenue, -11, 0)"
    },
    {
      name: "NEXT",
      description: "Evaluates an expression based on the next value across the selected dimension.",
      syntax: "NEXT(Expression [, List])",
      params: [
        { name: "expression", hint: "e.g. Closing Balance" },
        { name: "list", hint: "e.g. (optional)", optional: true }
      ],
      example: "NEXT(Closing Balance)"
    },
    {
      name: "OFFSET",
      description: "Returns a value from a preceding or following position in a dimension.",
      syntax: "OFFSET(Value, Offset amount, Substitute [, List])",
      params: [
        { name: "value", hint: "e.g. Revenue" },
        { name: "offset", hint: "e.g. -1" },
        { name: "substitute", hint: "e.g. 0" },
        { name: "list", hint: "e.g. (optional)", optional: true }
      ],
      example: "OFFSET(Revenue, -1, 0)"
    },
    {
      name: "PERIOD",
      description: "Converts a date to a time period.",
      syntax: "PERIOD(Date)",
      params: [
        { name: "date", hint: "e.g. Start Date" }
      ],
      example: "PERIOD(Start Date)"
    },
    {
      name: "POST",
      description: "Shifts or moves a number forward or backward along a dimension. Adds values if multiple land on the same target.",
      syntax: "POST(Value to post, Offset amount [, List])",
      params: [
        { name: "value", hint: "e.g. Order Amount" },
        { name: "offset", hint: "e.g. Lead Time" },
        { name: "list", hint: "e.g. (optional)", optional: true }
      ],
      example: "POST(Order Amount, Lead Time)"
    },
    {
      name: "PREVIOUS",
      description: "Evaluates an expression based on the preceding value across the selected dimension.",
      syntax: "PREVIOUS(Expression [, List])",
      params: [
        { name: "expression", hint: "e.g. Closing Balance" },
        { name: "list", hint: "e.g. (optional)", optional: true }
      ],
      example: "PREVIOUS(Closing Balance)"
    },
    {
      name: "PROFILE",
      description: "Multiplies values over any dimension based on a series of numbers (a profile).",
      syntax: "PROFILE(Numbers to change, Profile [, List])",
      params: [
        { name: "value", hint: "e.g. Annual Target" },
        { name: "profile", hint: "e.g. Seasonal %" },
        { name: "list", hint: "e.g. (optional)", optional: true }
      ],
      example: "PROFILE(Annual Target, Seasonal %)"
    },
    {
      name: "QUARTERTODATE",
      description: "Cumulates values within a quarterly time range.",
      syntax: "QUARTERTODATE(Line item to aggregate)",
      params: [
        { name: "line_item", hint: "e.g. Revenue" }
      ],
      example: "QUARTERTODATE(Revenue)"
    },
    {
      name: "QUARTERVALUE",
      description: "Returns the quarterly time summary in place of the detail value.",
      syntax: "QUARTERVALUE(Line item)",
      params: [
        { name: "line_item", hint: "e.g. Revenue" }
      ],
      example: "QUARTERVALUE(Revenue)"
    },
    {
      name: "SPREAD",
      description: "Divides a value evenly over multiple entities in a dimension.",
      syntax: "SPREAD(Value to divide, Entity count [, List])",
      params: [
        { name: "value", hint: "e.g. Annual Budget" },
        { name: "count", hint: "e.g. 12" },
        { name: "list", hint: "e.g. (optional)", optional: true }
      ],
      example: "SPREAD(Annual Budget, 12)"
    },
    {
      name: "START",
      description: "Returns the first date of a time period.",
      syntax: "START(Time period)",
      params: [
        { name: "period", hint: "e.g. (leave blank for current)", optional: true }
      ],
      example: "START()"
    },
    {
      name: "TIMESUM",
      description: "Aggregates values between two time periods and returns a single value.",
      syntax: "TIMESUM(Line item [, Start period] [, End period] [, Aggregation method])",
      params: [
        { name: "line_item", hint: "e.g. Revenue" },
        { name: "start", hint: "e.g. FY26 Jan (optional)", optional: true },
        { name: "end", hint: "e.g. FY26 Dec (optional)", optional: true }
      ],
      example: "TIMESUM(Revenue)"
    },
    {
      name: "WEEKDAY",
      description: "Converts a date to a number between 1 and 7, representing the day of the week.",
      syntax: "WEEKDAY(Date [, First day of the week])",
      params: [
        { name: "date", hint: "e.g. Transaction Date" },
        { name: "first_day", hint: "e.g. 1=Sunday (optional)", optional: true }
      ],
      example: "WEEKDAY(Transaction Date)"
    },
    {
      name: "WEEKTODATE",
      description: "Aggregates daily values within a week. Resets after the last day of the week.",
      syntax: "WEEKTODATE(Line item to aggregate)",
      params: [
        { name: "line_item", hint: "e.g. Daily Revenue" }
      ],
      example: "WEEKTODATE(Daily Revenue)"
    },
    {
      name: "WEEKVALUE",
      description: "Returns the weekly time summary value for each time period within that week.",
      syntax: "WEEKVALUE(Line item)",
      params: [
        { name: "line_item", hint: "e.g. Revenue" }
      ],
      example: "WEEKVALUE(Revenue)"
    },
    {
      name: "YEAR",
      description: "Converts a date or time period to a year in number format.",
      syntax: "YEAR(Value to convert [, Time period method])",
      params: [
        { name: "value", hint: "e.g. Start Date" },
        { name: "method", hint: "e.g. (optional)", optional: true }
      ],
      example: "YEAR(Start Date)"
    },
    {
      name: "YEARTODATE",
      description: "Cumulates values within a yearly time range. Resets at each yearly start date based on Calendar Type.",
      syntax: "YEARTODATE(Line item)",
      params: [
        { name: "line_item", hint: "e.g. Revenue" }
      ],
      example: "YEARTODATE(Revenue)"
    },
    {
      name: "YEARVALUE",
      description: "Returns the yearly time summary value for each time period within that year.",
      syntax: "YEARVALUE(Line item)",
      params: [
        { name: "line_item", hint: "e.g. Revenue" }
      ],
      example: "YEARVALUE(Revenue)"
    }
  ],

  "Miscellaneous": [
    {
      name: "CODE",
      description: "Returns a list item's code.",
      syntax: "CODE(Item)",
      params: [
        { name: "item", hint: "e.g. ITEM(Products)" }
      ],
      example: "CODE(ITEM(Products))"
    },
    {
      name: "COLLECT",
      description: "Used in a module with a line item subset to pull source line item values into the module.",
      syntax: "COLLECT()",
      params: [],
      example: "COLLECT()"
    },
    {
      name: "CURRENTVERSION",
      description: "Returns the value from another line item for the version set as Current in the model.",
      syntax: "CURRENTVERSION(Expression)",
      params: [
        { name: "expression", hint: "e.g. Revenue" }
      ],
      example: "CURRENTVERSION(Revenue)"
    },
    {
      name: "FINDITEM",
      description: "Searches a list for a matching item using text input. Returns the list item if found.",
      syntax: "FINDITEM(List, Text)",
      params: [
        { name: "list", hint: "e.g. Employees" },
        { name: "text", hint: "e.g. Manager Name" }
      ],
      example: "FINDITEM(Employees, Manager Name)"
    },
    {
      name: "HIERARCHYLEVEL",
      description: "Finds a coordinate's position (level) in a given list hierarchy.",
      syntax: "HIERARCHYLEVEL(List [, Direction [, Level type]])",
      params: [
        { name: "list", hint: "e.g. Organization" },
        { name: "direction", hint: "e.g. 0=from root (optional)", optional: true },
        { name: "level_type", hint: "e.g. (optional)", optional: true }
      ],
      example: "HIERARCHYLEVEL(Organization)"
    },
    {
      name: "ITEM",
      description: "Returns the list item or time period that applies to each cell.",
      syntax: "ITEM(List)",
      params: [
        { name: "list", hint: "e.g. Products" }
      ],
      example: "ITEM(Products)"
    },
    {
      name: "ITEMLEVEL",
      description: "Finds a given item's position within its list. Distance from root or furthest leaf.",
      syntax: "ITEMLEVEL(Item [, Direction])",
      params: [
        { name: "item", hint: "e.g. ITEM(Departments)" },
        { name: "direction", hint: "e.g. 0=from root (optional)", optional: true }
      ],
      example: "ITEMLEVEL(ITEM(Departments))"
    },
    {
      name: "NEXTVERSION",
      description: "Evaluates the given expression using the next version.",
      syntax: "NEXTVERSION(Expression)",
      params: [
        { name: "expression", hint: "e.g. Revenue" }
      ],
      example: "NEXTVERSION(Revenue)"
    },
    {
      name: "PARENT",
      description: "Returns the parent item of list items and time periods.",
      syntax: "PARENT(Child value)",
      params: [
        { name: "child", hint: "e.g. ITEM(Departments)" }
      ],
      example: "PARENT(ITEM(Departments))"
    },
    {
      name: "PREVIOUSVERSION",
      description: "Evaluates the given expression using the previous version.",
      syntax: "PREVIOUSVERSION(Expression)",
      params: [
        { name: "expression", hint: "e.g. Revenue" }
      ],
      example: "PREVIOUSVERSION(Revenue)"
    },
    {
      name: "RANK",
      description: "Evaluates a set of values and assigns sequential rankings starting at 1.",
      syntax: "RANK(Source values [, Direction] [, Equal value behavior] [, Include value] [, Ranking groups])",
      params: [
        { name: "values", hint: "e.g. Revenue" },
        { name: "direction", hint: "e.g. 0=descending (optional)", optional: true },
        { name: "equal_behavior", hint: "e.g. (optional)", optional: true }
      ],
      example: "RANK(Revenue)"
    },
    {
      name: "RANKCUMULATE",
      description: "Ranks values then cumulates them in order of ranking. Supports grouping.",
      syntax: "RANKCUMULATE(Cumulation values, Ranking values [, Direction] [, Include] [, Groups])",
      params: [
        { name: "cumulation_values", hint: "e.g. Revenue" },
        { name: "ranking_values", hint: "e.g. Priority Score" },
        { name: "direction", hint: "e.g. 0=descending (optional)", optional: true }
      ],
      example: "RANKCUMULATE(Revenue, Priority Score)"
    },
    {
      name: "VALUE",
      description: "Converts text representations of numbers into numeric values.",
      syntax: "VALUE(Value to convert)",
      params: [
        { name: "value", hint: "e.g. Price Text" }
      ],
      example: "VALUE(Price Text)"
    }
  ],

  "Financial": [
    {
      name: "COUPDAYBS",
      description: "Calculates the number of days from the beginning of the coupon period until the settlement date.",
      syntax: "COUPDAYBS(Settlement, Maturity, Frequency [, Basis])",
      params: [
        { name: "settlement", hint: "e.g. Settlement Date" },
        { name: "maturity", hint: "e.g. Maturity Date" },
        { name: "frequency", hint: "e.g. 2 (semi-annual)" },
        { name: "basis", hint: "e.g. 0 (optional)", optional: true }
      ],
      example: "COUPDAYBS(Settlement Date, Maturity Date, 2)"
    },
    {
      name: "COUPDAYS",
      description: "Returns the number of coupon days in the coupon period that contains the settlement date.",
      syntax: "COUPDAYS(Settlement, Maturity, Frequency [, Basis])",
      params: [
        { name: "settlement", hint: "e.g. Settlement Date" },
        { name: "maturity", hint: "e.g. Maturity Date" },
        { name: "frequency", hint: "e.g. 2" },
        { name: "basis", hint: "e.g. 0 (optional)", optional: true }
      ],
      example: "COUPDAYS(Settlement Date, Maturity Date, 2)"
    },
    {
      name: "COUPDAYSNC",
      description: "Calculates the number of coupon days from the settlement date to the next coupon date.",
      syntax: "COUPDAYSNC(Settlement, Maturity, Frequency [, Basis])",
      params: [
        { name: "settlement", hint: "e.g. Settlement Date" },
        { name: "maturity", hint: "e.g. Maturity Date" },
        { name: "frequency", hint: "e.g. 2" },
        { name: "basis", hint: "e.g. 0 (optional)", optional: true }
      ],
      example: "COUPDAYSNC(Settlement Date, Maturity Date, 2)"
    },
    {
      name: "COUPNCD",
      description: "Calculates the next coupon date after a settlement date.",
      syntax: "COUPNCD(Settlement, Maturity, Frequency)",
      params: [
        { name: "settlement", hint: "e.g. Settlement Date" },
        { name: "maturity", hint: "e.g. Maturity Date" },
        { name: "frequency", hint: "e.g. 2" }
      ],
      example: "COUPNCD(Settlement Date, Maturity Date, 2)"
    },
    {
      name: "COUPNUM",
      description: "Returns the number of coupons payable between a settlement and maturity date.",
      syntax: "COUPNUM(Settlement, Maturity, Frequency)",
      params: [
        { name: "settlement", hint: "e.g. Settlement Date" },
        { name: "maturity", hint: "e.g. Maturity Date" },
        { name: "frequency", hint: "e.g. 2" }
      ],
      example: "COUPNUM(Settlement Date, Maturity Date, 2)"
    },
    {
      name: "COUPPCD",
      description: "Calculates the previous coupon date before a settlement date.",
      syntax: "COUPPCD(Settlement, Maturity, Frequency)",
      params: [
        { name: "settlement", hint: "e.g. Settlement Date" },
        { name: "maturity", hint: "e.g. Maturity Date" },
        { name: "frequency", hint: "e.g. 2" }
      ],
      example: "COUPPCD(Settlement Date, Maturity Date, 2)"
    },
    {
      name: "CUMIPMT",
      description: "Calculates the cumulative interest paid on a loan over a period given equal payments.",
      syntax: "CUMIPMT(Rate, Periods, Principal, Start, End [, Timing])",
      params: [
        { name: "rate", hint: "e.g. Interest Rate" },
        { name: "periods", hint: "e.g. 360" },
        { name: "principal", hint: "e.g. Loan Amount" },
        { name: "start", hint: "e.g. 1" },
        { name: "end", hint: "e.g. 12" }
      ],
      example: "CUMIPMT(Interest Rate, 360, Loan Amount, 1, 12)"
    },
    {
      name: "CUMPRINC",
      description: "Calculates the amount of principal paid on a loan over a period, given consistent payments.",
      syntax: "CUMPRINC(Rate, Periods, Balance, Start, End [, Timing])",
      params: [
        { name: "rate", hint: "e.g. Interest Rate" },
        { name: "periods", hint: "e.g. 360" },
        { name: "balance", hint: "e.g. Loan Balance" },
        { name: "start", hint: "e.g. 1" },
        { name: "end", hint: "e.g. 12" }
      ],
      example: "CUMPRINC(Interest Rate, 360, Loan Balance, 1, 12)"
    },
    {
      name: "DURATION",
      description: "Calculates the Macauley duration (weighted average maturity of cash flows) for a bond.",
      syntax: "DURATION(Settlement, Maturity, Rate, Yield, Frequency [, Basis])",
      params: [
        { name: "settlement", hint: "e.g. Settlement Date" },
        { name: "maturity", hint: "e.g. Maturity Date" },
        { name: "rate", hint: "e.g. Coupon Rate" },
        { name: "yield_val", hint: "e.g. Yield" },
        { name: "frequency", hint: "e.g. 2" }
      ],
      example: "DURATION(Settlement Date, Maturity Date, Coupon Rate, Yield, 2)"
    },
    {
      name: "FV",
      description: "Calculates the future value (closing balance) of an investment.",
      syntax: "FV(Rate, Periods, Payments [, Present value] [, Timing])",
      params: [
        { name: "rate", hint: "e.g. Interest Rate" },
        { name: "periods", hint: "e.g. 12" },
        { name: "payments", hint: "e.g. -Monthly Payment" },
        { name: "pv", hint: "e.g. -Loan Amount (optional)", optional: true }
      ],
      example: "FV(Interest Rate, 12, -Monthly Payment)"
    },
    {
      name: "IPMT",
      description: "Calculates the interest portion of a loan payment in a given period.",
      syntax: "IPMT(Rate, Period, Periods, PV [, FV] [, Timing])",
      params: [
        { name: "rate", hint: "e.g. Interest Rate" },
        { name: "period", hint: "e.g. Current Period" },
        { name: "total_periods", hint: "e.g. 360" },
        { name: "pv", hint: "e.g. Loan Amount" }
      ],
      example: "IPMT(Interest Rate, Current Period, 360, Loan Amount)"
    },
    {
      name: "IRR",
      description: "Calculates the internal rate of return for a series of cash flows. Returns annualized rate.",
      syntax: "IRR(Cash flows [, Estimate]) or IRR(Cash flows, Dates, List [, Estimate])",
      params: [
        { name: "cashflows", hint: "e.g. Net Cash Flow" },
        { name: "estimate", hint: "e.g. 0.1 (optional)", optional: true }
      ],
      example: "IRR(Net Cash Flow)"
    },
    {
      name: "MDURATION",
      description: "Calculates the modified Macauley duration (price sensitivity to interest rate changes).",
      syntax: "MDURATION(Settlement, Maturity, Rate, Yield, Frequency [, Basis])",
      params: [
        { name: "settlement", hint: "e.g. Settlement Date" },
        { name: "maturity", hint: "e.g. Maturity Date" },
        { name: "rate", hint: "e.g. Coupon Rate" },
        { name: "yield_val", hint: "e.g. Yield" },
        { name: "frequency", hint: "e.g. 2" }
      ],
      example: "MDURATION(Settlement Date, Maturity Date, Coupon Rate, Yield, 2)"
    },
    {
      name: "NPER",
      description: "Calculates the number of periods needed to achieve a certain value for a loan or investment.",
      syntax: "NPER(Rate, Payments, PV [, FV] [, Timing])",
      params: [
        { name: "rate", hint: "e.g. Interest Rate" },
        { name: "payments", hint: "e.g. -Monthly Payment" },
        { name: "pv", hint: "e.g. Loan Amount" }
      ],
      example: "NPER(Interest Rate, -Monthly Payment, Loan Amount)"
    },
    {
      name: "NPV",
      description: "Calculates the net present value for a series of cash flows using a constant discount rate.",
      syntax: "NPV(Discount rate, Cash flows) or NPV(Rate, Cash flows, Dates, List)",
      params: [
        { name: "rate", hint: "e.g. Discount Rate" },
        { name: "cashflows", hint: "e.g. Net Cash Flow" }
      ],
      example: "NPV(Discount Rate, Net Cash Flow)"
    },
    {
      name: "PMT",
      description: "Calculates the periodic payment for a loan or annuity given a consistent interest rate.",
      syntax: "PMT(Rate, Periods, PV [, FV] [, Timing])",
      params: [
        { name: "rate", hint: "e.g. Interest Rate" },
        { name: "periods", hint: "e.g. 360" },
        { name: "pv", hint: "e.g. Loan Amount" }
      ],
      example: "PMT(Interest Rate, 360, Loan Amount)"
    },
    {
      name: "PPMT",
      description: "Calculates the principal portion of a loan payment in a given period.",
      syntax: "PPMT(Rate, Period, Periods, PV [, FV] [, Timing])",
      params: [
        { name: "rate", hint: "e.g. Interest Rate" },
        { name: "period", hint: "e.g. Current Period" },
        { name: "total_periods", hint: "e.g. 360" },
        { name: "pv", hint: "e.g. Loan Amount" }
      ],
      example: "PPMT(Interest Rate, Current Period, 360, Loan Amount)"
    },
    {
      name: "PRICE",
      description: "Calculates the price per 100 monetary units for a bond that pays periodic interest.",
      syntax: "PRICE(Settlement, Maturity, Rate, Yield, Redemption, Frequency [, Basis])",
      params: [
        { name: "settlement", hint: "e.g. Settlement Date" },
        { name: "maturity", hint: "e.g. Maturity Date" },
        { name: "rate", hint: "e.g. Coupon Rate" },
        { name: "yield_val", hint: "e.g. Yield" },
        { name: "redemption", hint: "e.g. 100" },
        { name: "frequency", hint: "e.g. 2" }
      ],
      example: "PRICE(Settlement Date, Maturity Date, Coupon Rate, Yield, 100, 2)"
    },
    {
      name: "PV",
      description: "Calculates the present value of an investment or the principal value of a loan.",
      syntax: "PV(Rate, Periods, Payments, FV, Timing)",
      params: [
        { name: "rate", hint: "e.g. Interest Rate" },
        { name: "periods", hint: "e.g. 360" },
        { name: "payments", hint: "e.g. -Monthly Payment" },
        { name: "fv", hint: "e.g. 0 (optional)", optional: true }
      ],
      example: "PV(Interest Rate, 360, -Monthly Payment, 0)"
    },
    {
      name: "RATE",
      description: "Calculates the interest rate for a loan or investment based on duration, payments, and values.",
      syntax: "RATE(Periods, Payments, PV [, FV [, Timing [, Estimate]]])",
      params: [
        { name: "periods", hint: "e.g. 360" },
        { name: "payments", hint: "e.g. -Monthly Payment" },
        { name: "pv", hint: "e.g. Loan Amount" }
      ],
      example: "RATE(360, -Monthly Payment, Loan Amount)"
    },
    {
      name: "YEARFRAC",
      description: "Calculates the fraction of a year between two dates using a day-count convention (basis).",
      syntax: "YEARFRAC(Start, End [, Basis])",
      params: [
        { name: "start", hint: "e.g. Start Date" },
        { name: "end", hint: "e.g. End Date" },
        { name: "basis", hint: "e.g. 0 (optional)", optional: true }
      ],
      example: "YEARFRAC(Start Date, End Date)"
    },
    {
      name: "YIELD",
      description: "Calculates the yield to maturity (YTM) of a bond.",
      syntax: "YIELD(Settlement, Maturity, Rate, Price, Redemption, Frequency [, Basis])",
      params: [
        { name: "settlement", hint: "e.g. Settlement Date" },
        { name: "maturity", hint: "e.g. Maturity Date" },
        { name: "rate", hint: "e.g. Coupon Rate" },
        { name: "price", hint: "e.g. Bond Price" },
        { name: "redemption", hint: "e.g. 100" },
        { name: "frequency", hint: "e.g. 2" }
      ],
      example: "YIELD(Settlement Date, Maturity Date, Coupon Rate, Bond Price, 100, 2)"
    }
  ],

  "Call Center Planning": [
    {
      name: "AGENTS",
      description: "Calculates the number of agents needed to fulfil requests within a target response time.",
      syntax: "AGENTS(SLA, Target response time, Arrival rate, Average duration)",
      params: [
        { name: "sla", hint: "e.g. 0.8 (80%)" },
        { name: "target_time", hint: "e.g. 20" },
        { name: "arrival_rate", hint: "e.g. Calls Per Hour" },
        { name: "avg_duration", hint: "e.g. Avg Handle Time" }
      ],
      example: "AGENTS(0.8, 20, Calls Per Hour, Avg Handle Time)"
    },
    {
      name: "AGENTSB",
      description: "Calculates the number of servers required to answer a specified SLA within a busy period.",
      syntax: "AGENTSB(SLA, Arrival rate, Average duration)",
      params: [
        { name: "sla", hint: "e.g. 0.8" },
        { name: "arrival_rate", hint: "e.g. Calls Per Hour" },
        { name: "avg_duration", hint: "e.g. Avg Handle Time" }
      ],
      example: "AGENTSB(0.8, Calls Per Hour, Avg Handle Time)"
    },
    {
      name: "ANSWERTIME",
      description: "Calculates the minimum hold time required to answer a certain SLA percentage of calls.",
      syntax: "ANSWERTIME(Servers, SLA, Arrival rate, Average duration)",
      params: [
        { name: "servers", hint: "e.g. Agent Count" },
        { name: "sla", hint: "e.g. 0.8" },
        { name: "arrival_rate", hint: "e.g. Calls Per Hour" },
        { name: "avg_duration", hint: "e.g. Avg Handle Time" }
      ],
      example: "ANSWERTIME(Agent Count, 0.8, Calls Per Hour, Avg Handle Time)"
    },
    {
      name: "ARRIVALRATE",
      description: "Calculates the maximum arrival rate possible while meeting the SLA.",
      syntax: "ARRIVALRATE(Servers, SLA, Target response time, Average duration)",
      params: [
        { name: "servers", hint: "e.g. Agent Count" },
        { name: "sla", hint: "e.g. 0.8" },
        { name: "target_time", hint: "e.g. 20" },
        { name: "avg_duration", hint: "e.g. Avg Handle Time" }
      ],
      example: "ARRIVALRATE(Agent Count, 0.8, 20, Avg Handle Time)"
    },
    {
      name: "AVGDURATION",
      description: "Calculates the required average call duration to meet a target SLA.",
      syntax: "AVGDURATION(Servers, SLA, Target response time, Arrival rate)",
      params: [
        { name: "servers", hint: "e.g. Agent Count" },
        { name: "sla", hint: "e.g. 0.8" },
        { name: "target_time", hint: "e.g. 20" },
        { name: "arrival_rate", hint: "e.g. Calls Per Hour" }
      ],
      example: "AVGDURATION(Agent Count, 0.8, 20, Calls Per Hour)"
    },
    {
      name: "AVGWAIT",
      description: "Calculates the average waiting time for a call to be processed.",
      syntax: "AVGWAIT(Servers, Arrival rate, Average duration)",
      params: [
        { name: "servers", hint: "e.g. Agent Count" },
        { name: "arrival_rate", hint: "e.g. Calls Per Hour" },
        { name: "avg_duration", hint: "e.g. Avg Handle Time" }
      ],
      example: "AVGWAIT(Agent Count, Calls Per Hour, Avg Handle Time)"
    },
    {
      name: "ERLANGB",
      description: "Determines the probability of a request being blocked given servers, arrival rate, and duration.",
      syntax: "ERLANGB(Servers, Arrival rate, Average duration)",
      params: [
        { name: "servers", hint: "e.g. Agent Count" },
        { name: "arrival_rate", hint: "e.g. Calls Per Hour" },
        { name: "avg_duration", hint: "e.g. Avg Handle Time" }
      ],
      example: "ERLANGB(Agent Count, Calls Per Hour, Avg Handle Time)"
    },
    {
      name: "ERLANGC",
      description: "Determines the probability of a request being placed in a queue.",
      syntax: "ERLANGC(Servers, Arrival rate, Average duration)",
      params: [
        { name: "servers", hint: "e.g. Agent Count" },
        { name: "arrival_rate", hint: "e.g. Calls Per Hour" },
        { name: "avg_duration", hint: "e.g. Avg Handle Time" }
      ],
      example: "ERLANGC(Agent Count, Calls Per Hour, Avg Handle Time)"
    },
    {
      name: "SLA",
      description: "Calculates what percentage of calls will be answered within a target answer time.",
      syntax: "SLA(Servers, Target response time, Arrival rate, Average duration)",
      params: [
        { name: "servers", hint: "e.g. Agent Count" },
        { name: "target_time", hint: "e.g. 20" },
        { name: "arrival_rate", hint: "e.g. Calls Per Hour" },
        { name: "avg_duration", hint: "e.g. Avg Handle Time" }
      ],
      example: "SLA(Agent Count, 20, Calls Per Hour, Avg Handle Time)"
    }
  ]
};

const FORMULA_SCENARIOS = {
  // Aggregation
  "SUM": "A regional manager needs total revenue across all products. The detail module has revenue by product; using SUM with a product-to-region mapping rolls it up to the regional summary module.",
  "AVERAGE": "HR wants the average salary per department. The employee module stores individual salaries; AVERAGE with an employee-to-department mapping returns the mean for each department.",
  "MAX (Aggregation)": "A procurement team needs to find the highest bid across all suppliers for each component. MAX aggregation surfaces the top value per component.",
  "MIN (Aggregation)": "Identify the lowest shipping cost among all carriers for each route to help select the cheapest option.",
  "ANY": "Management wants to know if any store in a region hit its sales target. ANY returns TRUE for a region if at least one store's 'Target Met?' flag is TRUE.",
  "ALL": "Quality assurance needs to confirm that every batch in a production run passed inspection. ALL returns TRUE only when every item's 'Passed?' flag is TRUE.",
  "FIRSTNONBLANK": "Retrieve the earliest comment entered across project tasks. Useful for audit trails where you need the first recorded note.",
  "LASTNONBLANK": "Get the most recent status update across all sub-tasks for each project, showing the latest progress note.",
  "TEXTLIST (Aggregation)": "Generate a comma-separated list of employee names within each department for a roster report.",

  // Mapping
  "LOOKUP": "A transactions module needs the tax rate from a configuration module. LOOKUP pulls the rate using a region mapping line item.",
  "SELECT": "Compare all months against the FY26 annual budget by selecting the specific FY26 value to display alongside each month's actuals.",

  // Logical
  "IF THEN ELSE": "Classify customers as 'Premium' if annual spend exceeds $100K, otherwise 'Standard'. Drives different discount rates downstream.",
  "COMPARE": "Sort product names alphabetically by comparing pairs—returns 0 if identical, 1 or -1 for ordering.",
  "ISBLANK": "Flag forecast cells where revenue has not yet been entered so planners know which items still need input.",
  "ISNOTBLANK": "Count how many line items in a planning module already have data populated to track completion percentage.",
  "ISFIRSTOCCURRENCE": "Deduplicate a transaction list imported from ERP. Flag only the first occurrence of each invoice number to avoid double-counting.",
  "ISACTUALVERSION": "Apply a lookup formula only in the Actual version (live data from ERP) while letting other versions use manual input.",
  "ISCURRENTVERSION": "Highlight the current forecast version differently in dashboards to distinguish it from prior scenarios.",
  "ISANCESTOR": "In a product hierarchy, check if 'Electronics' is an ancestor of 'Laptops' to conditionally apply category-level pricing rules.",

  // Numeric
  "ABS": "Calculate the absolute variance between actual and budget. ABS ensures the result is always positive for magnitude comparisons.",
  "DIVIDE": "Compute revenue per unit safely—DIVIDE returns 0 instead of an error when units sold is zero.",
  "EXP": "Model continuous compound growth: multiply principal by EXP(rate × years) for continuously compounded interest.",
  "FIRSTNONZERO": "Determine the effective price: use the override price if entered, otherwise fall back to the standard price.",
  "LN": "Calculate the number of years needed to double an investment: LN(2) / LN(1 + rate).",
  "LOG": "Convert revenue figures to a log scale for charting that spans several orders of magnitude.",
  "MAX": "Ensure a minimum floor price: MAX(Calculated Price, Minimum Price) returns whichever is higher.",
  "MIN": "Cap an expense at a budget ceiling: MIN(Actual Expense, Budget Cap) ensures you never exceed the limit.",
  "MOD": "Alternate row shading in a numbered list: MOD(Row Number, 2) returns 0 or 1 to flag even/odd rows.",
  "MROUND": "Round product prices to the nearest $0.05 for retail display (e.g., $9.97 → $9.95).",
  "POWER": "Project future value with compound growth: POWER(1 + Growth Rate, Years) gives the compounding multiplier.",
  "ROUND": "Round calculated unit costs to 2 decimal places before displaying in financial reports.",
  "SIGN": "Determine the direction of variance: SIGN(Actual - Budget) returns 1 for favorable, -1 for unfavorable, 0 for on-target.",
  "SQRT": "Calculate standard deviation components or distance metrics that require a square root step.",

  // Text
  "FIND": "Locate the position of a hyphen in a product code (e.g., 'ABC-123') to split it into prefix and suffix parts.",
  "LEFT": "Extract a 3-character region code from the beginning of an account number like 'NYC-45678'.",
  "LENGTH": "Validate that product codes are exactly 10 characters long. Flag any that don't match for data cleansing.",
  "LOWER": "Normalize email addresses to lowercase before comparing them across imported data sources.",
  "MAILTO": "Create a clickable 'Send Email' link in a dashboard that pre-fills the recipient and subject line for approval requests.",
  "MAKELINK": "Generate a clickable URL in a module that links to each project's detail page in an external system.",
  "MID": "Extract the department code from positions 4–6 of an employee ID string like 'US-FIN-0042'.",
  "NAME": "Convert a list item (e.g., a product from the Products list) to text so it can be concatenated into a descriptive label.",
  "RIGHT": "Extract the last 4 digits of a purchase order number for a summary reference.",
  "SUBSTITUTE": "Replace 'Street' with 'St.' in address fields to standardize mailing labels across the customer database.",
  "TEXT": "Convert a numeric revenue figure to text so it can be concatenated into a summary string like 'Revenue: $1,000'.",
  "TEXTLIST (Text)": "Concatenate all product names in a list into a single comma-separated string for a report summary cell.",
  "TRIM": "Clean up imported data by removing leading/trailing spaces from customer names that cause lookup mismatches.",
  "UPPER": "Convert region codes to uppercase for consistent display and comparison across modules.",

  // Time & Date
  "ADDMONTHS": "Calculate a contract renewal date by adding 12 months to the original start date.",
  "ADDYEARS": "Project a lease expiration by adding the lease term (in years) to the commencement date.",
  "CUMULATE": "Build a running total of monthly revenue across the year. Resets can be controlled with a Boolean filter.",
  "CURRENTPERIODEND": "Determine how many days remain in the current period: CURRENTPERIODEND() minus today's date.",
  "CURRENTPERIODSTART": "Calculate pro-rated values by checking how far into the current period we are.",
  "DATE": "Construct a specific date from separate year, month, and day inputs (e.g., from a planning form).",
  "DAY": "Extract the day component from a transaction date to analyze daily patterns within a month.",
  "DAYS": "Calculate the number of days in each time period to convert monthly rates to daily rates.",
  "DAYSINMONTH": "Determine how many days are in February of a given year to handle leap year calculations correctly.",
  "DAYSINYEAR": "Convert an annual interest rate to a daily rate by dividing by DAYSINYEAR for the relevant year.",
  "DECUMULATE": "Reverse a cumulative balance to recover the original periodic increments (inverse of CUMULATE).",
  "END": "Get the last date of each time period to determine payment due dates that fall on period-end.",
  "HALFYEARTODATE": "Track revenue accumulation within each half-year, resetting at the mid-year boundary.",
  "HALFYEARVALUE": "Display the half-yearly summary total in every month within that half-year for consistent reporting.",
  "INPERIOD": "Determine if a project milestone date falls within the current planning month for scheduling dashboards.",
  "LAG": "Compare this month's revenue to last month's: LAG(Revenue, 1, 0) retrieves the prior period's value.",
  "LEAD": "Preview next month's forecast: LEAD(Forecast, 1, 0) pulls the value from the following period.",
  "MONTH": "Extract the month number from a date to group transactions by month in a summary report.",
  "MONTHTODATE": "Aggregate daily sales figures into a running month-to-date total that resets each month.",
  "MONTHVALUE": "Display the monthly summary value for each week within that month for consistent period reporting.",
  "MOVINGSUM": "Calculate a trailing 12-month revenue total: MOVINGSUM(Revenue, -11, 0) sums the current and prior 11 months.",
  "NEXT": "In a balance roll-forward, reference the next period's opening balance to validate continuity.",
  "OFFSET": "Retrieve last year's value for the same month: OFFSET(Revenue, -12, 0) goes back 12 periods.",
  "PERIOD": "Convert a specific date into its corresponding Anaplan time period for time-dimensioned lookups.",
  "POST": "Shift order amounts forward by lead time days—if an order takes 3 months to fulfill, POST moves the revenue to the delivery month.",
  "PREVIOUS": "Calculate month-over-month change: Revenue - PREVIOUS(Revenue) gives the delta from the prior period.",
  "PROFILE": "Distribute an annual sales target across months using a seasonal weighting pattern (e.g., heavier in Q4).",
  "QUARTERTODATE": "Track quarterly sales accumulation for bonus calculations that reset at each quarter boundary.",
  "QUARTERVALUE": "Show the quarterly total in every month within that quarter for consistent management reporting.",
  "SPREAD": "Evenly distribute an annual budget of $120K across 12 months ($10K each).",
  "START": "Get the first date of each time period to calculate elapsed days since period start.",
  "TIMESUM": "Sum up all monthly revenue values across the full year into a single annual total.",
  "WEEKDAY": "Identify weekend days (Saturday=7, Sunday=1) to exclude them from business day calculations.",
  "WEEKTODATE": "Aggregate daily call volumes into a week-to-date running total for call center dashboards.",
  "WEEKVALUE": "Display the weekly total for each day within that week in a daily-granularity report.",
  "YEAR": "Extract the year from a transaction date to group records by fiscal year.",
  "YEARTODATE": "Build a cumulative year-to-date revenue line that automatically resets at each fiscal year start.",
  "YEARVALUE": "Show the annual summary value in every period within that year for top-level comparisons.",

  // Miscellaneous
  "CODE": "Retrieve the unique code assigned to a list item (e.g., product SKU) for use in data imports or exports.",
  "COLLECT": "Pull line item values from a source module into a module dimensioned by a line item subset.",
  "CURRENTVERSION": "Always reference the 'Current' version's revenue for comparison, regardless of which version is active.",
  "FINDITEM": "Match a text employee name from an imported file to the corresponding item in the Employees list.",
  "HIERARCHYLEVEL": "Determine how deep an item is in an organizational hierarchy (e.g., CEO=1, VP=2, Director=3).",
  "ITEM": "Return the current list item to use in conditional logic (e.g., IF ITEM(Regions) = 'North America' THEN ...).",
  "ITEMLEVEL": "Find how many levels from the root a specific department sits in a nested org chart.",
  "NEXTVERSION": "Compare the current version's forecast against the next version's plan to analyze version-over-version changes.",
  "PARENT": "Navigate up a product hierarchy to get the parent category for each product.",
  "PREVIOUSVERSION": "Show prior version's budget alongside the current version to track how the plan has evolved.",
  "RANK": "Rank sales representatives by revenue to identify top performers (1 = highest).",
  "RANKCUMULATE": "Allocate budget to projects in priority order until the budget is exhausted—cumulates spend by rank.",
  "VALUE": "Convert a text field containing '1500' into the number 1500 for arithmetic calculations.",

  // Financial
  "COUPDAYBS": "Calculate accrued interest on a bond by finding days from coupon period start to settlement date.",
  "COUPDAYS": "Determine the full coupon period length to calculate the accrued interest fraction.",
  "COUPDAYSNC": "Find the number of days from settlement to the next coupon date for bond pricing.",
  "COUPNCD": "Identify the next coupon payment date after purchasing a bond.",
  "COUPNUM": "Count remaining coupon payments between now and bond maturity for cash flow projections.",
  "COUPPCD": "Find the most recent coupon date before the settlement date for accrued interest calculations.",
  "CUMIPMT": "Calculate total interest paid on a mortgage over the first 12 months to estimate annual interest expense.",
  "CUMPRINC": "Determine how much principal has been repaid on a loan over a specific period for balance sheet reporting.",
  "DURATION": "Assess a bond portfolio's interest rate sensitivity—higher duration means greater price volatility.",
  "FV": "Project the future value of a savings account after 5 years of monthly contributions at a given interest rate.",
  "IPMT": "Break down a monthly mortgage payment into its interest component for P&L reporting.",
  "IRR": "Evaluate a capital project's internal rate of return from its projected cash flow stream to decide go/no-go.",
  "MDURATION": "Calculate modified duration to estimate the percentage bond price change for a 1% yield shift.",
  "NPER": "Determine how many monthly payments are needed to pay off a car loan at a given rate and payment amount.",
  "NPV": "Assess whether a new product launch creates value by discounting projected cash flows back to present value.",
  "PMT": "Calculate the fixed monthly payment on a $300K mortgage at 5% over 30 years.",
  "PPMT": "Isolate the principal portion of each loan payment to track how quickly the balance decreases.",
  "PRICE": "Price a corporate bond given its coupon rate, yield, and maturity for portfolio valuation.",
  "PV": "Determine the present value of a series of future lease payments to capitalize on the balance sheet.",
  "RATE": "Back-calculate the implied interest rate on a loan given the payment amount, term, and principal.",
  "YEARFRAC": "Calculate the fraction of a year between two dates using a day-count convention for interest accrual.",
  "YIELD": "Compute a bond's yield to maturity given its current market price, coupon, and maturity date.",

  // Call Center Planning
  "AGENTS": "Determine how many call center agents are needed to answer 80% of calls within 20 seconds during peak hours.",
  "AGENTSB": "Calculate the minimum server count needed to handle all calls during the busiest hour without exceeding the SLA threshold.",
  "ANSWERTIME": "Given 15 agents on shift, calculate the maximum wait time needed to meet an 80% SLA target.",
  "ARRIVALRATE": "Determine the maximum call volume 20 agents can handle while still meeting the 80%/20-second SLA.",
  "AVGDURATION": "Find the target average handle time that would allow the team to meet SLA with current staffing and call volume.",
  "AVGWAIT": "Estimate the average hold time callers experience given current agent staffing and call arrival rate.",
  "ERLANGB": "Calculate the probability that a caller gets a busy signal (blocked) during peak hours.",
  "ERLANGC": "Determine the likelihood that a caller will be placed in a queue rather than answered immediately.",
  "SLA": "Given current staffing, forecast what percentage of calls will be answered within the 20-second target."
};
