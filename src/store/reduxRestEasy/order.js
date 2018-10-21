import {createResource} from "@brigad/redux-rest-easy";
import {getToken} from "./networkHelpers/getToken";
import handleStatusCode from "./networkHelpers/handleStatusCode";
import Jsona from 'jsona';
import { config } from "../../config";
const dataFormatter = new Jsona();



const orders = createResource('orders')({
  getOrders: {
    method: 'GET',
    url: `${config.api.baseUrl}/api/v1/orders`,
    afterHook: () => console.log('Get stores successfully'),
    normalizer: response => {
      console.log('getOrders response: ', response);
      let orders = dataFormatter.deserialize(response);
      console.log('getOrders: orders', orders);
      if (!orders) {
        return {}
      }

      let data = {
        entities: {orders: {}},
        result: orders.map(item => item.id)
      };

      orders.forEach(element => {
        data.entities.orders[element.id] = element
      });
      console.log('getOrders: data', data);

      return data
    },
    networkHelpers: {
      getToken: getToken,
      handleStatusCode,
      async requestGET() {
        let CurrentUser = await this.getToken().then(res => res);
        return {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${CurrentUser.access_token}`,
          },
        };
      },
    },
  },
  getOrder: {
    method: 'GET',
    url: `${config.api.baseUrl}/api/v1/order/::id`,
    afterHook: () => console.log('Get stores successfully'),
    normalizer: response => {
      console.log('getOrders response: ', response);
      let order = dataFormatter.deserialize(response);
      console.log('getOrders: order', order);
      if (!order) {
        return {}
      }

      let data = {
        entities: {orders: {}},
        result: [order.id]
      };

      data.entities.orders[order.id] = order;
      console.log('getOrders: data', data);

      return data
    },
    networkHelpers: {
      getToken: getToken,
      handleStatusCode,
      async requestGET() {
        let CurrentUser = await this.getToken().then(res => res);
        return {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${CurrentUser.access_token}`,
          },
        };
      },
    },
  },
  getProduct: {
    method: 'GET',
    url: `${config.api.baseUrl}/api/v1/order/::id`,
    networkHelpers: {
      getToken: getToken,
      handleStatusCode,
      async requestGET() {
        let CurrentUser = await this.getToken().then(res => res);
        return {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${CurrentUser.access_token}`,
          },
        };
      },
    },
  },
  createOrder: {
    method: 'POST',
    url: `${config.api.baseUrl}/api/v1/order`,
    normalizer: response => {
      console.log('POST create response', response)
    },
    networkHelpers: {
      getToken: getToken,
      handleStatusCode,
      async requestPOST(body) {
        let CurrentUser = await this.getToken().then(res => res);
        return {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',

            Authorization: `Bearer ${CurrentUser.access_token}`,
          },
          body: JSON.stringify(body),
        };
      },
    },
  },
  deleteOrder: {
    method: 'DELETE',
    url: `${config.api.baseUrl}/api/v1/order/::id`,
    networkHelpers: {
      getToken: getToken,
      handleStatusCode,
      async requestDELETE(body) {
        let CurrentUser = await this.getToken().then(res => res);
        return {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${CurrentUser.access_token}`,
          },
          body: JSON.stringify(body),
        };
      },
    },
  },
  updateOrder: {
    method: 'PUT',
    url: `${config.api.baseUrl}/api/v1/order`,
    networkHelpers: {
      getToken: getToken,
      handleStatusCode,
      async requestPUT(body) {
        let CurrentUser = await this.getToken().then(res => res);
        return {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${CurrentUser.access_token}`,
          },
          body: JSON.stringify(body),
        };
      },
    },
  },
});

console.log(orders);

const {
  actions: {
    resource: {
      invalidate: invalidateOrder,
      invalidateId: invalidateIdOrder,
      reset: ResetOrders
    },
    getOrders: {
      perform: GetOrdersAction,
    },
    getOrder: {
      perform: GetOrderAction,
    },
    getProduct: {
      perform: getProductAction,
    },
    createOrder: {
      perform: CreateOrderAction,
    },
    updateOrder: {
      perform: UpdateOrderAction,
    },
    deleteOrder: {
      perform: DeleteOrderAction,
    }
  },
  selectors: {
    resource: {
      getResource: GetOrders,
      getResourceById: GetOrderById,
    },
    getOrders: {
      request: {
        getResource: getResourceGetOrders,
        getMetadata: getMetadataGetOrders,
        couldPerform: couldPerformGetOrders,
        isPerforming: isPerformingGetOrders,
        hasSucceeded: hasSucceededGetOrders,
        hasFailed: hasFailedGetOrders,
        isValid: isValidGetOrders,
      }
    },
    getOrder: {
      request: {
        getResource: getResourceGetOrder,
        getMetadata: getMetadataGetOrder,
        couldPerform: couldPerformGetOrder,
        isPerforming: isPerformingGetOrder,
        hasSucceeded: hasSucceededGetOrder,
        hasFailed: hasFailedGetOrder,
        isValid: isValidGetOrder,
      }
    },
    createOrder: {
      request: {
        isPerforming: isCreateOrder
      }
    },
    updateOrder: {
      request: {
        isPerforming: isUpdateOrder
      }
    },
    deleteOrder: {
      request: {
        isPerforming: isDeleteOrder
      }
    }
  }
} = orders;

export {
  GetOrdersAction,
  CreateOrderAction,
  UpdateOrderAction,
  DeleteOrderAction,
  GetOrders,
  GetOrderById,
  getResourceGetOrders,
  getMetadataGetOrders,
  couldPerformGetOrders,
  isPerformingGetOrders,
  hasSucceededGetOrders,
  hasFailedGetOrders,
  isValidGetOrders,
  isCreateOrder,
  isUpdateOrder,
  isDeleteOrder,
  ResetOrders,
  invalidateOrder,
  invalidateIdOrder,
  getResourceGetOrder,
  getMetadataGetOrder,
  couldPerformGetOrder,
  isPerformingGetOrder,
  hasSucceededGetOrder,
  hasFailedGetOrder,
  isValidGetOrder,
  GetOrderAction,
  getProductAction,

}
