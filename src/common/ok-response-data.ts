type Properties = {
  [key: string]: any;
};
export const OkResponseData = (properties: Properties) => {
  return {
    'application/json': {
      schema: {
        type: 'object',
        properties,
      },
    },
  };
};
