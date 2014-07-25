using System.Runtime.Serialization;

namespace BEDSite.Model
{
    [DataContract]
    public class FormEmail
    {
        [DataMember(IsRequired = true)]
        public string Email { get; set; }

        [DataMember(IsRequired = true)]
        public string ConfirmEmail { get; set; }
    }
}