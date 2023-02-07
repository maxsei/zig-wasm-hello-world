// loader.js
request = new XMLHttpRequest();
request.open("GET", "add_two.wasm");
request.responseType = "arraybuffer";
request.send();

request.onload = function () {
  const bytes = request.response;
  let instance;

  WebAssembly.instantiate(bytes, {
    env: {
      consoleLog: (location, size) => {
        const buffer = new Uint8Array(
          instance.exports.memory.buffer,
          location,
          size
        );
        const decoder = new TextDecoder();
        const string = decoder.decode(buffer);
        console.log(string);
      },
    },
  })
    // Set instance for consoleLog.
    .then((result) => {
      instance = result.instance;
      return result;
    })
    // Call exported function.
    .then((result) => {
      const { add: add_two } = result.instance.exports;
      console.log("calling 'add_two'");
      const add_two_result = add_two(3, 5);
      console.log({ add_two_result });
    });
};
