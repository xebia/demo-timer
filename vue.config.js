module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Timer";
      return args;
    });
  },
  pwa: {
    name: "Demo timer",
    themeColor: "#6c1d5f",
    msTileColor: "#6c1d5f",
    manifestOptions: {
      short_name: "Timer",
      background_color: "#6c1d5f",
    },
    iconPaths: {
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      msTileImage: "img/icons/mstile-150x150.png",
    },
  },
};
