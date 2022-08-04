onmessage = (e) => {
  console.log(e.data);

  // setInterval(() => {
  //   postMessage({ first_name: "we been on", last_name: e.data.first_name });
  // }, 3000);
  postMessage({ first_name: "we been on", last_name: e.data.first_name });
};
