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
        public string Specialty { get; set; }
        [DataMember]
        public bool CommunicationsOptIn { get; set; }
        [DataMember]
        public FormAddress Address { get; set; }
        [DataMember]
        public FormEmail Email { get; set; }
    }
    
}