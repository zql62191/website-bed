﻿using System;
using System.ServiceModel.Web;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using BEDSite.Model;
using Shire.Realtime;

namespace BEDService
{
    [ServiceContract]
    public interface IBEDService
    {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "SetOptInData")]
        List<string> SetOptInData(OptIn obj);

    }
}
