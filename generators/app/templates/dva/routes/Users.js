import React from 'react';
import { connect } from 'dva';
import styles from './<%=className%>Comp.css';
import <%=className%>Comp from '<%=packageLevel%>/components/<%=packageName%>/<%=className%>Comp';

function <%=className%>Route({ location }) {
  return (
	  <div className={styles.normal}>
	    <<%=className%>Comp />
	  </div>
  );
}

export default connect()(<%=className%>Route);
