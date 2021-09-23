export const getJson = async function (url, requestOptions) {
  try {
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
};
