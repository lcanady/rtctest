import { v4 } from "uuid";

const RoomIndex = () => {
  return <div></div>;
};

RoomIndex.getInitialProps = ({ res }) => {
  if (res) {
    res.writeHead(301, {
      Location: '/room/' + v4()
    });
    res.end();
  }

  return {};
};

export default RoomIndex;
