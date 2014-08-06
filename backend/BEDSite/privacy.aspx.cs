using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Collections.Specialized;
using System.Web.Caching;
using Shire.Web;

public partial class privacy : System.Web.UI.Page
{
    protected string sectionName = "appSettings";
    Configuration webConfigApp = WebConfigurationManager.OpenWebConfiguration("~");
    protected void Page_Init(Object sender, EventArgs e)
    {
        string Key = "CommonConfigPath";
        string Value = "/common/config/";
        webConfigApp.AppSettings.Settings[Key].Value = Value;
        webConfigApp.Save(ConfigurationSaveMode.Modified);
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        string str2 = ConfigurationManager.AppSettings["CommonConfigPath"];
        if (str2.CompareTo("../common/config/") == 0)
        {
            Response.Redirect(Request.RawUrl);
        }
        litPrivacyPolicy.Text = CommonContent.GetContent("PRIVACYPOLICY", "ENG");
        string Key1 = "CommonConfigPath";
        string Value1 = "../common/config/";
        webConfigApp.AppSettings.Settings[Key1].Value = Value1;
        webConfigApp.Save();
        ConfigurationManager.RefreshSection(sectionName);
        
    }

  
}