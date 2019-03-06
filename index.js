var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var start = "start";
var stop = "stop";
var reset = "reset";var


Controls = function (_React$Component) {_inherits(Controls, _React$Component);
  function Controls(props) {_classCallCheck(this, Controls);return _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this,
    props));
  }_createClass(Controls, [{ key: "render", value: function render()
    {
      return (
        React.createElement("div", { "class": "control-pad" },
          React.createElement("label", { id: this.props.label }, this.props.labelInner),
          React.createElement("h2", { id: this.props.ident }, this.props.initial),
          React.createElement("button", { id: this.props.increBtn, onClick: this.props.clicker }, "Increment"), React.createElement("button", { id: this.props.decreBtn, onClick: this.props.clicker }, "Decrement")));


    } }]);return Controls;}(React.Component);var


MyClock = function (_React$Component2) {_inherits(MyClock, _React$Component2);
  function MyClock(props) {_classCallCheck(this, MyClock);var _this2 = _possibleConstructorReturn(this, (MyClock.__proto__ || Object.getPrototypeOf(MyClock)).call(this,
    props));
    _this2.state = {
      workSetting: 25,
      breakSetting: 5,
      work: 1500,
      break: 300,
      status: "Set-up",
      timerIsOn: false,
      intervalId: "" };

    _this2.timer = _this2.timer.bind(_this2);
    _this2.clicker = _this2.clicker.bind(_this2);
    _this2.startStop = _this2.startStop.bind(_this2);
    _this2.reset = _this2.reset.bind(_this2);
    _this2.interval = null;
    _this2.countdown = null;
    _this2.startTime = null;
    _this2.pause = _this2.pause.bind(_this2);return _this2;
  }_createClass(MyClock, [{ key: "startStop", value: function startStop()
    {var _this3 = this;
      if (this.state.status === "Set-up") {
        this.setState({
          work: this.state.workSetting * 60,
          break: this.state.breakSetting * 60,
          status: "Session" },

        function () {return _this3.timer(_this3.state.work, document.querySelector("#time-left"));});

      } else
      if (this.state.status === "Session") {switch (this.state.timerIsOn) {
          case false:
            this.timer(this.state.work, document.querySelector("#time-left"));
            break;
          case true:
            this.pause();
            break;}

      } else
      if (this.state.status === "Break") {
        switch (this.state.timerIsOn) {
          case false:
            this.timer(this.state.break, document.querySelector("#time-left"));
            break;
          case true:
            this.pause();
            break;}

      }
    } }, { key: "clicker", value: function clicker(

    e) {
      switch (e.target.id) {
        case "session-increment":
          if (this.state.workSetting < 60) {this.setState({
              workSetting: this.state.workSetting + 1 });
          }
          break;
        case "session-decrement":
          if (this.state.workSetting > 1) {this.setState({
              workSetting: this.state.workSetting - 1 });
          }
          break;
        case "break-increment":
          if (this.state.breakSetting < 60) {this.setState({
              breakSetting: this.state.breakSetting + 1 });
          }
          break;
        case "break-decrement":
          if (this.state.breakSetting > 1) {this.setState({
              breakSetting: this.state.breakSetting - 1 });
          }
          break;}


    } }, { key: "reset", value: function reset()
    {
      clearInterval(this.state.intervalId);
      this.setState({
        workSetting: 25,
        breakSetting: 5,
        work: 1500,
        break: 300,
        status: "Set-up",
        timerIsOn: false,
        IntervalId: "" });

      document.querySelector("#beep").pause();
      document.querySelector("#beep").currentTime = 0;

    } }, { key: "timer", value: function timer(
    timeInSeconds, displayElement) {var _this4 = this;
      this.startTime = new Date().getTime();
      var time,ms = timeInSeconds * 1000;
      var intervalId = void 0;

      this.countdown = function () {
        time = Math.max(0, ms - (new Date().getTime() - _this4.startTime));
        var minutes = Math.floor(time / 60000);
        var seconds = Math.floor(time / 1000) % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        displayElement.textContent = minutes + ":" + seconds;
        if (displayElement.textContent === "00:00") {
          document.querySelector("#beep").play();
        }
        if (time === 0) {
          if (_this4.state.status === "Session") {
            clearInterval(intervalId);
            _this4.setState({
              status: "Break",
              work: _this4.state.workSetting * 60,
              break: _this4.state.breakSetting * 60 },

            function () {return _this4.timer(_this4.state.break, displayElement);});

          } else
          if (_this4.state.status === "Break") {
            clearInterval(intervalId);
            _this4.setState({
              status: "Session",
              work: _this4.state.workSetting * 60,
              break: _this4.state.breakSetting * 60 },

            function () {return _this4.timer(_this4.state.work, displayElement);});
          }
        }
        return time;
      };
      this.interval = function () {
        _this4.countdown();
        intervalId = setInterval(_this4.countdown, 200);
        _this4.setState({
          intervalId: intervalId,
          timerIsOn: true });
      };
      this.interval();
    } }, { key: "pause", value: function pause()
    {
      if (this.state.status === "Session") {var remaining = this.state.work * 1000 - (new Date().getTime() - this.startTime);
        clearInterval(this.state.intervalId);
        this.setState({
          timerIsOn: false,
          work: remaining / 1000 });

      } else
      if (this.state.status === "Break") {
        var _remaining = this.state.break * 1000 - (new Date().getTime() - this.startTime);
        clearInterval(this.state.intervalId);
        this.setState({
          timerIsOn: false,
          break: _remaining / 1000 });


      }
    } }, { key: "render", value: function render()
    {
      function secondsToMinutes(number) {
        var m = parseInt(number / 60);
        var s = parseInt(number % 60);
        s = s < 10 ? "0" + s : s;
        m = m < 10 ? "0" + m : m;
        return m + ":" + s;
      }
      return (
        React.createElement("div", { id: "app" },
          React.createElement("h1", { id: "title" }, "Pomodoro Clock"),
          React.createElement("div", { id: "wrapper" },
            React.createElement("div", { id: "controls" },
              React.createElement(Controls, { ident: "session-length",
                label: "session-label",
                labelInner: "Session-length",
                initial: this.state.workSetting,
                increBtn: "session-increment",
                clicker: this.clicker,
                decreBtn: "session-decrement" }),

              React.createElement(Controls, { ident: "break-length",
                labelInner: "Break-length",
                label: "break-label",
                clicker: this.clicker,
                initial: this.state.breakSetting,
                increBtn: "break-increment",
                decreBtn: "break-decrement" })),


            React.createElement("div", { id: "timer-label" }, this.state.status),
            React.createElement("div", { id: "time-left" }, secondsToMinutes(this.state.work)),
            React.createElement("button", { id: "start_stop", onClick: this.startStop }, "Start/Stop"),
            React.createElement("button", { id: "reset", onClick: this.reset }, "Reset"),
            React.createElement("audio", { id: "beep", src: "https://raw.githubusercontent.com/rapidsloth/Pomodoro-clock-FCC/master/Japanese_School_Bell_short.mp3" }))));



    } }]);return MyClock;}(React.Component);


ReactDOM.render(React.createElement(MyClock, null), document.getElementById("container"));