export function chunckArrayInGroups(arr: Array<number>, size: number) {
  const chunk = [];
  let i;
  for (i = 0; i < arr.length; i += size) chunk.push(arr.slice(i, i + size));
  return chunk;
}

export function AddFav(id: string, url: string, name: string, recover: any, write: any) {
  if (recover === null || recover === undefined) {
    const favs = [];
    const fav = { id, url, name };
    favs.push(fav);
    write(favs);
  } else if (Object.values(recover).length === 0) {
    const favs = [];
    const fav = { id, url, name };
    favs.push(fav);
    write(favs);
  } else if (recover.filter((favs: { id: any }) => favs.id === id).length === 1) {
    const newdata = recover.filter((favs: { id: any }) => favs.id !== id);
    write(newdata);
  } else {
    const data = recover;
    const fav = { id, url, name };
    data.push(fav);
    write(data);
  }
}

export function CheckFav(id: string, recover: any) {
  if (recover == null) {
    return false;
  }
  if (Object.values(recover).length === 0) {
    return false;
  }
  if (recover.filter((favs: { id: any }) => favs.id === id).length === 1) {
    return true;
  }
  return false;
}
