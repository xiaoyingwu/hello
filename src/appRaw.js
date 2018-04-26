// Import the page's CSS. Webpack will know what to do with it.
// import '../stylesheets/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import Nicks_artifacts from '../../build/contracts/Nicks.json'
import ChampionManager_artifacts from '../../build/contracts/ChampionManager.json'
import ForecastManager_artifacts from '../../build/contracts/ForecastManager.json'

const useRinkeby = true

// MetaCoin is our usable abstraction, which we'll use through the code below.
let Nicks = contract(Nicks_artifacts)
let ChampionManager = contract(ChampionManager_artifacts)
let ForecastManager = contract(ForecastManager_artifacts)

let accounts
let account

window.App = {
  start: function () {
    let self = this

    // Bootstrap the MetaCoin abstraction for Use.
    Nicks.setProvider(web3.currentProvider)
    ChampionManager.setProvider(web3.currentProvider)
    ForecastManager.setProvider(web3.currentProvider)

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
        return
      }

      accounts = accs
      account = accounts[0]
      console.log('address', account)

      self.getNick(console.log)
    })
  },

  detectWallet: function (cb = console.log) {
    if (typeof web3 === 'undefined') {
      cb('noWeb3')
      return
    }

    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)

    web3.eth.getAccounts(function (err, _accounts) {
      if (err != null) {
        console.error(err)
        cb('unknowErr')
        return
      }

      if (_accounts.length === 0) {
        cb('unlockWalletFirst')
        return
      }

      // 网络检测
      let net = web3.version.network
      if (net === '4') {
        if (!useRinkeby) {
          cb('wrongNetwork:' + net)
          return
        }
      } else if (net !== '1') {
        cb('wrongNetwork:' + net)
        return
      }

      accounts = _accounts
      account = accounts[0]

      cb('success')
    })
  },
  getAddress: function () {
    return account
  },

  getNick: function (cb = console.log) { // 获得用户昵称
    Nicks.deployed().then(function (instance) {
      return instance.nickOf.call(account, { from: account })
    }).then(function (value) {
      cb(null, value.valueOf())
    }).catch(function (e) {
      cb(e, null)
    })
  },

  setNick: function (name, onComplete = console.log, onSubmit = console.log/*, onReject = console.log, onErr = console.log*/) { // 设置用户昵称
    Nicks.deployed().then(function (instance) {
      let r = instance.set(name, { from: account })
      onSubmit(r)
      return r
    }).then(function (r) {
      onComplete(null, r.receipt.status !== '0x0')
    }).catch(function (e) {
      onComplete(e, false)

      // if (e.message === 'MetaMask Tx Signature: User denied transaction signature.') {
      //   onReject(e, false)
      // } else {
      //   onErr(e)
      // }
    })
  },

  buy: function (teamId, onComplete = console.log, onSubmit = console.log/*, onReject = console.log, onErr = console.log*/) { // 购买球队
    let instance = null
    ChampionManager.deployed().then(function (_instance) {
      instance = _instance
      let r = instance.priceOf.call(teamId)// 先获得球队价格
      onSubmit(r)
      return r
    }).then(function (price) {
      console.log('price before', price.valueOf())
      return instance.buy(teamId, { from: account, value: price.valueOf() })// 下单
    }).then(function (r) {
      onComplete(null, r.receipt.status !== '0x0')
    }).catch(function (e) {
      onComplete(e, false)

      // if (e.message === 'MetaMask Tx Signature: User denied transaction signature.') {
      //   onReject(e, false)
      // } else {
      //   onErr(e)
      // }
    })
  },

  priceOf: function (teamId, cb = console.log) {
    ChampionManager.deployed().then(function (instance) {
      return instance.priceOf.call(teamId)// 先获得球队价格
    }).then(function (price) {
      cb(null, price.valueOf())
    }).catch(function (e) {
      cb(e, null)
      console.error(e)
    })
  },

  allOfAll: function (cb = console.log) {
    ChampionManager.deployed().then(function (instance) {
      return instance.allOfAll.call()
    }).then(function (r) {
      filterResult(r)
      cb(null, r)
    }).catch(function (e) {
      cb(e, null)
      console.error(e)
    })
  },

  invest: function (teamId, partIndex, valueInEth, onComplete = console.log, onSubmit = console.log) {
    ForecastManager.deployed().then(function (instance) {
      return instance.invest(teamId, partIndex, { from: account, value: web3.toWei(valueInEth, 'ether') })
    }).then(function (r) {
      onComplete(null, r.receipt.status !== '0x0')
    }).catch(function (e) {
      onComplete(e, false)
    })
  },

  detailOf: function (teamId, cb = console.log) {
    ForecastManager.deployed().then(function (instance) {
      return instance.detailOf.call(teamId)
    }).then(function (r) {
      filterResult(r)
      cb(null, r)
    })
  },

  getTheMostInvestor: function (teamId, cb = console.log) {
    ForecastManager.deployed().then(function (instance) {
      return instance.getTheMostInvestor.call(teamId)
    }).then(function (r) {
      filterResult(r)
      cb(null, r)
    })
  },

  isBet: function (teamId, addr, cb = console.log) {
    ForecastManager.deployed().then(function (instance) {
      return instance.isBet.call(teamId, account)
    }).then(function (r) {
      filterResult(r)
      cb(null, r)
    })
  }

}
let filterResult = (r) => {
  for (let i = 0; i < r.length; i++) {
    if (r[i] instanceof Array) {
      for (let j = 0; j < r[i].length; j++) {
        r[i][j] = r[i][j].valueOf()
      }
    } else {
      r[i] = r[i].valueOf()
    }
  }
}
window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn('Using web3 detected from external source.')
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn('No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
  }

  App.start()
})
