export function AddFav(id: number | any, url: number | any, recover: any, write: any) {
  if (recover === null || recover === undefined) {
    const favs = [];
    const fav = { id, url };
    favs.push(fav);
    write(favs);
  } else if (Object.values(recover).length === 0) {
    const favs = [];
    const fav = { id, url };
    favs.push(fav);
    write(favs);
  } else if (recover.filter((favs: { id: any }) => favs.id === id).length === 1) {
    const newdata = recover.filter((favs: { id: any }) => favs.id !== id);
    write(newdata);
  } else {
    const data = recover;
    const fav = { id, url };
    data.push(fav);
    write(data);
  }
}

export function CheckFav(id: number | any, recover: any) {
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
