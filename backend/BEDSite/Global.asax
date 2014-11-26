<%@ Application Language="C#" %>
<%@ Import Namespace="log4net" %>
<%@ Import Namespace="log4net.Appender" %>
<%@ Import Namespace="BEDSite.Model" %>
<script runat="server">
    public static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
    void Application_Start(object sender, EventArgs e) 
    {
        // Code that runs on application startup
        
        AuditTrail auditTrail = new AuditTrail();
        try
        {
            log4net.Config.XmlConfigurator.Configure();

            auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.ServiceStart, "Application_Start", "BED Service Started");
        }
        catch (Exception ex)
        {
            auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.ServiceStart, ex.Source, ex.Message);
            throw;
        }
        finally
        {
            log.Info(auditTrail.GetAuditTrail());
            auditTrail = null;
        }
    }

    protected void Application_BeginRequest(Object sender, EventArgs e)
    {
        //if (System.IO.File.Exists(HttpContext.Current.Request.PhysicalPath))
        //{
        //    if (HttpContext.Current.Request.IsSecureConnection.Equals(false) || !Request.ServerVariables["HTTP_HOST"].ToUpper().Contains("WWW"))
        //    {
        //        Response.Redirect("https://" + parseWWW(Request.ServerVariables["HTTP_HOST"])
        //            + HttpContext.Current.Request.RawUrl, false);
        //        Response.StatusCode = 301;
        //        Response.End();
        //    }
        //}
    }

    String parseWWW(String request)
    {
        String parsedRequest;

        parsedRequest = request.Contains("www") ? request : "www." + request;
        
        return parsedRequest;
    }
    
    void Application_End(object sender, EventArgs e) 
    {
        //  Code that runs on application shutdown

    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        // Code that runs when an unhandled error occurs

    }

    void Session_Start(object sender, EventArgs e) 
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }
       
</script>
