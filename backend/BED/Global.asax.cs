using System;
using System.ServiceModel.Activation;
using System.Web;
using System.Web.Routing;

using BEDService.Model;
using log4net;
using log4net.Appender;

namespace BEDService
{
    public class Global : HttpApplication
    {
        public static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        void Application_Start(object sender, EventArgs e)
        {
            AuditTrail auditTrail = new AuditTrail();
            try
            {
                log4net.Config.XmlConfigurator.Configure();
                RegisterRoutes();

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
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.AddHeader("Cache-Control", "no-cache");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, X-Requested-With");
                HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
                HttpContext.Current.Response.End();
            }
        } 

        private void RegisterRoutes()
        {
            // Edit the base address of Service1 by replacing the "Service1" string below
            RouteTable.Routes.Add(new ServiceRoute("BEDService", new WebServiceHostFactory(), typeof(BEDService)));
        }
    }


}
