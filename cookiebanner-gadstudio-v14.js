/**
 * Gadstudio (eigenes Webflow-Projekt) — Cookie-Banner = gleiche Logik/Texte wie Huntecom Webflow v14.
 * Asset hochladen, Footer: <script src="…/cookiebanner-gadstudio-v14.js" defer></script>
 * localStorage key "cookie-consent": { essential:1, analytics:0|1, marketing:0|1, preferences:0|1 }
 */
(function () {
	if (window.__gadstudioCB === 14) return;
	window.__gadstudioCB = 14;

	var KEY = "cookie-consent";
	var d = document;
	var L = localStorage;

	var URL_PRIVACY = "/datenschutz";
	var URL_COOKIES = "/datenschutz#cookies";

	var TXT = {
		banTitle: "Cookie-Einstellungen",
		banLead:
			"Wir setzen Cookies und ähnliche Technologien ein, um die Website bereitzustellen, Nutzung zu messen und Inhalte zu personalisieren. Nicht notwendige Cookies verwenden wir nur mit deiner Einwilligung. Weitere Informationen findest du in der ",
		banMid: " und den ",
		privacy: "Datenschutzerklärung",
		cookieInfo: "Cookie-Hinweisen",
		customize: "Cookie-Einstellungen anpassen",
		reject: "Alle Cookies ablehnen",
		accept: "Alle Cookies akzeptieren",
		setTitle: "Cookie-Einstellungen",
		setDesc:
			"Verwalte deine Cookie-Einstellungen. Du kannst jede Kategorie unten aktivieren oder deaktivieren. Du kannst deine Auswahl jederzeit ändern.",
		nec: "Notwendig",
		necD: "Erforderlich für die grundlegende Website-Funktionalität. Kann nicht deaktiviert werden.",
		ana: "Analyse",
		anaD: "Helfen uns zu verstehen, wie Besucher die Website nutzen.",
		mkt: "Marketing",
		mktD: "Für personalisierte Werbung und Kampagnenmessung.",
		pref: "Einstellungen",
		prefD: "Speichern deine Einstellungen für ein besseres Erlebnis.",
		cancel: "Abbrechen",
		save: "Speichern",
		close: "Schließen",
	};

	var SVG = {
		shield:
			'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
		chart:
			'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
		mega:
			'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
		sliders:
			'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/></svg>',
	};

	function injectCss() {
		if (d.getElementById("gadstudio-cc-css")) return;
		var s = d.createElement("style");
		s.id = "gadstudio-cc-css";
		s.textContent =
			"#cc-ban,#cc-dlg{position:fixed;z-index:2147483000;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;box-sizing:border-box}" +
			"#cc-ban *,#cc-dlg *{box-sizing:border-box}" +
			"#cc-ban{bottom:0;left:0;right:0;padding:12px;padding-bottom:max(12px,env(safe-area-inset-bottom));pointer-events:none}" +
			"@media(min-width:768px){#cc-ban{left:auto;right:20px;bottom:20px;max-width:42rem;padding:0;pointer-events:auto}}" +
			".cc-card{background:#0c0c0e;color:#f4f4f5;border:1px solid rgba(255,255,255,.12);border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.45);padding:20px 20px 18px;pointer-events:auto;max-height:min(88vh,640px);overflow:auto}" +
			"@media(max-width:767px){.cc-card{border-radius:16px 16px 0 0;margin:0 10px}}" +
			".cc-card h3{margin:0 0 10px;font-size:16px;font-weight:600;letter-spacing:-.02em;color:#fafafa}" +
			".cc-ban-p{margin:0 0 16px;font-size:14px;line-height:1.55;color:rgba(244,244,245,.88)}" +
			".cc-ban-p a{color:#60a5fa;text-decoration:underline;text-underline-offset:2px;font-weight:500}" +
			".cc-ban-p a:hover{color:#93c5fd}" +
			".cc-btns{display:flex;flex-direction:column;gap:10px}" +
			".cc-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}" +
			".cc-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 14px;border-radius:12px;font-size:13px;font-weight:600;cursor:pointer;border:2px solid rgba(255,255,255,.35);background:transparent;color:#fafafa;transition:background .15s,border-color .15s}" +
			".cc-btn:hover{background:rgba(255,255,255,.06)}" +
			".cc-btn:disabled{opacity:.45;cursor:not-allowed}" +
			".cc-btn-full{width:100%}" +
			".cc-btn-p{border:0;background:linear-gradient(90deg,#2563eb,#1d4ed8);color:#fff;box-shadow:0 2px 12px rgba(37,99,235,.35)}" +
			".cc-btn-p:hover{filter:brightness(1.06)}" +
			"#cc-dlg{inset:0;display:flex;align-items:flex-end;justify-content:center;padding:12px;background:rgba(0,0,0,.58);backdrop-filter:blur(4px)}" +
			"@media(min-width:768px){#cc-dlg{align-items:center;padding:24px}}" +
			".cc-mod{width:100%;max-width:28rem;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;background:#121214;border:1px solid rgba(255,255,255,.12);border-radius:18px;box-shadow:0 24px 64px rgba(0,0,0,.55);position:relative}" +
			"@media(max-width:767px){.cc-mod{border-radius:18px 18px 0 0;max-height:92vh}}" +
			".cc-x{position:absolute;top:12px;right:12px;width:36px;height:36px;border:0;border-radius:10px;background:rgba(255,255,255,.06);color:#a1a1aa;font-size:22px;line-height:1;cursor:pointer;z-index:2}" +
			".cc-x:hover{background:rgba(255,255,255,.1);color:#fafafa}" +
			".cc-mod-h{padding:18px 44px 14px 18px;border-bottom:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03)}" +
			".cc-mod-h h3{margin:0;font-size:16px;font-weight:600;color:#fafafa}" +
			".cc-mod-h p{margin:8px 0 0;font-size:12px;line-height:1.5;color:rgba(244,244,245,.72)}" +
			".cc-mod-b{padding:12px;overflow-y:auto;flex:1}" +
			".cc-cat{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px;margin-bottom:8px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04)}" +
			".cc-cat-l{display:flex;gap:12px;min-width:0;align-items:flex-start}" +
			".cc-ic{flex-shrink:0;width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(59,130,246,.18);color:#60a5fa;border:1px solid rgba(59,130,246,.25)}" +
			".cc-tit{font-size:13px;font-weight:600;color:#fafafa;display:block;margin-bottom:3px}" +
			".cc-desc{font-size:11px;line-height:1.45;color:rgba(244,244,245,.65)}" +
			".cc-sw{position:relative;width:44px;height:26px;flex-shrink:0;border-radius:999px;border:2px solid transparent;background:#52525b;cursor:pointer;transition:background .2s;padding:0}" +
			".cc-sw.on{background:linear-gradient(90deg,#2563eb,#1d4ed8)}" +
			".cc-sw:disabled{opacity:.55;cursor:not-allowed}" +
			".cc-sw::after{content:'';position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .2s}" +
			".cc-sw.on::after{transform:translateX(18px)}" +
			".cc-mod-f{display:flex;gap:10px;padding:14px;border-top:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03)}" +
			".cc-mod-f .cc-btn{flex:1}" +
			".cc-tg{position:fixed;z-index:2147482000;bottom:18px;left:18px;width:44px;height:44px;border-radius:12px;border:1px solid rgba(255,255,255,.2);background:#0c0c0e;color:#e4e4e7;font-size:20px;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.4)}" +
			".cc-tg:hover{background:#18181b}" +
			"@media(min-width:768px){.cc-tg{bottom:22px;left:22px}}";
		d.head.appendChild(s);
	}

	function clearUi() {
		d.querySelectorAll("#cc-ban, #cc-dlg, [data-cc-trigger]").forEach(function (el) {
			el.remove();
		});
	}

	function read() {
		try {
			var j = JSON.parse(L.getItem(KEY) || "null");
			if (!j || typeof j !== "object") return null;
			if (j.state && typeof j.state === "object") {
				var st = j.state;
				return {
					analytics: !!st.analytics,
					marketing: !!st.marketing,
					preferences: !!st.preferences,
				};
			}
			var a = !!j.analytics;
			var m = !!j.marketing;
			var p = j.preferences;
			if (p === undefined) p = a && m ? 1 : 0;
			return { analytics: a, marketing: m, preferences: !!p };
		} catch (e) {
			return null;
		}
	}

	function write(o) {
		L.setItem(
			KEY,
			JSON.stringify({
				essential: 1,
				analytics: o.analytics ? 1 : 0,
				marketing: o.marketing ? 1 : 0,
				preferences: o.preferences ? 1 : 0,
			}),
		);
	}

	function bindSwitch(root, key) {
		var btn = root.querySelector('.cc-sw[data-k="' + key + '"]');
		if (!btn || btn.disabled) return;
		btn.addEventListener("click", function () {
			var on = !btn.classList.contains("on");
			btn.classList.toggle("on", on);
			btn.setAttribute("aria-checked", on ? "true" : "false");
		});
	}

	function readSwitches(root) {
		return {
			analytics: root.querySelector('.cc-sw[data-k="a"]').classList.contains("on"),
			marketing: root.querySelector('.cc-sw[data-k="m"]').classList.contains("on"),
			preferences: root.querySelector('.cc-sw[data-k="p"]').classList.contains("on"),
		};
	}

	function catRow(svg, title, desc, key, on, dis) {
		var cl = "cc-sw" + (on ? " on" : "");
		var ds = dis ? " disabled" : "";
		return (
			'<div class="cc-cat">' +
			'<div class="cc-cat-l"><div class="cc-ic">' +
			svg +
			'</div><div><span class="cc-tit">' +
			title +
			'</span><span class="cc-desc">' +
			desc +
			"</span></div></div>" +
			'<button type="button" class="' +
			cl +
			'" role="switch" aria-checked="' +
			(on ? "true" : "false") +
			'" data-k="' +
			key +
			'"' +
			ds +
			"></button></div>"
		);
	}

	function showBanner() {
		clearUi();
		injectCss();
		var wrap = d.createElement("div");
		wrap.id = "cc-ban";
		wrap.innerHTML =
			'<div class="cc-card">' +
			"<h3>" +
			TXT.banTitle +
			"</h3>" +
			'<p class="cc-ban-p">' +
			TXT.banLead +
			'<a href="' +
			URL_PRIVACY +
			'">' +
			TXT.privacy +
			"</a>" +
			TXT.banMid +
			'<a href="' +
			URL_COOKIES +
			'">' +
			TXT.cookieInfo +
			"</a>." +
			"</p>" +
			'<div class="cc-btns">' +
			'<button type="button" class="cc-btn cc-btn-full" id="cc-su">' +
			TXT.customize +
			"</button>" +
			'<div class="cc-row2">' +
			'<button type="button" class="cc-btn" id="cc-sr">' +
			TXT.reject +
			"</button>" +
			'<button type="button" class="cc-btn cc-btn-p" id="cc-sa">' +
			TXT.accept +
			"</button>" +
			"</div></div></div>";
		d.body.appendChild(wrap);
		wrap.querySelector("#cc-su").onclick = function () {
			showSettings(false);
		};
		wrap.querySelector("#cc-sa").onclick = function () {
			write({ analytics: true, marketing: true, preferences: true });
			clearUi();
			gear();
		};
		wrap.querySelector("#cc-sr").onclick = function () {
			write({ analytics: false, marketing: false, preferences: false });
			clearUi();
			gear();
		};
	}

	function showSettings(hasSavedConsent) {
		clearUi();
		injectCss();
		var c = read();
		var a = c ? c.analytics : false;
		var m = c ? c.marketing : false;
		var p = c ? c.preferences : false;

		var dlg = d.createElement("div");
		dlg.id = "cc-dlg";
		dlg.innerHTML =
			'<div class="cc-mod" role="dialog" aria-modal="true" aria-labelledby="cc-dlg-title">' +
			'<button type="button" class="cc-x" id="cc-x" aria-label="' +
			TXT.close +
			'">\u00d7</button>' +
			'<div class="cc-mod-h"><h3 id="cc-dlg-title">' +
			TXT.setTitle +
			"</h3><p>" +
			TXT.setDesc +
			"</p></div>" +
			'<div class="cc-mod-b">' +
			catRow(SVG.shield, TXT.nec, TXT.necD, "n", true, true) +
			catRow(SVG.chart, TXT.ana, TXT.anaD, "a", a, false) +
			catRow(SVG.mega, TXT.mkt, TXT.mktD, "m", m, false) +
			catRow(SVG.sliders, TXT.pref, TXT.prefD, "p", p, false) +
			"</div>" +
			'<div class="cc-mod-f">' +
			'<button type="button" class="cc-btn" id="cc-sc">' +
			TXT.cancel +
			"</button>" +
			'<button type="button" class="cc-btn cc-btn-p" id="cc-ss">' +
			TXT.save +
			"</button>" +
			"</div></div>";

		d.body.appendChild(dlg);

		var mod = dlg.querySelector(".cc-mod-b");
		bindSwitch(mod, "a");
		bindSwitch(mod, "m");
		bindSwitch(mod, "p");

		function back() {
			clearUi();
			if (hasSavedConsent || read()) gear();
			else showBanner();
		}

		dlg.querySelector("#cc-x").onclick = back;
		dlg.querySelector("#cc-sc").onclick = back;
		dlg.onclick = function (ev) {
			if (ev.target === dlg) back();
		};
		dlg.querySelector("#cc-ss").onclick = function () {
			var st = readSwitches(dlg);
			write({
				analytics: st.analytics,
				marketing: st.marketing,
				preferences: st.preferences,
			});
			clearUi();
			gear();
		};
	}

	function gear() {
		var b = d.createElement("button");
		b.type = "button";
		b.className = "cc-tg";
		b.setAttribute("data-cc-trigger", "1");
		b.title = "Cookies";
		b.setAttribute("aria-label", "Cookie-Einstellungen öffnen");
		b.textContent = "\u2699";
		b.onclick = function () {
			showSettings(true);
		};
		d.body.appendChild(b);
	}

	injectCss();
	if (read()) gear();
	else showBanner();
})();
