import { NextResponse } from "next/server";

export const runtime = "nodejs";

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();
    const turnstileToken = String(body["cf-turnstile-response"] || "");

    if (!name || !email || !message) {
      return json(400, { error: "Meno, email a správa sú povinné polia" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return json(400, { error: "Neplatný formát emailu" });
    }

    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
    if (!TURNSTILE_SECRET_KEY) {
      console.error("Missing TURNSTILE_SECRET_KEY environment variable");
      return json(500, { error: "Server configuration error" });
    }

    if (!turnstileToken) {
      return json(400, { error: "Bezpečnostné overenie zlyhalo. Skúste to znova." });
    }

    const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    });

    const turnstileResult = await turnstileResponse.json();
    if (!turnstileResult.success) {
      console.error("Turnstile verification failed:", turnstileResult);
      return json(400, { error: "Bezpečnostné overenie zlyhalo. Skúste to znova." });
    }

    const SMTP2GO_API_KEY = process.env.SMTP2GO_API_KEY;
    const SMTP2GO_FROM_EMAIL = process.env.SMTP2GO_FROM_EMAIL;
    const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;

    if (!SMTP2GO_API_KEY || !SMTP2GO_FROM_EMAIL || !BUSINESS_EMAIL) {
      console.error("Missing email environment variables");
      return json(500, { error: "Server configuration error" });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Neuvedené");
    const safeSubject = escapeHtml(subject || "Neuvedené");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
    const emailSubject = subject
      ? `MT Autos - Kontaktný formulár: ${subject}`
      : "MT Autos - Nová správa z kontaktného formulára";

    const htmlBody = `
      <h2>Nová správa z kontaktného formulára</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Meno:</td><td style="padding: 10px; border: 1px solid #ddd;">${safeName}</td></tr>
        <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td><td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
        <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Telefón:</td><td style="padding: 10px; border: 1px solid #ddd;">${safePhone}</td></tr>
        <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Predmet:</td><td style="padding: 10px; border: 1px solid #ddd;">${safeSubject}</td></tr>
        <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Správa:</td><td style="padding: 10px; border: 1px solid #ddd;">${safeMessage}</td></tr>
      </table>
      <p style="margin-top: 20px; color: #666; font-size: 12px;">Táto správa bola odoslaná z kontaktného formulára na mtautos.sk</p>
    `;

    const textBody = `
Nová správa z kontaktného formulára

Meno: ${name}
Email: ${email}
Telefón: ${phone || "Neuvedené"}
Predmet: ${subject || "Neuvedené"}

Správa:
${message}

---
Táto správa bola odoslaná z kontaktného formulára na mtautos.sk
    `;

    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: SMTP2GO_API_KEY,
        to: [BUSINESS_EMAIL],
        sender: SMTP2GO_FROM_EMAIL,
        subject: emailSubject,
        html_body: htmlBody,
        text_body: textBody,
        custom_headers: [{ header: "Reply-To", value: email }],
      }),
    });

    const result = await response.json();
    if (!response.ok || result.data?.error) {
      console.error("SMTP2GO error:", result);
      return json(500, { error: "Nepodarilo sa odoslať email. Skúste to prosím neskôr." });
    }

    return json(200, { success: true, message: "Email bol úspešne odoslaný" });
  } catch (error) {
    console.error("Contact form error:", error);
    return json(500, { error: "Nastala chyba pri spracovaní požiadavky" });
  }
}
