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
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "SetUnsubscribeDataEmail")]
        List<string> SetUnsubscribeDataEmail(FormEmail email, string sourceCode);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "SetUnsubscribeDataAddress")]
        List<string> SetUnsubscribeDataAddress(FormEmail email, FormAddress address, string sourceCode);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "SetUnsubscribeDataBoth")]
        List<string> SetUnsubscribeDataBoth(FormEmail email, FormAddress address, string sourceCode);
    }
}
