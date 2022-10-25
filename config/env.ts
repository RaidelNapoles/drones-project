const defined = (v) => typeof v != 'undefined' && v != '';

export const env = (name: string, default_value?) => {
  const v = process.env[name];
  if (!defined(default_value) && !defined(v)) {
    console.error(`Missing environment variable: "${name}"`);
    process.exit(0);
    throw new Error(`Missing environment variable: "${name}"`);
  }

  return v ?? default_value;
};
