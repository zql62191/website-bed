using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using BEDService.Model;


namespace BEDService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IBEDService" in both code and config file together.

    [ServiceContract]
    public interface IBEDService
    {
        [OperationContract]
        [WebInvoke
         (Method = "*",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "/SetOptInData"
        )]
        List<string> SetOptInData(OptIn optIn, FormEmail email, FormAddress formaddress);

        [OperationContract]
        [WebInvoke
         (Method = "*",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "/SetUnsubscribeDataEmail"
        )]
        List<string> SetUnsubscribeDataEmail(FormEmail email);

        [OperationContract]
        [WebInvoke
         (Method = "*",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "/SetUnsubscribeDataAddress"
        )]
        List<string> SetUnsubscribeDataAddress(FormAddress address);

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
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "/TestOptInData"
        )]
        string TestOptInData();
      
    }
}
