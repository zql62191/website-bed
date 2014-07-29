using System.Runtime.Serialization;

namespace BEDSite.Model
{
    [DataContract]
    public class FormAddress
    {
        [DataMember]
        public string FName { get; set; }

        [DataMember]
        public string MName { get; set; }

        [DataMember]
        public string LName { get; set; }

        [DataMember]
        public string Address1 { get; set; }

        [DataMember]
        public string Address2 { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string State { get; set; }

        [DataMember]
        public string Zip { get; set; }
    }
}