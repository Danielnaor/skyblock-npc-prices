# SkyBlock NPC Prices Loader

A Google Apps Script project for Google Sheets that:
1. Fetches all Hypixel SkyBlock items from the official API.
2. Extracts their NPC sell prices and writes them to a sheet.
3. Provides a custom sheet function to calculate total inventory value from item quantities.

---

## 📦 Setup

1. Open a new Google Sheet.
2. Go to **Extensions → Apps Script**.
3. In the script editor, replace any existing code with these two files:
   - `load_npc_prices.gs`
   - `calculate_inventory_value.gs`
4. Add the `appsscript.json` manifest (File → Project properties → Script properties → copy JSON there, or it’ll auto-generate).
5. Save and authorize when first running.

---

## ⚙️ Usage

### 1. Load NPC Sell Prices
Run:
```js
loadNpcPrices();
```
This will create or refresh a sheet called **NPC_Prices** with three columns:
```
internal_name | display_name | npc_sell_price
```

### 2. Calculate Inventory Value
Create another sheet named **Inventory** and list your items:
```
| internal_name | quantity |
```

Then in column C, use:
```excel
=ITEM_VALUE(A2, B2)
```

That returns three cells horizontally:
```
display_name | npc_sell_price | total_value
```

Or split them with:
```excel
=INDEX(ITEM_VALUE(A2, B2), 1, 1)   // display name
=INDEX(ITEM_VALUE(A2, B2), 1, 2)   // npc price
=INDEX(ITEM_VALUE(A2, B2), 1, 3)   // value
```

### 3. Total Inventory Value
At the bottom of your “value” column:
```excel
=SUM(E2:E)
```

---

## 🧠 Notes

- Data comes from [https://api.hypixel.net/resources/skyblock/items](https://api.hypixel.net/resources/skyblock/items)
- Missing NPC sell prices are treated as `0`.
- Case-sensitive item internal names must match the API exactly.
- Refresh data periodically to get updated prices.

---

## 📄 License
MIT License
