type Params = { [key: string]: string | number | undefined | string[] };

const getKey = (base: string, params?: Params) => {
  const newParams: string[] = [];

  for (const key in params) {
    const value = params[key];
    if (value !== undefined) {
      if (Array.isArray(value)) {
        newParams.push(key + '=' + value.join(','));
      } else {
        newParams.push(key + '=' + value);
      }
    }
  }
  return `${base}${newParams.length > 0 ? `?${newParams?.join('&')}` : ''}`;
};

export default getKey;
