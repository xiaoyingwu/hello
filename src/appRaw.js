// Import the page's CSS. Webpack will know what to do with it.
// import '../stylesheets/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import Nicks_artifacts from '../../build/contracts/Nicks.json'
import ChampionManager_artifacts from '../../build/contracts/ChampionManager.json'
import ForecastManager_artifacts from '../../build/contracts/ForecastManager.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
let Nicks = contract(Nicks_artifacts)
let ChampionManager = contract(ChampionManager_artifacts)
let ForecastManager = contract(ForecastManager_artifacts)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
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

  detectWallet: function (callback) {
    if (typeof web3 !== 'undefined') {
      console.warn('Using web3 detected from external source.')
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(web3.currentProvider)

      web3.eth.getAccounts(function (err, accs) {
        if (err != null) {
          console.error(err)
          callback('unknowErr')
          return
        }

        if (accs.length === 0) {
          callback('unlockWalletFirst')
          return
        }

        let net = web3.version.network
        if (net !== 1 && net !== 4) { // 是否为测试网络
          callback('wrongNetwork:' + net)
          return
        }

        accounts = accs
        account = accounts[0]

        callback('success')
      })
    } else {
      callback('noWeb3')
    }
  },

  getNick: function (cb) { // 获得用户昵称
    Nicks.deployed().then(function (instance) {
      return instance.nickOf.call(account, { from: account })
    }).then(function (value) {
      console.log(value.valueOf())
      cb(null, value.valueOf())
    }).catch(function (e) {
      cb(e, null)
      console.error(e)
    })
  },
  setNick: function (name, cb) { // 设置用户昵称
    Nicks.deployed().then(function (instance) {
      return instance.set(name, { from: account })
    }).then(function () {
      cb(null, true)
    }).catch(function (e) {
      cb(e, false)
      console.error(e)
    })
  },
  buy: function (teamId, cb) { // 购买球队
    let instance = null
    ChampionManager.deployed().then(function (_instance) {
      instance = _instance
      return instance.priceOf.call(teamId)// 先获得球队价格
    }).then(function (price) {
      console.log('price before', price.valueOf())
      return instance.buy(teamId, { from: account, value: price.valueOf() })// 下单
    }).then(function () {
      cb(null, true)
    }).catch(function (e) {
      cb(e, false)
      console.error(e)
    })
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
