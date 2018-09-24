import {Meteor} from "meteor/meteor";

export const waitAllSubscribe = async function(subscribeKeys) {
  try {
    const promises = subscribeKeys.map(key => new Promise((res, rej) => {
      if (Meteor.isServer) {
        return res(true);
      }
      if (Meteor.isClient) {
        Meteor.subscribe(key, {
          onReady: () => res(true),
          onError: () => rej(false)
        });
      }
    }));
    await Promise.all(promises);
    return true;
  }
  catch (e) {
    return false;
  }
};

export default {
  waitAllSubscribe
};
