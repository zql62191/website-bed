using System;
using System.Collections.Generic;
using System.Configuration;
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
using Shire.Realtime.ProcessManagers;
using Shire.Realtime.Entities;
using Shire.Realtime.Enumerations;

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

                Address address = new Address(optIn.Address1, optIn.Address2, optIn.City, Enum.Parse(typeof(States), optIn.State).ToString(), optIn.Zip, AddressTypes.UNSP.ToString(), Countries.US.ToString());
                EmailAddress emailAddress = new EmailAddress(optIn.Email);
                HCPIndividual hcp = new HCPIndividual(String.Empty, optIn.FName, optIn.LName, String.Empty, emailAddress, address);
                hcp.Specialties.Add((Specialties)Enum.Parse(typeof(Specialties), optIn.Profession));
                                
                RegistrationManager regMgr = new RegistrationManager();
                regMgr.Individual = hcp;

                



                regMgr.BeginRegistration();


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

            ValueExists("FirstName", optIn.FName, errors);
            ValueExists("LastName", optIn.LName, errors);
            ValueExists("Profession", optIn.Profession, errors);
            ValueExists("Address1", optIn.Address1, errors);
            ValueExists("City", optIn.City, errors);
            ValueExists("State", optIn.State, errors);

            ValueExists("Zip", optIn.Zip, errors);
            IsPatternValid("Zip", optIn.Zip, new Regex(@"^\d{5}"), errors);

            ValueExists("Email", optIn.Email, errors);
            ValueExists("ConfirmEmail", optIn.ConfirmEmail, errors);
            IsPatternValid("Email", optIn.Email, new Regex(@"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*@((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$", RegexOptions.IgnoreCase), errors);

            ConfirmEmailMatch("ConfirmEmail", optIn.Email, optIn.ConfirmEmail, errors);

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
