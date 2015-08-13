using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Configuration;
using System.Web.Configuration;
using System.Text;
using System.Text.RegularExpressions;
using System.ServiceModel.Activation;
using BEDSite.Model;
using Shire.Realtime.ProcessManagers;
using Shire.Realtime.Entities;
using Shire.Realtime.Enumerations;
using Shire.Realtime.WebServices;
using log4net;
using log4net.Appender;
using BEDSite.db;


namespace BEDService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "BEDService" in code, svc and config file together.
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class BEDWCFService : IBEDService
    {
        public static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public BEDWCFService()
        {

        }

        public string Test()
        {
            return "function called";
        }

        public string TestString(string str)
        {
            return str;
        }

        public Status SetOptInData(OptIn optInForm, string sourceCode)
        {
            log4net.Config.XmlConfigurator.Configure();

            Status status = new Status();
            AuditTrail auditTrail = new AuditTrail();           
            HCPIndividual hcp;
            QuestionResponseSet questionResponseSet;
            RegistrationManager regMgr;
            EmailManager emailMgr;

            try
            {
                status.Errors = Validate(optInForm);

                if (status.Errors.Count > 0)
                    return status;

                if (Services.ServiceIsAvailable)
                {

                    EmailAddress emailAddress = new EmailAddress(optInForm.Email.Email);
                    hcp = new HCPIndividual(String.Empty, optInForm.Name.FName, optInForm.Name.LName, String.Empty, emailAddress);

                    string sourceMCC = string.Empty;
                    if (!string.IsNullOrWhiteSpace(sourceCode) && !string.Equals(sourceCode, "0"))
                    {
                        sourceMCC = sourceCode;
                    }
                    else
                    {
                        sourceMCC = Convert.ToString(ConfigurationManager.AppSettings["MCCRegister"]);
                    }

                    regMgr = new RegistrationManager();
                    regMgr.Individual = hcp;

                    List<QuestionResponse> questionResponses = new List<QuestionResponse>();
                    QuestionResponse questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDExitMCC"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsOpen"]), ConfigurationManager.AppSettings["MCCRegister"]);
                    questionResponses.Add(questionResponse);


                    Configuration config = WebConfigurationManager.OpenWebConfiguration(System.Web.HttpContext.Current.Request.ApplicationPath + "/Unsubscribe/");
                    KeyValueConfigurationElement Appsetting = config.AppSettings.Settings["RTWebSiteID"];

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDSourceMCC"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsOpen"]), sourceMCC);
                    questionResponses.Add(questionResponse);

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDHCPOptIn"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsYes"]));
                    questionResponses.Add(questionResponse);


                    questionResponseSet = new QuestionResponseSet();
                    questionResponseSet.QuestionResponses = questionResponses;

                    regMgr.PerformLiteRegistration(hcp, questionResponseSet);
                    if (String.Equals(regMgr.Status, "OK"))
                    {
                        emailMgr = new EmailManager();
                        emailMgr.SendEmail(Int32.Parse(ConfigurationManager.AppSettings["RTWelcomEmailMAID"]), emailAddress.EmailAddressString);
                    }

                    status.Errors = GetRegMgrErrors(regMgr, status.Errors);

                    auditTrail.SetAuditTrail(optInForm.Email.Email, AuditTrail.OperationType.OptIn_Success, "SetOptInData", regMgr.Status.ToUpper());
                    if (status.Errors.Count > 0)
                        auditTrail.SetAuditTrail(optInForm.Email.Email, AuditTrail.OperationType.OptIn_errors, "SetOptInData", status.Errors[0].ToString());
                }
                else
                {
                    status.Errors.Add("The PMM services are unavailable");
                }

            }
            catch (Exception e)
            {
                auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.OptIn_Failure, e.Source, e.Message);
                throw e;
            }
            finally
            {
                hcp = null;
                questionResponseSet = null;
                regMgr = null;
                log.Info(auditTrail.GetAuditTrail());
                auditTrail = null;

            }

            return status;
        }


        private List<string> GetRegMgrErrors(RegistrationManager regMgr, List<string> errors)
        {
            if (regMgr.Status.ToUpper() != "OK")
            {
                errors.Add(String.Format("Reg Mgr Error Message: ", regMgr.StatusMessage));
                if (regMgr.PIISet.Status.ToUpper() != "OK")
                {
                    errors.Add(String.Format(" - PIISet error: "));

                    foreach (PIIDataDetail detail in regMgr.PIISet.Details)
                    {
                        if(detail.Status != "OK")
                            errors.Add(String.Format(" -- Field:{0}, Value:{1}, Error:{2}", detail.Type, detail.Value, detail.StatusMessage));
                    }

                }
                if (regMgr.Questions.Status.ToUpper() != "OK")
                {
                    errors.Add(String.Format("Question errors: "));
                    foreach (Question question in regMgr.Questions.Questions)
                    {
                        if (question.IsError == true)
                        {
                            errors.Add(String.Format(" -- Question ID:{0}, Type:{1}, Error:{2}", question.QuestionID, question.QuestionType, question.ErrorMessage));
                        }
                    }
                }
            }
            return errors;
        }

        private List<string> Validate(OptIn optIn)
        {
            List<string> errors = new List<string>();

            errors.AddRange(ValidateName(optIn.Name));
            errors.AddRange(ValidateEmail(optIn.Email));
            errors.AddRange(ValidateConfirmEmail(optIn.Email));


            return errors;
        }

        private List<string> ValidateEmail(FormEmail email)
        {
            List<string> errors = new List<string>();

            ValueExists("Email", email.Email, errors);
            IsPatternValid("Email", email.Email, new Regex(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", RegexOptions.IgnoreCase), errors);

            return errors;

        }

        private List<string> ValidateConfirmEmail(FormEmail email)
        {
            List<string> errors = new List<string>();

            ValueExists("ConfirmEmail", email.ConfirmEmail, errors);
            ConfirmEmailMatch("ConfirmEmail", email.Email, email.ConfirmEmail, errors);

            return errors;
        }

        private List<string> ValidateName(FormName name)
        {
            List<string> errors = new List<string>();

            ValueExists("FirstName", name.FName, errors);
            ValueExists("LastName", name.LName, errors);

            return errors;
        }


        private void ValueExists(string fieldName, string value, List<string> errors)
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
                if (!String.Equals(email.Trim(), confirmEmail.Trim()))
                    errors.Add(fieldName);
            }
        }
    }
}
