================================================================================
              ANAPLAN BUILDER ASSISTANT - JOB AID
================================================================================

Version:      1.0
Provided by:  Jim
Last Updated: February 2026

================================================================================
  WHAT IS IT?
================================================================================

The Anaplan Builder Assistant is a Chrome extension designed to help Anaplan
model builders work faster. It provides formula building, an Excel-to-Anaplan
function translator, a formula explainer, and a quick-paste panel for blueprint
properties -- all without leaving your browser.

================================================================================
  INSTALLATION
================================================================================

1. Obtain the extension folder from your team lead or SharePoint.
2. Open Chrome and navigate to chrome://extensions
3. Enable "Developer mode" (toggle in the top-right corner).
4. Click "Load unpacked" and select the anaplan-formula-assistant folder.
5. The extension icon will appear in your Chrome toolbar. Pin it for easy access.

================================================================================
  FEATURES AT A GLANCE
================================================================================

  Tab              Purpose
  ---------------  ------------------------------------------------------------
  Formulas         Search, browse, and build Anaplan formulas with guided
                   parameters
  Excel>Anaplan    Look up the Anaplan equivalent of any Excel function
  Explainer        Paste any Anaplan formula to get a step-by-step breakdown
  History          View and re-copy recently built formulas
  Settings         Open the Quick Paste panel and check for formula database
                   updates

================================================================================
  TAB 1: FORMULAS
================================================================================

This is your primary formula-building workspace.

HOW TO USE:

  1. SEARCH
     Type a function name or keyword in the search bar (e.g., "LOOKUP",
     "interest", "date"). Matching functions appear in the dropdown instantly.
     If there is exactly one match, it auto-selects.

  2. BROWSE BY CATEGORY
     Alternatively, select a category from the dropdown:
     - Aggregation
     - Mapping
     - Logical
     - Numeric
     - Text
     - Time & Date
     - Miscellaneous
     - Financial
     - Call Center Planning

  3. SELECT A FUNCTION
     Once selected, you will see:
     - Description -- What the function does
     - Syntax      -- The formal syntax with parameter names
     - Reference   -- A real-world example formula
     - Scenario    -- A practical business use case explaining when to use
                      this function

  4. FILL IN PARAMETERS
     Input fields appear with placeholder text that matches the syntax
     components. For example, for FIND, the placeholders read:
       "e.g. Text to find"
       "e.g. Text to search"
       "e.g. Starting character (optional)"
     Optional parameters are labeled.

  5. COPY OR SAVE
     Once all required fields are filled, the generated formula appears.
     Click "Copy" to copy it to your clipboard, or "Save to History" to
     store it for later.

================================================================================
  TAB 2: EXCEL > ANAPLAN
================================================================================

Migrating from Excel? Use this tab to find the Anaplan equivalent of any
Excel function.

HOW TO USE:

  1. SEARCH
     Type an Excel function name (e.g., "VLOOKUP", "SUMIF", "IF").

  2. FILTER BY CATEGORY
     Use the dropdown to narrow results (Math, Logical, Text, Financial, etc.).

  3. READ THE MAPPING
     Each entry shows:
     - The Excel function name --> the Anaplan equivalent
     - A color-coded badge:
         Direct (green)         Same function exists in Anaplan
         Alternative (orange)   Different syntax or approach needed
         No equivalent (red)    Must use a workaround
     - Notes explaining how to achieve the same result in Anaplan

COMMON MAPPINGS:

  Excel Function     Anaplan Equivalent     Type
  -----------------  ---------------------  ------------------------------------
  VLOOKUP            LOOKUP                 Alternative - uses list-based
                                            mappings
  SUMIF              SUM + mapping          Alternative - SUM with mapping table
  IF                 IF THEN ELSE           Alternative - different syntax
  INDEX/MATCH        LOOKUP                 Alternative - mapping line items
  CONCATENATE        & operator             Alternative - use ampersand
  LEN                LENGTH                 Alternative - renamed
  PMT, IRR, NPV,    Same names             Direct equivalents
  FV, PV

================================================================================
  TAB 3: EXPLAINER
================================================================================

Don't understand a formula you found in a model? Paste it here.

HOW TO USE:

  1. Paste any Anaplan formula into the text area.

  2. Click "Explain Formula".

  3. The breakdown shows:
     - "What this formula does" -- A high-level summary
     - Step-by-step breakdown -- Each component is color-coded:
         Orange  = Keywords (IF, THEN, ELSE)
         Blue    = Functions and expressions
         Purple  = Operators (+, -, >, <)
     - Line item references are labeled as LINE ITEM for clarity.

