// calculate_inventory_value.gs

function ITEM_VALUE(internalName, quantity) {
  if (typeof internalName !== "string" || typeof quantity !== "number") {
    return [["Invalid input", "", ""]];
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const priceSheet = ss.getSheetByName("NPC_Prices");
  if (!priceSheet) {
    return [["Missing NPC_Prices sheet", "", ""]];
  }

  const data = priceSheet.getDataRange().getValues();
  const lookup = {};
  for (let i = 1; i < data.length; i++) {
    const name = data[i][0];
    const display = data[i][1];
    const price = data[i][2];
    lookup[name] = { displayName: display, npcPrice: price };
  }

  const entry = lookup[internalName];
  if (!entry) {
    return [["Item not found", "", ""]];
  }

  const value = quantity * entry.npcPrice;
  return [[entry.displayName, entry.npcPrice, value]];
}
