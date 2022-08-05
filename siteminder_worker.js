onmessage = async (e) => {
  const siteminder_id = e.data.task.siteminder_id;
  const start_date = e.data.task.date_start;
  const end_date = e.data.task.date_end;
  const adults = e.data.task.adults;
  const children = e.data.task.children;
  const infants = e.data.task.infants;

  console.log(e.data, typeof siteminder_id);

  const URL = "https://book-directonline.com/api/graphql";
  const resp = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationName: "fetchQuotes",
      variables: {
        propertyId: parseInt(siteminder_id),
        promocode: "",
        checkInDate: start_date,
        checkOutDate: end_date,
        adults: adults,
        children: children,
        infants: infants,
        currencyFrom: "TWD",
        currencyTo: "TWD",
      },
      query:
        "query fetchQuotes($propertyId: Int!, $checkInDate: String!, $checkOutDate: String!, $currencyFrom: String, $currencyTo: String, $promocode: String, $adults: Int, $children: Int, $infants: Int) {\n  quoteSets(propertyId: $propertyId, checkInDate: $checkInDate, checkOutDate: $checkOutDate, currencyFrom: $currencyFrom, currencyTo: $currencyTo, promocode: $promocode, adults: $adults, children: $children, infants: $infants) {\n    roomTypeId\n    flash {\n      type\n      args\n      key\n    }\n    price {\n      originalAmount\n      originalAmountStr\n      amount\n      amountStr\n    }\n    available\n    quotes {\n      roomRateId\n      promotionApplies\n      available\n      flash {\n        type\n        args\n        key\n      }\n      errors {\n        type\n        args\n        key\n      }\n      price {\n        originalAmount\n        originalAmountStr\n        amount\n        amountStr\n        tax\n        taxStr\n        discount\n      }\n      deal\n      extras {\n        type\n        uuid\n        price {\n          amount\n          amountStr\n          tax\n          taxStr\n        }\n      }\n      breakdown {\n        date\n        price {\n          amount\n          amountStr\n        }\n        subtotal {\n          amount\n          originalAmount\n        }\n      }\n      summary {\n        extraAdults {\n          amount\n          amountStr\n        }\n        extraChildren {\n          amount\n          amountStr\n        }\n        extraInfants {\n          amount\n          amountStr\n        }\n        extraOccupants {\n          amount\n          amountStr\n        }\n        price {\n          amount\n          originalAmount\n        }\n      }\n    }\n  }\n}\n",
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  if (resp === undefined) {
    postMessage({ error: "Request failed" });
    return;
  }
  const rooms = [...resp.data.quoteSets];
  let min_price = Infinity;

  for (let room of rooms) {
    min_price = Math.min(room.price.amount, min_price);
  }
  postMessage({ task: e.data.task, price: min_price, err: null });
};
