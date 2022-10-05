import { ILocationPoint } from "../types/ILocationPoint";

export const createGpxFile = async (
  props: ILocationPoint[],
): Promise<string> => {
  let gpx =
    '<?xml version="1.0" encoding="UTF-8"?><gpx creator="Majdalkayyal.com" version="1.1"><trk><trkseg>';
  props.forEach((loc) => {
    let strToAdd = '<trkpt lat="';
    strToAdd = strToAdd + loc.latitude + '" lon="';
    strToAdd = strToAdd + loc.longitude + '">';
    strToAdd = strToAdd + "<ele>" + loc.elevation + "</ele>";
    strToAdd = strToAdd + "<time>" + loc.time + "</time></trkpt>";
    gpx += strToAdd;
  });

  gpx += "</trkseg></trk></gpx>";

  return gpx;
};
