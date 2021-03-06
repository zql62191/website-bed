﻿using System;
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
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class BEDUnsubscribe : IUnsubscribeBED
    {
        public static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        //string firstname = System.web.HttpContext.Current
        //System.Web.HttpContext.Current.Request.QueryString["fname"];



        public List<string> SetUnsubscribeDataEmail(FormEmail email, string sourceCode)
        {
            AuditTrail auditTrail = new AuditTrail();
            List<string> errors = null;
            HCPIndividual hcp;
            QuestionResponseSet questionResponseSet;
            log4net.Config.XmlConfigurator.Configure();

           
            try
            {
                errors = ValidateEmail(email);

                if (errors.Count > 0)
                {
                    auditTrail.SetAuditTrail(email.Email, AuditTrail.OperationType.Unsubscribtion_error, "SetUnsubscribeDataEmail", errors.ToString());
                    return errors;
                }
                if (Services.ServiceIsAvailable)
                {
                    RegistrationManager regMgr = new RegistrationManager();
                    EmailAddress emailAddress = new EmailAddress(email.Email);

                    hcp = new HCPIndividual();
                    hcp.EmailAddresses = new List<EmailAddress>();
                    hcp.EmailAddresses.Add(emailAddress);

                  
                    regMgr.Individual = hcp;

                    string sourceMCC = string.Empty;
                    if (!string.IsNullOrWhiteSpace(sourceCode) && !string.Equals(sourceCode, "0"))
                    {
                        sourceMCC = sourceCode;
                    }
                    else
                    {
                        sourceMCC = Convert.ToString(ConfigurationManager.AppSettings["MCCUnsubscribe"]);
                    }
                    List<QuestionResponse> questionResponses = new List<QuestionResponse>();
                    QuestionResponse questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDExitMCC"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsOpen"]), ConfigurationManager.AppSettings["MCCUnsubscribe"]);
                    questionResponses.Add(questionResponse);

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDOptOutBEDEmail"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsYes"]));
                    questionResponses.Add(questionResponse);

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDSourceMCC"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsOpen"]), sourceMCC);
                    questionResponses.Add(questionResponse);

                    questionResponseSet = new QuestionResponseSet();
                    questionResponseSet.QuestionResponses = questionResponses;

                    regMgr.PerformLiteRegistration(hcp, questionResponseSet);
                    errors = GetRegMgrErrors(regMgr, errors);
                    auditTrail.SetAuditTrail(email.Email, AuditTrail.OperationType.Unsubscribtion_success, "SetUnsubscribeDataEmail", regMgr.Status.ToUpper());
                    if (errors.Count > 0)
                        auditTrail.SetAuditTrail(email.Email, AuditTrail.OperationType.Unsubscribtion_error, "SetUnsubscribeDataEmail", errors.ToString());
                }
                else
                {
                    errors.Add("The PMM services are unavailable");
                    
                }

            }
            catch (Exception e)
            {
                auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.Unsubscribtion_Failure, e.Source, e.Message);
                throw e;
            }
            finally
            {
                log.Info(auditTrail.GetAuditTrail());
                auditTrail = null;
            }

            return errors;
        }

        public List<string> SetUnsubscribeDataAddress(FormEmail email, FormAddress address, string sourceCode)
        {
            AuditTrail auditTrail = new AuditTrail();
            List<string> errors = null;
            HCPIndividual hcp;
            QuestionResponseSet questionResponseSet;

            try
            {
                errors = ValidateAddress(address);
                errors.AddRange(ValidateEmail(email));
                if (errors.Count > 0)
                {
                    auditTrail.SetAuditTrail(email.Email, AuditTrail.OperationType.Unsubscribtion_error, "SetUnsubscribeDataAddress", errors.ToString());
                    return errors;
                }
                if (Services.ServiceIsAvailable)
                {
                    EmailAddress emailAddress = new EmailAddress(email.Email);
                    Address Address = new Address(address.Address1, address.Address2, address.City, address.State, address.Zip, "", "");

                    hcp = new HCPIndividual();
                    hcp.FirstName = address.FName;
                    hcp.LastName = address.LName;
                    hcp.MiddleName = address.MName;
                    hcp.Addresses = new List<Address>();
                    hcp.Addresses.Add(Address);
                    hcp.EmailAddresses = new List<EmailAddress>();
                    hcp.EmailAddresses.Add(emailAddress);

                    RegistrationManager regMgr = new RegistrationManager();
                    regMgr.Individual = hcp;

                    string sourceMCC = string.Empty;
                    if (!string.IsNullOrWhiteSpace(sourceCode) && !string.Equals(sourceCode, "0"))
                    {
                        sourceMCC = sourceCode;
                    }
                    else
                    {
                        sourceMCC = Convert.ToString(ConfigurationManager.AppSettings["MCCUnsubscribe"]);
                    }

                    List<QuestionResponse> questionResponses = new List<QuestionResponse>();
                    QuestionResponse questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDExitMCC"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsOpen"]), ConfigurationManager.AppSettings["MCCUnsubscribe"]);
                    questionResponses.Add(questionResponse);

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDOptOutBEDDirectMail"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsYes"]));
                    questionResponses.Add(questionResponse);

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDSourceMCC"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsOpen"]), sourceMCC);
                    questionResponses.Add(questionResponse);

                    questionResponseSet = new QuestionResponseSet();
                    // questionResponseSet.QuestionSetID = long.MaxValue;
                    questionResponseSet.QuestionResponses = questionResponses;

                    regMgr.PerformLiteRegistration(hcp, questionResponseSet);
                    errors = GetRegMgrErrors(regMgr, errors);
                    auditTrail.SetAuditTrail(email.Email, AuditTrail.OperationType.Unsubscribtion_success, "SetUnsubscribeDataAddress", regMgr.Status.ToUpper());
                    if (errors.Count > 0)
                        auditTrail.SetAuditTrail(email.Email, AuditTrail.OperationType.Unsubscribtion_error, "SetUnsubscribeDataAddress", errors.ToString());
                }
                else
                {
                    errors.Add("The PMM services are unavailable");
                }
            }
            catch (Exception e)
            {
                auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.Unsubscribtion_Failure, e.Source, e.Message);
                throw e;
            }
            finally
            {
                log.Info(auditTrail.GetAuditTrail());
                auditTrail = null;
            }

            return errors;
        }

        public List<string> SetUnsubscribeDataBoth(FormEmail email, FormAddress address, string sourceCode)
         {
            AuditTrail auditTrail = new AuditTrail();
            List<string> errors = null;
            HCPIndividual hcp;
            QuestionResponseSet questionResponseSet;
            try
            {
                errors = ValidateAddress(address);
                errors.AddRange(ValidateEmail(email));

                if (errors.Count > 0)
                {
                    auditTrail.SetAuditTrail(email.Email, AuditTrail.OperationType.Unsubscribtion_error, "SetUnsubscribeDataBoth", errors.ToString());
                    return errors;
                } 
                if (Services.ServiceIsAvailable)
                {
                    RegistrationManager regMgr = new RegistrationManager();
                    EmailAddress emailAddress = new EmailAddress(email.Email);

                    hcp = new HCPIndividual();
                    hcp.FirstName = address.FName;
                    hcp.LastName = address.LName;
                    hcp.MiddleName = address.MName;
                    hcp.EmailAddresses = new List<EmailAddress>();
                    hcp.EmailAddresses.Add(emailAddress);

                    //hcp.PIISetID = long.MaxValue;
                    Address Address = new Address(address.Address1, address.Address2, address.City, address.State, address.Zip, "", "");

                   // hcp = new HCPIndividual();
                    hcp.Addresses = new List<Address>();
                    hcp.Addresses.Add(Address);

                    regMgr.Individual = hcp;

                    string sourceMCC = string.Empty;
                    if (!string.IsNullOrWhiteSpace(sourceCode) && !string.Equals(sourceCode, "0"))
                    {
                        sourceMCC = sourceCode;
                    }
                    else
                    {
                        sourceMCC = Convert.ToString(ConfigurationManager.AppSettings["MCCUnsubscribe"]);
                    }
                    List<QuestionResponse> questionResponses = new List<QuestionResponse>();
                    QuestionResponse questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDExitMCC"]),Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsOpen"]), ConfigurationManager.AppSettings["MCCUnsubscribe"]);
                    questionResponses.Add(questionResponse);

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDOptOutAll"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsYes"]));
                    questionResponses.Add(questionResponse);

                    questionResponse = new QuestionResponse(Int32.Parse(ConfigurationManager.AppSettings["RTIDSourceMCC"]), Int32.Parse(ConfigurationManager.AppSettings["RTIDAnsOpen"]), sourceMCC);
                    questionResponses.Add(questionResponse);

                    questionResponseSet = new QuestionResponseSet();
                    // questionResponseSet.QuestionSetID = long.MaxValue;
                    questionResponseSet.QuestionResponses = questionResponses;

                    regMgr.PerformLiteRegistration(hcp, questionResponseSet);
                    errors = GetRegMgrErrors(regMgr, errors);
                    auditTrail.SetAuditTrail(email.Email, AuditTrail.OperationType.Unsubscribtion_success, "SetUnsubscribeDataBoth", regMgr.Status.ToUpper());
                    if (errors.Count > 0)
                        auditTrail.SetAuditTrail(email.Email, AuditTrail.OperationType.Unsubscribtion_error, "SetUnsubscribeDataBoth", errors.ToString());
                }
                else
                {
                    errors.Add("The PMM services are unavailable");
                }

               
            }
            catch (Exception e)
            {
                auditTrail.SetAuditTrail(" ", AuditTrail.OperationType.Unsubscribtion_Failure, e.Source, e.Message);
                throw e;
            }
            finally
            {
                log.Info(auditTrail.GetAuditTrail());
                auditTrail = null;
            }

            return errors;
        }
        private List<string> Validate(OptIn optIn)
        {
            List<string> errors = new List<string>();

            errors.AddRange(ValidateAddress(optIn.Address));
            errors.AddRange(ValidateEmail(optIn.Email));
            errors.AddRange(ValidateConfirmEmail(optIn.Email));

            ValueExists("Profession", optIn.Specialty, errors);

            return errors;
        }

        private List<string> ValidateEmail(FormEmail email)
        {
            List<string> errors = new List<string>();

            ValueExists("Email", email.Email, errors);
           // IsPatternValid("Email", email.Email, new Regex(@"/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/", RegexOptions.IgnoreCase), errors);
           // IsPatternValid("Email", email.Email, new Regex(@"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*@((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$", RegexOptions.IgnoreCase), errors);
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

        private List<string> ValidateAddress(FormAddress address)
        {
            List<string> errors = new List<string>();
            ValueExists("FirstName", address.FName, errors);
            ValueExists("LastName", address.LName, errors);
            ValueExists("Address1", address.Address1, errors);
            ValueExists("City", address.City, errors);
            ValueExists("State", address.State, errors);

            ValueExists("Zip", address.Zip, errors);
            IsPatternValid("Zip", address.Zip, new Regex(@"^\d{5}"), errors);
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
                        if (detail.Status != "OK")
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

    }
}
