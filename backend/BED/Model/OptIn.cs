using System.Runtime.Serialization;

namespace BEDService.Model
{
    [DataContract]
    public class OptIn
    {
        [DataMember(IsRequired = true)]
        public string FName { get; set; }
        [DataMember(IsRequired = true)]
        public string MName { get; set; }
        [DataMember(IsRequired = true)]
        public string LName { get; set; }
        [DataMember(IsRequired = true)]
        public string Email { get; set; }
        [DataMember(IsRequired = true)]
        public string ConfirmEmail { get; set; }
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
        [DataMember(IsRequired = true)]
        public string Profession { get; set; }
        [DataMember(IsRequired = true)]
        public bool CommunicationsOptIn { get; set; }
    }
}