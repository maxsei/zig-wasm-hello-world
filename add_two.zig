// add_two.zig
// extern fn print(a: i32);
// zig build-lib add_two.zig -target wasm32-freestanding -dynamic -OReleaseSafe

export fn add(a: i32, b: i32) i32 {
    // Test vector maths in wasm
    const avec = @Vector(4, i32){ a, 2, 3, 4 };
    const bvec = @Vector(4, i32){ b, 6, 7, 8 };
    const cvec = avec + bvec;

    // Test console.log.
    const message = "hello from zig wasm";
    consoleLog(message, message.len);

    // print(69420);
    return cvec[0];
}

extern fn consoleLog(message: [*]const u8, length: u8) void;
