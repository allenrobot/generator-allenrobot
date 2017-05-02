import * as <%=className%>Service from '<%=packageLevel%>/<%=packageName%>/<%=className%>Service';

export default {
  namespace: '<%=packageName%>/<%=className%>Model',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *query({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(<%=className%>Service.query, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *delete({ payload: id }, { call, put }) {
      yield call(<%=className%>Service.delete, id);
      yield put({ type: 'reload' });
    },
    *update({ payload: { id, values } }, { call, put }) {
      yield call(<%=className%>Service.update, id, values);
      yield put({ type: 'reload' });
    },
    *add({ payload: values }, { call, put }) {
      yield call(<%=className%>Service.add, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state['<%=packageName%>/<%=className%>Model'].page);
      yield put({ type: 'query', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/<%=packageName%>/<%=className%>') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
