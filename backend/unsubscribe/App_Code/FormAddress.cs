using System.Runtime.Serialization;

namespace BEDSite.Model
{
    [DataContract]
    public class FormAddress
    {
        [DataMember(IsRequired = true)]
        public string FName { get; set; }
        [DataMember(IsRequired = true)]
        public string MName { get; set; }
        [DataMember(IsRequired = true)]
        public string LName { get; set; }
        [DataMember(IsRequired = true)]
        public string Address1 { get; set; }
        [DataMember(IsRequired = false)]
        public string Address2 { get; set; }
        [DataMember(IsRequired = true)]
        public string City { get; set; }
        [DataMember(IsRequired = true)]
        public string State { get; set; }
        [DataMember(IsRequired = true)]
        public string Zip { get; set; }
    }
}