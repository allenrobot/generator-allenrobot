package <%=javaCompanyPackageName%>.service.<%=javaPackageName%>;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import <%=javaCompanyPackageName%>.datasource.DataSourceName;
import <%=javaCompanyPackageName%>.mapper.<%=javaPackageName%>.<%=className%>Mapper;

@Service
public class <%=className%>Service {

	@Autowired
	private <%=className%>Mapper <%=javaClassName%>Mapper;
	
	@DataSourceName("<%=javaDataSourceName%>")
	public List<Map> query(Map params){
		List<Map> result = <%=javaClassName%>Mapper.query(params);
		return result;
	}
	
	@DataSourceName("<%=javaDataSourceName%>")
	public Boolean add(Map params){
		<%=javaClassName%>Mapper.add(params);
		return true;
	}

	@DataSourceName("<%=javaDataSourceName%>")
	public Boolean update(Map params){
		<%=javaClassName%>Mapper.update(params);
		return true;
	}

	@DataSourceName("<%=javaDataSourceName%>")
	public Boolean delete(Map params){
		<%=javaClassName%>Mapper.delete(params);
		return true;
	}
	
}
