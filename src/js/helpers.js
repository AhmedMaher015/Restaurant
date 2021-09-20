export const getJson = async function (url, requestOptions) {
  try {
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
