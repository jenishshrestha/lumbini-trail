/**
 * Api call function
 * @returns geojson data for map
 */
export async function getLocation() {
  try {
    const response = await fetch(process.env.MAP_API as string, {
      method: 'GET',
      // headers: new Headers({
      //   'ngrok-skip-browser-warning': '69420',
      // }),
    });

    const data = await response.json();

    const { features } = data;

    return {
      type: 'FeatureCollection',
      features: features,
    };
  } catch (err: any) {
    throw new Error(err);
  }
}
