/*************************************************
 * LUCKY ENGINEERING WORKS — Website Quote Enquiry Form
 * Google Apps Script (paste this whole file into script.google.com)
 *
 * WHAT IT DOES
 *  - Receives enquiries from the website "Request a Quote" form
 *  - Adds each enquiry as a new row in your Google Sheet
 *  - Saves any uploaded PDF drawing to your Google Drive folder
 *  - Emails you instantly at contact@luckyengineeringwork.com
 *
 * ONE-TIME SETUP (10 minutes)
 *  1. Go to https://sheets.google.com and create a new blank Sheet.
 *     Name it anything, e.g. "LEW Quote Enquiries".
 *     Copy its ID from the URL:
 *     https://docs.google.com/spreadsheets/d/13k3XaKXVXOUbQ1nAHtmmFFtnEz_hvOsyQEa67ohii6o/edit
 *  2. Go to https://drive.google.com and create a folder named
 *     "LEW Drawing Uploads". Open it and copy its ID from the URL:
 *     https://drive.google.com/drive/folders/THIS_PART_IS_THE_ID
 *  3. Go to https://script.google.com → New project → delete any code
 *     there → paste this ENTIRE file.
 *  4. Fill in the three values below (SPREADSHEET_ID, DRIVE_FOLDER_ID,
 *     NOTIFY_EMAIL is already correct).
 *  5. Click "Deploy" → "New deployment" → select type "Web app":
 *       - Description: LEW Quote Form
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Click Deploy, authorise with your Google account, and copy the
 *     "Web app URL" (ends with /exec).
 *  6. Send that URL to your website developer — done.
 *
 * Every enquiry then lands in your Sheet, drawings in Drive, and an
 * email in your inbox. You can re-check the Sheet anytime.
 *************************************************/

const SPREADSHEET_ID = "13k3XaKXVXOUbQ1nAHtmmFFtnEz_hvOsyQEa67ohii6o";
const DRIVE_FOLDER_ID = "10T4wvZzXzV5O_ri4GNk3utPCwzrpsbHi";
const NOTIFY_EMAIL = "ppthakur8483@gmail.com";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 1. Open the spreadsheet and write to the FIRST (default) tab —
    //    the header row is added automatically on the first enquiry.
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Company", "Email", "Phone", "Requirement", "Drawing Link"]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
    }

    // 2. Save uploaded PDF drawing to Drive (if attached)
    let fileUrl = "";
    if (data.fileData) {
      const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      const bytes = Utilities.base64Decode(data.fileData);
      const blob = Utilities.newBlob(bytes, "application/pdf", data.fileName || "drawing.pdf");
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = file.getUrl();
    }

    // 3. Append the enquiry row
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.company || "",
      data.email || "",
      data.phone || "",
      data.requirement || "",
      fileUrl,
    ]);

    // 4. Email notification (a mail failure never loses the enquiry)
    let mailSent = true;
    try {
      const subject = "New Quote Enquiry — " + (data.name || "Website");
      const body =
        "A new enquiry has arrived from the Lucky Engineering Works website.\n\n" +
        "Name: " + (data.name || "-") + "\n" +
        "Company: " + (data.company || "-") + "\n" +
        "Email: " + (data.email || "-") + "\n" +
        "Phone: " + (data.phone || "-") + "\n\n" +
        "Requirement:\n" + (data.requirement || "-") + "\n\n" +
        "Drawing (PDF): " + (fileUrl || "Not uploaded") + "\n\n" +
        "All enquiries: " + ss.getUrl();
      MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    } catch (mailErr) {
      mailSent = false;
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", emailSent: mailSent }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: open this URL in a browser to confirm the script is alive.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: "ok", service: "LEW Quote Form" }))
    .setMimeType(ContentService.MimeType.JSON);
}

/*************************************************
 * ONE-TIME AUTHORISATION FOR EMAIL
 * If enquiries arrive in the Sheet but you get no email:
 *  1. In the toolbar above, open the function dropdown and
 *     select  authorizeMe
 *  2. Press  Run (the play button)
 *  3. A permissions window opens → choose your Google account
 *     → Advanced → Go to project → Allow
 *  4. You will receive a confirmation email — done. The live
 *     form now emails you automatically. No need to redeploy.
 *************************************************/
function authorizeMe() {
  MailApp.sendEmail(
    NOTIFY_EMAIL,
    "LEW Quote Form — email connected",
    "If you are reading this, email notifications for website enquiries are active."
  );
}
