const libName = "lib.dll"

const lib = Deno.dlopen(libName, {
  toUpperCase: {
    parameters: ["pointer"],
    result: "void",
  },
});


// function toCString(str: string): Uint8Array {
function toCString(str: string): Uint8Array {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(str + "\0"); // Null-terminated string
    return buffer;
  }
  

export function toUpperCaseWithC(str: string): string {
  const buffer = toCString(str);
  const ptr = Deno.UnsafePointer.of(buffer);
  lib.symbols.toUpperCase(ptr);

  // Decode and return the modified string
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}