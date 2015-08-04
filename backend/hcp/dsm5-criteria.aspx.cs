using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using BEDSite.Model;
using log4net;
using log4net.Appender;

public partial class dsm5criteria : System.Web.UI.Page
{
    public static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

    // The PDF hosted on this page should be viewable only by people who registered on the site and have recieved an email containing the link.
    // If the name is searched and the PDF link is clicked from a search engine, then the user should be redirected to www.bingeeatingdisorder.com
    protected void Page_Load(object sender, EventArgs e)
    {
        //AuditTrail auditTrail = new AuditTrail();
        try
        {

            //auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.ServiceStart, this.GetType().AssemblyQualifiedName, "PDF display");
            //log.Info(auditTrail.GetAuditTrail());
            string referrer = "";
            string pdfAllowed = ConfigurationManager.AppSettings["PDFAllowed"];

            //auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.ServiceStart, this.GetType().AssemblyQualifiedName, "PDFAllowed: " + pdfAllowed);
            //log.Info(auditTrail.GetAuditTrail());

            //if there are query string parameters, it is probably coming from email link so allow the pdf to be shown
            if (Request.QueryString.Count > 0)
                return;


            if (Request.UrlReferrer != null)
            {
                referrer = Request.UrlReferrer.AbsoluteUri;
            }

            //auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.ServiceStart, this.GetType().AssemblyQualifiedName, "referrer: " + referrer);
            //log.Info(auditTrail.GetAuditTrail());
            //if Request.UrlReferrer is null, then the user typed in the url or clicked on a saved link so allow the pdf to be shown.
            //However, if the URL Referrer is not null, then the user might be coming from a search engine or they might be coming from the 
            //link displayed after signing in on the BED site. These users are allowed to view the PDF. Allow the users from all environments
            // that are listed in "PDFAllowed" string in web.config
            if (!String.IsNullOrEmpty(referrer))
            {
                string[] allowed = pdfAllowed.Split('|');
                foreach (string str in allowed)
                {
                    //auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.ServiceStart, this.GetType().AssemblyQualifiedName, "str: " + str);
                    //log.Info(auditTrail.GetAuditTrail()); 
                    if (referrer.Contains(str))
                        return;
                }
                //auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.ServiceStart, this.GetType().AssemblyQualifiedName, "Response.Redirect " );
                //log.Info(auditTrail.GetAuditTrail()); 
                Response.Redirect("http://www.bingeeatingdisorder.com/hcp/");
            }
        }
        catch (Exception ex)
        {
            //auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.ServiceStart, this.GetType().AssemblyQualifiedName, "Exception: " + ex.Message);

            throw;
        }
        finally
        {
            //log.Info(auditTrail.GetAuditTrail());
            //auditTrail = null;
        }
    }
}