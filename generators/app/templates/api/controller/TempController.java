package <%=javaCompanyPackageName%>.controller.<%=javaPackageName%>;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import <%=javaCompanyPackageName%>.helper.AppHelper;
import <%=javaCompanyPackageName%>.service.<%=javaPackageName%>.<%=className%>Service;
import <%=javaCompanyPackageName%>.util.UuidUtil;



@RestController
@RequestMapping(value="/<%=packageName%>/<%=className%>")
public class <%=className%>Controller {

	@Autowired
	private <%=className%>Service <%=javaClassName%>Service;
	
	@RequestMapping(value="/query")
	public Map query(@RequestBody String data,HttpServletRequest req,HttpServletResponse resp){
		Map params = (Map) JSON.parse(data);
		AppHelper.startPage(req);
		List list = <%=javaClassName%>Service.query(params);
		AppHelper.endPage(list, resp);
		return AppHelper.onSuccess(list);
	}
	
	@RequestMapping(value="/add")
	public Object add(@RequestBody String data){
		Map params = (Map) JSON.parse(data);
		<%=javaClassName%>Service.add(params);
		return AppHelper.onSuccess("添加成功");
		
	}
	
	@RequestMapping(value="/update")
	public Object update(@RequestBody String data){
		Map params = (Map) JSON.parse(data);
		<%=javaClassName%>Service.update(params);
		return AppHelper.onSuccess("更新成功");
		
	}

	@RequestMapping(value="/delete")
	public Object delete(@RequestBody String data){
		Map params = (Map) JSON.parse(data);
		<%=javaClassName%>Service.delete(params);
		return AppHelper.onSuccess("删除成功");
		
	}
	
}
