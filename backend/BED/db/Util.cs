using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace BEDService.db
{
    public class Util
    {
        public static SqlConnection GetConnection()
        {
            try
            {
                string connString = Settings.DBConnectionString;
                SqlConnection conn = new SqlConnection(connString);

                return conn;
            }
            catch
            {
                return null;
            }
        }
    }
}