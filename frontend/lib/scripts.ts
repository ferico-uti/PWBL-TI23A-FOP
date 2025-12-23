// buat fungsi regex untuk username user
// karakter yang diizinkan : A-Z, a-z, 0-9
export const filterUsername = (value: string) => {
  return value.replace(/[^A-Za-z0-9-]/g, "");
};

// buat fungsi regex untuk nama user
// karakter yang diizinkan : A-Z, a-z, 0-9, spasi, koma, -, .
export const filterNama = (value: string) => {
  return value.replace(/[^A-Za-z0-9-., ]/g, "");
};

// buat fungsi regex untuk password user
// karakter yang diizinkan : A-Z, a-z, 0-9.#@!
export const filterPassword = (value: string) => {
  return value.replace(/[^A-Za-z0-9.#@!-]/g, "");
};
