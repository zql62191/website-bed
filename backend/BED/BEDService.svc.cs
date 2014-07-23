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
using Shire.Realtime.WebServices;

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
            HCPIndividual hcp;
            QuestionResponseSet questionResponseSet;

            try
            {
                errors = Validate(optIn);

                if (errors.Count > 0)
                    return errors;

                if (Services.ServiceIsAvailable)
                {
                    Address address = new Address(optIn.Address1, optIn.Address2, optIn.City, Enum.Parse(typeof(States), optIn.State).ToString(), optIn.Zip, null, ConfigurationManager.AppSettings["RTCountry"]);
                    EmailAddress emailAddress = new EmailAddress(optIn.Email);
                    hcp = new HCPIndividual(String.Empty, optIn.FName, optIn.LName, String.Empty, emailAddress, address);
                    hcp.Specialties.Add((Specialties)Enum.Parse(typeof(Specialties), optIn.Specialty));

                    //hcp.PIISetID = long.MaxValue;

                    RegistrationManager regMgr = new RegistrationManager();
                    regMgr.Individual = hcp;
                    
                    List<QuestionResponse> questionResponses = new List<QuestionResponse>();
                    QuestionResponse questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDExitMCC"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsOpen"]), ConfigurationManager.AppSettings["MCCRegister"]);
                    questionResponses.Add(questionResponse);

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDSourceMCC"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsOpen"]), ConfigurationManager.AppSettings["RTWebSiteID"]);
                    questionResponses.Add(questionResponse);

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDHCPOptIn"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsYes"]));
                    questionResponses.Add(questionResponse);

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDSpeciality"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsOpen"]), optIn.Specialty);
                    questionResponses.Add(questionResponse);

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDPractice"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsQuestionNotAsked"]));
                    questionResponses.Add(questionResponse);

                    questionResponseSet = new QuestionResponseSet();
                   // questionResponseSet.QuestionSetID = long.MaxValue;
                    questionResponseSet.QuestionResponses = questionResponses;
                    
                    regMgr.PerformLiteRegistration(hcp, questionResponseSet);
                }
                else
                {
                    errors.Add("The PMM services are unavailable");
                }

            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                hcp = null;
                questionResponseSet = null;
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
            ValueExists("Profession", optIn.Specialty, errors);
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
