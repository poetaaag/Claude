(() => {
  const STRINGS = {
    it: {
      addedToCart: "Aggiunto",
      payWithStripe: "Paga con carta",
      payWithPayPal: "Paga con PayPal",
      payWithBankTransfer: "Paga con bonifico",
      requestIbanSubject: "Richiesta IBAN",
      paymentStripeSubject: "Pagamento Stripe",
      paymentPayPalSubject: "Pagamento PayPal",
      siteMessageSubject: "Messaggio dal sito",
      wantIban: "Vorrei ricevere l'IBAN.",
      wantStripeLink: "Vorrei ricevere il link Stripe.",
      wantPayPalLink: "Vorrei ricevere il link PayPal.",
      remove: "Rimuovi",
      sliderGoTo: "Vai alla slide",
      orderPrefix: "Ordine",
      callMeta: "Tocca per chiamare",
      smsMeta: "Apri Messaggi",
      emailMeta: "Scrivimi per email",
      livePaintingSubject: "Live painting",
      callLabel: "Chiamami",
      smsLabel: "Inviami un messaggio",
      defaultContactText: "Ciao Giulia, vorrei parlare con te di un progetto.",
      requestStripeForOrderSubject: "Richiesta link Stripe",
      requestPayPalForOrderSubject: "Richiesta link PayPal",
      requestIbanForOrderBody: "Vorrei ricevere l'IBAN per questo ordine:",
      requestStripeForOrderBody:
        "Vorrei ricevere un link Stripe per questo ordine:",
      requestPayPalForOrderBody:
        "Vorrei ricevere un link PayPal per questo ordine:",
    },
    fr: {
      addedToCart: "Ajouté",
      payWithStripe: "Payer par carte",
      payWithPayPal: "Payer avec PayPal",
      payWithBankTransfer: "Payer par virement",
      requestIbanSubject: "Demande d’IBAN",
      paymentStripeSubject: "Paiement Stripe",
      paymentPayPalSubject: "Paiement PayPal",
      siteMessageSubject: "Message depuis le site",
      wantIban: "Je voudrais recevoir l’IBAN.",
      wantStripeLink: "Je voudrais recevoir le lien Stripe.",
      wantPayPalLink: "Je voudrais recevoir le lien PayPal.",
      remove: "Retirer",
      sliderGoTo: "Aller à la slide",
      orderPrefix: "Commande",
      callMeta: "Touchez pour appeler",
      smsMeta: "Ouvrir Messages",
      emailMeta: "M’écrire par e-mail",
      livePaintingSubject: "Live painting",
      callLabel: "M’appeler",
      smsLabel: "M’envoyer un message",
      defaultContactText:
        "Bonjour Giulia, je voudrais vous parler d’un projet.",
      requestStripeForOrderSubject: "Demande de lien Stripe",
      requestPayPalForOrderSubject: "Demande de lien PayPal",
      requestIbanForOrderBody:
        "Je voudrais recevoir l’IBAN pour cette commande :",
      requestStripeForOrderBody:
        "Je voudrais recevoir un lien Stripe pour cette commande :",
      requestPayPalForOrderBody:
        "Je voudrais recevoir un lien PayPal pour cette commande :",
    },
    en: {
      addedToCart: "Added",
      payWithStripe: "Pay by card",
      payWithPayPal: "Pay with PayPal",
      payWithBankTransfer: "Pay by bank transfer",
      requestIbanSubject: "IBAN request",
      paymentStripeSubject: "Stripe payment",
      paymentPayPalSubject: "PayPal payment",
      siteMessageSubject: "Message from the site",
      wantIban: "I would like to receive the IBAN.",
      wantStripeLink: "I would like to receive the Stripe link.",
      wantPayPalLink: "I would like to receive the PayPal link.",
      remove: "Remove",
      sliderGoTo: "Go to slide",
      orderPrefix: "Order",
      callMeta: "Tap to call",
      smsMeta: "Open Messages",
      emailMeta: "Write by email",
      livePaintingSubject: "Live painting",
      callLabel: "Call me",
      smsLabel: "Send me a message",
      defaultContactText: "Hello Giulia, I would love to talk with you about a project.",
      requestStripeForOrderSubject: "Request Stripe link",
      requestPayPalForOrderSubject: "Request PayPal link",
      requestIbanForOrderBody: "I would like to receive the IBAN for this order:",
      requestStripeForOrderBody: "I would like to receive a Stripe link for this order:",
      requestPayPalForOrderBody: "I would like to receive a PayPal link for this order:",
    },
  };
  const currentLang =
    document.documentElement.lang &&
    document.documentElement.lang.toLowerCase().startsWith("fr")
      ? "fr"
      : document.documentElement.lang && document.documentElement.lang.toLowerCase().startsWith("en")
        ? "en"
        : "it";
  function t(key, fallback, params = {}) {
    const raw = (STRINGS[currentLang] && STRINGS[currentLang][key]) || fallback;
    return String(raw).replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
  }
  window.__GIULIA_I18N = { t, lang: currentLang };
})();
