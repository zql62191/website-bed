using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BEDSite.Model
{
    public class AuditTrail
    {
        public  string UserName {get; set;}
        public  OperationType Operation {get; set;}
        public string Category { get; set; }
        public string Message { get; set; }
        public enum OperationType
        {
            LDAPAuth_Group_Success,
            LDAPAuth_Group_Failure,
            LDAPAuth_Success,
            LDAPAuth_Failure,
            Validate_Success,
            Validate_Failure,
            Retrieve_Failure,
            Update_Failure,
            Insert_Failure,
            ServiceStart,
            ServiceEnd,
            Application_Failure,
            Uninitialized,
            Unsubscribtion_Failure,
            OptIn_Failure,
            OptIn_Success
        };

        public AuditTrail() {
            UserName = "";
            Operation = OperationType.Uninitialized;
            Category = "";
            Message = "";
        }

        public void SetAuditTrail(string un, OperationType op, string cat, string msg)
        {
            UserName = un;
            Operation = op;
            Category = cat;
            Message = msg;
        }

        public string GetAuditTrail()
        {
            return String.Format("BED:: User: {0} | Operation: {1} |  Category: {2} | Message: {3} ", string.IsNullOrEmpty(UserName)? string.Empty: UserName , Operation.ToString(), Category, Message); 
        }

        public bool IsSet()
        {
            return Category.Length > 0;
        }
    }


} 