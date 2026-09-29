const form = document.querySelector("#booking-form");
const orderFields = document.querySelector("#order-fields");
const reservationFields = document.querySelector("#reservation-fields");
const orderInputs = orderFields.querySelectorAll("input, select");
const reservationInputs = reservationFields.querySelectorAll("input, select");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);

document.querySelectorAll('input[name="request-type"]').forEach((option) => {
  option.addEventListener("change", () => {
    const isOrder = option.value === "order" && option.checked;
    orderFields.hidden = !isOrder;
    reservationFields.hidden = isOrder;
    orderInputs.forEach((input) => {
      input.disabled = !isOrder;
    });
    reservationInputs.forEach((input) => {
      input.disabled = isOrder;
    });
  });
});

document.querySelectorAll('input[type="date"]').forEach((dateInput) => {
  dateInput.min = localToday;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const isOrder = data.get("request-type") === "order";
  const subject = isOrder ? "Předobjednávka občerstvení" : "Žádost o rezervaci stolu";
  const details = isOrder
    ? [
        `Položka: ${data.get("item")}`,
        `Počet kusů: ${data.get("quantity")}`,
        `Vyzvednutí: ${data.get("pickup-date")} v ${data.get("pickup-time")}`,
      ]
    : [
        `Datum: ${data.get("reservation-date")}`,
        `Čas: ${data.get("reservation-time")}`,
        `Počet osob: ${data.get("guests")}`,
      ];

  details.push(
    `Jméno: ${data.get("customer-name")}`,
    `E-mail: ${data.get("customer-email")}`,
    `Telefon: ${data.get("customer-phone") || "neuveden"}`,
    `Poznámka: ${data.get("note") || "žádná"}`,
  );

  window.location.href = `mailto:info@kavovykoutek.cz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details.join("\n"))}`;
});