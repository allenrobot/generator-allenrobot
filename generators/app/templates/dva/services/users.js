import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function query({ page,values}) {
  return request(`/<%=packageName%>/<%=className%>/query?_page=${page}&_limit=${PAGE_SIZE}`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function delete(id) {
  return request(`/<%=packageName%>/<%=className%>/delete/${id}`, {
    method: 'POST'
  });
}

export function update(id, values) {
  return request(`/<%=packageName%>/<%=className%>/update/${id}`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function add(values) {
  return request('/<%=packageName%>/<%=className%>/add', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
