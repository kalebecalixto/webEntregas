<%@page import="horus.html5.JspJson"%><%
    String sql = request.getParameter("sql");            
    JspJson.WriteJsonQuery(response, session, sql);
%>