package <%=javaCompanyPackageName%>.mapper.<%=javaPackageName%>;

import java.util.List;
import java.util.Map;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface <%=className%>Mapper {
	
	public void add(Map params);

	public List<Map> query(Map params);
	
	public void delete(Map params);
	
	public void update(Map params);
	
}
