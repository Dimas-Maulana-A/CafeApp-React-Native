import RNFS from 'react-native-fs';

const fsGetData = async id => {
  try {
    const file = RNFS.DocumentDirectoryPath + `/.storage_details_${id}.json`;
    const get = await RNFS.readFile(file, 'utf8');
    return get;
  } catch (error) {
    console.log(error);
  }
};

const fsPostData = async(id, data) => {
  const file = RNFS.DocumentDirectoryPath + `/.storage_details_${id}.json`;
  await RNFS.writeFile(file, data, 'utf8')
    .then(result => {
      console.log('save success');
    })
    .catch(err => {
      console.log(err);
    });
};

const fsPutData = async(id, fs_id, id_menu, total_barang) => {
  const file = RNFS.DocumentDirectoryPath + `/.storage_details_${id}.json`;
  const loadData = async function () {
    await RNFS.readFile(file, 'utf8')
      .then(content => {
        return content;
      })
      .catch(err => {
        console.log(err);
      });
  };

  let data = loadData();
  let getExept = data.details.filter(x => x.fs_id !== fs_id);
  let getData = data.details.findIndex(x => x.fs_id === fs_id);
  let getId = data.details[getData].fs_id;
  let datas = {
    details: getExept,
  };

  datas.details.push({
    id: getId,
    id_menu: id_menu,
    total_barang: total_barang,
  });
  let dataJson = JSON.stringify(datas);
  await RNFS.writeFile(file, dataJson, 'utf8', err => {
    if (err) console.log(err);
    else {
      console.log('data updated');
    }
  });
};

const fsDelData = (id, fs_id) => {
  const file = RNFS.DocumentDirectoryPath + `/.storage_details_${id}.json`;
  const loadData = function () {
    RNFS.readFile(file, 'utf8')
      .then(content => {
        return content;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const data = loadData();
  let getData = data.details.filter(x => x.fs_id !== fs_id);
  let getSearch = data.details.findIndex(x => x.fs_id === fs_id);

  if (getSearch == -1) {
    console.log('data not found');
  } else {
    var datas = {details: getData};
    const dataJson = JSON.stringify(datas);
    RNFS.writeFile(file, dataJson, 'utf8', err => {
      if (err) throw err;
      else {
        console.log('data was deleted');
      }
    });
  }
};

const fsClearData = id => {
  const data = {
    details: [],
  };
  const file = RNFS.DocumentDirectoryPath + `/.storage_details_${id}.json`;
  RNFS.writeFile(file, data, 'utf8')
    .then(result => {
      console.log('save success');
    })
    .catch(err => {
      console.log(err);
    });
};

export {fsGetData, fsPostData, fsPutData, fsDelData, fsClearData};
