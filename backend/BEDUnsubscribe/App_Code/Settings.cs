using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace BEDSite.db
{
    public static class Settings
    {
        public static string DBConnectionString
        {
            get { return (string)ConfigurationManager.ConnectionStrings["CS_RealtimeLog"].ConnectionString; }
        }
    }
}