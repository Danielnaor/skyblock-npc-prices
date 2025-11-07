// load_npc_prices.gs

function loadNpcPrices() {
  const SHEET_NAME = "NPC_Prices";
  const API_URL = "https://api.hypixel.net/resources/skyblock/items";

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  sheet.clearContents();

  const headers = ["internal_name", "display_name", "npc_sell_price"];
  sheet.appendRow(headers);

  const resp = UrlFetchApp.fetch(API_URL);
  const data = JSON.parse(resp.getContentText());

  if (!data.success || !data.items) {
    throw new Error("Failed to fetch items resource or unexpected format.");
  }

  const rows = [];
  for (const [internalName, itemInfo] of Object.entries(data.items)) {
    const displayName = itemInfo.name || internalName;
    const npcPrice = itemInfo.npc_sell_price != null ? itemInfo.npc_sell_price : 0;
    rows.push([internalName, displayName, npcPrice]);
  }

  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sheet.getRange(1, 1, rows.length + 1, headers.length)
       .sort({ column: 3, ascending: false });
}
