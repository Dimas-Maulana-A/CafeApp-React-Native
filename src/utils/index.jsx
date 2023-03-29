import {auth} from './auth';
import {getItem, setItem, removeItem, clearItem} from './localStorage';
import {
  baseLogin,
  baseKasir,
  baseRole,
  baseCategory,
  baseMenu,
  baseMeja,
  baseTransaksi,
  baseDetails,
  baseReport,
  baseLogs,
} from './base';

import {
  fsGetData,
  fsPostData,
  fsPutData,
  fsDelData,
  fsClearData,
} from './fileSystem';

export {
  auth,
  getItem,
  setItem,
  removeItem,
  clearItem,
  baseLogin,
  baseKasir,
  baseRole,
  baseCategory,
  baseMenu,
  baseMeja,
  baseTransaksi,
  baseDetails,
  baseReport,
  baseLogs,
  fsGetData,
  fsPostData,
  fsPutData,
  fsDelData,
  fsClearData,
};
