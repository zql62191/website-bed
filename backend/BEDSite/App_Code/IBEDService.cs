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
        [WebInvoke
         (Method = "*",
         BodyStyle = WebMessageBodyStyle.Bare,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "/SetOptInData"
        )]
        List<string> SetOptInData(OptIn optIn);

        [OperationContract]
        [WebInvoke
         (Method = "*",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "/SetUnsubscribeDataBoth"
        )]
        List<string> SetUnsubscribeDataBoth(FormEmail email, FormAddress address);

        [OperationContract]
        [WebInvoke
         (Method = "*",
         BodyStyle = WebMessageBodyStyle.Bare,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "/SetUnsubscribeDataAddress"
        )]
        List<string> SetUnsubscribeDataAddress(FormAddress address);

    }
}
