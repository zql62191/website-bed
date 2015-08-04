using System.Runtime.Serialization;

namespace BEDSite.Model
{
    [DataContract]
    public class FormName
    {
        [DataMember]
        public string FName { get; set; }

        [DataMember]
        public string LName { get; set; }
    }
}