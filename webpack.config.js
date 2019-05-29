module.exports = function(env, argv) {
  env = env || "dev";
  return require(`./webpack.${env}.js`);
};
