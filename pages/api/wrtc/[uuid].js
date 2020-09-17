export default ({ query: { uuid } }, res) => {
  res.send(uuid);
};
