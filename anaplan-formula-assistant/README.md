# Anaplan Builder Assistant - Chrome Extension

A Chrome extension that helps Anaplan model builders quickly look up, build, explain, and copy formulas.

## Features

- **Formula Builder** - Select a category and function, fill in parameters, and get a ready-to-paste formula
- **Formula Templates** - Pre-built patterns for common modeling scenarios (YoY growth, variance analysis, rolling averages, balance rolls, safe division, and more). Fill in your line item names and copy.
- **Formula Explainer** - Paste any Anaplan formula and get a color-coded, step-by-step breakdown of what each part does
- **Reference Library** - Searchable database of 90+ Anaplan functions covering all 9 official categories (Aggregation, Mapping, Logical, Numeric, Text, Time & Date, Miscellaneous, Financial, Call Center Planning)
- **Line Item Properties** - Quick-reference for Format, Summary, Time Scale, and Number Format Subtypes. Browse all valid options with descriptions and one-click copy.
- **Manual Update Check** - Check the official Anaplan help page for new functions with one click. Any newly discovered functions are merged into the database automatically. The built-in database always serves as a safety net.
- **Copy to Clipboard** - One-click copy for any generated formula
- **Formula History** - Save and recall your recently built formulas (stored locally in Chrome)

## Installation (Developer Mode)

Since this is a local extension, you install it via Chrome's developer mode:

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `anaplan-formula-assistant` folder
5. The extension icon (blue "fx") will appear in your toolbar

## How to Use

1. Click the **fx** icon in your Chrome toolbar
2. **Builder tab**: Pick a category (e.g. "Time"), then a function (e.g. "OFFSET"), fill in the parameters, and copy the generated formula
3. **Templates tab**: Browse common modeling patterns by scenario (Variance & Growth, Financial Modeling, Planning & Allocation, Utility Patterns, Analysis Patterns). Click a template, fill in your line item names, and copy.
4. **Explainer tab**: Paste any Anaplan formula and click "Explain Formula" to see a color-coded breakdown of each component (functions, conditions, operators)
5. **Reference tab**: Browse or search the full function library. Click any function to expand its description, syntax, and example. Scroll to the bottom to see the "Formula Database" panel where you can click **Check for Updates** to scan the Anaplan help page for new functions.
6. **Line Items tab**: Select a property type (Format, Summary, Time Scale, or Number Format Subtypes) to see every valid option with a description. Click "Copy" next to any option to paste it exactly as Anaplan expects.
7. **History tab**: View and re-copy any formula you previously saved

## File Structure

```
anaplan-formula-assistant/
  manifest.json    - Chrome extension config
  popup.html       - Extension popup UI
  styles.css       - Styling
  formulas.js              - Anaplan formula database (90+ functions, all official categories)
  templates.js             - Pre-built formula templates (17 patterns)
  explainer.js             - Formula parsing and explanation engine
  lineitem-properties.js   - Line item Format, Summary, Time Scale, and Number Format data
  background.js            - Service worker for fetching & parsing Anaplan help page
  popup.js                 - UI logic, formula generation, history, update checks
  icons/           - Extension icons (16, 48, 128px)
```
