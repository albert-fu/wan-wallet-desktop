import { observable, action, computed, toJS } from 'mobx';
import BigNumber from 'bignumber.js';
import { roundFun } from 'utils/support'

const GASLIMIT = 21000;

class SendCrossChainParams {
    @observable currentFrom = '';

    @observable transParams = {};

    @observable gasLimit = GASLIMIT;

    @observable defaultGasPrice = 200;

    @observable minGasPrice = 180;

    @observable currentGasPrice = 200;

    @action addCrossTransTemplate (addr, params = {}) {
      let gasPrice = params.chainType === 'ETH' ? 1 : 200;
      self.currentFrom = addr;
      self.transParams[addr] = {
        gasPrice,
        source: params.chainType,
        destination: params.chainType === 'ETH' ? 'ETH' : 'WAN',
        from: {
          walletID: 1,
          path: params.path
        },
        to: {
          walletID: 1,
          path: ''
        },
        toAddr: '',
        amount: 0,
        storeman: '',
        txFeeRatio: 0,
        gasLimit: GASLIMIT,
      };
    }

    @action updateTransParams (addr, paramsObj) {
      Object.keys(paramsObj).forEach(item => {
        if (item === 'gasPrice') {
          self.transParams[addr].gasPrice = Math.max(paramsObj.gasPrice, self.transParams[addr].gasPrice)
        } else {
          self.transParams[addr][item] = paramsObj[item];
        }
      });
    }
}

const self = new SendCrossChainParams();
export default self;