EXAMPLE:

  Pasting:  IF Revenue > 1000 THEN "High" ELSE "Low"

  Produces:
    Summary:  Classifies items based on whether Revenue exceeds 1000
    Step 1:   IF -- Begins a conditional test
    Step 2:   Revenue > 1000 -- Tests if the LINE ITEM "Revenue" is greater
              than 1000
    Step 3:   THEN "High" -- Returns "High" when the condition is true
    Step 4:   ELSE "Low" -- Returns "Low" when the condition is false

================================================================================
  TAB 4: HISTORY
================================================================================

Every formula you save from the Formulas tab appears here.

  - Click "Copy" next to any formula to copy it to your clipboard.
  - Click "Clear History" to remove all saved formulas.
  - History is stored locally in your browser and persists across sessions.
  - Maximum of 50 formulas are retained (oldest are removed first).

================================================================================
  TAB 5: SETTINGS
================================================================================

QUICK PASTE PANEL
-----------------

The Quick Paste panel is a small floating window that appears directly on
Anaplan pages, giving you one-click copy buttons for blueprint line item
properties.

  How to Open:
    - Automatic: The panel auto-launches on any anaplan.com page.
    - Manual:    Go to Settings tab > click "Open Quick Paste on this page".

  Available Properties:

    FORMAT options:
      # 1,000 (number)  |  $ 1,000 (currency)  |  95% (percentage)
      Text  |  Boolean  |  Date  |  Time Period  |  No Data

    SUMMARY options:
      Sum  |  None  |  Average  |  Avg (Non-wt)  |  Min  |  Max
      Opening Period  |  Closing Period  |  Formula  |  Any  |  All
      First Non-blank  |  Last Non-blank  |  Ratio  |  Text List

  How to Use:
    1. In Anaplan, open a module's Blueprint view.
    2. Select the cell(s) in the Format or Summary column you want to change.
    3. Click the corresponding button in the Quick Paste panel.
    4. Press Ctrl+V to paste the value into Anaplan.
    5. A toast notification confirms the value was copied.

  Panel Controls:
    - DRAG:   Grab the section labels (FORMAT / SUMMARY) to reposition.
    - RESIZE: Drag the bottom-right corner of the panel.
    - CLOSE:  Click the X button next to the FORMAT label.
    - REOPEN: Click the floating blue "fx" button that appears after closing.

FORMULA DATABASE UPDATES
-------------------------

  - Shows the total number of functions in the database.
  - Click "Check for Updates" to scan the Anaplan help page for newly added
    functions.
  - Any new functions discovered are automatically merged into the Formulas tab.

================================================================================
  TIPS & BEST PRACTICES
================================================================================

  1. USE SEARCH FIRST
     The Formulas tab search is the fastest way to find any function. It
     searches both names and descriptions.

  2. READ THE SCENARIO
     Before building a formula, read the scenario to confirm the function
     fits your use case.

  3. QUICK PASTE SAVES TIME
     For repetitive blueprint setup (e.g., setting 20 line items to "Sum"
     summary), the Quick Paste panel eliminates manual clicking through
     Anaplan's dropdowns.

  4. SAVE FORMULAS YOU REUSE
     Click "Save to History" for formulas you build frequently. They persist
     across browser sessions.

  5. EXCEL > ANAPLAN FOR MIGRATIONS
     When converting Excel models, start with the Excel>Anaplan tab to plan
     your formula translation before building in Anaplan.

  6. REFRESH AFTER EXTENSION UPDATES
     If you update the extension, refresh any open Anaplan tabs to ensure the
     Quick Paste panel loads the latest version.

================================================================================
  TROUBLESHOOTING
================================================================================

  ISSUE: Quick Paste panel not appearing
  FIX:   Refresh the Anaplan page. If that doesn't work, go to Settings and
         click "Open Quick Paste on this page".

  ISSUE: "Cannot inject" error
  FIX:   You must be on an Anaplan page (https://*.anaplan.com). The panel
         cannot be injected on other websites.

  ISSUE: Pasted format/summary not accepted by Anaplan
  FIX:   Make sure you selected the correct cell in Blueprint view before
         pasting (Ctrl+V).

  ISSUE: Extension icon not visible
  FIX:   Click the puzzle piece icon in Chrome's toolbar and pin
         "Anaplan Builder Assistant".

  ISSUE: Formula Database shows 0 functions
  FIX:   Reload the extension at chrome://extensions (click the refresh icon
         on the extension card).

================================================================================
  SUPPORT
================================================================================

For questions, issues, or feature requests, contact your Anaplan Center of
Excellence team.

================================================================================
  Anaplan Builder Assistant v1.0 - Built for Anaplan model builders
================================================================================
