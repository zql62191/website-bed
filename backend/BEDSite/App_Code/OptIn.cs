using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace BEDSite.Model
{
    [DataContract]
    public class OptIn
    {
        [DataMember]
        public bool CommunicationsOptIn { get; set; }

        [DataMember]
        public FormName Name { get; set; }

        [DataMember]
        public FormEmail Email { get; set; }
    }
    
}