/**
 * @class     socket.io-client 封装
 * @function  connect()               连接socket
 * @function  disconnect()            关闭socket，每次操作完之后调用
 * @param     url                     socket地址 默认: ws://localhost:5500  可选
 * @author    altq 2021/09/29
 */

import SocketIo from 'socket.io-client';

export default class SocketClient {
  constructor() {
    this.socket = null;
  }

  connect = (url, path) => {
    return new Promise((resolve, reject) => {
      if (!url) url =
        import.meta.env.VITE_DEFAULT_SOCKET_URL;
      if (!path) path =
        import.meta.env.VITE_DEFAULT_SOCKET_PATH;
      this.socket = SocketIo(url, {
        path: path,
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        if (this.socket.connect) {
          resolve(this.socket);
        }
      });
    });
  };

  send = (key, data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(key, data)
    })
  }

  disconnect = () => {
    if (this.socket) {
      this.socket.disconnect();
    }
  };
}