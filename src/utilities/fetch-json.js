const fetchJSON = ({ url, fallback = {}, proxy = '' }) => {
  return async () => {
    const res = await fetch(proxy + url);
    let data;
    try {
      data = await res.json();
    } catch(e) {
      data = fallback;
      console.error(e);
    }
    return data;
  }
}

export default fetchJSON;
