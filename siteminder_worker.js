onmessage = async (e) => {
  const siteminder_queue = e.data.task.siteminder_queue;
  const start_date = e.data.task.date_start;
  const end_date = e.data.task.date_end;
  const adults = e.data.task.adults;
  const children = e.data.task.children;
  const infants = e.data.task.infants;
  //  const sleep_time = 100;
  let id_queue = [];
  for (query of siteminder_queue) {
    id_queue.push(query.siteminder_id);
  }
  // console.log("siteminder queue", siteminder_queue, id_queue);

  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  const URL = "http://worktel-uat.xcodemy.com/api/vendor/getHotelAvailability";
  // await sleep(sleep_time);
  const resp = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      checkInDate: start_date,
      checkOutDate: end_date,
      adults: adults,
      children: children,
      infants: infants,
      propertyIds: id_queue,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  // console.log("resp is", resp);

  if (resp === undefined) {
    postMessage({ error: "Request failed" });
    return;
  }

  for (let i = 0; i < resp.length; i++) {
    let rooms = [...resp[i].data.quoteSets];
    if (rooms.length === 0) {
      postMessage({ error: "Request failed" });
      console.error(siteminder_queue[i], "may be invalid");
      continue;
    }
    let min_price = Infinity;
    let sold_out = true;
    for (let room of rooms) {
      min_price = Math.min(room.price.amount, min_price);
      // console.log(rooms, room.available, min_price);
      if (room.available > 0) {
        sold_out = false;
      }
    }
    postMessage({
      hotel_in_array_id: siteminder_queue[i].hotel_in_array_id,
      sold_out: sold_out,
      price: min_price,
      err: null,
    });
  }
};
