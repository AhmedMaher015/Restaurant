export const getJson = async function (url, requestOptions) {
  try {
    const res = await fetch(url, requestOptions);
    if (!res.ok) throw new Error('Somthin went wrong , please try again');
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
};

export const IsUserLogged = function () {
  if (localStorage.getItem('user') == null) return false;
  return true;
};
