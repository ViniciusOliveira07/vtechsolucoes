/**
 * Contador de acessos do blog da Vtech Soluções.
 *
 * Como publicar (uma vez):
 *  1. Crie uma planilha nova no Google Sheets, por exemplo "Vtech · Visualizações do blog".
 *  2. Menu Extensões → Apps Script. Apague o conteúdo e cole este arquivo inteiro. Salve.
 *  3. Implantar → Nova implantação → tipo "App da Web".
 *     Executar como: "Eu". Quem pode acessar: "Qualquer pessoa".
 *  4. Autorize o acesso quando o Google pedir.
 *  5. Copie a URL que termina em /exec e cole em VIEWS_URL, no arquivo src/lib/views.ts.
 *
 * A aba "visualizacoes" é criada sozinha: coluna A = artigo, B = acessos, C = último acesso.
 */

var SHEET_NAME = "visualizacoes";

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(["artigo", "acessos", "ultimo_acesso"]);
  }
  return sh;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// GET → { "slug-do-artigo": 123, ... }
function doGet() {
  var rows = sheet_().getDataRange().getValues();
  var out = {};
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0]) out[rows[i][0]] = Number(rows[i][1]) || 0;
  }
  return json_(out);
}

// POST { "slug": "slug-do-artigo" } → soma 1 acesso
function doPost(e) {
  var slug = "";
  try {
    slug = String(JSON.parse(e.postData.contents).slug || "");
  } catch (err) {
    return json_({ ok: false });
  }
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return json_({ ok: false });

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sh = sheet_();
    var last = sh.getLastRow();
    var slugs = last > 1 ? sh.getRange(2, 1, last - 1, 1).getValues() : [];
    var row = -1;
    for (var i = 0; i < slugs.length; i++) {
      if (slugs[i][0] === slug) {
        row = i + 2;
        break;
      }
    }
    if (row === -1) {
      sh.appendRow([slug, 1, new Date()]);
    } else {
      var cell = sh.getRange(row, 2);
      cell.setValue((Number(cell.getValue()) || 0) + 1);
      sh.getRange(row, 3).setValue(new Date());
    }
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}
