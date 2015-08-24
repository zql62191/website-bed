using System;
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
    public interface IUnsubscribeBED
    {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest, UriTemplate = "SetUnsubscribeDataEmail")]
        Status SetUnsubscribeDataEmail(FormEmail email, string sourceCode);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest, UriTemplate = "SetUnsubscribeDataAddress")]
        Status SetUnsubscribeDataAddress(FormEmail email, FormAddress address, string sourceCode);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest, UriTemplate = "SetUnsubscribeDataBoth")]
        Status SetUnsubscribeDataBoth(FormEmail email, FormAddress address, string sourceCode);

        [OperationContract]
        [WebInvoke
         (Method = "POST",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "TestUnsubscribe"
        )]

        string TestUnsubscribe();

        [OperationContract]
        [WebInvoke
         (Method = "POST",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json,
         UriTemplate = "TestUnsubscribeString"
        )]
        string TestUnsubscribeString(string str);
    }
}
