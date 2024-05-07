import jsonData from "../json/top100Films.json";

/**
 * @function delay
 * @param ms 초
 * @returns delay
 * @description 딜레이
 */
const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jsonData);
    }, ms);
  });
};

/**
 * @description 300ms 지연 후 `top100Films`을 리턴해야 합니다.
 */
const fetchTop100Films = async () => {
  try {
    const fetchData = await delay(6000);
    console.log(fetchData);
    if (fetchData) {
      return fetchData;
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

export { fetchTop100Films };
