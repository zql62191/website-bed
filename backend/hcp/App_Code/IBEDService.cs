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
         (Method = "POST",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "/SetOptInData"
        )]
        Status SetOptInData(OptIn optInForm, string sourceCode);

        [OperationContract]
        [WebInvoke
         (Method = "POST",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "Test"
        )]

        string Test();

        [OperationContract]
        [WebInvoke
         (Method = "POST",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "TestString"
        )]
        string TestString(string str);
    }



}
