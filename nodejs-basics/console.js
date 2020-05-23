function consoleToJSON() {
  const c = {};

  for (let index = 2; index < process.argv.length; index++) {
    const arg = process.argv[index].split("=");
    c[arg[0]] = arg[1] ? arg[1] : true;
  }

  return c;
}

console.log(consoleToJSON());

