class DevtoolsManager {
  constructor ({devtoolsOptions, name} = {}) {
    if (!name && !(document && document.title)) {
      name = 'ClearX'
    }

    if (typeof window !== 'undefined') {
      const reduxLib = (window).__REDUX_DEVTOOLS_EXTENSION__
      if (reduxLib) {
        this._initReduxDevtools(reduxLib, devtoolsOptions, name)
      }
    }
  }

  _initReduxDevtools (reduxLib, devtoolsOptions, name) {
    const options =
      (typeof devtoolsOptions === 'object') ? devtoolsOptions : undefined

    this.reduxDevtools = reduxLib.connect({
      name,
      autoPause: true,
      ...options,
      stateSanitizer: state => state,
      features: {
        jump: false,
        skip: false,
        ...(options ? options.features : undefined)
      }
    })

    this.reduxDevtools.init(undefined)
  }

  update ({event, state}) {
    if (this.reduxDevtools) {
      this.reduxDevtools.send(event, state)
    }
  }
}
export default DevtoolsManager
