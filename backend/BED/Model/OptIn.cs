using System.Runtime.Serialization;

namespace BEDService.Model
{
    [DataContract]
    public class OptIn
    {
        [DataMember(IsRequired = true)]
        public string fname { get; set; }
        [DataMember(IsRequired = true)]
        public string mname { get; set; }
        [DataMember(IsRequired = true)]
        public string lname { get; set; }
        [DataMember(IsRequired = true)]
        public string email { get; set; }
        [DataMember(IsRequired = true)]
        public string confirmemail { get; set; }
        [DataMember(IsRequired = true)]
        public string address1 { get; set; }
        [DataMember(IsRequired = false)]
        public string address2 { get; set; }
        [DataMember(IsRequired = true)]
        public string city { get; set; }
        [DataMember(IsRequired = true)]
        public string state { get; set; }
        [DataMember(IsRequired = true)]
        public string zip { get; set; }
        [DataMember(IsRequired = true)]
        public string profession { get; set; }
        [DataMember(IsRequired = true)]
        public bool chk { get; set; }
    }
}