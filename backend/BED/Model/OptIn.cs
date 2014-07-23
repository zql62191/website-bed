using System.Runtime.Serialization;

namespace BEDService.Model
{
    [DataContract]
    public class OptIn
    {
        [DataMember]
        public string Specialty { get; set; }
        [DataMember]
        public bool CommunicationsOptIn { get; set; }
    }
}