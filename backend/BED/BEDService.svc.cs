using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.ServiceModel.Activation;
using System.Text;
using System.IO;
using System.Web.Hosting;
using System.DirectoryServices;
using BEDService.Model;
using log4net;
using log4net.Appender;
using System.ServiceModel.Channels;
using System.Net;
using System.Collections;
using System.Text.RegularExpressions;
using BEDService.db;


namespace BEDService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "BEDService" in code, svc and config file together.
 
    [AspNetCompatibilityRequirements
    (RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]
    public class BEDService : IBEDService
    {
        public static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        public List<string> SetOptInData(OptIn optIn)
        {
            AuditTrail auditTrail = new AuditTrail();
            List<string> errors = null;
         
            try
            {
                errors = Validate(optIn);

                if (errors.Count > 0)
                    return errors;

                // Create the entities 
                // Create the Individual entity object
                //Individual oIndividual = new Individual(); 
                //oIndividual.IndividualType = Individual.IndividualTypes.Professional_HCP; 
                //oIndividual.FirstName = sFirstName; 
                //oIndividual.LastName = sLastName; 
                //// Create an Address entity object and add it to the Individual 
                //// entity‟s Addresses collection 
                //Address oAddress = new Address();
                //oAddress.StreetAddress1 = sAddress1;
                //oAddress.StreetAddress2 = sAddress2; 
                //oAddress.City = sCity;
                //oAddress.State = sState;

                //oAddress.ZipCode = sZIP;
                //oIndividual.Addresses.Add(oAddress); 

                //EmailAddress oEmail = new EmailAddress();
                //oEmail.EmailAddressString = sEmail;
                //oIndividual.EmailAddresses.Add(oEmail); 


                //SurveyResponse oPracticeTypeResponse = new SurveyResponse();
                //oPracticeTypeResponse.QuestionID = 8030;
                //oPracticeTypeResponse.AnswerID = Convert.ToInt32(sPracticeType); 
                //SurveyResponse oOptResponse = new SurveyResponse(); 
                //oOptResponse.QuestionID = 1045270; 
                //oOptResponse.AnswerID = 0; //(int)"";//hdnOptQuestion.Value;


                //Transaction oTransaction = new Transaction(); 
                //oTransaction.Individual = oIndividual; 

                //oTransaction.SurveyResponses.Add(oPracticeTypeResponse); 
                //oTransaction.SurveyResponses.Add(oOptResponse); int? iTransactionID; 

                //RegistrationManager oRegistrationMgr = new RegistrationManager(); 
                //iTransactionID = oRegistrationMgr.SaveRegistration(oTransaction); 

                //if (iTransactionID == null) 
                //{
                //    if (oRegistrationMgr.Errors.Count > 0) 

                //    { 
                //        String sRegErrors = "";
                //        foreach (Error oError in oRegistrationMgr.Errors) 
                //        {
                //            sRegErrors += oError.ErrorMessage + "<br />"; 
                //        }

                //    } 
                //} 
                // Redirect to the confirmation page Response.Redirect("http://" + Request.ServerVariables("HTTP_HOST") + "/" + "Confirmation.aspx"); }



            }
            catch (Exception e)
            {

            }
            finally
            {
               
            }

            return errors;
        }

        public string TestOptInData()
        {
            using (ErrorDataSource datasource = new ErrorDataSource())
            {
                datasource.AddError(32, "TestValue");
            }
            return "TestOptInData";
        }

        private List<string> Validate(OptIn optIn)
        {
            List<string> errors = new List<string>();

            ValueExists("FirstName", optIn.fname, errors);
            ValueExists("LastName", optIn.lname, errors);
            ValueExists("Profession", optIn.profession, errors);
            ValueExists("Address1", optIn.address1, errors);
            ValueExists("City", optIn.city, errors);
            ValueExists("State", optIn.state, errors);

            ValueExists("Zip", optIn.zip, errors);
            IsPatternValid("Zip", optIn.zip, new Regex(@"^\d{5}"), errors);

            ValueExists("Email", optIn.email, errors);
            ValueExists("ConfirmEmail", optIn.confirmemail, errors);
            IsPatternValid("Email", optIn.email, new Regex(@"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*@((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$", RegexOptions.IgnoreCase), errors);

            ConfirmEmailMatch("ConfirmEmail", optIn.email, optIn.confirmemail, errors);

            return errors;
        }

        private void ValueExists(string fieldName, string value,  List<string> errors)
        {
            if (String.IsNullOrEmpty(value.Trim()))
            {
                errors.Add(fieldName);
            }          
        }

        private void IsPatternValid(string fieldName, string value, Regex regEx, List<string> errors)
        {
            if (!regEx.IsMatch(value))
            {
                errors.Add(fieldName);
            }  
        }

        private void ConfirmEmailMatch(string fieldName, string email, string confirmEmail, List<string> errors)
        {
            if (!String.IsNullOrEmpty(email.Trim()) && !String.IsNullOrEmpty(confirmEmail.Trim()))
            {
                if (!String.Equals(email.Trim(), confirmEmail.Trim()) )
                    errors.Add(fieldName);
            }
        }
    }
}
