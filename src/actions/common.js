export function point(data) {
  return {
    type: "POINT",
    payload: {
      request: {
        method: "post",
        url: "http://127.0.0.1:3000/upload",
        config: {
          header: { "Content-type": "application/json" }
        },
        data
      }
    }
  };
}
export function behaviorInfo(data) {
  return {
    type: "BEHAVIOR_INFO_CREATE",
    payload: {
      request: {
        method: "post",
        url: "http://127.0.0.1:3000/behaviorInfo",
        config: {
          header: { "Content-type": "application/json" }
        },
        data
      }
    }
  };
}
