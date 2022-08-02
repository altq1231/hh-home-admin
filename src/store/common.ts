import { defineStore } from "pinia";
import { PersistedStateOptions } from "pinia-plugin-persistedstate";
const piniaPersistConfig = (key: string) => {
  const persist: PersistedStateOptions = {
    key,
    storage: window.localStorage,
    // storage: window.sessionStorage,
  };
  return persist;
};

export const GlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "GlobalStore",
  // state: 返回对象的函数
  state: (): any => ({
    pageData: [
      {
        id: 0,
        name: "root",
        pid: null,
        children: [
          {
            id: 1,
            name: "box1",
            pid: 0,
            children: [
              {
                id: 5,
                pid: 1,
                name: "box1-child1",
                children: [
                  {
                    id: 6,
                    pid: 5,
                    name: "box1-child1-child",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            pid: 0,
            name: "box2",
            children: [
              {
                id: 7,
                pid: 2,
                name: "box2-child1",
                children: [],
              },
            ],
          },
          {
            id: 3,
            pid: 0,
            name: "box3",
            children: [
              {
                id: 8,
                pid: 3,
                name: "box3-child1",
                children: [],
              },
            ],
          },
          {
            id: 4,
            pid: 0,
            name: "box4",
            children: [
              {
                id: 9,
                pid: 4,
                name: "box4-child1",
                children: [],
              },
            ],
          },
        ],
      },
    ],
    absoluteData: [],
    curDom: null,
  }),
  getters: {},
  actions: {
    // updatePageData
    updatePageData(from: any, to: any) {
      console.log("updatePageData", from, to);
      const iTemp = this.searchTree(this.pageData[0], from);
      this.deleteTreeNode(this.pageData[0], from);
      console.log("search", iTemp);
      this.addTreeNode(this.pageData[0], to, iTemp);
    },
    searchTree(element, id) {
      // 根据id查找节点
      if (element.id == id) {
        return element;
      } else if (element.children != null) {
        let result = null;
        for (let i = 0; result == null && i < element.children.length; i++) {
          result = this.searchTree(element.children[i], id);
        }
        return result;
      }
      return null;
    },
    addTreeNode(root, id, obj) {
      if (root.id == id) {
        if (root.children == null) root.children = [];
        root.children.push(obj);
        return true;
      } else if (root.children && root.children.length > 0) {
        for (let i = root.children.length - 1; i >= 0; i--) {
          this.addTreeNode(root.children[i], id, obj);
        }
      }
    },
    deleteTreeNode(root, id) {
      if (root.id == id) {
        // for (let key in root) {
        //   delete root[key];
        // }
        return true;
      } else if (root.children && root.children.length > 0) {
        for (let i = root.children.length - 1; i >= 0; i--) {
          let isClean = this.deleteTreeNode(root.children[i], id);
          if (isClean === true) {
            root.children.splice(i, 1);
          }
        }
      }
    },
    setCurDom(val: any) {
      this.curDom = val;
    },
    getTargetData(key: any) {
      let data: any;

      if (this.pageData && this.pageData.length > 0) {
        this.pageData.map((item) => {
          data = this.searchTree(item, key);
        });
      }

      return data;
    },
    getDragTarget(data: any) {
      const temp = this.getTargetData(data.id);
      console.log("getDragTarget", data, temp);
    },
    setAbsoluteData(data: object) {
      this.absoluteData.push(data);
    },
    updateAbsoluteData(data: object) {
      this.absoluteData = this.absoluteData.map((item: any) => {
        if (item.id === data.id) {
          item = data;
        }
        return item;
      });
    },

    deleteSourceData(data: object) {
      console.log(data);

      // this.pageData = this.pageData.map((item: any) => {

      // })
    },
  },
  // persist: piniaPersistConfig("GlobalStore"),
});
