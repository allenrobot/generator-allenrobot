import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './<%=className%>Comp.css';
import { PAGE_SIZE } from '<%=packageLevel%>/constants';
import <%=className%>EditModal from './<%=className%>Modal';

function <%=className%>Comp({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: '<%=packageName%>/<%=className%>Model/delete',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/<%=packageName%>/<%=className%>Route',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: '<%=packageName%>/<%=className%>Model/update',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: '<%=packageName%>/<%=className%>Model/add',
      payload: values,
    });
  }

  const columns = [
    <%
      columns.split(",").forEach(function(column){
        var key = column.split(":")[0];
        var label = column.split(":")[1];
        %>
        {
          title: '<%=label%>',
          dataIndex: '<%=key%>',
          key: '<%=key%>',
          render: text => <a href="">{<%=key%>}</a>,
        },
        <%
      })
    %>   
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <<%=className%>EditModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </<%=className%>EditModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <<%=className%>EditModal record={{}} onOk={createHandler}>
            <Button type="primary">添加</Button>
          </<%=className%>EditModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state['<%=packageName%>/<%=className%>Model'];
  return {
    loading: state.loading.models['<%=packageName%>/<%=className%>Model'],
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(<%=className%>Comp);
